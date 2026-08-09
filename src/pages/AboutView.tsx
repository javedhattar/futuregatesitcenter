/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, ShieldCheck, Target, Eye, BookOpen, CheckCircle2, Users, Flame, Globe } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { MentorSection } from '../components/MentorSection';

interface AboutViewProps {
  setTab: (tab: string) => void;
  onOpenEnrollment: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setTab, onOpenEnrollment }) => {
  return (
    <div className="pb-16 space-y-12">
      {/* Page Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-brand-blue-dark to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-brand-orange">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-bold rounded-full uppercase">
            About Our Institute
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight">
            Future Gates I.T Center
          </h1>
          <p className="text-brand-orange font-bold font-sans text-sm sm:text-base uppercase tracking-wider">
            Where Skills Become Your Income
          </p>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Accredited IT Training, Professional Skills Development, and Software Agency Services based in Punjab, Pakistan.
          </p>
        </div>
      </section>

      {/* Main Profile Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <BrandLogo />
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
              Transforming Students Into Skilled IT Professionals
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              <strong>Future Gates I.T Center</strong> is a premier, certified technology bootcamp and professional skills development institute situated in Khushab & Rawalpindi, Punjab, Pakistan.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              We specialize in hands-on practical training across full-stack web engineering, mobile application development, graphic design, UI/UX, SEO, digital marketing, AI tools, and office automation. Additionally, our software agency unit provides corporate web applications, branding, and printing solutions for businesses across Pakistan and internationally.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-2xl font-black font-display text-brand-blue block">1,000+</span>
                <span className="text-xs font-bold text-slate-700">Certified Graduates</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-2xl font-black font-display text-brand-orange block">100%</span>
                <span className="text-xs font-bold text-slate-700">Verifiable Transcripts</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-brand-blue-dark to-slate-900 p-8 rounded-3xl text-white space-y-6 shadow-xl border border-white/10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-brand-orange font-bold text-sm">
                <Target className="w-5 h-5" /> OUR MISSION
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                To equip individuals with practical, industry-aligned technical skills that create direct job opportunities, freelance income, and self-reliance in the global digital economy.
              </p>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex items-center gap-2 text-brand-orange font-bold text-sm">
                <Eye className="w-5 h-5" /> OUR VISION
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                To become Pakistan's most trusted technology education hub and software solutions provider, recognized for academic excellence, online transcript verifiability, and student career transformation.
              </p>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Award className="w-5 h-5" /> ACCREDITATION & VERIFICATION
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Every certificate issued by Future Gates I.T Center includes a unique Roll No and Certificate Serial Number indexed on our official verification portal for transparent employer verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <p className="text-xs font-bold text-brand-orange uppercase">Our Pillars</p>
          <h2 className="text-2xl font-bold font-display text-slate-900">What Sets Future Gates Apart</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Updated Curriculum</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We update our course syllabi quarterly to incorporate modern frameworks like AI tools, React, Node, Tailwind, and current Google/Meta algorithm guidelines.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Expert Instructors</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our teachers are senior software developers, professional graphic artists, and active freelancers who bring real industry client experience into the classroom.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Freelancing & Jobs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every course includes a dedicated module on Upwork, Fiverr, proposal writing, and portfolio presentation to ensure students convert skills into real earnings.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Our Mentor Section */}
      <MentorSection onOpenEnrollment={onOpenEnrollment} />

      {/* Call To Action */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-brand-blue text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold font-display">Ready To Master High-Income Tech Skills?</h3>
          <p className="text-slate-200 text-xs sm:text-sm max-w-lg mx-auto">
            Join hundreds of successful graduates. Apply online or visit our campus today!
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={onOpenEnrollment}
              className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Apply For Admission Online
            </button>
            <button
              onClick={() => setTab('contact')}
              className="px-6 py-3 bg-white text-slate-900 font-bold text-xs rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
            >
              Contact Head Office
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
