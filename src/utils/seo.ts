/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, BlogPost } from '../types';
import { SITE_URL } from './routes';

export interface PageMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: 'website' | 'article';
  ogImage: string;
  robots: string;
  structuredData?: object[];
}

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

// Global Schema for Organization / LocalBusiness / Mentor
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': `${SITE_URL}/#organization`,
    name: 'Future Gates IT Center',
    alternateName: 'Future Gates Institute of Information Technology',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: DEFAULT_OG_IMAGE,
    description: 'Premier IT training institute and digital solutions agency in Khushab, Punjab, Pakistan. Offering practical courses in Web Development, Graphic Design, AI Tools, Digital Marketing, and Office Automation.',
    slogan: 'Where Skills Become Your Income',
    email: 'futuregatesitcenter@gmail.com',
    telephone: '+923016775690',
    priceRange: 'PKR 8,000 - PKR 25,000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Main Campus, Jauharabad / Khushab City',
      addressLocality: 'Khushab',
      addressRegion: 'Punjab',
      addressCountry: 'PK'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '32.2965',
      longitude: '72.3528'
    },
    founder: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#founder`,
      name: 'Javed Hattar',
      jobTitle: 'Founder, Lead Instructor & IT Consultant',
      worksFor: {
        '@id': `${SITE_URL}/#organization`
      }
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00'
      }
    ],
    sameAs: [
      'https://futuregatesitcenter.com'
    ]
  };
}

// WebSite search action schema
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Future Gates IT Center',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/courses?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

// Course Schema
export function getCourseSchema(course: Course) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.longDescription || course.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Future Gates IT Center',
      sameAs: SITE_URL
    },
    courseCode: course.id,
    timeRequired: course.duration,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['In-Person', 'Online'],
      courseWorkload: course.duration,
      instructor: {
        '@type': 'Person',
        name: 'Javed Hattar',
        jobTitle: 'Lead IT Mentor'
      }
    },
    offers: {
      '@type': 'Offer',
      price: course.fee.replace(/[^\d]/g, '') || '10000',
      priceCurrency: 'PKR',
      category: 'Paid',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/courses/${course.id}`
    },
    educationalCredentialAwarded: 'Certificate of Completion (Online Verifiable)'
  };
}

// Article / Blog Schema
export function getArticleSchema(blog: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blogs/${blog.slug}`
    },
    headline: blog.title,
    description: blog.excerpt,
    articleBody: Array.isArray(blog.content) ? blog.content.join(' ') : blog.content,
    author: {
      '@type': 'Person',
      name: blog.author || 'Future Gates Editorial Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Future Gates IT Center',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`
      }
    },
    datePublished: '2026-01-15T08:00:00+05:00',
    dateModified: '2026-06-01T08:00:00+05:00',
    keywords: blog.tags ? blog.tags.join(', ') : 'IT Skills, Education, Future Gates IT Center'
  };
}

// BreadcrumbList Schema
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}

// Helper to generate SEO metadata based on current route
export function getPageMetadata(
  pathname: string,
  extra?: { course?: Course | null; blog?: BlogPost | null }
): PageMetadata {
  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');

  // 1. Homepage
  if (cleanPath === '/') {
    return {
      title: 'Future Gates IT Center | IT & AI Training in Khushab',
      description: 'Join Future Gates IT Center for hands-on training in Web Development, Graphic Design, AI Tools, Digital Marketing, and Office Automation. Verifiable certificates & freelancing mentorship in Khushab, Punjab.',
      canonicalUrl: `${SITE_URL}/`,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'index, follow',
      structuredData: [getOrganizationSchema(), getWebSiteSchema()]
    };
  }

  // 2. About
  if (cleanPath === '/about') {
    return {
      title: 'About Future Gates IT Center | IT & Digital Skills Training',
      description: 'Learn about Future Gates IT Center in Khushab, founded by lead mentor Javed Hattar. Discover our mission, practical computer lab facilities, verified certification system, and student success stories.',
      canonicalUrl: `${SITE_URL}/about`,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'index, follow',
      structuredData: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'About Us', url: '/about' }
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Future Gates IT Center',
          url: `${SITE_URL}/about`,
          description: 'Overview of Future Gates IT Center, facilities, mission, and leadership.'
        }
      ]
    };
  }

  // 3. Courses Directory
  if (cleanPath === '/courses') {
    return {
      title: 'IT & AI Courses | Future Gates IT Center',
      description: 'Explore comprehensive IT courses at Future Gates IT Center: Full-Stack Web Development, Graphic Design, AI & Prompt Engineering, WordPress, SEO, Video Editing, and Microsoft Office.',
      canonicalUrl: `${SITE_URL}/courses`,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'index, follow',
      structuredData: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Courses', url: '/courses' }
        ])
      ]
    };
  }

  // 4. Course Detail Page
  if (cleanPath.startsWith('/courses/') && extra?.course) {
    const c = extra.course;
    return {
      title: `${c.title} Course | Future Gates IT Center`,
      description: `${c.description} Duration: ${c.duration}. Fee: ${c.fee}. Hands-on syllabus, verifiable certification, and freelancing career preparation in Khushab.`,
      canonicalUrl: `${SITE_URL}/courses/${c.id}`,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'index, follow',
      structuredData: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Courses', url: '/courses' },
          { name: c.title, url: `/courses/${c.id}` }
        ]),
        getCourseSchema(c)
      ]
    };
  }

  // 5. Services
  if (cleanPath === '/services' || cleanPath.startsWith('/services/')) {
    return {
      title: 'Digital Services & Software Solutions | Future Gates IT Center',
      description: 'Professional digital agency and local business services by Future Gates IT Center: Custom Website Development, SEO, Social Media Ads, Official Stamps & Seals, Offset Printing, and CV Design.',
      canonicalUrl: `${SITE_URL}/services`,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'index, follow',
      structuredData: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' }
        ])
      ]
    };
  }

  // 6. Verification
  if (cleanPath === '/verification') {
    return {
      title: 'Online Certificate Verification | Future Gates IT Center',
      description: 'Verify student diplomas, course completion certificates, marks, roll numbers, and official registration status instantly on the Future Gates IT Center online verification portal.',
      canonicalUrl: `${SITE_URL}/verification`,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'index, follow',
      structuredData: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Certificate Verification', url: '/verification' }
        ])
      ]
    };
  }

  // 7. Blogs Directory
  if (cleanPath === '/blogs') {
    return {
      title: 'IT & Career Blogs | Future Gates IT Center',
      description: 'Read the latest technical guides, AI automation tutorials, web design insights, freelancing tips, and career advice published by Future Gates IT Center educators.',
      canonicalUrl: `${SITE_URL}/blogs`,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'index, follow',
      structuredData: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blogs', url: '/blogs' }
        ])
      ]
    };
  }

  // 8. Blog Detail Page
  if (cleanPath.startsWith('/blogs/') && extra?.blog) {
    const b = extra.blog;
    return {
      title: `${b.title} | Future Gates IT Center Blog`,
      description: b.excerpt,
      canonicalUrl: `${SITE_URL}/blogs/${b.slug}`,
      ogType: 'article',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'index, follow',
      structuredData: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blogs', url: '/blogs' },
          { name: b.title, url: `/blogs/${b.slug}` }
        ]),
        getArticleSchema(b)
      ]
    };
  }

  // 9. Admission Form
  if (cleanPath === '/admission') {
    return {
      title: 'Online Admission 2026 | Future Gates IT Center',
      description: 'Apply online for IT training diplomas, short courses, and software bootcamps at Future Gates IT Center Khushab. Limited seats available for 2026 batches.',
      canonicalUrl: `${SITE_URL}/admission`,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'index, follow',
      structuredData: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Online Admission', url: '/admission' }
        ])
      ]
    };
  }

  // 10. Contact
  if (cleanPath === '/contact') {
    return {
      title: 'Contact Future Gates IT Center | Location, Phone & WhatsApp',
      description: 'Get in touch with Future Gates IT Center in Khushab, Punjab. Call or WhatsApp +92301-6775690, email futuregatesitcenter@gmail.com, or visit our campus for counseling.',
      canonicalUrl: `${SITE_URL}/contact`,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'index, follow',
      structuredData: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Contact Us', url: '/contact' }
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Future Gates IT Center',
          url: `${SITE_URL}/contact`
        }
      ]
    };
  }

  // 11. Privacy
  if (cleanPath === '/privacy') {
    return {
      title: 'Privacy Policy | Future Gates IT Center',
      description: 'Review the official Privacy Policy of Future Gates IT Center. Learn how student data, inquiry details, and online communications are collected, safeguarded, and processed.',
      canonicalUrl: `${SITE_URL}/privacy`,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'index, follow',
      structuredData: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy' }
        ])
      ]
    };
  }

  // 12. Cookies
  if (cleanPath === '/cookies') {
    return {
      title: 'Cookie Policy | Future Gates IT Center',
      description: 'Understand how Future Gates IT Center uses cookies, analytical metrics, and browser storage to deliver a smooth and responsive educational experience.',
      canonicalUrl: `${SITE_URL}/cookies`,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'index, follow',
      structuredData: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Cookie Policy', url: '/cookies' }
        ])
      ]
    };
  }

  // 13. Terms
  if (cleanPath === '/terms') {
    return {
      title: 'Terms and Conditions | Future Gates IT Center',
      description: 'Read the terms of enrollment, course completion standards, code of conduct, and service provisions for Future Gates IT Center students and clients.',
      canonicalUrl: `${SITE_URL}/terms`,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'index, follow',
      structuredData: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Terms & Conditions', url: '/terms' }
        ])
      ]
    };
  }

  // 14. Disclaimer
  if (cleanPath === '/disclaimer') {
    return {
      title: 'Legal Disclaimer | Future Gates IT Center',
      description: 'Read the official educational disclaimer regarding course certifications, freelance earnings disclaimers, third-party software trademarks, and verification credentials.',
      canonicalUrl: `${SITE_URL}/disclaimer`,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'index, follow',
      structuredData: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Disclaimer Notice', url: '/disclaimer' }
        ])
      ]
    };
  }

  // 15. Admin / Private Page
  if (cleanPath === '/admin' || cleanPath.startsWith('/admin/')) {
    return {
      title: 'Staff Admin Portal | Future Gates IT Center',
      description: 'Secure administrative management console for Future Gates IT Center staff and instructors.',
      canonicalUrl: `${SITE_URL}/admin`,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'noindex, nofollow',
      structuredData: []
    };
  }

  // 16. 404 Not Found Page
  return {
    title: '404 - Page Not Found | Future Gates IT Center',
    description: 'The page you requested could not be found. Explore our IT courses, digital services, or contact Future Gates IT Center for assistance.',
    canonicalUrl: `${SITE_URL}/404`,
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    robots: 'noindex, follow',
    structuredData: []
  };
}
