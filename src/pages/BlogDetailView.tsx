/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Clock, 
  User, 
  Calendar, 
  Tag, 
  BookOpen, 
  ArrowRight, 
  Share2, 
  GraduationCap, 
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { BlogPost, Course } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { navigateTo } from '../utils/routes';
import { AdSlot } from '../components/AdSlot';

interface BlogDetailViewProps {
  blog: BlogPost;
  allBlogs: BlogPost[];
  allCourses: Course[];
  onOpenEnrollment: (courseId?: string) => void;
}

export const BlogDetailView: React.FC<BlogDetailViewProps> = ({
  blog,
  allBlogs,
  allCourses,
  onOpenEnrollment
}) => {
  // Related blog articles (excluding current)
  const relatedBlogs = allBlogs
    .filter((b) => b.slug !== blog.slug && b.isPublished !== false)
    .slice(0, 3);

  // Recommended courses related to this blog
  const recommendedCourses = allCourses.slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="pb-16 space-y-8 bg-slate-50">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { name: 'Blogs', url: '/blogs' },
          { name: blog.title, isCurrent: true }
        ]}
      />

      {/* Hero Header with Main H1 */}
      <section className="bg-gradient-to-r from-slate-900 via-brand-blue-dark to-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-brand-orange">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 bg-brand-orange text-white font-bold rounded-full uppercase tracking-wider text-[10px]">
              {blog.category}
            </span>
            <span className="px-3 py-1 bg-white/10 text-slate-200 font-mono rounded-full flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-orange" /> {blog.readTime}
            </span>
            <span className="px-3 py-1 bg-white/10 text-slate-200 rounded-full flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-400" /> {blog.publishedAt}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight tracking-tight">
            {blog.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {blog.excerpt}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Author</span>
                <span className="font-bold text-white">{blog.author}</span>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
            >
              <Share2 className="w-3.5 h-3.5" /> Share Article
            </button>
          </div>
        </div>
      </section>

      {/* Main Article Body and Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Article Content */}
          <article className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            
            {/* Key Takeaway Callout */}
            {blog.highlight && (
              <div className="p-4 sm:p-5 rounded-xl bg-orange-50/70 border-l-4 border-brand-orange space-y-1">
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Key Takeaway
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 italic">
                  "{blog.highlight}"
                </p>
              </div>
            )}

            {/* Paragraphs with Structured Flow */}
            <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
              {blog.content.map((paragraph, index) => (
                <React.Fragment key={index}>
                  <p className="leading-relaxed">{paragraph}</p>
                  {index === 1 && <AdSlot type="in-feed" />}
                </React.Fragment>
              ))}
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="pt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-brand-orange" />
                <span className="text-xs font-bold text-slate-500 uppercase">Tags:</span>
                {blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-slate-100 text-slate-700 font-mono text-xs rounded-lg font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Back to Blogs link */}
            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
              <a
                href="/blogs"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/blogs');
                }}
                className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Back to All Articles
              </a>
              <a
                href="/courses"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/courses');
                }}
                className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1 cursor-pointer"
              >
                Explore Practical Courses <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </article>

          {/* Right Sidebar: Recommended IT Courses & Admissions */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Enrollment Promo Card */}
            <div className="bg-gradient-to-br from-slate-900 to-brand-blue-dark text-white p-6 rounded-2xl shadow-md space-y-4">
              <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold font-display">Turn Knowledge Into Income</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Join Future Gates IT Center's practical training batches in Khushab. Master web development, graphic design, and AI automation under mentor Javed Hattar.
              </p>
              <a
                href="/admission"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/admission');
                }}
                className="w-full bg-brand-orange hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md text-center block"
              >
                Apply for Admission 2026
              </a>
            </div>

            {/* Recommended Courses Box */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 font-display flex items-center gap-2 border-b border-slate-100 pb-3">
                <BookOpen className="w-4 h-4 text-brand-blue" /> Relevant Career Courses
              </h2>
              <div className="space-y-3">
                {recommendedCourses.map((c) => (
                  <div key={c.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-brand-blue uppercase">{c.category}</span>
                    <h3 className="text-xs font-bold text-slate-800">
                      <a
                        href={`/courses/${c.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo(`/courses/${c.id}`);
                        }}
                        className="hover:text-brand-blue transition-colors"
                      >
                        {c.title}
                      </a>
                    </h3>
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-brand-orange font-bold font-mono">{c.fee}</span>
                      <a
                        href={`/courses/${c.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo(`/courses/${c.id}`);
                        }}
                        className="text-brand-blue font-semibold hover:underline"
                      >
                        View Syllabus →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </section>

      {/* Internal Links: Related Blogs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-200 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">More Insights & Tutorials</h2>
            <p className="text-xs text-slate-500">Continue reading practical career and tech articles.</p>
          </div>
          <a
            href="/blogs"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/blogs');
            }}
            className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
          >
            All Articles <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedBlogs.map((rel) => (
            <div
              key={rel.slug}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <span className="px-2 py-0.5 bg-brand-blue/10 text-brand-blue font-bold text-[10px] rounded uppercase">
                  {rel.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2">
                  <a
                    href={`/blogs/${rel.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(`/blogs/${rel.slug}`);
                    }}
                    className="hover:text-brand-blue transition-colors"
                  >
                    {rel.title}
                  </a>
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {rel.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">{rel.readTime}</span>
                <a
                  href={`/blogs/${rel.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(`/blogs/${rel.slug}`);
                  }}
                  className="font-bold text-brand-blue hover:underline flex items-center gap-1"
                >
                  Read Post <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
