/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Facebook, Twitter, Linkedin, Github, Youtube, Mail, Phone, MapPin, Shield, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useData } from '../context/DataContext';
import { navigateTo } from '../utils/routes';

interface FooterProps {
  setTab: (tab: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setTab, onOpenAdmin }) => {
  const { data } = useData();
  const settings = data?.settings;
  const contact = data?.contact || {};
  const currentYear = new Date().getFullYear();

  const footerDesc = settings?.footerDescription || 'Future Gates IT Center is a professional IT training institute and digital agency situated in Khushab, Punjab, Pakistan. Built on the core ethos "Where Skills Become Your Income", we empower students with job-ready technical skills and verifiable certifications.';
  const footerPhone = settings?.footerPhone || contact.phone || '+92301-6775690';
  const footerWhatsapp = settings?.footerWhatsapp || contact.whatsapp || '923016775690';
  const footerEmail = settings?.footerEmail || contact.email || 'futuregatesitcenter@gmail.com';
  const footerAddress = settings?.footerAddress || contact.address || 'Future Gates IT Center, Main Campus, Khushab, Punjab, Pakistan';
  const footerCopyright = settings?.footerCopyrightText || `© ${currentYear} Future Gates IT Center, Pakistan. All Rights Reserved.`;

  const social = settings?.socialMedia || {
    facebook: contact.facebook || '',
    twitter: contact.twitter || '',
    linkedin: contact.linkedin || '',
    github: contact.github || '',
    youtube: contact.youtube || '',
    instagram: contact.instagram || '',
    tiktok: contact.tiktok || '',
    whatsapp: footerWhatsapp ? `https://wa.me/${footerWhatsapp}` : ''
  };

  const handleLinkClick = (path: string) => {
    navigateTo(path);
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 no-print">
      {/* Upper Footer Widget Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Main Info Container */}
          <div className="space-y-5">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/');
              }}
              title="Future Gates IT Center"
            >
              <BrandLogo variant="light" customLogoUrl={settings?.footerLogoUrl} />
            </a>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              {footerDesc}
            </p>

            {/* Social Media Links - Only displayed if URL provided */}
            <div className="flex items-center flex-wrap gap-2 pt-1 font-bold">
              {social.facebook && social.facebook.trim() !== '' && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-slate-400"
                  aria-label="Facebook Profile"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {social.twitter && social.twitter.trim() !== '' && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-slate-400"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {social.linkedin && social.linkedin.trim() !== '' && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-slate-400"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {social.github && social.github.trim() !== '' && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-slate-400"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {social.youtube && social.youtube.trim() !== '' && (
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all text-slate-400"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {social.whatsapp && social.whatsapp.trim() !== '' && (
                <a
                  href={social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all text-slate-400"
                  aria-label="Official WhatsApp"
                  title="Chat on WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Nav Links */}
          {(settings?.showFooterQuickLinks !== false) && (
            <div className="space-y-4">
              <h3 className="text-white text-xs font-bold tracking-widest uppercase border-l-2 border-orange-500 pl-2">
                Institute Navigation
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/');
                    }}
                    className="hover:text-orange-400 transition-all cursor-pointer text-slate-400"
                  >
                    Home Portal
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/about');
                    }}
                    className="hover:text-orange-400 transition-all cursor-pointer text-slate-400"
                  >
                    About Future Gates
                  </a>
                </li>
                <li>
                  <a
                    href="/courses"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/courses');
                    }}
                    className="hover:text-orange-400 transition-all cursor-pointer text-slate-400"
                  >
                    Technical Courses
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/services');
                    }}
                    className="hover:text-orange-400 transition-all cursor-pointer text-slate-400"
                  >
                    Software Services & Printing
                  </a>
                </li>
                <li>
                  <a
                    href="/blogs"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/blogs');
                    }}
                    className="hover:text-orange-400 transition-all cursor-pointer text-slate-400"
                  >
                    Blog Resources
                  </a>
                </li>
                <li>
                  <a
                    href="/verification"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/verification');
                    }}
                    className="hover:text-orange-400 transition-all font-semibold cursor-pointer text-slate-400"
                  >
                    Student Certificate Check
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/contact');
                    }}
                    className="hover:text-orange-400 transition-all cursor-pointer text-slate-400"
                  >
                    Inquiries & Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/admission"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/admission');
                    }}
                    className="hover:text-orange-400 transition-all cursor-pointer text-orange-400 font-bold uppercase tracking-wider"
                  >
                    Online Admission Form
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Legal Pages */}
          {(settings?.showFooterLegal !== false) && (
            <div className="space-y-4">
              <h3 className="text-white text-xs font-bold tracking-widest uppercase border-l-2 border-blue-500 pl-2">
                Legal Pages & Portal
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="/privacy"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/privacy');
                    }}
                    className="hover:text-orange-400 transition-all cursor-pointer text-slate-400"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/cookies"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/cookies');
                    }}
                    className="hover:text-orange-400 transition-all cursor-pointer text-slate-400"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/terms');
                    }}
                    className="hover:text-orange-400 transition-all cursor-pointer text-slate-400"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/disclaimer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/disclaimer');
                    }}
                    className="hover:text-orange-400 transition-all cursor-pointer text-slate-400"
                  >
                    Disclaimer Notice
                  </a>
                </li>
                {settings?.showAdminFooterLink === true && (
                  <li className="pt-2">
                    <a
                      href="/admin"
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenAdmin();
                        handleLinkClick('/admin');
                      }}
                      className="text-xs text-orange-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <Shield className="w-3.5 h-3.5" /> Staff Admin Dashboard
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Contacts Info */}
          <div className="space-y-4">
            <h3 className="text-white text-xs font-bold tracking-widest uppercase border-l-2 border-emerald-500 pl-2">
              Head Office Contact
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 leading-relaxed block">
                    {footerAddress}
                  </span>
                  <a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/contact');
                    }}
                    className="text-[11px] text-orange-400 hover:text-orange-300 font-semibold underline mt-0.5 inline-flex items-center gap-1 cursor-pointer"
                  >
                    View Official Campus Map →
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                </div>
                <a
                  href={`https://wa.me/${footerWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-[#25D366] transition-colors font-mono font-bold flex items-center gap-2 flex-wrap"
                  title="Click to Chat on WhatsApp"
                >
                  <span>{footerPhone}</span>
                  <span className="text-[10px] font-sans font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30">
                    WhatsApp
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${footerEmail}`} className="text-slate-300 hover:text-blue-400 transition-colors font-mono">
                  {footerEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5 pt-2 border-t border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px] text-emerald-400 font-semibold">
                  Professional IT Skills & Technical Training
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Under Footer Copyright & Verification Disclaimer */}
      <div className="bg-slate-950 py-6 border-t border-slate-800 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
          <div className="space-y-1">
            <p>{footerCopyright}</p>
            <p className="text-[10px] text-slate-500">
              Disclaimer: Certificate verification values offered on this portal represent official records sanctioned under certification program guidelines of Future Gates I.T Center Punjab.
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-3 gap-y-1 text-[11px] text-slate-400">
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/terms');
              }}
              className="hover:text-orange-400 cursor-pointer"
            >
              Terms
            </a>
            <span>•</span>
            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/privacy');
              }}
              className="hover:text-orange-400 cursor-pointer"
            >
              Privacy
            </a>
            <span>•</span>
            <a
              href="/cookies"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/cookies');
              }}
              className="hover:text-orange-400 cursor-pointer"
            >
              Cookie Policy
            </a>
            <span>•</span>
            <a
              href="/disclaimer"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/disclaimer');
              }}
              className="hover:text-orange-400 cursor-pointer"
            >
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
