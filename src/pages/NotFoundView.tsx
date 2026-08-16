/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Home, BookOpen, Phone, Search, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { navigateTo } from '../utils/routes';

export const NotFoundView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo(`/courses?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-8">
      
      {/* 404 Status Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 text-brand-orange rounded-full text-xs font-extrabold uppercase tracking-widest border border-orange-200">
        <HelpCircle className="w-4 h-4" /> Error 404 • Resource Not Located
      </div>

      {/* Clear Single H1 */}
      <div className="space-y-3">
        <h1 className="text-4xl sm:text-6xl font-black font-display text-slate-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          The requested URL does not exist or has been moved. Explore our IT courses, certificate verification portal, or get in touch with our team.
        </p>
      </div>

      {/* Helpful Search Bar */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search courses or skill programs..."
          className="w-full pl-10 pr-24 py-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue shadow-sm min-h-[44px]"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1.5 px-3 py-2 bg-brand-blue text-white rounded-lg text-xs font-bold hover:bg-brand-blue-light transition-colors cursor-pointer"
        >
          Search
        </button>
      </form>

      {/* Primary Helpful Navigation Action Buttons */}
      <div className="pt-4 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/');
          }}
          className="px-6 py-3 bg-brand-blue hover:bg-brand-blue-light text-white rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer min-h-[44px]"
        >
          <Home className="w-4 h-4" /> Return to Homepage
        </a>

        <a
          href="/courses"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/courses');
          }}
          className="px-6 py-3 bg-brand-orange hover:bg-orange-600 text-white rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer min-h-[44px]"
        >
          <BookOpen className="w-4 h-4" /> Browse IT Courses
        </a>

        <a
          href="/contact"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/contact');
          }}
          className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer min-h-[44px]"
        >
          <Phone className="w-4 h-4 text-brand-orange" /> Contact Support
        </a>
      </div>

      {/* Quick Links Directory Grid */}
      <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-brand-blue font-bold text-xs">
            <BookOpen className="w-4 h-4" /> Technical Bootcamps
          </div>
          <p className="text-[11px] text-slate-600 leading-snug">
            Web Development, Graphic Design, AI Tools, SEO, and Office Automation.
          </p>
          <a
            href="/courses"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/courses');
            }}
            className="text-xs text-brand-orange font-bold hover:underline flex items-center gap-1 pt-1"
          >
            Explore Courses <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
            <ShieldCheck className="w-4 h-4" /> Certificate Verification
          </div>
          <p className="text-[11px] text-slate-600 leading-snug">
            Instantly verify student certificate numbers and course completion records.
          </p>
          <a
            href="/verification"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/verification');
            }}
            className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-1 pt-1"
          >
            Verify Online <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-purple-600 font-bold text-xs">
            <Phone className="w-4 h-4" /> Academic Counseling
          </div>
          <p className="text-[11px] text-slate-600 leading-snug">
            Have questions about admissions, fees, or class schedules? Talk to us.
          </p>
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/contact');
            }}
            className="text-xs text-purple-600 font-bold hover:underline flex items-center gap-1 pt-1"
          >
            Get Help <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
