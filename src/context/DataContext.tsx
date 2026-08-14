import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData, Service, Course, BlogPost, StudentResult, HomepageConfig, ContactConfig, MentorConfig, EnrollmentApplication, SiteSettings, MediaItem, ContactInquiry } from '../types';
import { COURSES, SERVICES, BLOGS, STUDENT_RESULTS } from '../data';

export const defaultSiteSettings: SiteSettings = {
  headerLogoUrl: '/brandlogo.png',
  mobileLogoUrl: '/brandlogo.png',
  faviconUrl: '/brandlogo.png',
  footerLogoUrl: '/brandlogo.png',
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
  showAdminHeaderButton: false,
  showAdminFooterLink: false,
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

  footerDescription: 'Future Gates IT Center is an accredited IT training institute and digital software agency in Khushab, Punjab, Pakistan.',
  footerPhone: '+92301-6775690',
  footerWhatsapp: '923016775690',
  footerEmail: 'futuregatesitcenter@gmail.com',
  footerAddress: 'Future Gates IT Center, Main Campus, Khushab, Punjab, Pakistan',
  footerCopyrightText: '© 2026 Future Gates IT Center. All Rights Reserved.',
  footerCtaTitle: 'Ready to Transform Your Skills Into Income?',
  footerCtaText: 'Join hundreds of successful graduates earning as full-stack developers, graphic designers, and AI specialists.',
  footerCtaButtonText: 'Start Your Journey Today',
  footerCtaButtonLink: 'admission',
  showFooterQuickLinks: true,
  showFooterCourses: true,
  showFooterServices: true,
  showFooterLegal: true,

  certificateStampLogoUrl: '',
  certificateSignatureUrl: '',
  certificateRegistrarTitle: 'Authorized Registrar',
  certificateSignerName: 'Controller Exams',

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
  metaDescription: 'Accredited IT training institute and digital agency in Khushab, Punjab, Pakistan. Verified student certificates, professional web development, graphic design, and AI automation courses.',
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
    address: 'Future Gates IT Center, Main Campus, Khushab, Punjab, Pakistan',
    googleMapsUrl: 'https://maps.google.com',
    businessHours: 'Monday – Saturday: 09:00 AM – 07:00 PM',
    emergencyMessage: 'For immediate certificate verification or fee inquiries, contact our director via WhatsApp.',
  },

  // 8. Official Email Notifications & Alerts
  notificationEmails: 'jakhter464@gmail.com, futuregatesitcenter@gmail.com',
  enableEmailNotifications: true,
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
  submitInquiry: (inquiry: Partial<ContactInquiry>) => Promise<boolean>;
  deleteInquiry: (id: string) => Promise<boolean>;
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
  address: 'Future Gates IT Center, Main Campus, Khushab, Punjab, Pakistan',
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
  inquiries: [],
  settings: defaultSiteSettings,
  media: []
};

const STORAGE_KEY = 'fg_site_data_v1';

const getStoredData = (): SiteData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...fallbackData,
        ...parsed,
        settings: {
          ...defaultSiteSettings,
          ...(parsed.settings || {})
        }
      };
    }
  } catch (err) {
    console.warn('Error reading stored site data', err);
  }
  return fallbackData;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(getStoredData);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem('fg_admin_token');
  });

  const saveLocalData = (newData: SiteData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (err) {
      console.warn('Error saving local site data', err);
    }
  };

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
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
          } catch (e) {}
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend API not responding, using localStorage/cached data', err);
    }
    setData(getStoredData());
    setLoading(false);
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
    let apiSuccess = false;
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
        apiSuccess = true;
        await refreshData();
      }
    } catch (err) {
      console.warn('Failed to save service via API, saving locally', err);
    }

    if (!apiSuccess) {
      const isEdit = Boolean(service.id && data.services.some((s) => s.id === service.id));
      let newServices = [...data.services];
      if (isEdit) {
        newServices = newServices.map(s => s.id === service.id ? ({ ...s, ...service } as Service) : s);
      } else {
        const newServiceObj: Service = {
          id: service.id || `srv-${Date.now()}`,
          title: service.title || 'New Service',
          description: service.description || '',
          iconName: service.iconName || 'Code',
          imageUrl: service.imageUrl || '/brandlogo.png',
          features: service.features || [],
          techStack: service.techStack || [],
          category: service.category || 'agency',
          order: service.order || newServices.length + 1,
          isPublished: service.isPublished !== false
        };
        newServices.push(newServiceObj);
      }
      saveLocalData({ ...data, services: newServices });
    }
    return true;
  };

  const deleteService = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.warn('Delete service API failed, deleting locally', err);
    }
    saveLocalData({ ...data, services: data.services.filter(s => s.id !== id) });
    return true;
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
      }
    } catch (err) {
      console.warn('Reorder services API failed, saving locally', err);
    }
    saveLocalData({ ...data, services });
    return true;
  };

  // Mutator: Course
  const saveCourse = async (course: Partial<Course>): Promise<boolean> => {
    let apiSuccess = false;
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
        apiSuccess = true;
        await refreshData();
      }
    } catch (err) {
      console.warn('Failed to save course via API, saving locally', err);
    }

    if (!apiSuccess) {
      const isEdit = Boolean(course.id && data.courses.some((c) => c.id === course.id));
      let newCourses = [...data.courses];
      if (isEdit) {
        newCourses = newCourses.map(c => c.id === course.id ? ({ ...c, ...course } as Course) : c);
      } else {
        const newCourseObj: Course = {
          id: course.id || `crs-${Date.now()}`,
          title: course.title || 'New Course',
          category: course.category || 'Development',
          duration: course.duration || '2 Months',
          description: course.description || '',
          longDescription: course.longDescription || '',
          fee: course.fee || 'Contact Admissions',
          syllabus: course.syllabus || [],
          skillsGained: course.skillsGained || [],
          featured: course.featured || false,
          imageUrl: course.imageUrl || '/brandlogo.png',
          status: course.status || 'Active',
          order: course.order || newCourses.length + 1
        };
        newCourses.push(newCourseObj);
      }
      saveLocalData({ ...data, courses: newCourses });
    }
    return true;
  };

  const deleteCourse = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.warn('Delete course API failed, deleting locally', err);
    }
    saveLocalData({ ...data, courses: data.courses.filter(c => c.id !== id) });
    return true;
  };

  // Mutator: Blog
  const saveBlog = async (blog: Partial<BlogPost>): Promise<boolean> => {
    let apiSuccess = false;
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
        apiSuccess = true;
        await refreshData();
      }
    } catch (err) {
      console.warn('Failed to save blog via API, saving locally', err);
    }

    if (!apiSuccess) {
      const id = blog.id || blog._id || `blog-${Date.now()}`;
      const isEdit = data.blogs.some(b => b.id === id || b._id === id);
      let newBlogs = [...data.blogs];
      const contentArr = Array.isArray(blog.content) ? blog.content : (blog.content ? [blog.content] : ['']);
      if (isEdit) {
        newBlogs = newBlogs.map(b => (b.id === id || b._id === id) ? ({ ...b, ...blog, content: contentArr } as BlogPost) : b);
      } else {
        const newBlogObj: BlogPost = {
          id,
          title: blog.title || 'New Blog Article',
          slug: blog.slug || `article-${Date.now()}`,
          excerpt: blog.excerpt || '',
          content: contentArr,
          category: blog.category || 'Tech & IT',
          author: blog.author || 'Javed Hattar',
          publishedAt: blog.publishedAt || new Date().toISOString().split('T')[0],
          readTime: blog.readTime || '3 min read',
          tags: blog.tags || [],
          imageUrl: blog.imageUrl || '/brandlogo.png',
          isPublished: blog.isPublished !== false
        };
        newBlogs.push(newBlogObj);
      }
      saveLocalData({ ...data, blogs: newBlogs });
    }
    return true;
  };

  const deleteBlog = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.warn('Delete blog API failed, deleting locally', err);
    }
    saveLocalData({ ...data, blogs: data.blogs.filter(b => b.id !== id && b._id !== id) });
    return true;
  };

  // Mutator: Verification
  const saveVerification = async (record: Partial<StudentResult>): Promise<boolean> => {
    let apiSuccess = false;
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
        apiSuccess = true;
        await refreshData();
      }
    } catch (err) {
      console.warn('Failed to save verification via API, saving locally', err);
    }

    if (!apiSuccess && record.rollNo) {
      const isEdit = data.studentResults.some(r => r.rollNo.toLowerCase() === record.rollNo?.toLowerCase());
      let newResults = [...data.studentResults];
      if (isEdit) {
        newResults = newResults.map(r => r.rollNo.toLowerCase() === record.rollNo?.toLowerCase() ? ({ ...r, ...record } as StudentResult) : r);
      } else {
        const newRecord: StudentResult = {
          rollNo: record.rollNo,
          name: record.name || 'Student Name',
          fatherName: record.fatherName || 'Father Name',
          enrollmentNo: record.enrollmentNo || `ENR-${Date.now().toString().slice(-6)}`,
          courseName: record.courseName || 'Course Title',
          duration: record.duration || '3 Months',
          session: record.session || 'Jan 2026 - Mar 2026',
          grade: record.grade || 'A+',
          percentage: record.percentage || 90,
          theoryMarks: record.theoryMarks || 80,
          practicalMarks: record.practicalMarks || 90,
          vivaMarks: record.vivaMarks || 10,
          totalMarks: record.totalMarks || 180,
          maxMarks: record.maxMarks || 200,
          issueDate: record.issueDate || new Date().toISOString().split('T')[0],
          certificateNo: record.certificateNo || `FG-CERT-${Date.now().toString().slice(-5)}`,
          verificationStatus: record.verificationStatus || 'Verified',
          remarks: record.remarks || 'Pass'
        };
        newResults.push(newRecord);
      }
      saveLocalData({ ...data, studentResults: newResults });
    }
    return true;
  };

  const deleteVerification = async (rollNo: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/verifications/${rollNo}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.warn('Delete verification API failed, deleting locally', err);
    }
    saveLocalData({ ...data, studentResults: data.studentResults.filter(r => r.rollNo.toLowerCase() !== rollNo.toLowerCase()) });
    return true;
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
      }
    } catch (err) {
      console.warn('Save homepage API failed, saving locally', err);
    }
    saveLocalData({ ...data, homepage: { ...data.homepage, ...homepage } });
    return true;
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
      }
    } catch (err) {
      console.warn('Save contact API failed, saving locally', err);
    }
    saveLocalData({ ...data, contact: { ...data.contact, ...contact } });
    return true;
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
      }
    } catch (err) {
      console.warn('Save mentor API failed, saving locally', err);
    }
    saveLocalData({ ...data, mentor: { ...data.mentor, ...mentor } });
    return true;
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
      console.warn('Server image upload failed, using base64 image string', err);
    }
    // Return base64 image data URL directly so uploaded image renders everywhere on Vercel/Static!
    return base64Image;
  };

  // Admissions
  const submitAdmission = async (app: Partial<EnrollmentApplication>): Promise<boolean> => {
    const newApp: EnrollmentApplication = {
      id: app.id || `adm-${Date.now()}`,
      fullName: app.fullName || 'Applicant',
      fatherName: app.fatherName || '',
      phone: app.phone || '',
      whatsapp: app.whatsapp || '',
      email: app.email || '',
      courseId: app.courseId || '',
      courseTitle: app.courseTitle || 'Selected Course',
      address: app.address || '',
      message: app.message || '',
      submittedAt: new Date().toISOString()
    };

    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(app)
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.warn('Submit admission API failed, saving locally', err);
    }

    saveLocalData({ ...data, admissions: [newApp, ...(data.admissions || [])] });
    return true;
  };

  const deleteAdmission = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.warn('Delete admission API failed, deleting locally', err);
    }
    saveLocalData({ ...data, admissions: (data.admissions || []).filter(a => a.id !== id) });
    return true;
  };

  // Inquiries / Contact Messages
  const submitInquiry = async (inquiry: Partial<ContactInquiry>): Promise<boolean> => {
    const newInquiry: ContactInquiry = {
      id: inquiry.id || `inq-${Date.now()}`,
      name: inquiry.name || 'Visitor',
      email: inquiry.email || '',
      phone: inquiry.phone || '',
      subject: inquiry.subject || 'General Inquiry',
      message: inquiry.message || '',
      submittedAt: new Date().toISOString()
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry)
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.warn('Submit inquiry API failed, saving locally', err);
    }

    saveLocalData({ ...data, inquiries: [newInquiry, ...(data.inquiries || [])] });
    return true;
  };

  const deleteInquiry = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.warn('Delete inquiry API failed, deleting locally', err);
    }
    saveLocalData({ ...data, inquiries: (data.inquiries || []).filter(inq => inq.id !== id) });
    return true;
  };

  const saveSettings = async (settings: Partial<SiteSettings>): Promise<boolean> => {
    const updatedSettings = {
      ...data.settings,
      ...settings
    };

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.warn('Save settings API failed, saving locally', err);
    }

    saveLocalData({ ...data, settings: updatedSettings });
    return true;
  };

  const resetSettings = async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/settings/reset', {
        method: 'POST',
        headers: getHeaders()
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.warn('Reset settings API failed, resetting locally', err);
    }
    saveLocalData({ ...data, settings: defaultSiteSettings });
    return true;
  };

  const saveMediaItem = async (item: Partial<MediaItem>, base64Image?: string): Promise<boolean> => {
    const newMedia: MediaItem = {
      id: item.id || `m-${Date.now()}`,
      filename: item.filename || 'uploaded-file.jpg',
      url: base64Image || item.url || '/brandlogo.png',
      category: item.category || 'General',
      uploadedAt: new Date().toISOString().split('T')[0],
      size: item.size || 'Base64',
      dimensions: item.dimensions || 'Responsive'
    };

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ item, base64Image })
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.warn('Save media API failed, saving locally', err);
    }

    saveLocalData({ ...data, media: [newMedia, ...(data.media || [])] });
    return true;
  };

  const deleteMediaItem = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.warn('Delete media API failed, deleting locally', err);
    }
    saveLocalData({ ...data, media: (data.media || []).filter(m => m.id !== id) });
    return true;
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
        submitInquiry,
        deleteInquiry,
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
