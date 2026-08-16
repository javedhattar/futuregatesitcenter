/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck, GraduationCap, Lock, Search } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { GlobalSearchBar } from './GlobalSearchBar';
import { useData } from '../context/DataContext';
import { Course, BlogPost } from '../types';
import { navigateTo } from '../utils/routes';

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
  onOpenEnrollment: (courseId?: string) => void;
  onOpenAdmin: () => void;
  onSelectCourse?: (course: Course) => void;
  onSelectBlog?: (blog: BlogPost) => void;
  onSearchCoursesTab?: (query: string) => void;
  onSearchBlogsTab?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setTab,
  onOpenEnrollment,
  onOpenAdmin,
  onSelectCourse,
  onSelectBlog,
  onSearchCoursesTab,
  onSearchBlogsTab,
}) => {
  const { data } = useData();
  const settings = data?.settings;
  const contact = data?.contact || {};
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const headerPhone = settings?.headerPhone || contact.phone || '+92301-6775690';
  const headerWhatsapp = settings?.headerWhatsapp || contact.whatsapp || '923016775690';
  const showAnnouncement = settings?.showAnnouncementBar !== false;
  const announcementText = settings?.announcementText || 'System Fully Functional • Admissions Open 2026';
  const headerAddress = settings?.contactInfo?.address || contact.address || 'Future Gates IT Center, Main Campus, Khushab, Punjab, Pakistan';
  const ctaText = settings?.headerCtaText || 'Enroll Now';

  // Body scroll locking and Escape key handling for accessible mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isOpen) setIsOpen(false);
        if (isMobileSearchOpen) setIsMobileSearchOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isMobileSearchOpen]);

  const navItems = [
    { id: 'home', path: '/', label: 'Home' },
    { id: 'about', path: '/about', label: 'About' },
    { id: 'courses', path: '/courses', label: 'Courses' },
    { id: 'services', path: '/services', label: 'Services' },
    { id: 'verification', path: '/verification', label: 'Verification' },
    { id: 'blogs', path: '/blogs', label: 'Blogs' },
    { id: 'contact', path: '/contact', label: 'Contact' },
    { id: 'admission', path: '/admission', label: 'Admission' },
  ].filter((item) => {
    if (!settings?.navItemsVisibility) return true;
    return settings.navItemsVisibility[item.id as keyof typeof settings.navItemsVisibility] !== false;
  });

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    setIsMobileSearchOpen(false);
    navigateTo(path);
  };

  const handleCtaClick = () => {
    const link = settings?.headerCtaLink || 'admission';
    if (link === 'admission') {
      navigateTo('/admission');
    } else {
      navigateTo(`/${link}`);
    }
  };

  const whatsappUrl = `https://wa.me/${headerWhatsapp}?text=Hello%20Future%20Gates%20IT%20Center%2C%20I%20would%20like%20information%20about%20your%20courses%20and%20services.`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm no-print">
      {/* Top Announcement Strip */}
      {showAnnouncement && (
        <div className="bg-slate-900 border-b border-slate-800 py-1.5 px-3 sm:px-4 text-xs text-slate-300">
          <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2 text-[11px] font-semibold tracking-wide">
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {announcementText}
              </span>
              <span className="hidden md:inline text-slate-600">|</span>
              <span className="hidden md:inline text-slate-400 truncate max-w-xs xl:max-w-none">📍 {headerAddress}</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white flex items-center gap-1.5 font-mono text-[11px] hover:text-[#25D366] transition-colors"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" /> {headerPhone}
              </a>
              {settings?.showAdminHeaderButton === true && (
                <>
                  <span className="text-slate-700">|</span>
                  <a
                    href="/admin"
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenAdmin();
                      navigateTo('/admin');
                    }}
                    className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    title="Admin Portal Access"
                  >
                    <Lock className="w-3 h-3 text-orange-400" /> Admin
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 gap-2 sm:gap-4">
          {/* Logo Brand Title */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/');
            }}
            className="cursor-pointer flex items-center shrink-0"
            title="Future Gates IT Center Homepage"
          >
            <BrandLogo variant="dark" customLogoUrl={settings?.headerLogoUrl} />
          </a>

          {/* Desktop Navigation Links */}
          <nav 
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-2.5 xl:gap-5 2xl:gap-7 text-[11px] xl:text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            {navItems.map((item) => {
              const active = currentTab === item.id || (item.id === 'courses' && currentTab === 'course-detail') || (item.id === 'blogs' && currentTab === 'blog-detail');
              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.path);
                  }}
                  id={`nav-btn-${item.id}`}
                  className={`py-1 whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                    active
                      ? 'text-blue-600 border-b-2 border-blue-600 font-extrabold'
                      : 'hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Global Search Bar */}
          <div className="hidden xl:block w-52 2xl:w-64 shrink-0">
            <GlobalSearchBar
              onSelectCourse={(course) => {
                onSelectCourse?.(course);
              }}
              onSelectBlog={(blog) => {
                onSelectBlog?.(blog);
              }}
              onSearchCoursesTab={onSearchCoursesTab}
              onSearchBlogsTab={onSearchBlogsTab}
              onOpenEnrollment={onOpenEnrollment}
            />
          </div>

          {/* Right Action Call (Verify Card & CTA) */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <a
              href="/verification"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/verification');
              }}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200 shrink-0"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Verify Card</span>
            </a>

            <a
              href="/admission"
              onClick={(e) => {
                e.preventDefault();
                handleCtaClick();
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 xl:px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <GraduationCap className="w-4 h-4" /> <span className="whitespace-nowrap">{ctaText}</span>
            </a>
          </div>

          {/* Mobile menu and search toggle buttons */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className={`p-2 rounded-lg transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isMobileSearchOpen ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-100'
              }`}
              aria-label="Toggle search"
              title="Search courses & blogs"
            >
              <Search className="w-5 h-5" />
            </button>

            <a
              href="/verification"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/verification');
              }}
              className="sm:hidden px-2 py-1.5 bg-blue-600 text-white text-[11px] font-bold rounded-lg flex items-center gap-1 cursor-pointer uppercase tracking-wider min-h-[38px]"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verify</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Expandable Search Bar Header Strip */}
        {isMobileSearchOpen && (
          <div className="lg:hidden py-3 border-t border-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
            <GlobalSearchBar
              isMobile={true}
              onSelectCourse={(course) => {
                setIsMobileSearchOpen(false);
                onSelectCourse?.(course);
              }}
              onSelectBlog={(blog) => {
                setIsMobileSearchOpen(false);
                onSelectBlog?.(blog);
              }}
              onSearchCoursesTab={(q) => {
                setIsMobileSearchOpen(false);
                onSearchCoursesTab?.(q);
              }}
              onSearchBlogsTab={(q) => {
                setIsMobileSearchOpen(false);
                onSearchBlogsTab?.(q);
              }}
              onOpenEnrollment={(cId) => {
                setIsMobileSearchOpen(false);
                onOpenEnrollment(cId);
              }}
            />
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div 
          id="mobile-navigation"
          role="navigation"
          aria-label="Mobile Navigation"
          className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          {/* Search bar inside drawer */}
          <div className="pb-1">
            <GlobalSearchBar
              isMobile={true}
              onSelectCourse={(course) => {
                setIsOpen(false);
                onSelectCourse?.(course);
              }}
              onSelectBlog={(blog) => {
                setIsOpen(false);
                onSelectBlog?.(blog);
              }}
              onSearchCoursesTab={(q) => {
                setIsOpen(false);
                onSearchCoursesTab?.(q);
              }}
              onSearchBlogsTab={(q) => {
                setIsOpen(false);
                onSearchBlogsTab?.(q);
              }}
              onOpenEnrollment={(cId) => {
                setIsOpen(false);
                onOpenEnrollment(cId);
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const active = currentTab === item.id || (item.id === 'courses' && currentTab === 'course-detail') || (item.id === 'blogs' && currentTab === 'blog-detail');
              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.path);
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all min-h-[44px] flex items-center cursor-pointer ${
                    active
                      ? 'bg-blue-600 text-white font-extrabold shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white bg-slate-800/40'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold text-xs transition-colors cursor-pointer uppercase tracking-wider shadow-md shadow-emerald-900/30 min-h-[44px]"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              WhatsApp Support ({headerPhone})
            </a>

            <a
              href="/admission"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                handleCtaClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-xl font-bold text-xs hover:bg-orange-600 transition-colors cursor-pointer uppercase tracking-wider shadow-md min-h-[44px]"
            >
              <GraduationCap className="w-4 h-4" />
              {ctaText}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

