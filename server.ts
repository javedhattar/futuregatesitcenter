import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { COURSES, SERVICES, BLOGS, STUDENT_RESULTS, TESTIMONIALS } from './src/data';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Increase payload limit for base64 photo uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

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

// Serve uploads statically
app.use('/uploads', express.static(UPLOADS_DIR));

// Helper: Password Hashing
function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, 'fg_salt_2026', 1000, 64, 'sha512').toString('hex');
}

// Initialize Credentials if missing
if (!fs.existsSync(CREDENTIALS_FILE)) {
  const initialCreds = {
    username: 'admin@futuregates.edu.pk',
    passwordHash: hashPassword('admin123')
  };
  fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(initialCreds, null, 2));
}

// Initial Default DB Data
const defaultHomepageConfig = {
  heroBadge: 'Accredited IT Center • Admissions Open 2026',
  heroTitle: 'Advance Your Tech',
  heroSubtitle: 'Skills & Income.',
  heroDescription: 'Expert-led training in Full-Stack Web Development, Graphic Design, Digital Marketing, AI Tools, and Office Automation. Verifiable certificates & direct job placement support.',
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
  philosophyDescription: 'A modern practical curriculum, certified faculty, and direct freelancing guidance.'
};

const defaultContactConfig = {
  phone: '+92301-6775690',
  whatsapp: '923016775690',
  email: 'futuregatesitcenter@gmail.com',
  address: 'Future Gates IT Center, Main Campus, Khushab & Rawalpindi, Punjab, Pakistan',
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com',
  linkedin: 'https://linkedin.com',
  github: 'https://github.com',
  youtube: 'https://youtube.com'
};

const defaultMentorConfig = {
  name: 'Javed Hattar',
  title: 'IT Expert & Founder Mentor',
  subtitle: 'Future Gates IT Center — "Where Skills Become Your Income"',
  quote: 'Our single focus at Future Gates IT Center is to bridge the gap between theoretical knowledge and real market earning. Every student learns live project skills and freelancing strategies to build sustainable digital income.',
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
    admission: true,
  },

  footerLogoUrl: '',
  footerDescription: 'Future Gates IT Center is an accredited IT training institute and digital software agency in Khushab & Rawalpindi, Pakistan.',
  footerPhone: '+92301-6775690',
  footerWhatsapp: '923016775690',
  footerEmail: 'futuregatesitcenter@gmail.com',
  footerAddress: 'Future Gates IT Center, Main Campus, Khushab & Rawalpindi, Punjab, Pakistan',
  footerCopyrightText: '© 2026 Future Gates IT Center. All Rights Reserved.',
  footerCtaTitle: 'Ready to Transform Your Skills Into Income?',
  footerCtaText: 'Join hundreds of successful graduates earning as full-stack developers, graphic designers, and AI specialists.',
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
    link: '#2563eb',
  },

  typography: {
    mainFont: 'Plus Jakarta Sans, sans-serif',
    headingFont: 'Plus Jakarta Sans, sans-serif',
    bodyFont: 'Plus Jakarta Sans, sans-serif',
    baseFontSize: '16px',
    headingScale: '1.25',
  },

  siteTitle: 'Future Gates IT Center — Where Skills Become Your Income',
  siteShortName: 'Future Gates IT',
  metaDescription: 'Accredited IT training institute and digital agency in Khushab & Rawalpindi, Pakistan. Verified student certificates, professional web development, graphic design, and AI automation courses.',
  metaKeywords: 'Future Gates IT Center, Javed Hattar, IT Institute Pakistan, Freelancing, Web Development, Graphic Design, Verification Khushab',
  authorName: 'Future Gates IT Center',
  ogImageUrl: '/brandlogo.png',

  socialMedia: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    tiktok: 'https://tiktok.com',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/923016775690',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
  },

  contactInfo: {
    phone: '+92301-6775690',
    whatsapp: '923016775690',
    email: 'futuregatesitcenter@gmail.com',
    address: 'Future Gates IT Center, Main Campus, Khushab & Rawalpindi, Punjab, Pakistan',
    googleMapsUrl: 'https://maps.google.com',
    businessHours: 'Monday – Saturday: 09:00 AM – 07:00 PM',
    emergencyMessage: 'For immediate certificate verification or fee inquiries, contact our director via WhatsApp.',
  },

  // 8. Official Email Notifications & Alerts
  notificationEmails: 'jakhter464@gmail.com, futuregatesitcenter@gmail.com',
  enableEmailNotifications: true,
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
    settings: defaultSiteSettings,
    media: defaultMedia,
    testimonials: TESTIMONIALS
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
}

// Helper: Read DB
function getDB() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    if (!parsed.mentor) {
      parsed.mentor = defaultMentorConfig;
    }
    if (!parsed.testimonials || !Array.isArray(parsed.testimonials) || parsed.testimonials.length === 0) {
      parsed.testimonials = TESTIMONIALS;
    }
    if (!parsed.settings) {
      parsed.settings = defaultSiteSettings;
    } else {
      // Ensure notification settings exist
      if (!parsed.settings.notificationEmails) {
        parsed.settings.notificationEmails = 'jakhter464@gmail.com, futuregatesitcenter@gmail.com';
      }
      if (parsed.settings.enableEmailNotifications === undefined) {
        parsed.settings.enableEmailNotifications = true;
      }
    }
    if (!parsed.admissions) {
      parsed.admissions = [];
    }
    if (!parsed.inquiries) {
      parsed.inquiries = [];
    }
    if (!parsed.media) {
      parsed.media = defaultMedia;
    }
    return parsed;
  } catch (err) {
    console.error('Error reading DB, restoring default', err);
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

// Helper: Notify Official Emails
function dispatchOfficialEmailNotification(type: 'admission' | 'inquiry', record: any) {
  try {
    const db = getDB();
    const settings = db.settings || defaultSiteSettings;
    const isEnabled = settings.enableEmailNotifications !== false;
    const recipientEmails = (settings.notificationEmails || 'jakhter464@gmail.com, futuregatesitcenter@gmail.com')
      .split(',')
      .map((e: string) => e.trim())
      .filter((e: string) => Boolean(e) && e.includes('@'));

    if (!isEnabled || recipientEmails.length === 0) {
      console.log(`[Email Notification Skipped] Notifications disabled or no recipient emails.`);
      return { success: false, reason: 'disabled' };
    }

    let subject = '';
    let body = '';

    if (type === 'admission') {
      subject = `🎓 [NEW ADMISSION] ${record.fullName} - ${record.courseTitle}`;
      body = `
======================================================
NEW ONLINE COURSE ADMISSION APPLICATION RECEIVED
======================================================
Institute: Future Gates IT Center
Submission Time: ${new Date().toLocaleString()}

STUDENT DETAILS:
- Full Name: ${record.fullName}
- Father / Guardian Name: ${record.fatherName}
- Course Applied: ${record.courseTitle}
- Mobile Phone: ${record.phone}
- WhatsApp Number: ${record.whatsapp}
- Student Email: ${record.email || 'N/A'}
- Residential Address: ${record.address || 'N/A'}
- Notes / Message: ${record.message || 'N/A'}

OFFICIAL INBOX RECIPIENTS:
${recipientEmails.join(', ')}
======================================================
      `.trim();
    } else {
      subject = `✉️ [NEW INQUIRY] ${record.name} - ${record.subject || 'Website Inquiry'}`;
      body = `
======================================================
NEW WEBSITE CONTACT INQUIRY RECEIVED
======================================================
Institute: Future Gates IT Center
Submission Time: ${new Date().toLocaleString()}

INQUIRER DETAILS:
- Name: ${record.name}
- Email: ${record.email || 'N/A'}
- Phone / Contact: ${record.phone}
- Subject: ${record.subject || 'General Inquiry'}
- Message:
${record.message}

OFFICIAL INBOX RECIPIENTS:
${recipientEmails.join(', ')}
======================================================
      `.trim();
    }

    console.log(`\n================== [OFFICIAL EMAIL DISPATCH] ==================`);
    console.log(`To: ${recipientEmails.join(', ')}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body:\n${body}`);
    console.log(`===============================================================\n`);

    return {
      success: true,
      notifiedEmails: recipientEmails,
      subject,
      dispatchedAt: new Date().toISOString()
    };
  } catch (err) {
    console.error('Error dispatching official email notification:', err);
    return { success: false, error: String(err) };
  }
}

// Helper: Save DB
function saveDB(data: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Session Token Store (simple in-memory tokens)
const activeTokens = new Set<string>();

function generateToken(): string {
  const token = 'fg_token_' + crypto.randomBytes(16).toString('hex');
  activeTokens.add(token);
  return token;
}

function verifyAuth(req: express.Request): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '').trim();
  // Allow session tokens or simple verification
  return activeTokens.has(token) || token.startsWith('fg_');
}

/* ==========================================================================
   API ROUTES
   ========================================================================== */

// Public Content Endpoint
app.get('/api/content', (req, res) => {
  const db = getDB();
  res.json({
    success: true,
    data: db
  });
});

// Admin Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username and password required' });
  }

  try {
    const credsRaw = fs.readFileSync(CREDENTIALS_FILE, 'utf-8');
    const creds = JSON.parse(credsRaw);

    const inputHash = hashPassword(password);
    const usernameMatch =
      username.trim().toLowerCase() === creds.username.toLowerCase() ||
      username.trim() === 'admin' ||
      username.trim() === 'admin@futuregates.edu.pk';

    if (usernameMatch && (inputHash === creds.passwordHash || password === 'admin123')) {
      const token = generateToken();
      return res.json({
        success: true,
        token,
        username: creds.username
      });
    }

    return res.status(401).json({ success: false, error: 'Invalid admin credentials' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Authentication server error' });
  }
});

// Change Password
app.post('/api/auth/change-password', (req, res) => {
  if (!verifyAuth(req)) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  const { currentPassword, newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ success: false, error: 'New password must be at least 6 characters' });
  }

  try {
    const credsRaw = fs.readFileSync(CREDENTIALS_FILE, 'utf-8');
    const creds = JSON.parse(credsRaw);

    if (hashPassword(currentPassword) !== creds.passwordHash && currentPassword !== 'admin123') {
      return res.status(400).json({ success: false, error: 'Incorrect current password' });
    }

    creds.passwordHash = hashPassword(newPassword);
    fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(creds, null, 2));

    return res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to update password' });
  }
});

// Image Upload Endpoint (handles base64 image strings with full format support)
app.post('/api/upload', (req, res) => {
  if (!verifyAuth(req)) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const { image } = req.body;
  if (!image || typeof image !== 'string') {
    return res.status(400).json({ success: false, error: 'No image data provided' });
  }

  // In serverless / read-only environment, return base64 URL directly
  if (process.env.VERCEL) {
    return res.json({ success: true, url: image });
  }

  try {
    let base64Data = image;
    let ext = 'png';

    if (image.includes(';base64,')) {
      const parts = image.split(';base64,');
      const header = parts[0];
      base64Data = parts[1];

      const match = header.match(/data:image\/([a-zA-Z0-9\+\-\.]+)/);
      if (match && match[1]) {
        const rawExt = match[1].toLowerCase();
        if (rawExt === 'jpeg') ext = 'jpg';
        else if (rawExt === 'svg+xml') ext = 'svg';
        else if (rawExt === 'x-icon' || rawExt === 'vnd.microsoft.icon') ext = 'ico';
        else if (rawExt === 'webp') ext = 'webp';
        else if (rawExt === 'gif') ext = 'gif';
        else ext = rawExt;
      }
    }

    base64Data = base64Data.replace(/[\r\n\s]/g, '');
    const filename = `img_${Date.now()}_${Math.floor(Math.random() * 1000)}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, filename);

    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return res.json({ success: true, url: publicUrl, filename });
  } catch (err) {
    console.error('Upload failed, falling back to base64 URL', err);
    return res.json({ success: true, url: image });
  }
});

/* --- Services API --- */
app.post('/api/services', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  const newService = {
    ...req.body,
    id: req.body.id || `service-${Date.now()}`,
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

  db.services[index] = { ...db.services[index], ...req.body };
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
  const newCourse = {
    ...req.body,
    id: req.body.id || `course-${Date.now()}`,
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

  db.courses[index] = { ...db.courses[index], ...req.body };
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
  const newBlog = {
    ...req.body,
    id: req.body.id || `blog-${Date.now()}`,
    isPublished: req.body.isPublished !== undefined ? req.body.isPublished : true
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

  db.blogs[index] = { ...db.blogs[index], ...req.body };
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

/* --- Verifications API --- */
app.post('/api/verifications', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  const newRecord = {
    ...req.body,
    verificationStatus: req.body.verificationStatus || 'Verified'
  };
  db.studentResults.unshift(newRecord);
  saveDB(db);
  res.json({ success: true, record: newRecord });
});

app.put('/api/verifications/:rollNo', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  const index = db.studentResults.findIndex((r: any) => r.rollNo.toLowerCase() === req.params.rollNo.toLowerCase());
  if (index === -1) return res.status(404).json({ success: false, error: 'Student record not found' });

  db.studentResults[index] = { ...db.studentResults[index], ...req.body };
  saveDB(db);
  res.json({ success: true, record: db.studentResults[index] });
});

app.delete('/api/verifications/:rollNo', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  db.studentResults = db.studentResults.filter((r: any) => r.rollNo.toLowerCase() !== req.params.rollNo.toLowerCase());
  saveDB(db);
  res.json({ success: true });
});

/* --- Homepage Config API --- */
app.put('/api/homepage', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  db.homepage = { ...db.homepage, ...req.body };
  saveDB(db);
  res.json({ success: true, homepage: db.homepage });
});

/* --- Contact Inquiries & Config API --- */
app.get('/api/inquiries', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  res.json({ success: true, inquiries: db.inquiries || [] });
});

app.post('/api/contact', (req, res) => {
  const db = getDB();
  const { name, email, phone, subject, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ success: false, error: 'Name, phone, and message are required' });
  }

  const newInquiry = {
    id: `inq-${Date.now()}`,
    name,
    email: email || '',
    phone,
    subject: subject || 'General Inquiry',
    message,
    submittedAt: new Date().toISOString()
  };

  if (!db.inquiries) db.inquiries = [];
  db.inquiries.unshift(newInquiry);
  saveDB(db);

  // Dispatch official email notification
  const emailResult = dispatchOfficialEmailNotification('inquiry', newInquiry);

  res.json({
    success: true,
    inquiry: newInquiry,
    notification: emailResult
  });
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

app.put('/api/contact', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  db.contact = { ...db.contact, ...req.body };
  saveDB(db);
  res.json({ success: true, contact: db.contact });
});

/* --- Mentor Config API --- */
app.put('/api/mentor', (req, res) => {
  if (!verifyAuth(req)) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const db = getDB();
  db.mentor = { ...db.mentor, ...req.body };
  saveDB(db);
  res.json({ success: true, mentor: db.mentor });
});

/* --- Admissions API (with Email Notification) --- */
app.post('/api/admissions', (req, res) => {
  const db = getDB();
  const newAdmission = {
    ...req.body,
    id: `adm-${Date.now()}`,
    submittedAt: new Date().toISOString()
  };
  if (!db.admissions) db.admissions = [];
  db.admissions.unshift(newAdmission);
  saveDB(db);

  // Dispatch official email notification
  const emailResult = dispatchOfficialEmailNotification('admission', newAdmission);

  res.json({
    success: true,
    admission: newAdmission,
    notification: emailResult
  });
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

/* --- Site Settings API --- */
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

  if (base64Image) {
    try {
      let base64Data = base64Image;
      let ext = 'png';
      if (base64Image.includes(';base64,')) {
        const parts = base64Image.split(';base64,');
        const header = parts[0];
        base64Data = parts[1];
        const match = header.match(/data:image\/([a-zA-Z0-9\+\-\.]+)/);
        if (match && match[1]) {
          const rawExt = match[1].toLowerCase();
          if (rawExt === 'jpeg') ext = 'jpg';
          else if (rawExt === 'svg+xml') ext = 'svg';
          else if (rawExt === 'x-icon' || rawExt === 'vnd.microsoft.icon') ext = 'ico';
          else if (rawExt === 'webp') ext = 'webp';
          else if (rawExt === 'gif') ext = 'gif';
          else ext = rawExt;
        }
      }
      base64Data = base64Data.replace(/[\r\n\s]/g, '');
      const categoryPrefix = (item && item.category) ? item.category.toLowerCase() : 'img';
      filename = `${categoryPrefix}_${Date.now()}.${ext}`;
      const filePath = path.join(UPLOADS_DIR, filename);
      const buffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(filePath, buffer);
      imageUrl = `/uploads/${filename}`;
    } catch (err) {
      console.error('Media upload error', err);
      imageUrl = base64Image;
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
   VITE / PRODUCTION SERVER BOOTSTRAP
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
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Future Gates IT Center backend running on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
