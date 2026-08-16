/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Clock, 
  GraduationCap, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  Calendar, 
  UserCheck, 
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import { Course } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { navigateTo } from '../utils/routes';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { useData } from '../context/DataContext';

interface CourseDetailViewProps {
  course: Course;
  allCourses: Course[];
  onOpenEnrollment: (courseId: string) => void;
}

export const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  course,
  allCourses,
  onOpenEnrollment
}) => {
  const { data } = useData();
  const contact = data?.contact || {};
  const whatsappUrl = `https://wa.me/${contact.whatsapp || '923016775690'}?text=Hello%20Future%20Gates%20IT%20Center%2C%20I%20want%20information%20about%20the%20${encodeURIComponent(course.title)}%20course.`;

  // Related courses (excluding current)
  const relatedCourses = allCourses
    .filter((c) => c.id !== course.id && c.status !== 'Inactive')
    .slice(0, 3);

  return (
    <div className="pb-16 space-y-8 bg-slate-50">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { name: 'Courses', url: '/courses' },
          { name: course.title, isCurrent: true }
        ]}
      />

      {/* Hero Header Section with Single Main H1 */}
      <section className="bg-gradient-to-r from-slate-900 via-brand-blue-dark to-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-brand-orange">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 bg-brand-orange text-white font-bold rounded-full uppercase tracking-wider text-[11px]">
              {course.category}
            </span>
            {course.status && (
              <span className={`px-3 py-1 font-bold rounded-full uppercase tracking-wider text-[11px] border ${
                course.status === 'Coming Soon'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}>
                {course.status}
              </span>
            )}
            <span className="px-3 py-1 bg-white/10 text-slate-200 font-mono rounded-full flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-orange" /> {course.duration}
            </span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-bold rounded-full border border-emerald-500/30 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Verifiable Certificate
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight tracking-tight">
            {course.title} Course
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            {course.longDescription || course.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onOpenEnrollment(course.id)}
              className="bg-brand-orange hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer min-h-[44px]"
            >
              <GraduationCap className="w-4 h-4" /> Apply for Online Admission
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer min-h-[44px]"
            >
              <WhatsAppIcon className="w-4 h-4" /> Quick Inquiry
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Detailed Syllabus & Learning Outcomes */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Key Highlights Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-orange" /> Course Overview & What You Will Master
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {course.longDescription || course.description}
              </p>
              
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.skillsGained.map((skill, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Syllabus Section */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-blue" /> Comprehensive Syllabus & Modules
                </h2>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {course.syllabus.length} Core Modules
                </span>
              </div>

              <div className="space-y-3">
                {course.syllabus.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 transition-colors flex items-start gap-3.5"
                  >
                    <span className="w-7 h-7 rounded-lg bg-brand-blue text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                        {item}
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Classroom hands-on exercises, live project demonstrations, and graded lab assignments.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certification & Career Assurance */}
            <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center text-white shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-display">Verifiable Certification Included</h2>
                  <p className="text-xs text-slate-300">Each graduate receives a unique verifiable certificate credential.</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Upon passing the final project evaluation, students receive a signed physical and digital diploma that can be verified online through our public <a href="/verification" onClick={(e) => { e.preventDefault(); navigateTo('/verification'); }} className="text-orange-400 font-bold underline">Certificate Verification Portal</a>.
              </p>
            </div>

          </div>

          {/* Right Column: Fee, Enrollment & Counselor Contact */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Enrollment Summary Box */}
            <div className="bg-white p-6 rounded-2xl border-2 border-brand-blue/20 shadow-md space-y-5 sticky top-20">
              <div className="space-y-1 pb-4 border-b border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Course Investment</span>
                <div className="text-3xl font-extrabold text-brand-orange font-mono">
                  {course.fee}
                </div>
                <span className="text-[10px] text-slate-500 block">Complete program fee including practical labs & diploma</span>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Duration:</span>
                  <span className="font-bold text-slate-800">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Skill Level:</span>
                  <span className="font-bold text-slate-800">Beginner to Advanced</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Language:</span>
                  <span className="font-bold text-slate-800">Urdu & English</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Mentor:</span>
                  <span className="font-bold text-brand-blue">Sir Javed Hattar</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-500 font-medium">Campus:</span>
                  <span className="font-bold text-slate-800">Khushab Main Campus</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onOpenEnrollment(course.id)}
                  className="w-full bg-brand-blue hover:bg-brand-blue-light text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <GraduationCap className="w-4 h-4" /> Enroll in This Batch
                </button>
                <a
                  href="/admission"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/admission');
                  }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px] text-center block"
                >
                  Go to Admission Form
                </a>
              </div>

              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-center space-y-1">
                <span className="text-[11px] font-bold text-brand-blue block">Have Questions Before Joining?</span>
                <p className="text-[10px] text-slate-600">Speak directly with our academic advisor for guidance.</p>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/contact');
                  }}
                  className="text-xs text-brand-orange hover:underline font-bold inline-block pt-1"
                >
                  Contact Admissions Office →
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Internal Links: Related IT Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-200 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">Explore Other Genuine Courses</h2>
            <p className="text-xs text-slate-500">Broaden your digital skillset with our other career-building tracks.</p>
          </div>
          <a
            href="/courses"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/courses');
            }}
            className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
          >
            View All Courses <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedCourses.map((rel) => (
            <div
              key={rel.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="px-2 py-0.5 bg-brand-blue/10 text-brand-blue font-bold rounded uppercase">
                    {rel.category}
                  </span>
                  <span className="text-slate-400 font-mono">{rel.duration}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                  <a
                    href={`/courses/${rel.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(`/courses/${rel.id}`);
                    }}
                    className="hover:text-brand-blue transition-colors"
                  >
                    {rel.title}
                  </a>
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {rel.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-extrabold text-brand-orange font-mono">{rel.fee}</span>
                <a
                  href={`/courses/${rel.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(`/courses/${rel.id}`);
                  }}
                  className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
                >
                  View Details <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
