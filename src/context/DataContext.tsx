import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData, Service, Course, BlogPost, StudentResult, HomepageConfig, ContactConfig, MentorConfig, EnrollmentApplication, SiteSettings, MediaItem } from '../types';
import { COURSES, SERVICES, BLOGS, STUDENT_RESULTS } from '../data';

export const defaultSiteSettings: SiteSettings = {
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
};

interface DataContextType {
  data: SiteData;
  loading: boolean;
  token: string | null;
  setToken: (token: string | null) => void;
  refreshData: () => Promise<void>;
  // Mutators
  saveService: (service: Partial<Service>) => Promise<boolean>;
  deleteService: (id: string) => Promise<boolean>;
  reorderServices: (services: Service[]) => Promise<boolean>;
  saveCourse: (course: Partial<Course>) => Promise<boolean>;
  deleteCourse: (id: string) => Promise<boolean>;
  saveBlog: (blog: Partial<BlogPost>) => Promise<boolean>;
  deleteBlog: (id: string) => Promise<boolean>;
  saveVerification: (record: Partial<StudentResult>) => Promise<boolean>;
  deleteVerification: (rollNo: string) => Promise<boolean>;
  saveHomepage: (homepage: Partial<HomepageConfig>) => Promise<boolean>;
  saveContact: (contact: Partial<ContactConfig>) => Promise<boolean>;
  saveMentor: (mentor: Partial<MentorConfig>) => Promise<boolean>;
  uploadImage: (base64Image: string) => Promise<string | null>;
  submitAdmission: (app: Partial<EnrollmentApplication>) => Promise<boolean>;
  deleteAdmission: (id: string) => Promise<boolean>;
  saveSettings: (settings: Partial<SiteSettings>) => Promise<boolean>;
  resetSettings: () => Promise<boolean>;
  saveMediaItem: (item: Partial<MediaItem>, base64Image?: string) => Promise<boolean>;
  deleteMediaItem: (id: string) => Promise<boolean>;
}

const defaultHomepage: HomepageConfig = {
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

const defaultContact: ContactConfig = {
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

const defaultMentor: MentorConfig = {
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

const fallbackData: SiteData = {
  services: SERVICES,
  courses: COURSES,
  blogs: BLOGS,
  studentResults: STUDENT_RESULTS,
  homepage: defaultHomepage,
  contact: defaultContact,
  mentor: defaultMentor,
  admissions: [],
  settings: defaultSiteSettings,
  media: []
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(fallbackData);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem('fg_admin_token');
  });

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem('fg_admin_token', newToken);
    } else {
      localStorage.removeItem('fg_admin_token');
    }
  };

  const refreshData = async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        }
      }
    } catch (err) {
      console.warn('Backend API not responding, using fallback/cached data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const getHeaders = () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  // Mutator: Service
  const saveService = async (service: Partial<Service>): Promise<boolean> => {
    try {
      const isEdit = Boolean(service.id && data.services.some((s) => s.id === service.id));
      const url = isEdit ? `/api/services/${service.id}` : '/api/services';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(service)
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error('Failed to save service', err);
    }
    return false;
  };

  const deleteService = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error('Failed to delete service', err);
    }
    return false;
  };

  const reorderServices = async (services: Service[]): Promise<boolean> => {
    try {
      const res = await fetch('/api/services/reorder', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ services })
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error('Failed to reorder services', err);
    }
    return false;
  };

  // Mutator: Course
  const saveCourse = async (course: Partial<Course>): Promise<boolean> => {
    try {
      const isEdit = Boolean(course.id && data.courses.some((c) => c.id === course.id));
      const url = isEdit ? `/api/courses/${course.id}` : '/api/courses';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(course)
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error('Failed to save course', err);
    }
    return false;
  };

  const deleteCourse = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error('Failed to delete course', err);
    }
    return false;
  };

  // Mutator: Blog
  const saveBlog = async (blog: Partial<BlogPost>): Promise<boolean> => {
    try {
      const id = blog.id || blog._id;
      const isEdit = Boolean(id && data.blogs.some((b) => b.id === id || b._id === id));
      const url = isEdit ? `/api/blogs/${id}` : '/api/blogs';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(blog)
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error('Failed to save blog', err);
    }
    return false;
  };

  const deleteBlog = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error('Failed to delete blog', err);
    }
    return false;
  };

  // Mutator: Verification
  const saveVerification = async (record: Partial<StudentResult>): Promise<boolean> => {
    try {
      const isEdit = Boolean(record.rollNo && data.studentResults.some((r) => r.rollNo.toLowerCase() === record.rollNo?.toLowerCase()));
      const url = isEdit ? `/api/verifications/${record.rollNo}` : '/api/verifications';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(record)
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error('Failed to save verification record', err);
    }
    return false;
  };

  const deleteVerification = async (rollNo: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/verifications/${rollNo}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error('Failed to delete verification', err);
    }
    return false;
  };

  // Mutator: Homepage
  const saveHomepage = async (homepage: Partial<HomepageConfig>): Promise<boolean> => {
    try {
      const res = await fetch('/api/homepage', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(homepage)
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error('Failed to save homepage config', err);
    }
    return false;
  };

  // Mutator: Contact
  const saveContact = async (contact: Partial<ContactConfig>): Promise<boolean> => {
    try {
      const res = await fetch('/api/contact', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(contact)
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error('Failed to save contact config', err);
    }
    return false;
  };

  // Mutator: Mentor
  const saveMentor = async (mentor: Partial<MentorConfig>): Promise<boolean> => {
    try {
      const res = await fetch('/api/mentor', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(mentor)
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error('Failed to save mentor config', err);
    }
    return false;
  };

  // Upload Image
  const uploadImage = async (base64Image: string): Promise<string | null> => {
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ image: base64Image })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.url) {
          return json.url;
        }
      }
    } catch (err) {
      console.error('Failed to upload image', err);
    }
    return null;
  };

  // Admissions
  const submitAdmission = async (app: Partial<EnrollmentApplication>): Promise<boolean> => {
    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(app)
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error('Failed to submit admission', err);
    }
    return false;
  };

  const deleteAdmission = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error('Failed to delete admission', err);
    }
    return false;
  };

  const saveSettings = async (settings: Partial<SiteSettings>): Promise<boolean> => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error('Failed to save settings', err);
    }
    return false;
  };

  const resetSettings = async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/settings/reset', {
        method: 'POST',
        headers: getHeaders()
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error('Failed to reset settings', err);
    }
    return false;
  };

  const saveMediaItem = async (item: Partial<MediaItem>, base64Image?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ item, base64Image })
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error('Failed to save media item', err);
    }
    return false;
  };

  const deleteMediaItem = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error('Failed to delete media item', err);
    }
    return false;
  };

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        token,
        setToken,
        refreshData,
        saveService,
        deleteService,
        reorderServices,
        saveCourse,
        deleteCourse,
        saveBlog,
        deleteBlog,
        saveVerification,
        deleteVerification,
        saveHomepage,
        saveContact,
        saveMentor,
        uploadImage,
        submitAdmission,
        deleteAdmission,
        saveSettings,
        resetSettings,
        saveMediaItem,
        deleteMediaItem
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
