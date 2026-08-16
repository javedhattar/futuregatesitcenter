/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Course {
  id: string;
  title: string;
  duration: string; // e.g., "3 Months", "6 Months", "Contact for Schedule"
  category: 'Computer & Office' | 'Design & Media' | 'Web & Freelancing' | 'Artificial Intelligence' | 'Programming & Data' | 'Digital Business' | 'Advanced IT' | 'Development' | 'Design' | 'Technical' | 'Short Courses' | string;
  description: string;
  longDescription: string;
  fee: string;
  syllabus: string[];
  skillsGained: string[];
  featured: boolean;
  imageUrl?: string;
  status?: 'Available Now' | 'Coming Soon' | 'Active' | 'Inactive' | string;
  order?: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon identifier
  imageUrl: string;
  features: string[];
  techStack: string[];
  category: 'agency' | 'local-hub' | string;
  order?: number;
  isPublished?: boolean;
}

export interface StudentResult {
  rollNo: string;
  name: string;
  fatherName: string;
  enrollmentNo: string;
  courseName: string;
  duration: string;
  session: string; // e.g., "Jan 2026 - Mar 2026"
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' | string;
  percentage: number;
  theoryMarks: number;
  practicalMarks: number;
  vivaMarks: number;
  totalMarks: number;
  maxMarks: number;
  issueDate: string;
  certificateNo: string;
  verificationStatus: 'Verified' | 'Pending' | 'Not Found' | 'Suspended' | string;
  remarks: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  courseOrService: string;
  feedback: string;
  rating: number;
  avatarUrl?: string;
}

export interface BlogPost {
  _id?: string;
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  highlight?: string;
  content: string[];
  imageUrl?: string;
  isPublished?: boolean;
}

export interface HomepageConfig {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  stats: {
    studentsCertified: string;
    practicalLabs: string;
    corporateClients: string;
    experiencedFaculty: string;
  };
  philosophyBadge: string;
  philosophyTitle: string;
  philosophyDescription: string;
}

export interface ContactConfig {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  github: string;
  youtube: string;
}

export interface MentorExpertiseItem {
  title: string;
  description: string;
  badge: string;
  color?: string;
}

export interface MentorConfig {
  name: string;
  title: string;
  subtitle: string;
  quote: string;
  photoUrl: string;
  badgeText: string;
  expertise: MentorExpertiseItem[];
}

export interface SiteSettings {
  // 1. Header Settings
  headerLogoUrl?: string;
  mobileLogoUrl?: string;
  faviconUrl?: string;
  instituteName: string;
  tagline: string;
  headerPhone: string;
  headerWhatsapp: string;
  headerCtaText: string;
  headerCtaLink: string;
  showAnnouncementBar: boolean;
  announcementText: string;
  announcementLink: string;
  announcementBtnText: string;
  showAdminHeaderButton?: boolean;
  showAdminFooterLink?: boolean;
  navItemsVisibility: {
    home: boolean;
    about: boolean;
    courses: boolean;
    services: boolean;
    verification: boolean;
    blogs: boolean;
    contact: boolean;
    admission: boolean;
  };

  // 2. Footer Settings
  footerLogoUrl?: string;
  footerDescription: string;
  footerPhone: string;
  footerWhatsapp: string;
  footerEmail: string;
  footerAddress: string;
  footerCopyrightText: string;
  footerCtaTitle: string;
  footerCtaText: string;
  footerCtaButtonText: string;
  footerCtaButtonLink: string;
  showFooterQuickLinks: boolean;
  showFooterCourses: boolean;
  showFooterServices: boolean;
  showFooterLegal: boolean;

  // 2.5 Verification Certificate & Transcript Branding (Stamp, Signature, Authority)
  certificateStampLogoUrl?: string;
  certificateSignatureUrl?: string;
  certificateRegistrarTitle?: string;
  certificateSignerName?: string;

  // 3. Branding & Colors
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    button: string;
    background: string;
    text: string;
    heading: string;
    link: string;
  };

  // 4. Typography
  typography: {
    mainFont: string;
    headingFont: string;
    bodyFont: string;
    baseFontSize: string;
    headingScale: string;
  };

  // 5. Website Identity & SEO
  siteTitle: string;
  siteShortName: string;
  metaDescription: string;
  metaKeywords: string;
  authorName: string;
  ogImageUrl?: string;

  // 6. Social Media Links
  socialMedia: {
    facebook: string;
    instagram: string;
    youtube: string;
    tiktok: string;
    linkedin: string;
    whatsapp: string;
    github: string;
    twitter: string;
  };

  // 7. Contact Information & Business Hours
  contactInfo: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    googleMapsUrl: string;
    googleMapsEmbedUrl?: string;
    businessHours: string;
    emergencyMessage: string;
  };

  // 8. Official Email Notifications & Alerts
  notificationEmails?: string;
  enableEmailNotifications?: boolean;
}

export type MediaCategory = 'Logos' | 'Mentor' | 'Courses' | 'Services' | 'Blogs' | 'Homepage' | 'General';

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  category: MediaCategory;
  uploadedAt: string;
  size?: string;
  dimensions?: string;
}

export interface SiteData {
  services: Service[];
  courses: Course[];
  blogs: BlogPost[];
  studentResults: StudentResult[];
  homepage: HomepageConfig;
  contact: ContactConfig;
  mentor?: MentorConfig;
  admissions: EnrollmentApplication[];
  inquiries?: ContactInquiry[];
  settings: SiteSettings;
  media: MediaItem[];
  testimonials?: Testimonial[];
}

export interface VerificationRecord {
  _id?: string;
  candidateName: string;
  fatherName: string;
  verificationReference: string;
  course?: string;
  courseDuration?: string;
  trainingSession?: string;
  trainerName?: string;
  finalGrade?: string;
  certificateImage?: string;
  certificatePdf?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
  emailStatus?: 'sent' | 'failed' | 'pending';
  emailError?: string;
  emailDispatchedAt?: string;
  source?: string;
}

export interface EnrollmentApplication {
  id?: string;
  fullName: string;
  fatherName: string;
  phone: string;
  whatsapp: string;
  email: string;
  courseId: string;
  courseTitle: string;
  address: string;
  message?: string;
  submittedAt: string;
  emailStatus?: 'sent' | 'failed' | 'pending';
  emailError?: string;
  emailDispatchedAt?: string;
  source?: string;
}

export interface StudentActivityAd {
  _id?: string;
  heading: string;
  description: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HeroSlide {
  _id?: string;
  imageUrl: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}
