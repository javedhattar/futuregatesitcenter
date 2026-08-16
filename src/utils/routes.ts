/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ParsedRoute {
  pathname: string;
  tab: string;
  courseSlug?: string;
  blogSlug?: string;
  serviceSlug?: string;
  isNotFound?: boolean;
  isAdmin?: boolean;
}

export const SITE_URL = 'https://futuregatesitcenter.com';

// Normalizes course aliases to canonical course IDs
export const COURSE_SLUG_ALIASES: Record<string, string> = {
  // Core Computer & Office
  'computer-basics': 'computer-basics',
  'computer-fundamentals': 'computer-basics',
  'cit': 'computer-basics',
  'ms-office': 'ms-office',
  'microsoft-office': 'ms-office',
  'advanced-excel': 'advanced-excel',
  'excel': 'advanced-excel',
  'powerpoint': 'powerpoint',
  'powerpoint-presentation': 'powerpoint',

  // Design & Media
  'graphic-designing': 'graphic-designing',
  'graphic-design': 'graphic-designing',
  'graphics-design': 'graphic-designing',
  'adobe-photoshop': 'graphic-designing',
  'photoshop': 'graphic-designing',
  'adobe-illustrator': 'adobe-illustrator',
  'illustrator': 'adobe-illustrator',
  'video-editing': 'video-editing',
  'premiere-pro': 'video-editing',
  'after-effects': 'after-effects',
  'motion-graphics': 'after-effects',
  'short-form-video': 'short-form-video',
  'reels-creation': 'short-form-video',
  'tiktok-editing': 'short-form-video',

  // Web & Freelancing
  'wordpress': 'wordpress',
  'wordpress-dev': 'wordpress',
  'wordpress-development': 'wordpress',
  'elementor': 'elementor',
  'elementor-pro': 'elementor',
  'freelancing': 'freelancing',
  'freelancing-training': 'freelancing',
  'ecommerce': 'ecommerce',
  'ecommerce-management': 'ecommerce',
  'e-commerce-management': 'ecommerce',
  'web-design-dev': 'web-design-dev',
  'web-development': 'web-design-dev',
  'web-design': 'web-design-dev',

  // Artificial Intelligence
  'artificial-intelligence': 'artificial-intelligence',
  'ai-tools': 'artificial-intelligence',
  'ai-for-beginners': 'artificial-intelligence',
  'generative-ai': 'generative-ai',
  'prompt-engineering': 'generative-ai',
  'ai-content-creation': 'ai-content-creation',
  'ai-copywriting': 'ai-content-creation',
  'ai-image-video': 'ai-image-video',
  'ai-generation': 'ai-image-video',
  'midjourney-course': 'ai-image-video',
  'ai-automation': 'ai-automation',
  'ai-agents': 'ai-automation',

  // Programming & Data
  'python': 'python',
  'python-programming': 'python',
  'python-ai-data': 'python-ai-data',
  'python-data-science': 'python-ai-data',
  'data-analytics-power-bi': 'data-analytics-power-bi',
  'power-bi': 'data-analytics-power-bi',
  'data-analytics': 'data-analytics-power-bi',
  'sql': 'sql',
  'sql-database': 'sql',
  'database-fundamentals': 'sql',

  // Digital Business
  'digital-marketing': 'digital-marketing',
  'social-media-marketing': 'social-media-marketing',
  'seo': 'seo',
  'search-engine-optimization': 'seo',
  'accounting': 'accounting',
  'accounting-courses': 'accounting',

  // Advanced IT
  'cybersecurity': 'cybersecurity',
  'cyber-security': 'cybersecurity',
  'networking': 'networking',
  'computer-networking': 'networking',
  'cloud-computing': 'cloud-computing',
  'cloud': 'cloud-computing',
  'ui-ux': 'ui-ux',
  'ui-ux-figma': 'ui-ux',
  'figma': 'ui-ux',
  'odoo-erp': 'odoo-erp',
  'erp-fundamentals': 'odoo-erp',
  'odoo': 'odoo-erp',
};

export function parsePath(rawPath: string, rawHash: string = ''): ParsedRoute {
  let path = rawPath.trim();

  // If there is an incoming hash and root path, check if it's a legacy hash route
  if ((path === '/' || path === '') && rawHash) {
    const cleanHash = rawHash.replace(/^#\/?/, '').toLowerCase();
    if (cleanHash === 'home') path = '/';
    else if (['about', 'courses', 'services', 'verification', 'blogs', 'admission', 'contact', 'privacy', 'cookies', 'terms', 'disclaimer', 'admin'].includes(cleanHash)) {
      path = `/${cleanHash}`;
    }
  }

  // Normalize path
  if (!path.startsWith('/')) path = `/${path}`;
  // Remove trailing slash except root
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  // Admin route
  if (path === '/admin' || path.startsWith('/admin/')) {
    return { pathname: path, tab: 'admin', isAdmin: true };
  }

  // Root
  if (path === '' || path === '/' || path === '/home') {
    return { pathname: '/', tab: 'home' };
  }

  // Course routes: /courses or /courses/:slug
  if (path === '/courses') {
    return { pathname: '/courses', tab: 'courses' };
  }
  if (path.startsWith('/courses/')) {
    const slug = path.replace('/courses/', '').trim();
    const resolvedId = COURSE_SLUG_ALIASES[slug.toLowerCase()] || slug;
    return { pathname: path, tab: 'course-detail', courseSlug: resolvedId };
  }

  // Blog routes: /blogs or /blogs/:slug
  if (path === '/blogs') {
    return { pathname: '/blogs', tab: 'blogs' };
  }
  if (path.startsWith('/blogs/')) {
    const slug = path.replace('/blogs/', '').trim();
    return { pathname: path, tab: 'blog-detail', blogSlug: slug };
  }

  // Service routes: /services or /services/:slug
  if (path === '/services') {
    return { pathname: '/services', tab: 'services' };
  }
  if (path.startsWith('/services/')) {
    const slug = path.replace('/services/', '').trim();
    return { pathname: path, tab: 'service-detail', serviceSlug: slug };
  }

  // Standard static pages
  const validStaticPages = [
    'about',
    'verification',
    'admission',
    'contact',
    'privacy',
    'cookies',
    'terms',
    'disclaimer',
  ];

  const sub = path.replace(/^\//, '').toLowerCase();
  if (validStaticPages.includes(sub)) {
    return { pathname: `/${sub}`, tab: sub };
  }

  // 404 Not Found
  return { pathname: path, tab: '404', isNotFound: true };
}

export function navigateTo(path: string, options: { replace?: boolean; scroll?: boolean } = {}) {
  const target = path.startsWith('/') ? path : `/${path}`;
  if (options.replace) {
    window.history.replaceState(null, '', target);
  } else {
    window.history.pushState(null, '', target);
  }
  // Dispatch custom popstate event so listeners update
  window.dispatchEvent(new PopStateEvent('popstate'));
  if (options.scroll !== false) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
