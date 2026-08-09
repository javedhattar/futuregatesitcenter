/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, FileText, AlertCircle, Cookie, Megaphone, CheckCircle2, Lock, Eye, Mail, Phone, MapPin } from 'lucide-react';

interface LegalViewProps {
  type: 'privacy' | 'terms' | 'disclaimer' | 'cookies';
}

export const LegalView: React.FC<LegalViewProps> = ({ type }) => {
  if (type === 'privacy') {
    return (
      <div className="pb-16 max-w-4xl mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center border border-blue-200 shadow-sm">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-slate-900">Privacy Policy</h1>
            <p className="text-xs text-slate-500">Future Gates IT Center — Visitor & Student Data Protection Policy</p>
          </div>
        </div>

        <div className="space-y-6 text-xs text-slate-700 leading-relaxed bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
          <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-xl text-slate-800 text-xs">
            <p><strong>Effective Date:</strong> January 1, 2026 | <strong>Last Updated:</strong> August 2026</p>
            <p className="mt-1 text-slate-600">
              Future Gates IT Center ("we", "our", or "us") is committed to protecting your personal privacy. This Privacy Policy outlines our transparent data practices regarding the collection, use, security, and disclosure of information when you visit <strong>futuregatesitcenter.com</strong>, apply for courses, submit inquiry forms, or verify student certifications.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-blue" /> 1. Information We Collect
            </h2>
            <p>We collect two types of information from our website visitors and students:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>Personal Identification Information:</strong> Provided voluntarily when submitting an online admission form, contact inquiry, or course application. This includes your full name, father's name, email address, mobile number, WhatsApp number, city, CNIC/B-Form number, and selected technical course.
              </li>
              <li>
                <strong>Non-Personal Technical Data:</strong> Automatically collected during your visit, including IP address, browser type, operating system, referring URLs, device metadata, pages visited, and timestamps.
              </li>
              <li>
                <strong>Student Academic Records:</strong> Official roll numbers, enrollment dates, course titles, marks transcripts, and verification status stored in our verification system.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Eye className="w-4 h-4 text-brand-orange" /> 2. How We Use Your Information
            </h2>
            <p>Collected information is utilized strictly for legitimate educational, operational, and administrative purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>To process admission applications and manage class seat allocations.</li>
              <li>To issue verified transcripts, completion certificates, and enable public verification.</li>
              <li>To respond to student inquiries, technical support, or agency service requests.</li>
              <li>To send academic notices, schedule changes, exam reminders, and official WhatsApp updates.</li>
              <li>To maintain website security, prevent fraud, and optimize user experience.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Cookie className="w-4 h-4 text-amber-600" /> 3. Cookies & Advertising Practices (Google AdSense)
            </h2>
            <p>
              Our website uses cookies and web beacons to enhance navigation and display relevant content and advertisements.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>Google AdSense & Third-Party Ad Vendors:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.
              </li>
              <li>
                <strong>Google's Advertising Cookies:</strong> Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.
              </li>
              <li>
                <strong>Managing Advertising Preferences:</strong> Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-semibold underline">Google Ad Settings</a>. Alternatively, users can opt out of third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-semibold underline">www.aboutads.info</a>.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" /> 4. Data Protection & Security
            </h2>
            <p>
              We implement industry-standard administrative, physical, and technical security measures (including SSL encryption) to protect your personal information against unauthorized access, loss, alteration, or disclosure. We do NOT sell, rent, or monetize student or applicant personal contact details to third-party telemarketers.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600" /> 5. User Rights & Data Retention
            </h2>
            <p>
              You have the right to request access to your stored personal information, correct inaccuracies, or request the deletion of non-permanent contact records where applicable by law. Official student academic transcripts are retained permanently to support career verification.
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-200 pt-4">
            <h2 className="font-bold text-slate-900 text-sm">6. Contact Our Data Protection Officer</h2>
            <p>For questions or privacy concerns regarding this policy, contact us:</p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 font-mono text-[11px]">
              <p className="flex items-center gap-2 text-slate-700"><Mail className="w-3.5 h-3.5 text-brand-blue" /> <strong>Email:</strong> futuregatesitcenter@gmail.com</p>
              <p className="flex items-center gap-2 text-slate-700"><Phone className="w-3.5 h-3.5 text-emerald-600" /> <strong>WhatsApp / Cell:</strong> +92 301 6775690</p>
              <p className="flex items-center gap-2 text-slate-700"><MapPin className="w-3.5 h-3.5 text-brand-orange" /> <strong>Address:</strong> Future Gates IT Center, Main Campus, Khushab & Rawalpindi, Punjab, Pakistan</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'cookies') {
    return (
      <div className="pb-16 max-w-4xl mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 shadow-sm">
            <Cookie className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-slate-900">Cookie Policy</h1>
            <p className="text-xs text-slate-500">Comprehensive Explanation of Cookie Usage & Advertising Technologies</p>
          </div>
        </div>

        <div className="space-y-6 text-xs text-slate-700 leading-relaxed bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
          <p>
            This Cookie Policy explains how Future Gates IT Center uses cookies and similar web tracking technologies on <strong>futuregatesitcenter.com</strong>.
          </p>

          <div className="space-y-3">
            <h2 className="font-bold text-slate-900 text-sm">1. What Are Cookies?</h2>
            <p>
              Cookies are small data text files stored on your device (computer, smartphone, or tablet) when you visit a website. They enable websites to recognize your device, remember preferences, and improve page loading performance.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-slate-900 text-sm">2. Types of Cookies We Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-xs text-brand-blue">Strictly Necessary Cookies</h3>
                <p className="text-slate-600">Essential for fundamental website security, session persistence, form processing, and navigation access.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-xs text-emerald-600">Performance & Analytics Cookies</h3>
                <p className="text-slate-600">Help us measure visitor counts, user flows, popular blog topics, and overall performance without storing personal details.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-xs text-amber-600">Advertising & Marketing Cookies</h3>
                <p className="text-slate-600">Placed by third-party advertising partners like Google AdSense to display non-intrusive, relevant advertisements.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-xs text-purple-600">Functional Cookies</h3>
                <p className="text-slate-600">Remember your dark/light theme choices, language selections, or form input field draft states.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-slate-900 text-sm">3. Third-Party Advertising Cookies (Google AdSense)</h2>
            <p>
              We partner with Google AdSense and third-party advertising networks. These networks use cookies to serve personalized advertisements based on your prior browsing history across the web.
            </p>
            <p className="text-slate-600">
              You can learn more about how Google manages data in advertising products at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-brand-blue underline font-semibold">Google Technologies & Advertising</a>.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-slate-900 text-sm">4. How to Control & Manage Cookies</h2>
            <p>
              Most web browsers allow you to manage or block cookies through browser preferences. Note that disabling strictly necessary cookies may affect certain interactive functions of our certificate verification portal.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Manage Google Ads settings: <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-brand-blue underline">google.com/settings/ads</a></li>
              <li>Opt out of third-party advertising cookies: <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-brand-blue underline">aboutads.info/choices</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'terms') {
    return (
      <div className="pb-16 max-w-4xl mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center border border-orange-200 shadow-sm">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-slate-900">Terms & Conditions</h1>
            <p className="text-xs text-slate-500">Student Enrollment, Certification, and Portal Usage Rules</p>
          </div>
        </div>

        <div className="space-y-6 text-xs text-slate-700 leading-relaxed bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
          <p>
            Welcome to Future Gates IT Center. By accessing or using <strong>futuregatesitcenter.com</strong>, enrolling in technical courses, or accessing student verification records, you agree to comply with the following Terms & Conditions.
          </p>

          <div className="space-y-3">
            <h2 className="font-bold text-slate-900 text-sm">1. Course Enrollment & Attendance Policy</h2>
            <p>
              Students admitted to Future Gates IT Center must maintain at least 80% practical computer lab attendance to qualify for terminal certification examinations. Course fees paid are non-refundable once classes officially commence.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-slate-900 text-sm">2. Certificate Issuance & Public Verification</h2>
            <p>
              Official diplomas and online transcripts are awarded only after successful completion of terminal theory exams, practical lab project submissions, and viva voce defense.
            </p>
            <p>
              Student roll numbers and completion statuses indexed on our online verification portal represent legal transcript references. Fraudulent duplication, forgery, or tampering with physical or digital transcripts will lead to immediate legal action and permanent revocation.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-slate-900 text-sm">3. Academic Code of Conduct</h2>
            <p>
              Students must respect campus computer equipment, lab instructors, and fellow students. Plagiarism, disruptive behavior, or unauthorized access to institute computer systems will result in immediate expulsion.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-slate-900 text-sm">4. Digital Agency & Printing Services</h2>
            <p>
              Custom software development, website design, graphics branding, and printing orders require formal client approval of project specifications before final delivery.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-slate-900 text-sm">5. Intellectual Property Rights</h2>
            <p>
              All course materials, video lectures, graphic logos, portal code, and branding assets are the exclusive intellectual property of Future Gates IT Center.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16 max-w-4xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 shadow-sm">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Disclaimer Notice</h1>
          <p className="text-xs text-slate-500">Official Portal Verification & General Educational Notice</p>
        </div>
      </div>

      <div className="space-y-6 text-xs text-slate-700 leading-relaxed bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
        <p>
          The information and student verification records displayed on <strong>futuregatesitcenter.com</strong> are provided for general educational, academic verification, and professional information purposes.
        </p>

        <div className="space-y-3">
          <h2 className="font-bold text-slate-900 text-sm">1. Certificate Verification Database</h2>
          <p>
            Verification queries and academic records displayed on this portal represent official transcripts sanctioned under the certification guidelines of Future Gates IT Center, Punjab, Pakistan.
          </p>
          <p>
            While we strive for 100% online database accuracy, official physical transcripts bearing authorized registrar signatures and embossed stamps remain the primary legal document.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-bold text-slate-900 text-sm">2. Educational & Freelancing Outcomes</h2>
          <p>
            While Future Gates IT Center provides hands-on practical training and freelancing guidance (Fiverr, Upwork, YouTube), career earnings depend on individual effort, client negotiation, and continuous practice. No guaranteed income figures are promised.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-bold text-slate-900 text-sm">3. External Links & Third-Party Content</h2>
          <p>
            Our website may contain links to external third-party websites or services (such as YouTube, Facebook, or Google). Future Gates IT Center is not responsible for the content, privacy policies, or practices of any third-party websites.
          </p>
        </div>
      </div>
    </div>
  );
};

