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

import { HomeView } from './pages/HomeView';
import { AboutView } from './pages/AboutView';
import { CoursesView } from './pages/CoursesView';
import { ServicesView } from './pages/ServicesView';
import { VerificationView } from './pages/VerificationView';
import { BlogsView } from './pages/BlogsView';
import { ContactView } from './pages/ContactView';
import { AdmissionView } from './pages/AdmissionView';
import { LegalView } from './pages/LegalViews';

function SiteHeadSync() {
  const { data } = useData();
  const settings = data?.settings;

  useEffect(() => {
    if (!settings) return;

    if (settings.instituteName) {
      document.title = `${settings.instituteName}${settings.tagline ? ` — ${settings.tagline}` : ''}`;
    }

    if (settings.faviconUrl) {
      let iconLink = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
      if (!iconLink) {
        iconLink = document.createElement('link');
        iconLink.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(iconLink);
      }
      iconLink.href = settings.faviconUrl;
    }
  }, [settings?.instituteName, settings?.tagline, settings?.faviconUrl]);

  return null;
}

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [enrollCourseId, setEnrollCourseId] = useState<string | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync state with URL Hash and Pathname for seamless SPA & Admin routing
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash.replace('#', '');

      if (path === '/admin' || path.startsWith('/admin/')) {
        setIsAdminOpen(true);
      } else if (hash) {
        setCurrentTab(hash);
      }
    };

    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);
    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
    };
  }, []);

  const handleSetTab = (tab: string) => {
    setCurrentTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
    window.history.pushState(null, '', '/admin');
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.pathname.startsWith('/admin')) {
      window.history.pushState(null, '', window.location.hash || '#home');
    }
  };

  const handleOpenEnrollment = (courseId?: string) => {
    setEnrollCourseId(courseId);
    setIsEnrollmentOpen(true);
  };

  return (
    <DataProvider>
      <SiteHeadSync />
      <div className="flex flex-col min-h-screen bg-brand-bg text-slate-800 font-sans selection:bg-brand-orange selection:text-white">
        {/* Header Bar */}
        <Header
          currentTab={currentTab}
          setTab={handleSetTab}
          onOpenEnrollment={() => handleOpenEnrollment()}
          onOpenAdmin={handleOpenAdmin}
        />

        {/* Main View Router */}
        <main className="grow w-full">
          {currentTab === 'home' && (
            <HomeView
              setTab={handleSetTab}
              onOpenEnrollment={(cId) => handleOpenEnrollment(cId)}
            />
          )}

          {currentTab === 'about' && (
            <AboutView
              setTab={handleSetTab}
              onOpenEnrollment={() => handleOpenEnrollment()}
            />
          )}

          {currentTab === 'courses' && (
            <CoursesView
              onOpenEnrollment={(cId) => handleOpenEnrollment(cId)}
            />
          )}

          {currentTab === 'services' && <ServicesView />}

          {currentTab === 'verification' && <VerificationView />}

          {currentTab === 'blogs' && <BlogsView />}

          {currentTab === 'contact' && <ContactView />}

          {currentTab === 'admission' && <AdmissionView />}

          {currentTab === 'privacy' && <LegalView type="privacy" />}

          {currentTab === 'terms' && <LegalView type="terms" />}

          {currentTab === 'disclaimer' && <LegalView type="disclaimer" />}

          {currentTab === 'cookies' && <LegalView type="cookies" />}
        </main>

        {/* Footer */}
        <Footer
          setTab={handleSetTab}
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
        <CookieBanner onNavigateToCookies={() => handleSetTab('cookies')} />
      </div>
    </DataProvider>
  );
}
