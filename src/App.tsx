/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EnrollmentModal } from './components/EnrollmentModal';
import { AdminDashboard } from './components/AdminDashboard';
import { CookieBanner } from './components/CookieBanner';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SEOHead } from './components/SEOHead';
import { Course, BlogPost } from './types';
import { parsePath, navigateTo } from './utils/routes';

import { HomeView } from './pages/HomeView';
import { AboutView } from './pages/AboutView';
import { CoursesView } from './pages/CoursesView';
import { CourseDetailView } from './pages/CourseDetailView';
import { ServicesView } from './pages/ServicesView';
import { VerificationView } from './pages/VerificationView';
import { BlogsView } from './pages/BlogsView';
import { BlogDetailView } from './pages/BlogDetailView';
import { ContactView } from './pages/ContactView';
import { AdmissionView } from './pages/AdmissionView';
import { LegalView } from './pages/LegalViews';
import { NotFoundView } from './pages/NotFoundView';

function AppContent() {
  const { data } = useData();
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [currentHash, setCurrentHash] = useState<string>(() => {
    return window.location.hash || '';
  });

  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [enrollCourseId, setEnrollCourseId] = useState<string | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Global search navigation state
  const [courseSearchQuery, setCourseSearchQuery] = useState<string>('');
  const [blogSearchQuery, setBlogSearchQuery] = useState<string>('');

  // Synchronize route state with window.location
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      setCurrentPath(path);
      setCurrentHash(hash);

      if (path === '/admin' || path.startsWith('/admin/')) {
        setIsAdminOpen(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret key combination: Ctrl + Shift + A (or Cmd + Shift + A on Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('app:navigate', handleRouteChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('app:navigate', handleRouteChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const routeInfo = parsePath(currentPath, currentHash);

  // Look up course or blog if on a detail page
  const matchedCourse: Course | undefined = routeInfo.tab === 'course-detail' && routeInfo.courseSlug
    ? data.courses?.find((c) => c.id.toLowerCase() === routeInfo.courseSlug?.toLowerCase())
    : undefined;

  const matchedBlog: BlogPost | undefined = routeInfo.tab === 'blog-detail' && routeInfo.blogSlug
    ? data.blogs?.find((b) => b.slug.toLowerCase() === routeInfo.blogSlug?.toLowerCase() || b.id.toLowerCase() === routeInfo.blogSlug?.toLowerCase())
    : undefined;

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
    navigateTo('/admin');
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.pathname.startsWith('/admin')) {
      navigateTo('/');
    }
  };

  const handleOpenEnrollment = (courseId?: string) => {
    setEnrollCourseId(courseId);
    setIsEnrollmentOpen(true);
  };

  const handleSelectCourseFromSearch = (course: Course) => {
    navigateTo(`/courses/${course.id}`);
  };

  const handleSelectBlogFromSearch = (blog: BlogPost) => {
    navigateTo(`/blogs/${blog.slug}`);
  };

  const handleSearchCoursesTab = (query: string) => {
    setCourseSearchQuery(query);
    navigateTo('/courses');
  };

  const handleSearchBlogsTab = (query: string) => {
    setBlogSearchQuery(query);
    navigateTo('/blogs');
  };

  const renderCurrentView = () => {
    switch (routeInfo.tab) {
      case 'home':
        return (
          <HomeView
            setTab={(tab) => navigateTo(`/${tab === 'home' ? '' : tab}`)}
            onOpenEnrollment={(cId) => handleOpenEnrollment(cId)}
          />
        );

      case 'about':
        return (
          <AboutView
            setTab={(tab) => navigateTo(`/${tab === 'home' ? '' : tab}`)}
            onOpenEnrollment={() => handleOpenEnrollment()}
          />
        );

      case 'courses':
        return (
          <CoursesView
            onOpenEnrollment={(cId) => handleOpenEnrollment(cId)}
            initialSearchQuery={courseSearchQuery}
          />
        );

      case 'course-detail':
        return (
          <CourseDetailView
            courseId={routeInfo.courseSlug || ''}
            onOpenEnrollment={(cId) => handleOpenEnrollment(cId)}
          />
        );

      case 'services':
        return <ServicesView />;

      case 'verification':
        return <VerificationView />;

      case 'blogs':
        return (
          <BlogsView
            initialSearchQuery={blogSearchQuery}
          />
        );

      case 'blog-detail':
        return (
          <BlogDetailView
            slug={routeInfo.blogSlug || ''}
            onOpenEnrollment={(cId) => handleOpenEnrollment(cId)}
          />
        );

      case 'contact':
        return <ContactView />;

      case 'admission':
        return <AdmissionView />;

      case 'privacy':
        return <LegalView type="privacy" />;

      case 'terms':
        return <LegalView type="terms" />;

      case 'disclaimer':
        return <LegalView type="disclaimer" />;

      case 'cookies':
        return <LegalView type="cookies" />;

      case 'admin':
        return (
          <HomeView
            setTab={(tab) => navigateTo(`/${tab === 'home' ? '' : tab}`)}
            onOpenEnrollment={(cId) => handleOpenEnrollment(cId)}
          />
        );

      case '404':
      default:
        return <NotFoundView />;
    }
  };

  return (
    <>
      <SEOHead
        pathname={routeInfo.pathname}
        course={matchedCourse}
        blog={matchedBlog}
      />
      <div className="flex flex-col min-h-screen bg-brand-bg text-slate-800 font-sans selection:bg-brand-orange selection:text-white">
        {/* Header Bar */}
        <Header
          currentTab={routeInfo.tab}
          setTab={(tab) => navigateTo(`/${tab === 'home' ? '' : tab}`)}
          onOpenEnrollment={() => handleOpenEnrollment()}
          onOpenAdmin={handleOpenAdmin}
          onSelectCourse={handleSelectCourseFromSearch}
          onSelectBlog={handleSelectBlogFromSearch}
          onSearchCoursesTab={handleSearchCoursesTab}
          onSearchBlogsTab={handleSearchBlogsTab}
        />

        {/* Main View Router */}
        <main id="main-content" className="grow w-full">
          {renderCurrentView()}
        </main>

        {/* Footer */}
        <Footer
          setTab={(tab) => navigateTo(`/${tab === 'home' ? '' : tab}`)}
          onOpenAdmin={handleOpenAdmin}
        />

        {/* Enrollment Form Modal */}
        <EnrollmentModal
          isOpen={isEnrollmentOpen}
          onClose={() => setIsEnrollmentOpen(false)}
          selectedCourseId={enrollCourseId}
        />

        {/* Admin Panel Modal */}
        <AdminDashboard
          isOpen={isAdminOpen}
          onClose={handleCloseAdmin}
        />

        {/* AdSense / GDPR Cookie Consent Banner */}
        <CookieBanner onNavigateToCookies={() => navigateTo('/cookies')} />

        {/* Global Floating Official WhatsApp CTA */}
        <FloatingWhatsApp />
      </div>
    </>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
