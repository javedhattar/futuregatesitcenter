import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  CheckCircle, 
  GraduationCap, 
  Sparkles, 
  Briefcase, 
  ArrowRight,
  ShieldCheck,
  Pause,
  Play
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Testimonial } from '../types';

interface TestimonialCarouselProps {
  onOpenEnrollment?: (courseId?: string) => void;
  onNavigateVerification?: () => void;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  onOpenEnrollment,
  onNavigateVerification,
}) => {
  const { data } = useData();
  const rawTestimonials = (data.testimonials && data.testimonials.length > 0)
    ? data.testimonials
    : [];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Extract unique categories from testimonials
  const categories = [
    { id: 'all', label: 'All Reviews' },
    { id: 'web', label: 'Web & Development' },
    { id: 'design', label: 'Design & UI/UX' },
    { id: 'ai', label: 'AI & Automation' },
    { id: 'office', label: 'CIT & Office' },
  ];

  const filteredTestimonials: Testimonial[] = rawTestimonials.filter((item) => {
    if (selectedCategory === 'all') return true;
    const catOrCourse = (item.courseOrService || '').toLowerCase();
    if (selectedCategory === 'web') {
      return catOrCourse.includes('web') || catOrCourse.includes('app') || catOrCourse.includes('wordpress');
    }
    if (selectedCategory === 'design') {
      return catOrCourse.includes('graphic') || catOrCourse.includes('design') || catOrCourse.includes('ui') || catOrCourse.includes('video');
    }
    if (selectedCategory === 'ai') {
      return catOrCourse.includes('ai') || catOrCourse.includes('artificial') || catOrCourse.includes('freelance');
    }
    if (selectedCategory === 'office') {
      return catOrCourse.includes('office') || catOrCourse.includes('cit') || catOrCourse.includes('excel') || catOrCourse.includes('technology');
    }
    return true;
  });

  const list = filteredTestimonials.length > 0 ? filteredTestimonials : rawTestimonials;

  // Auto advance carousel every 5 seconds when not hovered/paused
  useEffect(() => {
    if (!isAutoPlaying || isHovered || list.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % list.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, list.length]);

  // Adjust activeIndex if filtered list shrinks
  useEffect(() => {
    if (activeIndex >= list.length) {
      setActiveIndex(0);
    }
  }, [selectedCategory, list.length, activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % list.length);
  };

  // Touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const getInitials = (name: string) => {
    if (!name) return 'FG';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const currentItem = list[activeIndex] || list[0];

  if (!currentItem) return null;

  return (
    <section 
      id="student-testimonials" 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header & Proof Metrics Bar */}
      <div className="space-y-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Social Proof & Student Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Real Stories, Verified Careers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Hear directly from our graduates who transformed practical training into sustainable careers, international freelance income, and verified technical diplomas.
            </p>
          </div>

          {/* Social Proof Stats summary badge */}
          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm shrink-0">
            <div className="flex items-center gap-1 text-amber-400 bg-amber-50 px-2 py-1 rounded-lg">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900 leading-tight">4.9 / 5.0 Rating</div>
              <div className="text-[11px] text-slate-500 font-medium">From 250+ Verified Students</div>
            </div>
          </div>
        </div>

        {/* Category Pills & Playback Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-2 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title={isAutoPlaying ? 'Pause Auto-scroll' : 'Resume Auto-scroll'}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline text-[11px]">Auto</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline text-[11px]">Play</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrev}
              className="p-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl transition-colors cursor-pointer shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="p-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl transition-colors cursor-pointer shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Spotlight Carousel Card */}
      <div 
        className="relative bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Decorative Gradient Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50/70 via-orange-50/40 to-transparent pointer-events-none rounded-bl-full" />

        <div className="relative p-6 sm:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id || activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Quote & Feedback Content */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    {[...Array(currentItem.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-extrabold text-slate-700 ml-2">5.0 Star Feedback</span>
                  </div>

                  <Quote className="w-10 h-10 text-slate-200 shrink-0" />
                </div>

                <blockquote className="text-base sm:text-lg lg:text-xl text-slate-800 font-medium leading-relaxed italic">
                  "{currentItem.feedback}"
                </blockquote>

                {/* Student Profile Info */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-extrabold text-base shadow-md shrink-0">
                    {getInitials(currentItem.name)}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-base text-slate-900 font-display">
                        {currentItem.name}
                      </h4>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded-full">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        Verified Graduate
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700 flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                        {currentItem.role}
                      </span>
                    </div>
                  </div>

                  <div className="ml-auto">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-xl text-xs font-bold">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                      {currentItem.courseOrService}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Quick Action Card */}
              <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    Institute Certification
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Want to achieve similar career growth?
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Join our practical training batches and receive 100% verifiable diplomas recognized by industry employers.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  {onOpenEnrollment && (
                    <button
                      type="button"
                      onClick={() => onOpenEnrollment()}
                      className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Enroll in Course</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {onNavigateVerification && (
                    <button
                      type="button"
                      onClick={onNavigateVerification}
                      className="w-full py-2 px-4 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verify Student Card</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Progress Dots & Bar */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {list.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === activeIndex
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="text-xs font-bold text-slate-500 font-mono">
            {activeIndex + 1} / {list.length} Stories
          </div>
        </div>
      </div>

      {/* Horizontal Multi-card Scroller Grid Preview */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            More Student Highlights
          </span>
          <span className="text-xs text-slate-400">
            Click any review to feature
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {list.slice(0, 4).map((t, idx) => (
            <div
              key={t.id || idx}
              onClick={() => setActiveIndex(idx)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                idx === activeIndex
                  ? 'bg-blue-50/60 border-blue-400 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 truncate max-w-[120px]">
                    {t.courseOrService}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 italic">
                  "{t.feedback}"
                </p>
              </div>

              <div className="pt-3 mt-2 border-t border-slate-100 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  {getInitials(t.name)}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{t.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
