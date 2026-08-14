/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, BookOpen, Clock, CheckCircle2, ChevronRight, GraduationCap, X, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Course } from '../types';

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
  React.useEffect(() => {
    if (initialSearchQuery) {
      setSearch(initialSearchQuery);
      setSelectedCategory('All');
    }
  }, [initialSearchQuery]);

  React.useEffect(() => {
    if (initialSelectedCourse) {
      setDetailCourse(initialSelectedCourse);
    }
  }, [initialSelectedCourse]);

  const categories = ['All', 'Development', 'Design', 'Technical', 'Short Courses', 'Artificial Intelligence'];

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
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-brand-blue-dark to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-brand-orange">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-bold rounded-full uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Technical Programs & Diplomas
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight">
            Accredited IT Courses & Skills Bootcamps
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
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          {/* Categories Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
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
                  <span className="px-2.5 py-1 bg-brand-blue/10 text-brand-blue text-[10px] font-extrabold rounded-lg uppercase">
                    {course.category}
                  </span>
                  <span className="text-xs font-bold text-slate-600 font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-orange" /> {course.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue font-display transition-colors">
                  {course.title}
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
                  <button
                    onClick={() => setDetailCourse(course)}
                    className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Syllabus
                  </button>
                  <button
                    onClick={() => onOpenEnrollment(course.id)}
                    className="px-3.5 py-2 bg-brand-blue hover:bg-brand-blue-light text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-all cursor-pointer shadow-sm"
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
              className="px-4 py-2 bg-brand-blue text-white font-bold text-xs rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Course Detail / Syllabus Modal */}
      {detailCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 my-8">
            <div className="bg-brand-blue text-white p-6 relative">
              <button
                onClick={() => {
                  setDetailCourse(null);
                  onClearInitialSelection?.();
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="px-2.5 py-1 bg-brand-orange text-white text-[10px] font-bold rounded uppercase">
                {detailCourse.category}
              </span>
              <h3 className="text-2xl font-bold font-display mt-2">{detailCourse.title}</h3>
              <p className="text-xs text-slate-200 mt-1">Duration: {detailCourse.duration} | Fee: {detailCourse.fee}</p>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
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

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-brand-orange">{detailCourse.fee}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setDetailCourse(null)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const cId = detailCourse.id;
                    setDetailCourse(null);
                    onOpenEnrollment(cId);
                  }}
                  className="px-5 py-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-xs rounded-lg shadow"
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
