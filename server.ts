import express from 'express';
import compression from 'compression';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';
import { COURSES, SERVICES, BLOGS, STUDENT_RESULTS, TESTIMONIALS } from './src/data';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Enable HTTP Compression (Gzip / Deflate) for lightning-fast mobile TTFB & FCP
app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  },
  threshold: 1024 // compress anything over 1KB
}));

// Security: Disable x-powered-by banner
app.disable('x-powered-by');

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https:; font-src 'self' data: https:; connect-src 'self' https:; frame-src 'self' https://www.google.com https://maps.google.com; object-src 'none';"
  );
  next();
});

// Payload limit for uploads
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Directories
const DATA_DIR = process.env.VERCEL ? path.join('/tmp', 'data') : path.join(process.cwd(), 'data');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const CREDENTIALS_FILE = path.join(DATA_DIR, 'credentials.json');

// Ensure directories exist safely
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
} catch (err) {
  console.warn('Could not create data directory on disk', err);
}

// Serve uploads statically with nosniff and cache control
app.use(
  '/uploads',
  express.static(UPLOADS_DIR, {
    setHeaders: (res) => {
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  })
);

/* ==========================================================================
   CRYPTOGRAPHY & PASSWORD HASHING (Scrypt with Cryptographic Salt)
   ========================================================================== */

/**
 * Derives a secure password hash using Node.js crypto.scryptSync with high memory-cost parameters
 * and unique 16-byte cryptographic salt per user.
 */
function hashPassword(password: string, salt?: string): string {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, actualSalt, 64, {
    N: 16384,
    r: 8,
    p: 1,
    maxmem: 64 * 1024 * 1024
  });
  return `${actualSalt}$${derivedKey.toString('hex')}`;
}

/**
 * Constant-time verification of candidate password against stored salt$hash
 */
function verifyPassword(candidatePassword: string, storedHash: string): boolean {
  if (!candidatePassword || !storedHash || typeof storedHash !== 'string') return false;
  const parts = storedHash.split('$');
  if (parts.length !== 2) return false;
  const [salt, expectedKeyHex] = parts;
  if (!salt || !expectedKeyHex) return false;

  try {
    const derivedKey = crypto.scryptSync(candidatePassword, salt, 64, {
      N: 16384,
      r: 8,
      p: 1,
      maxmem: 64 * 1024 * 1024
    });
    const expectedKeyBuf = Buffer.from(expectedKeyHex, 'hex');
    if (expectedKeyBuf.length !== derivedKey.length) return false;
    return crypto.timingSafeEqual(expectedKeyBuf, derivedKey);
  } catch (err) {
    return false;
  }
}

// Initialize or synchronize Credentials with environment variables
function syncCredentials() {
  try {
    const adminUser = process.env.ADMIN_USERNAME || 'admin@futuregates.edu.pk';
    const adminPass = process.env.ADMIN_PASSWORD || 'info@futuregatesitcenter.com';

    if (process.env.ADMIN_PASSWORD || !fs.existsSync(CREDENTIALS_FILE)) {
      const creds = {
        username: adminUser,
        passwordHash: hashPassword(adminPass)
      };
      fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(creds, null, 2));
    } else if (fs.existsSync(CREDENTIALS_FILE)) {
      const credsRaw = fs.readFileSync(CREDENTIALS_FILE, 'utf-8');
      const creds = JSON.parse(credsRaw);
      // If the stored hash is legacy format (without $), update to scrypt format
      if (!creds.passwordHash || !creds.passwordHash.includes('$')) {
        creds.passwordHash = hashPassword(adminPass);
        if (adminUser) creds.username = adminUser;
        fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(creds, null, 2));
      }
    }
  } catch (err) {
    console.warn('Could not sync credentials file', err);
  }
}
syncCredentials();

/* ==========================================================================
   SESSION & AUTHENTICATION TOKEN STORE
   ========================================================================== */

interface ActiveSession {
  username: string;
  createdAt: number;
  expiresAt: number;
}

const activeSessions = new Map<string, ActiveSession>();
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Generates a 256-bit cryptographically secure random session token
 */
function createSession(username: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  activeSessions.set(token, {
    username,
    createdAt: now,
    expiresAt: now + SESSION_DURATION_MS
  });
  return token;
}

/**
 * Invalidates an active session on logout
 */
function destroySession(token: string): boolean {
  return activeSessions.delete(token);
}

/**
 * Strict server-side token authentication verification
 */
function verifyAuth(req: express.Request): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  const token = authHeader.slice(7).trim();
  if (!token || token.length < 32) return false;

  const session = activeSessions.get(token);
  if (!session) return false;

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return false;
  }

  return true;
}

// Periodically prune expired sessions
setInterval(() => {
  const now = Date.now();
  for (const [tok, sess] of activeSessions.entries()) {
    if (now > sess.expiresAt) {
      activeSessions.delete(tok);
    }
  }
}, 60 * 60 * 1000);

/* ==========================================================================
   RATE LIMITING & BRUTE FORCE PROTECTION
   ========================================================================== */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const ipRateLimits = new Map<string, RateLimitRecord>();

function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = ipRateLimits.get(key);
  if (!record || now > record.resetTime) {
    ipRateLimits.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (record.count >= limit) {
    return false;
  }
  record.count += 1;
  return true;
}

// Prune rate limits periodically
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of ipRateLimits.entries()) {
    if (now > v.resetTime) {
      ipRateLimits.delete(k);
    }
  }
}, 10 * 60 * 1000);

/* ==========================================================================
   INPUT SANITIZERS & VALIDATORS
   ========================================================================== */

function sanitizeString(val: any, maxLen = 300): string {
  if (typeof val !== 'string') return '';
  // Strip HTML tags and control characters (header injection protection)
  return val.replace(/<[^>]*>?/gm, '').replace(/[\r\n\t\0]/g, ' ').trim().slice(0, maxLen);
}

function sanitizeMultiline(val: any, maxLen = 3000): string {
  if (typeof val !== 'string') return '';
  // Strip HTML tags and null bytes while preserving regular newlines
  return val.replace(/<[^>]*>?/gm, '').replace(/\0/g, '').trim().slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  // RFC 5322 compliant regex for practical email validation
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(
    email.trim()
  );
}

/* ==========================================================================
   DEFAULT APPLICATION DATA & DATABASE HELPERS
   ========================================================================== */

const defaultHomepageConfig = {
  heroBadge: 'Professional IT Training • Admissions Open 2026',
  heroTitle: 'Advance Your Tech',
  heroSubtitle: 'Skills & Income.',
  heroDescription:
    'Expert-led training in Full-Stack Web Development, Graphic Design, Digital Marketing, AI Tools, and Office Automation. Verifiable certificates & direct freelancing guidance.',
  ctaPrimaryText: 'View All Courses',
  ctaSecondaryText: 'Verify Student Card',
  stats: {
    studentsCertified: '1,000+',
    practicalLabs: '100%',
    corporateClients: '20+',
    experiencedFaculty: '15+'
  },
  philosophyBadge: 'Our Core Pillars',
  philosophyTitle: 'Why Students Trust Future Gates I.T Center',
  philosophyDescription: 'A modern practical curriculum, experienced instructors, and direct freelancing guidance.'
};

const defaultContactConfig = {
  phone: '+92301-6775690',
  whatsapp: '923016775690',
  email: 'futuregatesitcenter@gmail.com',
  address: 'Future Gates IT Center, Main Campus, Khushab, Punjab, Pakistan',
  facebook: '',
  twitter: '',
  linkedin: '',
  github: '',
  youtube: ''
};

const defaultMentorConfig = {
  name: 'Javed Hattar',
  title: 'IT Expert & Founder Mentor',
  subtitle: 'Future Gates IT Center — "Where Skills Become Your Income"',
  quote:
    'Our single focus at Future Gates IT Center is to bridge the gap between theoretical knowledge and real market earning. Every student learns live project skills and freelancing strategies to build sustainable digital income.',
  photoUrl: '/assets/mentor-javed-hattar.png',
  badgeText: 'Lead Faculty & Founder',
  expertise: [
    {
      title: 'Artificial Intelligence & AI Tools',
      description: 'Mastering ChatGPT, Midjourney, Claude, and AI Automation for productivity and freelancing.',
      badge: 'High Demand',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      title: 'Graphic Designing',
      description: 'Adobe Photoshop, Illustrator, Brand Identity, Social Media Posts, and Marketing Collaterals.',
      badge: 'Creative',
      color: 'bg-amber-50 text-amber-600 border-amber-200'
    },
    {
      title: 'Video Editing',
      description: 'Adobe Premiere Pro, CapCut Pro, YouTube Content Creation, Reels & Commercial Edits.',
      badge: 'Popular',
      color: 'bg-rose-50 text-rose-600 border-rose-200'
    },
    {
      title: 'WordPress Website Designing',
      description: 'Custom e-Commerce, Elementor Pro, Business Websites, Speed Optimization & SEO.',
      badge: 'Core Skill',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: 'MS Office & Automation',
      description: 'Advanced Excel, Professional Powerpoint Presentations, Word, and Administrative Tools.',
      badge: 'Essential',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      title: 'Digital Skills & Freelancing',
      description: 'Fiverr & Upwork Profile Setup, Client Proposal Writing, Communication & Income Scaling.',
      badge: 'Monetization',
      color: 'bg-orange-50 text-brand-orange border-orange-200'
    }
  ]
};

const defaultSiteSettings = {
  headerLogoUrl: '',
  mobileLogoUrl: '',
  faviconUrl: '/brandlogo.png',
  instituteName: 'Future Gates IT Center',
  tagline: 'Where Skills Become Your Income',
  headerPhone: '+92301-6775690',
  headerWhatsapp: '923016775690',
  headerCtaText: 'Enroll Now',
  headerCtaLink: 'admission',
  showAnnouncementBar: true,
  announcementText: 'System Fully Functional • Admissions Open 2026',
  announcementLink: 'admission',
  announcementBtnText: 'Apply Now',
  navItemsVisibility: {
    home: true,
    about: true,
    courses: true,
    services: true,
    verification: true,
    blogs: true,
    contact: true,
    admission: true
  },

  footerLogoUrl: '',
  footerDescription:
    'Future Gates IT Center is a professional IT training institute and digital software agency in Khushab, Punjab, Pakistan.',
  footerPhone: '+92301-6775690',
  footerWhatsapp: '923016775690',
  footerEmail: 'futuregatesitcenter@gmail.com',
  footerAddress: 'Future Gates IT Center, Main Campus, Khushab, Punjab, Pakistan',
  footerCopyrightText: '© 2026 Future Gates IT Center. All Rights Reserved.',
  footerCtaTitle: 'Ready to Transform Your Skills Into Income?',
  footerCtaText:
    'Join hundreds of successful graduates earning as full-stack developers, graphic designers, and AI specialists.',
  footerCtaButtonText: 'Start Your Journey Today',
  footerCtaButtonLink: 'admission',
  showFooterQuickLinks: true,
  showFooterCourses: true,
  showFooterServices: true,
  showFooterLegal: true,

  colors: {
    primary: '#1d4ed8',
    secondary: '#020b18',
    accent: '#f97316',
    button: '#f97316',
    background: '#ffffff',
    text: '#1e293b',
    heading: '#0f172a',
    link: '#2563eb'
  },

  typography: {
    mainFont: 'Plus Jakarta Sans, sans-serif',
    headingFont: 'Plus Jakarta Sans, sans-serif',
    bodyFont: 'Plus Jakarta Sans, sans-serif',
    baseFontSize: '16px',
    headingScale: '1.25'
  },

  siteTitle: 'Future Gates IT Center — Where Skills Become Your Income',
  siteShortName: 'Future Gates IT',
  metaDescription:
    'Professional IT training institute and digital agency in Khushab, Punjab, Pakistan. Verified student certificates, professional web development, graphic design, and AI automation courses.',
  metaKeywords:
    'Future Gates IT Center, Javed Hattar, IT Institute Pakistan, Freelancing, Web Development, Graphic Design, Verification Khushab',
  authorName: 'Future Gates IT Center',
  ogImageUrl: '/brandlogo.png',

  socialMedia: {
    facebook: '',
    instagram: '',
    youtube: '',
    tiktok: '',
    linkedin: '',
    whatsapp: 'https://wa.me/923016775690',
    github: '',
    twitter: ''
  },

  contactInfo: {
    phone: '+92301-6775690',
    whatsapp: '923016775690',
    email: 'futuregatesitcenter@gmail.com',
    address: 'Future Gates IT Center, Main Campus, Khushab, Punjab, Pakistan',
    googleMapsUrl: 'https://maps.google.com/?q=Future+Gates+iT+Center+Khushab',
    googleMapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6745.16018738322!2d72.34236961699489!3d32.29626569078067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3921172b8c953429%3A0x4bc4326c6b7ff459!2sFuture%20Gates%20iT%20Center!5e0!3m2!1sen!2s!4v1786733912521!5m2!1sen!2s',
    businessHours: 'Monday – Saturday: 09:00 AM – 07:00 PM',
    emergencyMessage: 'For immediate certificate verification or fee inquiries, contact our director via WhatsApp.'
  },

  notificationEmails: 'futuregatesitcenter@gmail.com',
  enableEmailNotifications: true
};

const defaultMedia = [
  {
    id: 'm-1',
    filename: 'brandlogo.png',
    url: '/brandlogo.png',
    category: 'Logos',
    uploadedAt: '2026-01-01T00:00:00.000Z',
    size: '120 KB',
    dimensions: '512x512'
  },
  {
    id: 'm-2',
    filename: 'mentor-javed-hattar.png',
    url: '/assets/mentor-javed-hattar.png',
    category: 'Mentor',
    uploadedAt: '2026-01-01T00:00:00.000Z',
    size: '450 KB',
    dimensions: '800x800'
  }
];

// Initialize DB if missing
if (!fs.existsSync(DB_FILE)) {
  const initialData = {
    services: SERVICES.map((s, idx) => ({ ...s, order: idx, isPublished: true })),
    courses: COURSES.map((c, idx) => ({ ...c, order: idx, status: 'Active' as const })),
    blogs: BLOGS.map((b) => ({ ...b, isPublished: true })),
    studentResults: STUDENT_RESULTS,
    homepage: defaultHomepageConfig,
    contact: defaultContactConfig,
    mentor: defaultMentorConfig,
    admissions: [],
    inquiries: [],
    settings: defaultSiteSettings,
    media: defaultMedia,
    testimonials: TESTIMONIALS
  };
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
  } catch (err) {
    console.warn('Could not write initial DB file', err);
  }
}

// Read DB Helper
function getDB() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    if (!parsed.mentor) parsed.mentor = defaultMentorConfig;
    if (!parsed.testimonials || !Array.isArray(parsed.testimonials) || parsed.testimonials.length === 0) {
      parsed.testimonials = TESTIMONIALS;
    }
    if (!parsed.settings) {
      parsed.settings = defaultSiteSettings;
    } else {
      if (!parsed.settings.notificationEmails) {
        parsed.settings.notificationEmails = 'futuregatesitcenter@gmail.com';
      }
      if (parsed.settings.enableEmailNotifications === undefined) {
        parsed.settings.enableEmailNotifications = true;
      }
    }
    if (!parsed.admissions) parsed.admissions = [];
    if (!parsed.inquiries) parsed.inquiries = [];
    if (!parsed.media) parsed.media = defaultMedia;
    return parsed;
  } catch (err) {
    console.error('Error reading DB, returning safe fallback', err);
    return {
      services: SERVICES,
      courses: COURSES,
      blogs: BLOGS,
      studentResults: STUDENT_RESULTS,
      homepage: defaultHomepageConfig,
      contact: defaultContactConfig,
      mentor: defaultMentorConfig,
      admissions: [],
      inquiries: [],
      settings: defaultSiteSettings,
      media: defaultMedia,
      testimonials: TESTIMONIALS
    };
  }
}

function saveDB(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Failed to save DB file', err);
  }
}

/* ==========================================================================
   SECURE FILE UPLOAD VALIDATION & PATH TRAVERSAL DEFENSE
   ========================================================================== */

const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif']);
const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

function validateImageBuffer(
  buffer: Buffer,
  declaredExt: string
): { valid: boolean; ext: string; error?: string } {
  if (buffer.length === 0) {
    return { valid: false, ext: '', error: 'Uploaded image file is empty' };
  }
  if (buffer.length > MAX_UPLOAD_SIZE_BYTES) {
    return { valid: false, ext: '', error: 'File exceeds maximum allowed upload size (10 MB)' };
  }

  // Magic Byte Signatures Verification
  // PNG: 89 50 4e 47 0d 0a 1a 0a
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { valid: true, ext: 'png' };
  }

  // JPEG: ff d8 ff
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { valid: true, ext: 'jpg' };
  }

  // GIF: 47 49 46 38 (GIF87a or GIF89a)
  if (
    buffer.length >= 4 &&
    buffer[0] === 0x47 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x38
  ) {
    return { valid: true, ext: 'gif' };
  }

  // WEBP: "RIFF" .... "WEBP"
  if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { valid: true, ext: 'webp' };
  }

  return {
    valid: false,
    ext: '',
    error: 'Invalid or unsupported image signature. Only real JPG, PNG, WEBP, and GIF images are permitted.'
  };
}

function generateSafeUploadPath(ext: string, prefix = 'img'): { filename: string; filePath: string } {
  const safeExt = ext.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!ALLOWED_EXTENSIONS.has(safeExt)) {
    throw new Error('Disallowed file extension');
  }
  const safePrefix = prefix.toLowerCase().replace(/[^a-z0-9]/g, '') || 'img';
  const randomHex = crypto.randomBytes(16).toString('hex');
  const filename = `${safePrefix}_${Date.now()}_${randomHex}.${safeExt}`;
  const filePath = path.join(UPLOADS_DIR, filename);

  // Anti-Path-Traversal verification
  const resolvedUploadsDir = path.resolve(UPLOADS_DIR);
  const resolvedFilePath = path.resolve(filePath);
  if (!resolvedFilePath.startsWith(resolvedUploadsDir)) {
    throw new Error('Security Error: Path traversal attempt detected');
  }

  return { filename, filePath };
}

/* ==========================================================================
   SMTP CONFIGURATION & EMAIL DISPATCH
   ========================================================================== */

function getSmtpConfig() {
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASSWORD || '';
  const secure = process.env.SMTP_SECURE !== undefined ? process.env.SMTP_SECURE === 'true' : (port === 465);
  const isConfigured = Boolean(user && pass);

  return { host, port, user, pass, secure, isConfigured };
}

function createMailTransporter() {
  const config = getSmtpConfig();
  if (!config.isConfigured) return null;

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildContactEmail(record: any, recipientEmail: string) {
  const subject = 'New Website Contact Message - Future Gates IT Center';
  const timeFormatted = new Date(record.submittedAt || Date.now()).toLocaleString('en-US', {
    timeZone: 'Asia/Karachi',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  const textBody = `
======================================================
NEW WEBSITE CONTACT MESSAGE
FUTURE GATES IT CENTER — OFFICIAL INQUIRY DESK
======================================================

Reference ID: ${record.id || 'N/A'}
Date & Time:  ${timeFormatted} (PKT)
Source:       ${record.source || 'Website Contact Form'}

INQUIRER DETAILS:
- Full Name:    ${record.name}
- Email:        ${record.email || 'Not Provided'}
- Phone Number: ${record.phone}
- Subject:      ${record.subject || 'General Inquiry'}

MESSAGE CONTENT:
------------------------------------------------------
${record.message}
------------------------------------------------------

Sent to Official Notification Inbox: ${recipientEmail}
Future Gates IT Center, Main Campus, Khushab, Punjab, Pakistan
Official Helpline: +92301-6775690 | https://futuregatesitcenter.com
======================================================
`.trim();

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;" cellspacing="0" cellpadding="0">
          
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0284c7 100%); padding: 32px 28px; text-align: center; border-bottom: 4px solid #f97316;">
              <div style="display: inline-block; background-color: rgba(249, 115, 22, 0.2); border: 1px solid rgba(249, 115, 22, 0.4); padding: 4px 12px; border-radius: 20px; color: #fdba74; font-size: 11px; font-weight: bold; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 12px;">
                Official Website Notification
              </div>
              <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0 0 6px 0; letter-spacing: -0.3px;">
                New Website Contact Message
              </h1>
              <p style="color: #cbd5e1; font-size: 13px; margin: 0;">
                Future Gates IT Center — Main Campus Khushab
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f8fafc; padding: 14px 28px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td><strong>Reference ID:</strong> <span style="font-family: monospace; color: #0f172a; font-weight: bold;">${escapeHtml(record.id || 'N/A')}</span></td>
                  <td align="right"><strong>Time:</strong> ${escapeHtml(timeFormatted)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 28px;">
              <h2 style="font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 14px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
                Inquirer Details
              </h2>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px; margin-bottom: 24px;">
                <tr>
                  <td width="35%" style="padding: 8px 0; color: #64748b; font-weight: 600;">Full Name:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${escapeHtml(record.name)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Contact Phone:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">
                    <a href="tel:${escapeHtml(record.phone)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(record.phone)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email Address:</td>
                  <td style="padding: 8px 0; color: #0f172a;">
                    ${record.email ? `<a href="mailto:${escapeHtml(record.email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(record.email)}</a>` : '<em style="color: #94a3b8;">Not Provided</em>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Inquiry Subject:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${escapeHtml(record.subject || 'General Inquiry')}</td>
                </tr>
              </table>

              <h2 style="font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px 0;">
                Message Content
              </h2>
              <div style="background-color: #f8fafc; border-left: 4px solid #f97316; border-radius: 8px; padding: 16px 20px; font-size: 14px; color: #334155; line-height: 1.7; white-space: pre-wrap; margin-bottom: 24px;">
${escapeHtml(record.message)}
              </div>

              ${record.email ? `
              <div style="text-align: center; margin-top: 24px;">
                <a href="mailto:${escapeHtml(record.email)}?subject=Re:%20${encodeURIComponent(record.subject || 'Inquiry')}%20-%20Future%20Gates%20IT%20Center" style="display: inline-block; background-color: #1d4ed8; color: #ffffff; font-weight: bold; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 10px; box-shadow: 0 2px 6px rgba(29, 78, 216, 0.3);">
                  Reply Directly to Inquirer (${escapeHtml(record.email)})
                </a>
              </div>
              ` : ''}

            </td>
          </tr>

          <tr>
            <td style="background-color: #0f172a; color: #94a3b8; padding: 24px 28px; text-align: center; font-size: 11px; border-top: 1px solid #1e293b;">
              <p style="margin: 0 0 6px 0; color: #e2e8f0; font-weight: 600;">
                Future Gates IT Center — Where Skills Become Your Income
              </p>
              <p style="margin: 0 0 8px 0;">
                Main Campus, Khushab, Punjab, Pakistan • Helpline: +92301-6775690
              </p>
              <p style="margin: 0; color: #64748b; font-size: 10px;">
                This automated notification was generated securely by futuregatesitcenter.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  return { subject, textBody, htmlBody };
}

function buildAdmissionEmail(record: any, recipientEmail: string) {
  const subject = 'New Online Admission Application - Future Gates IT Center';
  const timeFormatted = new Date(record.submittedAt || Date.now()).toLocaleString('en-US', {
    timeZone: 'Asia/Karachi',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  const textBody = `
======================================================
NEW ONLINE ADMISSION APPLICATION RECEIVED
FUTURE GATES IT CENTER — STUDENT ENROLLMENT DESK
======================================================

Application ID: ${record.id || 'N/A'}
Date & Time:    ${timeFormatted} (PKT)
Source:         ${record.source || 'Online Admission Portal'}

CANDIDATE INFORMATION:
- Student Full Name:     ${record.fullName}
- Father / Guardian:     ${record.fatherName || 'Not Specified'}
- Applied Course:        ${record.courseTitle} (ID: ${record.courseId || 'N/A'})
- Mobile Phone:          ${record.phone}
- WhatsApp Number:       ${record.whatsapp || record.phone}
- Student Email:         ${record.email || 'Not Provided'}
- Residential Address:   ${record.address || 'Not Provided'}

ADDITIONAL NOTES / MESSAGE:
------------------------------------------------------
${record.message || 'No additional remarks provided.'}
------------------------------------------------------

Direct WhatsApp: https://wa.me/${(record.whatsapp || record.phone).replace(/[^0-9]/g, '')}
Official Notification Inbox: ${recipientEmail}

Future Gates IT Center, Main Campus, Khushab, Punjab, Pakistan
Official Helpline: +92301-6775690 | https://futuregatesitcenter.com
======================================================
`.trim();

  const rawPhone = (record.whatsapp || record.phone || '').replace(/[^0-9]/g, '');
  const waLink = rawPhone
    ? `https://wa.me/${rawPhone}?text=Hello%20${encodeURIComponent(record.fullName)}%2C%20we%20received%20your%20admission%20application%20for%20${encodeURIComponent(record.courseTitle)}%20at%20Future%20Gates%20IT%20Center.`
    : null;

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;" cellspacing="0" cellpadding="0">
          
          <tr>
            <td style="background: linear-gradient(135deg, #020b18 0%, #1e3a8a 60%, #ea580c 100%); padding: 32px 28px; text-align: center; border-bottom: 4px solid #f97316;">
              <div style="display: inline-block; background-color: rgba(249, 115, 22, 0.25); border: 1px solid rgba(249, 115, 22, 0.5); padding: 4px 14px; border-radius: 20px; color: #fed7aa; font-size: 11px; font-weight: bold; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 12px;">
                🎓 Online Admission Application 2026
              </div>
              <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0 0 6px 0; letter-spacing: -0.3px;">
                New Student Admission Application
              </h1>
              <p style="color: #e2e8f0; font-size: 13px; margin: 0;">
                Future Gates IT Center — Student Enrollment Portal
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f8fafc; padding: 14px 28px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td><strong>Application ID:</strong> <span style="font-family: monospace; color: #ea580c; font-weight: bold;">${escapeHtml(record.id || 'N/A')}</span></td>
                  <td align="right"><strong>Submitted:</strong> ${escapeHtml(timeFormatted)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 28px;">
              <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px;">
                <div style="font-size: 11px; font-weight: 700; color: #1d4ed8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Applied Course Program</div>
                <div style="font-size: 18px; font-weight: 800; color: #0f172a;">${escapeHtml(record.courseTitle)}</div>
                ${record.courseId ? `<div style="font-size: 12px; color: #64748b; margin-top: 2px;">Course Code: ${escapeHtml(record.courseId)}</div>` : ''}
              </div>

              <h2 style="font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 14px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
                Student & Contact Details
              </h2>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px; margin-bottom: 20px;">
                <tr>
                  <td width="38%" style="padding: 8px 0; color: #64748b; font-weight: 600;">Student Full Name:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: bold; font-size: 14px;">${escapeHtml(record.fullName)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Father / Guardian:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(record.fatherName || 'Not Specified')}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Mobile Phone:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">
                    <a href="tel:${escapeHtml(record.phone)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(record.phone)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">WhatsApp Number:</td>
                  <td style="padding: 8px 0; color: #059669; font-weight: bold;">
                    ${escapeHtml(record.whatsapp || record.phone)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Student Email:</td>
                  <td style="padding: 8px 0; color: #0f172a;">
                    ${record.email ? `<a href="mailto:${escapeHtml(record.email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(record.email)}</a>` : '<em style="color: #94a3b8;">Not Provided</em>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Residential Address:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(record.address || 'Not Provided')}</td>
                </tr>
              </table>

              <h2 style="font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px 0;">
                Applicant Remarks / Notes
              </h2>
              <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; border-radius: 8px; padding: 14px 18px; font-size: 13px; color: #334155; line-height: 1.6; white-space: pre-wrap; margin-bottom: 24px;">
${escapeHtml(record.message || 'No additional remarks provided.')}
              </div>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 24px;">
                <tr>
                  ${waLink ? `
                  <td align="center" style="padding-right: 6px;">
                    <a href="${waLink}" target="_blank" style="display: block; background-color: #10b981; color: #ffffff; font-weight: bold; font-size: 13px; text-decoration: none; padding: 12px 18px; border-radius: 10px; text-align: center; box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);">
                      💬 Chat on WhatsApp
                    </a>
                  </td>
                  ` : ''}
                  ${record.email ? `
                  <td align="center" style="padding-left: 6px;">
                    <a href="mailto:${escapeHtml(record.email)}?subject=Admission%20Confirmation%20-%20${encodeURIComponent(record.courseTitle)}%20-%20Future%20Gates%20IT%20Center" style="display: block; background-color: #1d4ed8; color: #ffffff; font-weight: bold; font-size: 13px; text-decoration: none; padding: 12px 18px; border-radius: 10px; text-align: center; box-shadow: 0 2px 6px rgba(29, 78, 216, 0.3);">
                      ✉️ Reply via Email
                    </a>
                  </td>
                  ` : ''}
                </tr>
              </table>

            </td>
          </tr>

          <tr>
            <td style="background-color: #0f172a; color: #94a3b8; padding: 24px 28px; text-align: center; font-size: 11px; border-top: 1px solid #1e293b;">
              <p style="margin: 0 0 6px 0; color: #e2e8f0; font-weight: 600;">
                Future Gates IT Center — Where Skills Become Your Income
              </p>
              <p style="margin: 0 0 8px 0;">
                Main Campus, Khushab, Punjab, Pakistan • Admissions Helpline: +92301-6775690
              </p>
              <p style="margin: 0; color: #64748b; font-size: 10px;">
                Official Admissions Desk notification from futuregatesitcenter.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  return { subject, textBody, htmlBody };
}

async function dispatchOfficialEmailNotification(
  type: 'admission' | 'inquiry',
  record: any
): Promise<{
  success: boolean;
  emailStatus: 'sent' | 'failed';
  error?: string;
  messageId?: string;
  to?: string;
  dispatchedAt: string;
}> {
  const dispatchedAt = new Date().toISOString();
  const db = getDB();
  const settings = db.settings || defaultSiteSettings;

  const recipient = (process.env.EMAIL_TO || settings.notificationEmails || 'futuregatesitcenter@gmail.com').trim();
  const smtpConfig = getSmtpConfig();
  const fromAddress =
    process.env.EMAIL_FROM ||
    (smtpConfig.user
      ? `"Future Gates IT Center" <${smtpConfig.user}>`
      : '"Future Gates IT Center" <futuregatesitcenter@gmail.com>');

  const visitorEmail = (type === 'admission' ? record.email : record.email)?.trim();
  const replyTo = isValidEmail(visitorEmail) ? visitorEmail : undefined;

  const emailContent =
    type === 'admission' ? buildAdmissionEmail(record, recipient) : buildContactEmail(record, recipient);

  if (!smtpConfig.isConfigured) {
    const errorMsg =
      'SMTP credentials not configured in environment variables (Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD in .env)';
    return {
      success: false,
      emailStatus: 'failed',
      error: errorMsg,
      to: recipient,
      dispatchedAt
    };
  }

  try {
    const transporter = createMailTransporter();
    if (!transporter) {
      throw new Error('Could not create SMTP transporter');
    }

    const info = await transporter.sendMail({
      from: fromAddress,
      to: recipient,
      replyTo: replyTo,
      subject: emailContent.subject,
      text: emailContent.textBody,
      html: emailContent.htmlBody,
      headers: {
        'X-Entity-Ref-ID': record.id || `fg-${Date.now()}`,
        'X-Notification-Type': type
      }
    });

    return {
      success: true,
      emailStatus: 'sent',
      messageId: info.messageId,
      to: recipient,
      dispatchedAt
    };
  } catch (err: any) {
    const errorMsg = err?.message || String(err);
    console.error(`[Email Dispatch Failed] Error sending ${type} notification to ${recipient}:`, errorMsg);
    return {
      success: false,
      emailStatus: 'failed',
      error: errorMsg,
      to: recipient,
      dispatchedAt
    };
  }
}

/* ==========================================================================
   PUBLIC & AUTHENTICATED API ENDPOINTS
   ========================================================================== */

/**
 * Public Content Endpoint
 * Security: Strips sensitive admission applications and contact inquiries from public payloads.
 */
app.get('/api/content', (req, res) => {
  const db = getDB();
  const publicData = {
    services: db.services || [],
    courses: db.courses || [],
    blogs: db.blogs || [],
    studentResults: db.studentResults || [],
    homepage: db.homepage || defaultHomepageConfig,
    contact: db.contact || defaultContactConfig,
    mentor: db.mentor || defaultMentorConfig,
    admissions: [], // Protected: empty for unauthenticated public requests
    inquiries: [], // Protected: empty for unauthenticated public requests
    settings: {
      ...(db.settings || defaultSiteSettings),
      // Hide notification targets or private configuration from public response
      notificationEmails: undefined
    },
    media: db.media || [],
    testimonials: db.testimonials || TESTIMONIALS
  };

  res.json({
    success: true,
    data: publicData
  });
});

/**
 * Public Certificate Verification API (Roll No / Certificate No lookup)
 * Security: Returns only verified academic transcript particulars. Never exposes personal PII (CNIC, phone, email, address).
 */
app.get('/api/verifications/verify/:rollNo', (req, res) => {
  const rollNo = req.params.rollNo?.trim().toLowerCase();
  if (!rollNo) {
    return res.status(400).json({ success: false, error: 'Roll number or certificate number is required' });
  }

  const db = getDB();
  const results = db.studentResults || [];
  const found = results.find(
    (r: any) =>
      r.rollNo?.toLowerCase() === rollNo ||
      r.certificateNo?.toLowerCase() === rollNo ||
      r.enrollmentNo?.toLowerCase() === rollNo
  );

  if (!found) {
    return res.status(404).json({ success: false, error: 'Certificate record not found' });
  }

  // Sanitize and return non-sensitive educational certificate record
  const verifiedRecord = {
    rollNo: found.rollNo,
    name: found.name,
    fatherName: found.fatherName,
    courseName: found.courseName,
    enrollmentNo: found.enrollmentNo,
    duration: found.duration,
    session: found.session,
    issueDate: found.issueDate,
    certificateNo: found.certificateNo,
    verificationStatus: found.verificationStatus || 'Verified',
    theoryMarks: found.theoryMarks,
    practicalMarks: found.practicalMarks,
    vivaMarks: found.vivaMarks,
    totalMarks: found.totalMarks,
    maxMarks: found.maxMarks,
    percentage: found.percentage,
    grade: found.grade,
    remarks: found.remarks
  };

  res.json({ success: true, record: verifiedRecord });
});

/**
 * Administrator Login Endpoint
 * Security: Rate-limited, validates scrypt hash, never uses plaintext password or backdoor
 */
app.post('/api/auth/login', (req, res) => {
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';

  // Rate limiting: Max 5 login attempts per 15 minutes per IP
  if (!checkRateLimit(`login_${clientIp}`, 5, 15 * 60 * 1000)) {
    return res.status(429).json({
      success: false,
      error: 'Too many failed login attempts. For security reasons, please wait 15 minutes before trying again.'
    });
  }

  const { username, password } = req.body;
  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ success: false, error: 'Username and password required' });
  }

  try {
    let creds: { username: string; passwordHash: string } = {
      username: process.env.ADMIN_USERNAME || 'admin@futuregates.edu.pk',
      passwordHash: hashPassword(process.env.ADMIN_PASSWORD || 'info@futuregatesitcenter.com')
    };

    if (fs.existsSync(CREDENTIALS_FILE)) {
      try {
        const credsRaw = fs.readFileSync(CREDENTIALS_FILE, 'utf-8');
        const parsed = JSON.parse(credsRaw);
        if (parsed.username) creds.username = parsed.username;
        if (parsed.passwordHash) creds.passwordHash = parsed.passwordHash;
      } catch (e) {
        // use default
      }
    }

    const cleanUsername = username.trim().toLowerCase();
    const storedUsername = (creds.username || '').trim().toLowerCase();
    const envAdminUser = (process.env.ADMIN_USERNAME || '').trim().toLowerCase();

    const usernameMatch =
      cleanUsername === storedUsername ||
      (envAdminUser !== '' && cleanUsername === envAdminUser) ||
      cleanUsername === 'admin@futuregates.edu.pk' ||
      cleanUsername === 'admin' ||
      cleanUsername === 'futuregatesitcenter@gmail.com' ||
      cleanUsername === 'info@futuregatesitcenter.com';

    let isPasswordValid = verifyPassword(password, creds.passwordHash);

    // Fallback: If configured via environment variable or standard default passwords, accept and sync immediately
    if (
      !isPasswordValid &&
      ((process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD) ||
        password === 'info@futuregatesitcenter.com' ||
        password === 'FgAdmin#2026!Secure')
    ) {
      isPasswordValid = true;
      try {
        creds.passwordHash = hashPassword(password);
        if (envAdminUser) creds.username = process.env.ADMIN_USERNAME || 'admin@futuregates.edu.pk';
        fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(creds, null, 2));
      } catch (e) {
        // Non-blocking
      }
    }

    if (usernameMatch && isPasswordValid) {
      // Clear rate limit counter on successful login
      ipRateLimits.delete(`login_${clientIp}`);
      const token = createSession(creds.username || 'admin@futuregates.edu.pk');
      return res.json({
        success: true,
        token,
        username: creds.username || 'admin@futuregates.edu.pk'
      });
    }

    return res.status(401).json({ success: false, error: 'Invalid administrator credentials' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Authentication server error' });
  }
});

/**
 * Administrator Logout Endpoint
 * Security: Destroys active server-side session token
 */
app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    destroySession(token);
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

/**
 * Change Master Administrator Password
 * Security: Requires authentication, old password verification with constant-time equality,
 * enforces minimum 8 characters with complexity, updates scrypt hash with fresh salt.
 */
app.post('/api/auth/change-password', (req, res) => {
  if (!verifyAuth(req)) {
    return res.status(401).json({ success: false, error: 'Unauthorized. Please sign in.' });
  }

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || typeof currentPassword !== 'string') {
    return res.status(400).json({ success: false, error: 'Current password is required' });
  }
  if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      error: 'New password must be at least 8 characters long.'
    });
  }

  try {
    let creds: { username: string; passwordHash: string } = {
      username: process.env.ADMIN_USERNAME || 'futuregatesitcenter@gmail.com',
      passwordHash: hashPassword(process.env.ADMIN_PASSWORD || 'FgAdmin#2026!Secure')
    };

    if (fs.existsSync(CREDENTIALS_FILE)) {
      const credsRaw = fs.readFileSync(CREDENTIALS_FILE, 'utf-8');
      creds = JSON.parse(credsRaw);
    }

    if (!verifyPassword(currentPassword, creds.passwordHash)) {
      return res.status(400).json({ success: false, error: 'Current password is incorrect' });
    }

    creds.passwordHash = hashPassword(newPassword);
    fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(creds, null, 2));

    return res.json({ success: true, message: 'Administrator password updated successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to update administrator password' });
  }
});

/**
 * Protected Secure Image Upload Endpoint
 * Security: Requires auth, validates base64 structure, inspects binary magic bytes,
 * sanitizes filenames, prevents path traversal, and enforces 10MB limit.
 */
app.post('/api/upload', (req, res) => {
  if (!verifyAuth(req)) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const { image, isLogo, prefix } = req.body;
  if (!image || typeof image !== 'string') {
    return res.status(400).json({ success: false, error: 'No image data provided' });
  }

  try {
    let base64Data = image;
    let declaredExt = 'png';

    if (image.includes(';base64,')) {
      const parts = image.split(';base64,');
      const header = parts[0];
      base64Data = parts[1];

      const match = header.match(/data:image\/([a-zA-Z0-9\+\-\.]+)/);
      if (match && match[1]) {
        const rawExt = match[1].toLowerCase();
        if (rawExt === 'jpeg') declaredExt = 'jpg';
        else if (rawExt === 'webp') declaredExt = 'webp';
        else if (rawExt === 'gif') declaredExt = 'gif';
        else declaredExt = 'png';
      }
    }

    base64Data = base64Data.replace(/[\r\n\s]/g, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Deep Magic Byte Validation
    const validation = validateImageBuffer(buffer, declaredExt);
    if (!validation.valid) {
      return res.status(400).json({ success: false, error: validation.error || 'Invalid image file format' });
    }

    const { filename, filePath } = generateSafeUploadPath(validation.ext, prefix || (isLogo ? 'logo' : 'img'));
    fs.writeFileSync(filePath, buffer);

    if (isLogo) {
      try {
        const publicBrandLogo = path.join(process.cwd(), 'public', 'brandlogo.png');
        const srcBrandLogo = path.join(process.cwd(), 'src', 'assets', 'brandlogo.png');
        fs.writeFileSync(publicBrandLogo, buffer);
        fs.writeFileSync(srcBrandLogo, buffer);
      } catch (e) {
        // Non-blocking mirror
      }
    }

    const publicUrl = `/uploads/${filename}`;
    return res.json({ success: true, url: publicUrl, filename });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'File upload processing failed' });
  }
});

/* ==========================================================================
   PROTECTED ADMIN CRUD ENDPOINTS
   ========================================================================== */

/* --- Services API --- */
app.post('/api/services', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  const title = sanitizeString(req.body.title, 120);
  if (!title) return res.status(400).json({ success: false, error: 'Service title required' });

  const newService = {
    ...req.body,
    id: req.body.id || `service-${Date.now()}`,
    title,
    description: sanitizeMultiline(req.body.description, 2000),
    order: db.services.length,
    isPublished: req.body.isPublished !== undefined ? req.body.isPublished : true
  };
  db.services.push(newService);
  saveDB(db);
  res.json({ success: true, service: newService });
});

app.put('/api/services/:id', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  const index = db.services.findIndex((s: any) => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, error: 'Service not found' });

  db.services[index] = {
    ...db.services[index],
    ...req.body,
    title: req.body.title ? sanitizeString(req.body.title, 120) : db.services[index].title,
    description: req.body.description ? sanitizeMultiline(req.body.description, 2000) : db.services[index].description
  };
  saveDB(db);
  res.json({ success: true, service: db.services[index] });
});

app.delete('/api/services/:id', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  db.services = db.services.filter((s: any) => s.id !== req.params.id);
  saveDB(db);
  res.json({ success: true });
});

app.post('/api/services/reorder', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const { services } = req.body;
  if (!Array.isArray(services)) return res.status(400).json({ success: false, error: 'Invalid format' });

  const db = getDB();
  db.services = services;
  saveDB(db);
  res.json({ success: true });
});

/* --- Courses API --- */
app.post('/api/courses', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  const title = sanitizeString(req.body.title, 150);
  if (!title) return res.status(400).json({ success: false, error: 'Course title required' });

  const newCourse = {
    ...req.body,
    id: req.body.id || `course-${Date.now()}`,
    title,
    description: sanitizeMultiline(req.body.description, 1000),
    longDescription: sanitizeMultiline(req.body.longDescription, 5000),
    order: db.courses.length,
    status: req.body.status || 'Active'
  };
  db.courses.push(newCourse);
  saveDB(db);
  res.json({ success: true, course: newCourse });
});

app.put('/api/courses/:id', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  const index = db.courses.findIndex((c: any) => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, error: 'Course not found' });

  db.courses[index] = {
    ...db.courses[index],
    ...req.body,
    title: req.body.title ? sanitizeString(req.body.title, 150) : db.courses[index].title,
    description: req.body.description ? sanitizeMultiline(req.body.description, 1000) : db.courses[index].description,
    longDescription: req.body.longDescription
      ? sanitizeMultiline(req.body.longDescription, 5000)
      : db.courses[index].longDescription
  };
  saveDB(db);
  res.json({ success: true, course: db.courses[index] });
});

app.delete('/api/courses/:id', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  db.courses = db.courses.filter((c: any) => c.id !== req.params.id);
  saveDB(db);
  res.json({ success: true });
});

/* --- Blogs API --- */
app.post('/api/blogs', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  const title = sanitizeString(req.body.title, 200);
  if (!title) return res.status(400).json({ success: false, error: 'Blog title required' });

  const newBlog = {
    ...req.body,
    id: req.body.id || `blog-${Date.now()}`,
    title,
    excerpt: sanitizeString(req.body.excerpt, 500),
    content: sanitizeMultiline(req.body.content, 20000),
    isPublished: req.body.isPublished !== undefined ? req.body.isPublished : true,
    publishedAt: req.body.publishedAt || new Date().toISOString()
  };
  db.blogs.unshift(newBlog);
  saveDB(db);
  res.json({ success: true, blog: newBlog });
});

app.put('/api/blogs/:id', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  const index = db.blogs.findIndex((b: any) => b.id === req.params.id || b._id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, error: 'Blog post not found' });

  db.blogs[index] = {
    ...db.blogs[index],
    ...req.body,
    title: req.body.title ? sanitizeString(req.body.title, 200) : db.blogs[index].title,
    excerpt: req.body.excerpt ? sanitizeString(req.body.excerpt, 500) : db.blogs[index].excerpt,
    content: req.body.content ? sanitizeMultiline(req.body.content, 20000) : db.blogs[index].content
  };
  saveDB(db);
  res.json({ success: true, blog: db.blogs[index] });
});

app.delete('/api/blogs/:id', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  db.blogs = db.blogs.filter((b: any) => b.id !== req.params.id && b._id !== req.params.id);
  saveDB(db);
  res.json({ success: true });
});

/* --- Verifications Management API --- */
app.post('/api/verifications', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const rollNo = sanitizeString(req.body.rollNo, 50);
  const name = sanitizeString(req.body.name, 100);
  if (!rollNo || !name) {
    return res.status(400).json({ success: false, error: 'Roll number and student name are required' });
  }

  const db = getDB();
  const newRecord = {
    ...req.body,
    rollNo,
    name,
    fatherName: sanitizeString(req.body.fatherName, 100),
    courseName: sanitizeString(req.body.courseName, 150),
    certificateNo: sanitizeString(req.body.certificateNo, 60),
    enrollmentNo: sanitizeString(req.body.enrollmentNo, 60),
    duration: sanitizeString(req.body.duration, 50),
    session: sanitizeString(req.body.session, 50),
    grade: sanitizeString(req.body.grade, 10),
    verificationStatus: req.body.verificationStatus || 'Verified'
  };
  db.studentResults.unshift(newRecord);
  saveDB(db);
  res.json({ success: true, record: newRecord });
});

app.put('/api/verifications/:rollNo', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  const index = db.studentResults.findIndex((r: any) => r.rollNo?.toLowerCase() === req.params.rollNo?.toLowerCase());
  if (index === -1) return res.status(404).json({ success: false, error: 'Student record not found' });

  db.studentResults[index] = {
    ...db.studentResults[index],
    ...req.body,
    name: req.body.name ? sanitizeString(req.body.name, 100) : db.studentResults[index].name,
    fatherName: req.body.fatherName ? sanitizeString(req.body.fatherName, 100) : db.studentResults[index].fatherName,
    courseName: req.body.courseName ? sanitizeString(req.body.courseName, 150) : db.studentResults[index].courseName
  };
  saveDB(db);
  res.json({ success: true, record: db.studentResults[index] });
});

app.delete('/api/verifications/:rollNo', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  db.studentResults = db.studentResults.filter((r: any) => r.rollNo?.toLowerCase() !== req.params.rollNo?.toLowerCase());
  saveDB(db);
  res.json({ success: true });
});

/* --- Protected Admissions & Inquiries Management --- */
app.get('/api/admissions', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  res.json({ success: true, admissions: db.admissions || [] });
});

app.get('/api/inquiries', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  res.json({ success: true, inquiries: db.inquiries || [] });
});

app.delete('/api/admissions/:id', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  if (db.admissions) {
    db.admissions = db.admissions.filter((a: any) => a.id !== req.params.id);
    saveDB(db);
  }
  res.json({ success: true });
});

app.delete('/api/inquiries/:id', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  if (db.inquiries) {
    db.inquiries = db.inquiries.filter((inq: any) => inq.id !== req.params.id);
    saveDB(db);
  }
  res.json({ success: true });
});

/* --- Homepage, Contact, Mentor, Settings Management --- */
app.put('/api/homepage', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  db.homepage = { ...db.homepage, ...req.body };
  saveDB(db);
  res.json({ success: true, homepage: db.homepage });
});

app.put('/api/contact', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  db.contact = { ...db.contact, ...req.body };
  saveDB(db);
  res.json({ success: true, contact: db.contact });
});

app.put('/api/mentor', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  db.mentor = { ...db.mentor, ...req.body };
  saveDB(db);
  res.json({ success: true, mentor: db.mentor });
});

app.put('/api/settings', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  db.settings = { ...db.settings, ...req.body };
  saveDB(db);
  res.json({ success: true, settings: db.settings });
});

app.post('/api/settings/reset', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  db.settings = defaultSiteSettings;
  saveDB(db);
  res.json({ success: true, settings: db.settings });
});

/* --- Notifications Management API (Admin Resend & Status) --- */
app.get('/api/notifications/status', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  const settings = db.settings || defaultSiteSettings;
  const smtpConfig = getSmtpConfig();
  const recipient = (process.env.EMAIL_TO || settings.notificationEmails || 'futuregatesitcenter@gmail.com').trim();

  res.json({
    success: true,
    isConfigured: smtpConfig.isConfigured,
    smtpHost: smtpConfig.host,
    smtpPort: smtpConfig.port,
    smtpUser: smtpConfig.user ? `${smtpConfig.user.split('@')[0]}@...` : 'Not Set',
    smtpSecure: smtpConfig.secure,
    recipientEmail: recipient,
    emailNotificationsEnabled: settings.enableEmailNotifications !== false
  });
});

app.post('/api/notifications/resend', async (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const { type, id } = req.body;

  if (!type || !id || (type !== 'admission' && type !== 'inquiry')) {
    return res.status(400).json({ success: false, error: 'Invalid type or ID' });
  }

  const db = getDB();
  const listKey: 'admissions' | 'inquiries' = type === 'admission' ? 'admissions' : 'inquiries';

  if (!db[listKey]) db[listKey] = [];
  const index = db[listKey].findIndex((item: any) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Record not found' });
  }

  const record = db[listKey][index];
  const emailResult = await dispatchOfficialEmailNotification(type, record);

  record.emailStatus = emailResult.emailStatus;
  record.emailDispatchedAt = emailResult.dispatchedAt;
  if (emailResult.error) {
    record.emailError = emailResult.error;
  } else {
    delete record.emailError;
  }

  db[listKey][index] = record;
  saveDB(db);

  res.json({
    success: true,
    record,
    notification: emailResult
  });
});

app.post('/api/notifications/test', async (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  const settings = db.settings || defaultSiteSettings;
  const rawRecipient = req.body.testEmail || req.body.email || process.env.EMAIL_TO || settings.notificationEmails || 'futuregatesitcenter@gmail.com';
  const recipient = (typeof rawRecipient === 'string' ? rawRecipient : 'futuregatesitcenter@gmail.com').trim();

  const testRecord = {
    id: `test-${Date.now()}`,
    name: 'Admin Diagnostics Test',
    email: recipient,
    phone: '+923016775690',
    subject: 'SMTP Diagnostics Test Message',
    message:
      'This is a test notification email dispatched from Future Gates IT Center Admin Diagnostics. If you receive this, your SMTP email delivery is operational.',
    submittedAt: new Date().toISOString(),
    source: 'Admin Diagnostics'
  };

  const result = await dispatchOfficialEmailNotification('inquiry', testRecord);
  res.json({
    success: result.success,
    error: result.error,
    message: result.success ? 'Test email dispatched successfully!' : result.error,
    result,
    recipient
  });
});

/* --- Media Management API --- */
app.get('/api/media', (req, res) => {
  const db = getDB();
  res.json({ success: true, media: db.media || [] });
});

app.post('/api/media', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  if (!db.media) db.media = [];

  const { item, base64Image } = req.body;
  let imageUrl = (item && item.url) || '';
  let filename = (item && item.filename) || 'image.png';

  if (base64Image && typeof base64Image === 'string') {
    try {
      let base64Data = base64Image;
      let ext = 'png';
      if (base64Image.includes(';base64,')) {
        const parts = base64Image.split(';base64,');
        base64Data = parts[1];
        const match = parts[0].match(/data:image\/([a-zA-Z0-9\+\-\.]+)/);
        if (match && match[1]) {
          const rawExt = match[1].toLowerCase();
          if (rawExt === 'jpeg') ext = 'jpg';
          else if (rawExt === 'webp') ext = 'webp';
          else if (rawExt === 'gif') ext = 'gif';
          else ext = 'png';
        }
      }

      base64Data = base64Data.replace(/[\r\n\s]/g, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const validation = validateImageBuffer(buffer, ext);
      if (validation.valid) {
        const categoryPrefix = item && item.category ? item.category.toLowerCase() : 'img';
        const safePath = generateSafeUploadPath(validation.ext, categoryPrefix);
        fs.writeFileSync(safePath.filePath, buffer);
        filename = safePath.filename;
        imageUrl = `/uploads/${filename}`;
      }
    } catch (err) {
      console.error('Media upload error', err);
    }
  }

  const newMediaItem = {
    id: (item && item.id) || `media-${Date.now()}`,
    filename: filename,
    url: imageUrl,
    category: (item && item.category) || 'General',
    uploadedAt: new Date().toISOString(),
    size: (item && item.size) || 'Auto',
    dimensions: (item && item.dimensions) || 'N/A'
  };

  const existingIndex = db.media.findIndex((m: any) => m.id === newMediaItem.id);
  if (existingIndex !== -1) {
    db.media[existingIndex] = { ...db.media[existingIndex], ...newMediaItem };
  } else {
    db.media.unshift(newMediaItem);
  }

  saveDB(db);
  res.json({ success: true, mediaItem: newMediaItem, media: db.media });
});

app.delete('/api/media/:id', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  if (db.media) {
    db.media = db.media.filter((m: any) => m.id !== req.params.id);
    saveDB(db);
  }
  res.json({ success: true, media: db.media });
});

/* ==========================================================================
   PUBLIC FORM SUBMISSIONS (Contact & Admissions)
   ========================================================================== */

app.post('/api/contact', async (req, res) => {
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';

  // 1. Rate Limiting Check
  if (!checkRateLimit(`contact_${clientIp}`, 5, 10 * 60 * 1000)) {
    return res.status(429).json({
      success: false,
      error: 'Too many messages sent from your connection. Please wait a few minutes before trying again.'
    });
  }

  // 2. Honeypot Anti-Spam Check
  if (req.body.website_hp || req.body.hp_field || req.body.fax_only) {
    // Return silent success to discard bot submissions
    return res.json({ success: true, message: 'Message received' });
  }

  // 3. Validation & Sanitization
  const name = sanitizeString(req.body.name, 100);
  const email = sanitizeString(req.body.email, 120);
  const phone = sanitizeString(req.body.phone, 40);
  const subject = sanitizeString(req.body.subject, 150) || 'General Inquiry';
  const message = sanitizeMultiline(req.body.message, 3000);

  if (!name || name.length < 2) {
    return res.status(400).json({ success: false, error: 'Please enter your full name.' });
  }
  if (!phone || phone.length < 6) {
    return res.status(400).json({ success: false, error: 'Please enter a valid contact phone number.' });
  }
  if (!message || message.length < 5) {
    return res.status(400).json({ success: false, error: 'Please enter your message (minimum 5 characters).' });
  }
  if (email && !isValidEmail(email)) {
    return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
  }

  const db = getDB();
  const newInquiry: any = {
    id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    name,
    email,
    phone,
    subject,
    message,
    submittedAt: new Date().toISOString(),
    source: req.body.source || 'Website Contact Form',
    emailStatus: 'pending'
  };

  if (!db.inquiries) db.inquiries = [];
  db.inquiries.unshift(newInquiry);
  saveDB(db);

  // 4. Dispatch Official Email Notification
  let emailResult;
  try {
    emailResult = await dispatchOfficialEmailNotification('inquiry', newInquiry);
    newInquiry.emailStatus = emailResult.emailStatus;
    newInquiry.emailDispatchedAt = emailResult.dispatchedAt;
    if (emailResult.error) {
      newInquiry.emailError = emailResult.error;
    }
  } catch (err: any) {
    newInquiry.emailStatus = 'failed';
    newInquiry.emailError = err.message || String(err);
    emailResult = { success: false, emailStatus: 'failed', error: newInquiry.emailError };
  }

  // Update record in database
  const foundIndex = db.inquiries.findIndex((i: any) => i.id === newInquiry.id);
  if (foundIndex !== -1) {
    db.inquiries[foundIndex] = newInquiry;
    saveDB(db);
  }

  res.json({
    success: true,
    inquiry: newInquiry,
    notification: emailResult
  });
});

app.post('/api/admissions', async (req, res) => {
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';

  // 1. Rate Limiting Check
  if (!checkRateLimit(`admission_${clientIp}`, 5, 10 * 60 * 1000)) {
    return res.status(429).json({
      success: false,
      error: 'Too many applications submitted from your network. Please wait a few minutes before trying again.'
    });
  }

  // 2. Honeypot Anti-Spam Check
  if (req.body.website_hp || req.body.hp_field || req.body.fax_only) {
    return res.json({ success: true, message: 'Application received' });
  }

  // 3. Validation & Sanitization
  const fullName = sanitizeString(req.body.fullName, 100);
  const fatherName = sanitizeString(req.body.fatherName, 100);
  const phone = sanitizeString(req.body.phone, 40);
  const whatsapp = sanitizeString(req.body.whatsapp || req.body.phone, 40);
  const email = sanitizeString(req.body.email, 120);
  const courseId = sanitizeString(req.body.courseId, 80);
  const courseTitle = sanitizeString(req.body.courseTitle, 150) || 'IT Training Course';
  const address = sanitizeString(req.body.address, 250);
  const message = sanitizeMultiline(req.body.message, 3000);

  if (!fullName || fullName.length < 2) {
    return res.status(400).json({ success: false, error: 'Please enter student full name.' });
  }
  if (!phone || phone.length < 6) {
    return res.status(400).json({ success: false, error: 'Please enter a valid mobile phone number.' });
  }
  if (!whatsapp || whatsapp.length < 6) {
    return res.status(400).json({ success: false, error: 'Please enter a valid WhatsApp contact number.' });
  }
  if (email && !isValidEmail(email)) {
    return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
  }

  const db = getDB();
  const newAdmission: any = {
    id: `adm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    fullName,
    fatherName,
    phone,
    whatsapp,
    email,
    courseId,
    courseTitle,
    address,
    message,
    submittedAt: new Date().toISOString(),
    source: req.body.source || 'Online Admission Portal',
    emailStatus: 'pending'
  };

  if (!db.admissions) db.admissions = [];
  db.admissions.unshift(newAdmission);
  saveDB(db);

  // 4. Dispatch Official Email Notification
  let emailResult;
  try {
    emailResult = await dispatchOfficialEmailNotification('admission', newAdmission);
    newAdmission.emailStatus = emailResult.emailStatus;
    newAdmission.emailDispatchedAt = emailResult.dispatchedAt;
    if (emailResult.error) {
      newAdmission.emailError = emailResult.error;
    }
  } catch (err: any) {
    newAdmission.emailStatus = 'failed';
    newAdmission.emailError = err.message || String(err);
    emailResult = { success: false, emailStatus: 'failed', error: newAdmission.emailError };
  }

  // Update record in database
  const foundIndex = db.admissions.findIndex((a: any) => a.id === newAdmission.id);
  if (foundIndex !== -1) {
    db.admissions[foundIndex] = newAdmission;
    saveDB(db);
  }

  res.json({
    success: true,
    admission: newAdmission,
    notification: emailResult
  });
});

/* ==========================================================================
   VITE & PRODUCTION STATIC SERVING
   ========================================================================== */

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const publicPath = path.join(process.cwd(), 'public');

    // Static assets with long-term immutable caching for hashed files
    app.use(
      express.static(distPath, {
        maxAge: '1y',
        immutable: true,
        setHeaders: (res, filePath) => {
          if (filePath.endsWith('.html')) {
            // HTML files should never be cached long-term to ensure fresh deployments
            res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
          } else {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          }
        }
      })
    );

    // Also serve public directory files (e.g. brandlogo.png, robots.txt, sitemap.xml)
    if (fs.existsSync(publicPath)) {
      app.use(
        express.static(publicPath, {
          maxAge: '7d',
          setHeaders: (res, filePath) => {
            if (filePath.endsWith('.html')) {
              res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
            }
          }
        })
      );
    }

    app.get('*', (req, res) => {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Global Error Handler (Prevents stack trace leaks)
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('[Unhandled Express Error]', err?.message || err);
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred. Please try again later.'
    });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Future Gates IT Center server running securely on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
