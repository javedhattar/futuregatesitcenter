/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Phone, ShieldCheck, GraduationCap, Lock } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useData } from '../context/DataContext';

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
  onOpenEnrollment: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setTab,
  onOpenEnrollment,
  onOpenAdmin,
}) => {
  const { data } = useData();
  const settings = data?.settings;
  const contact = data?.contact || {};
  const [isOpen, setIsOpen] = useState(false);

  const headerPhone = settings?.headerPhone || contact.phone || '+92301-6775690';
  const headerWhatsapp = settings?.headerWhatsapp || contact.whatsapp || '923016775690';
  const showAnnouncement = settings?.showAnnouncementBar !== false;
  const announcementText = settings?.announcementText || 'System Fully Functional • Admissions Open 2026';
  const headerAddress = settings?.contactInfo?.address || contact.address || 'Khushab & Rawalpindi, Punjab, Pakistan';
  const ctaText = settings?.headerCtaText || 'Enroll Now';

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'courses', label: 'Courses' },
    { id: 'services', label: 'Services' },
    { id: 'verification', label: 'Verification' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'contact', label: 'Contact' },
    { id: 'admission', label: 'Admission' },
  ].filter((item) => {
    if (!settings?.navItemsVisibility) return true;
    return settings.navItemsVisibility[item.id as keyof typeof settings.navItemsVisibility] !== false;
  });

  const handleNavClick = (tabId: string) => {
    setTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCtaClick = () => {
    const link = settings?.headerCtaLink || 'admission';
    if (link === 'admission') {
      onOpenEnrollment();
    } else {
      handleNavClick(link);
    }
  };

  const whatsappUrl = `https://wa.me/${headerWhatsapp}?text=Hello%20Future%20Gates%20IT%20Center%2C%20I%20would%20like%20information%20about%20your%20courses%20and%20services.`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm no-print">
      {/* Top Announcement Strip */}
      {showAnnouncement && (
        <div className="bg-slate-900 border-b border-slate-800 py-1.5 px-4 text-xs text-slate-300">
          <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2 text-[11px] font-semibold tracking-wide">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {announcementText}
              </span>
              <span className="hidden md:inline text-slate-600">|</span>
              <span className="hidden md:inline text-slate-400">📍 {headerAddress}</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white flex items-center gap-1 font-mono text-[11px]"
              >
                <Phone className="w-3 h-3 text-emerald-400" /> {headerPhone}
              </a>
              {settings?.showAdminHeaderButton === true && (
                <>
                  <span className="text-slate-700">|</span>
                  <button
                    onClick={onOpenAdmin}
                    className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    title="Admin Portal Access"
                  >
                    <Lock className="w-3 h-3 text-orange-400" /> Admin
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo Brand Title */}
          <div className="cursor-pointer flex items-center" onClick={() => handleNavClick('home')}>
            <BrandLogo variant="dark" customLogoUrl={settings?.headerLogoUrl} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold uppercase tracking-wider text-slate-600">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-btn-${item.id}`}
                  className={`py-1 transition-colors duration-200 cursor-pointer ${
                    active
                      ? 'text-blue-600 border-b-2 border-blue-600 font-extrabold'
                      : 'hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Call (WhatsApp Chat & Quick Verify) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('verification')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verify Card
            </button>

            <button
              onClick={handleCtaClick}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" /> {ctaText}
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => handleNavClick('verification')}
              className="px-2.5 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer uppercase tracking-wider"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Verify
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all ${
                    active
                      ? 'bg-blue-600 text-white font-extrabold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-bold text-xs hover:bg-emerald-500 transition-colors cursor-pointer uppercase tracking-wider"
            >
              <Phone className="w-4 h-4" />
              WhatsApp Support ({headerPhone})
            </a>

            <button
              onClick={() => {
                setIsOpen(false);
                handleCtaClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-full font-bold text-xs hover:bg-orange-600 transition-colors cursor-pointer uppercase tracking-wider"
            >
              <GraduationCap className="w-4 h-4" />
              {ctaText}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
