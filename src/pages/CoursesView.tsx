/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Clock, CheckCircle2, ChevronRight, GraduationCap, X, Sparkles, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Course } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { navigateTo } from '../utils/routes';

interface CoursesViewProps {
  onOpenEnrollment: (courseId?: string) => void;
  initialSearchQuery?: string;
  initialSelectedCourse?: Course | null;
  onClearInitialSelection?: () => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ 
  onOpenEnrollment,
  initialSearchQuery = '',
  initialSelectedCourse = null,
  onClearInitialSelection
}) => {
  const { data } = useData();
  const [search, setSearch] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [detailCourse, setDetailCourse] = useState<Course | null>(initialSelectedCourse);

  // Sync if props change
  useEffect(() => {
    if (initialSearchQuery) {
      setSearch(initialSearchQuery);
      setSelectedCategory('All');
    }
  }, [initialSearchQuery]);

  useEffect(() => {
    if (initialSelectedCourse) {
      setDetailCourse(initialSelectedCourse);
    }
  }, [initialSelectedCourse]);

  // Modal accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && detailCourse) {
        setDetailCourse(null);
        onClearInitialSelection?.();
      }
    };

    if (detailCourse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [detailCourse, onClearInitialSelection]);

  const categories = [
    'All',
    'Computer & Office',
    'Design & Media',
    'Web & Freelancing',
    'Artificial Intelligence',
    'Programming & Data',
    'Digital Business',
    'Advanced IT'
  ];

  const allCourses = (data.courses || []).filter((c) => c.status !== 'Inactive');

  const filteredCourses = allCourses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-16 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Courses', isCurrent: true }
        ]}
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-brand-blue-dark to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-brand-orange">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-bold rounded-full uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Technical Programs & Diplomas
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight">
            Professional IT Courses & Skills Bootcamps
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
            Practical classroom and online training programs engineered to transform absolute beginners into high-earning software developers, designers, and marketers.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses, e.g. Web, Office, AI..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue min-h-[42px]"
            />
          </div>

          {/* Categories Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer min-h-[40px] ${
                  selectedCategory === cat
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl hover:border-brand-blue/30 transition-all flex flex-col justify-between group"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2.5 py-1 bg-brand-blue/10 text-brand-blue text-[10px] font-extrabold rounded-lg uppercase">
                      {course.category}
                    </span>
                    {course.status && (
                      <span className={`px-2 py-0.5 text-[9px] font-bold rounded-md uppercase tracking-wider ${
                        course.status === 'Coming Soon'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {course.status}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-600 font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-orange" /> {course.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue font-display transition-colors">
                  <a
                    href={`/courses/${course.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(`/courses/${course.id}`);
                    }}
                  >
                    {course.title}
                  </a>
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {course.description}
                </p>

                <div className="space-y-1 pt-2">
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">Skills Covered:</span>
                  <div className="space-y-1">
                    {course.skillsGained.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="text-[11px] text-slate-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold block uppercase">Course Fee</span>
                  <span className="text-sm font-black text-brand-orange font-mono">{course.fee}</span>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`/courses/${course.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(`/courses/${course.id}`);
                    }}
                    className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer min-h-[38px] flex items-center"
                  >
                    Syllabus
                  </a>
                  <button
                    onClick={() => onOpenEnrollment(course.id)}
                    className="px-3.5 py-2 bg-brand-blue hover:bg-brand-blue-light text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-all cursor-pointer shadow-sm min-h-[38px]"
                  >
                    <GraduationCap className="w-4 h-4" /> Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No courses match your search</h3>
            <p className="text-xs text-slate-500">Try adjusting your category filter or search keywords.</p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-brand-blue text-white font-bold text-xs rounded-lg cursor-pointer min-h-[44px]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Course Detail / Syllabus Modal */}
      {detailCourse && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="course-syllabus-title"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 my-4 sm:my-8 max-h-[92vh] flex flex-col">
            <div className="bg-brand-blue text-white p-4 sm:p-6 relative shrink-0">
              <button
                onClick={() => {
                  setDetailCourse(null);
                  onClearInitialSelection?.();
                }}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                aria-label="Close syllabus details"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="px-2.5 py-1 bg-brand-orange text-white text-[10px] font-bold rounded uppercase">
                {detailCourse.category}
              </span>
              <h3 id="course-syllabus-title" className="text-xl sm:text-2xl font-bold font-display mt-2 pr-8">{detailCourse.title}</h3>
              <p className="text-xs text-slate-200 mt-1">Duration: {detailCourse.duration} | Fee: {detailCourse.fee}</p>
            </div>

            <div className="p-4 sm:p-6 space-y-6 overflow-y-auto">
              <div>
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide mb-2">Program Overview</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{detailCourse.longDescription}</p>
              </div>

              <div>
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide mb-2">Key Skills Gained</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {detailCourse.skillsGained.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide mb-2">Syllabus Breakdown</h4>
                <div className="space-y-2">
                  {detailCourse.syllabus.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-[10px] flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
              <span className="text-xs font-mono font-bold text-brand-orange">{detailCourse.fee}</span>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setDetailCourse(null);
                    onClearInitialSelection?.();
                  }}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-200 text-slate-700 font-bold text-xs rounded-lg cursor-pointer min-h-[44px]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const cId = detailCourse.id;
                    setDetailCourse(null);
                    onClearInitialSelection?.();
                    onOpenEnrollment(cId);
                  }}
                  className="flex-1 sm:flex-none px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-xs rounded-lg shadow cursor-pointer min-h-[44px]"
                >
                  Apply For Admission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
