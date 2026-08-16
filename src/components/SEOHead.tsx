/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Course, BlogPost } from '../types';
import { getPageMetadata } from '../utils/seo';

interface SEOHeadProps {
  pathname: string;
  course?: Course | null;
  blog?: BlogPost | null;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ pathname, course, blog }) => {
  useEffect(() => {
    const meta = getPageMetadata(pathname, { course, blog });

    // 1. Update Title
    document.title = meta.title;

    // 2. Helper to set/create <meta> tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let elem = document.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrVal}"]`);
      if (!elem) {
        elem = document.createElement('meta');
        elem.setAttribute(attrName, attrVal);
        document.head.appendChild(elem);
      }
      elem.setAttribute('content', content);
    };

    // 3. Update Meta Description & Robots
    setMetaTag('name', 'description', meta.description);
    setMetaTag('name', 'robots', meta.robots);

    // 4. Update Canonical Link
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', meta.canonicalUrl);

    // 5. Open Graph Meta Tags
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', meta.canonicalUrl);
    setMetaTag('property', 'og:type', meta.ogType);
    setMetaTag('property', 'og:image', meta.ogImage);
    setMetaTag('property', 'og:site_name', 'Future Gates IT Center');
    setMetaTag('property', 'og:locale', 'en_PK');

    // 6. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:image', meta.ogImage);

    // 7. Inject Structured Data JSON-LD
    const existingScripts = document.querySelectorAll('script[data-schema="futuregates-seo"]');
    existingScripts.forEach((s) => s.remove());

    if (meta.structuredData && meta.structuredData.length > 0) {
      meta.structuredData.forEach((schemaObj, idx) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-schema', 'futuregates-seo');
        script.setAttribute('data-index', String(idx));
        script.textContent = JSON.stringify(schemaObj);
        document.head.appendChild(script);
      });
    }

    return () => {
      // Cleanup on unmount if needed
    };
  }, [pathname, course, blog]);

  return null;
};
