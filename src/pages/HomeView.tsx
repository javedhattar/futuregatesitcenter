/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Award, ShieldCheck, ArrowRight, Star, Flame, Globe, CheckCircle2, Phone, GraduationCap, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { TESTIMONIALS } from '../data';
import { MentorSection } from '../components/MentorSection';

interface HomeViewProps {
  setTab: (tab: string) => void;
  onOpenEnrollment: (courseId?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setTab, onOpenEnrollment }) => {
  const { data } = useData();
  const hp = data.homepage || {};
  const contact = data.contact || {};
  const featuredCourses = (data.courses || []).filter((c) => c.featured && c.status !== 'Inactive');
  const whatsappUrl = `https://wa.me/${contact.whatsapp || '923016775690'}?text=Hello%20Future%20Gates%20IT%20Center%2C%20I%20want%20information%20about%20your%20courses.`;

  return (
    <div className="pb-16 space-y-12 bg-slate-50">
      {/* Hero Section with Geometric Balance Accent */}
      <section className="relative bg-slate-900 text-white py-16 sm:py-20 px-6 sm:px-12 lg:px-16 overflow-hidden border-b border-slate-800">
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-400/30 rounded text-xs font-bold uppercase tracking-widest"
            >
              {hp.heroBadge || 'Accredited IT Center • Admissions Open 2026'}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight font-display"
            >
              {hp.heroTitle || 'Advance Your Tech'} <br />
              <span className="text-orange-500">{hp.heroSubtitle || 'Skills & Income.'}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed"
            >
              {hp.heroDescription ||
                'Expert-led training in Full-Stack Web Development, Graphic Design, Digital Marketing, AI Tools, and Office Automation. Verifiable certificates & direct job placement support.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => setTab('courses')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all shadow-md flex items-center gap-2 cursor-pointer uppercase"
              >
                <BookOpen className="w-4 h-4" /> {hp.ctaPrimaryText || 'View All Courses'}
              </button>

              <button
                onClick={() => setTab('verification')}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer uppercase"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verify Student Card
              </button>
            </motion.div>
          </div>

          {/* Right Geometric Stats Cards Grid */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-lg">
                <div className="text-3xl font-extrabold text-orange-500 mb-1 font-display">
                  {hp.stats?.studentsCertified || '1,000+'}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Certified Graduates</div>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-lg">
                <div className="text-3xl font-extrabold text-blue-500 mb-1 font-display">
                  {hp.stats?.practicalLabs || '100%'}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Practical Labs</div>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-lg">
                <div className="text-3xl font-extrabold text-emerald-400 mb-1 font-display">
                  {hp.stats?.corporateClients || '20+'}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Agency Clients</div>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-lg">
                <div className="text-3xl font-extrabold text-yellow-400 mb-1 font-display">
                  {hp.stats?.experiencedFaculty || '15+'}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Expert Instructors</div>
              </div>
            </div>
          </div>
        </div>

        {/* Skewed Geometric Background Shape */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-[-15deg] translate-x-20 pointer-events-none hidden md:block" />
      </section>

      {/* Main Grid: Courses + Quick Verification Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Featured Courses (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-end border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Featured Programs</span>
                <h2 className="text-2xl font-extrabold text-slate-900 font-display">Industry-Grade Bootcamps</h2>
              </div>
              <button
                onClick={() => setTab('courses')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 uppercase tracking-wider"
              >
                All Courses <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredCourses.map((course) => (
                <div
                  key={course.id}
                  className="group bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                  onClick={() => onOpenEnrollment(course.id)}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-600 font-bold text-[10px] uppercase tracking-wider rounded">
                        {course.category}
                      </span>
                      <span className="text-xs font-bold text-slate-500 font-mono">
                        {course.duration}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 font-display transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {course.description}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      {course.skillsGained.slice(0, 3).map((skill, idx) => (
                        <div key={idx} className="text-[11px] text-slate-700 flex items-center gap-1.5 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-blue-600">
                    <span className="text-slate-900 font-mono text-sm">{course.fee}</span>
                    <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-[10px] uppercase tracking-wider font-extrabold group-hover:bg-orange-600 transition-colors">
                      Enroll Now
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Quick Verification Widget */}
          <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-lg relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] px-3 py-1 font-bold uppercase tracking-wider">
              Verified System
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                Certificate Verification
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Enter Certificate ID or Student Roll No below to verify official transcript credentials instantly.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setTab('verification');
              }}
              className="space-y-4"
            >
              <div>
                <input
                  type="text"
                  placeholder="e.g. FG-2026-101"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-xs font-mono text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg hover:bg-slate-800 transition-all shadow-md cursor-pointer"
              >
                Verify Record Now
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-base font-bold text-slate-800 font-display">100%</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Verifiable</div>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                <div className="text-base font-bold text-slate-800 font-display">24/7</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Indexing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden border border-slate-800 shadow-2xl">
          <div className="relative z-10 space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-bold rounded uppercase tracking-widest">
                Our Core Pillars
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
                Why Students Trust Future Gates I.T Center
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                A modern practical curriculum, certified faculty, and direct freelancing guidance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <h3 className="font-bold text-sm text-white font-display">Certified & Verifiable</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every graduate is awarded an official transcript indexed on our verification engine with Roll No search.
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <h3 className="font-bold text-sm text-white font-display">100% Practical Labs</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Coding on live servers, real client graphic design projects, and live ad campaign executions.
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <h3 className="font-bold text-sm text-white font-display">Freelance & Earning</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dedicated modules on Fiverr, Upwork, proposal writing, and converting skills into monthly income.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Mentor Section */}
      <MentorSection onOpenEnrollment={() => onOpenEnrollment()} />

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Graduates Feedback</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Student Success Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "{t.feedback}"
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{t.name}</h4>
                  <p className="text-[10px] text-slate-500">{t.role}</p>
                </div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
                  {t.courseOrService}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
