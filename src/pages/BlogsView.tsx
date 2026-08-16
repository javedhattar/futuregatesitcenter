/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Clock, User, ArrowRight, X, Calendar, Tag } from 'lucide-react';
import { useData } from '../context/DataContext';
import { BlogPost } from '../types';
import { AdSlot } from '../components/AdSlot';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { navigateTo } from '../utils/routes';

interface BlogsViewProps {
  initialSearchQuery?: string;
  initialSelectedBlog?: BlogPost | null;
  onClearInitialSelection?: () => void;
}

export const BlogsView: React.FC<BlogsViewProps> = ({
  initialSearchQuery = '',
  initialSelectedBlog = null,
  onClearInitialSelection
}) => {
  const { data } = useData();
  const [search, setSearch] = useState(initialSearchQuery);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(initialSelectedBlog);

  useEffect(() => {
    if (initialSearchQuery) {
      setSearch(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  useEffect(() => {
    if (initialSelectedBlog) {
      setSelectedArticle(initialSelectedBlog);
    }
  }, [initialSelectedBlog]);

  // Modal accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedArticle) {
        setSelectedArticle(null);
        onClearInitialSelection?.();
      }
    };

    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedArticle, onClearInitialSelection]);

  const publishedBlogs = (data.blogs || []).filter((b) => b.isPublished !== false);

  const filteredBlogs = publishedBlogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.excerpt.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-16 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Blogs', isCurrent: true }
        ]}
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-brand-blue-dark to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-brand-orange">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-bold rounded-full uppercase">
            <BookOpen className="w-3.5 h-3.5" /> Educational Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight">
            IT Tech Blogs & Career Guides
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Practical insights on software engineering, AI tools, freelancing, digital marketing, and computer skills.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title, topic..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue min-h-[42px]"
          />
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id || blog.slug}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="px-2.5 py-1 bg-brand-blue/10 text-brand-blue font-extrabold text-[10px] rounded uppercase">
                    {blog.category}
                  </span>
                  <span className="text-slate-400 text-[10px] font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {blog.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue font-display transition-colors">
                  <a
                    href={`/blogs/${blog.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(`/blogs/${blog.slug}`);
                    }}
                  >
                    {blog.title}
                  </a>
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1 font-semibold text-slate-600">
                    <User className="w-3.5 h-3.5 text-brand-orange" /> {blog.author}
                  </span>
                  <span>{blog.publishedAt}</span>
                </div>
              </div>

              <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
                <a
                  href={`/blogs/${blog.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(`/blogs/${blog.slug}`);
                  }}
                  className="px-4 py-2.5 bg-brand-blue hover:bg-brand-blue-light text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-sm min-h-[40px]"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-reader-title"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-4 sm:my-8 overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col">
            <div className="bg-brand-blue text-white p-4 sm:p-8 relative shrink-0">
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  onClearInitialSelection?.();
                }}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 bg-brand-orange text-white text-[10px] font-bold rounded uppercase">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-slate-300 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime}
                </span>
              </div>
              <h2 id="article-reader-title" className="text-xl sm:text-3xl font-extrabold font-display leading-tight pr-8">
                {selectedArticle.title}
              </h2>
              <p className="text-xs text-slate-200 mt-2 flex items-center gap-2">
                <span>By {selectedArticle.author}</span> • <span>Published {selectedArticle.publishedAt}</span>
              </p>
            </div>

            <div className="p-4 sm:p-8 space-y-4 overflow-y-auto text-slate-700 text-xs sm:text-sm leading-relaxed">
              {selectedArticle.content.map((p, idx) => (
                <React.Fragment key={idx}>
                  <p className="leading-relaxed">{p}</p>
                  {idx === 1 && <AdSlot type="in-feed" />}
                </React.Fragment>
              ))}

              {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                <div className="pt-4 flex items-center gap-2 flex-wrap border-t border-slate-100">
                  <Tag className="w-3.5 h-3.5 text-brand-orange" />
                  {selectedArticle.tags.map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-mono rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  onClearInitialSelection?.();
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer min-h-[44px]"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
