import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  GraduationCap, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Course, BlogPost } from '../types';

interface GlobalSearchBarProps {
  onSelectCourse?: (course: Course) => void;
  onSelectBlog?: (blog: BlogPost) => void;
  onSearchCoursesTab?: (query: string) => void;
  onSearchBlogsTab?: (query: string) => void;
  onOpenEnrollment?: (courseId?: string) => void;
  className?: string;
  isMobile?: boolean;
}

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({
  onSelectCourse,
  onSelectBlog,
  onSearchCoursesTab,
  onSearchBlogsTab,
  onOpenEnrollment,
  className = '',
  isMobile = false,
}) => {
  const { data } = useData();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'courses' | 'blogs'>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const courses = (data.courses || []).filter((c) => c.status !== 'Inactive');
  const blogs = (data.blogs || []).filter((b) => b.isPublished !== false);

  const trimmed = query.trim().toLowerCase();

  // Search filtering logic
  const matchedCourses: Course[] = trimmed.length === 0 ? [] : courses.filter((course) => {
    const inTitle = course.title.toLowerCase().includes(trimmed);
    const inCategory = course.category.toLowerCase().includes(trimmed);
    const inDesc = course.description.toLowerCase().includes(trimmed);
    const inLongDesc = (course.longDescription || '').toLowerCase().includes(trimmed);
    const inSkills = (course.skillsGained || []).some((s) => s.toLowerCase().includes(trimmed));
    return inTitle || inCategory || inDesc || inLongDesc || inSkills;
  });

  const matchedBlogs: BlogPost[] = trimmed.length === 0 ? [] : blogs.filter((blog) => {
    const inTitle = blog.title.toLowerCase().includes(trimmed);
    const inCategory = blog.category.toLowerCase().includes(trimmed);
    const inExcerpt = blog.excerpt.toLowerCase().includes(trimmed);
    const inAuthor = (blog.author || '').toLowerCase().includes(trimmed);
    const inTags = (blog.tags || []).some((t) => t.toLowerCase().includes(trimmed));
    const inContent = (blog.content || []).some((p) => p.toLowerCase().includes(trimmed));
    return inTitle || inCategory || inExcerpt || inAuthor || inTags || inContent;
  });

  const totalResults = matchedCourses.length + matchedBlogs.length;

  // Flattened results for keyboard navigation
  const flatItems: Array<{ type: 'course'; item: Course } | { type: 'blog'; item: BlogPost }> = [];
  if (activeFilter === 'all' || activeFilter === 'courses') {
    matchedCourses.forEach((c) => flatItems.push({ type: 'course', item: c }));
  }
  if (activeFilter === 'all' || activeFilter === 'blogs') {
    matchedBlogs.forEach((b) => flatItems.push({ type: 'blog', item: b }));
  }

  // Keyboard shortcut (Ctrl+K / Cmd+K / Slash key) to focus search
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation inside dropdown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (flatItems.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % flatItems.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (flatItems.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < flatItems.length) {
        const target = flatItems[selectedIndex];
        if (target.type === 'course') {
          handleCourseClick(target.item);
        } else {
          handleBlogClick(target.item);
        }
      } else if (trimmed.length > 0) {
        if (matchedCourses.length > 0 && onSearchCoursesTab) {
          onSearchCoursesTab(query);
          setIsOpen(false);
        } else if (matchedBlogs.length > 0 && onSearchBlogsTab) {
          onSearchBlogsTab(query);
          setIsOpen(false);
        }
      }
    }
  };

  const handleCourseClick = (course: Course) => {
    setIsOpen(false);
    setQuery('');
    if (onSelectCourse) {
      onSelectCourse(course);
    }
  };

  const handleBlogClick = (blog: BlogPost) => {
    setIsOpen(false);
    setQuery('');
    if (onSelectBlog) {
      onSelectBlog(blog);
    }
  };

  const popularSearches = [
    'Web Development',
    'AI Tools',
    'Graphic Design',
    'CIT Diploma',
    'WordPress',
    'Freelancing'
  ];

  return (
    <div ref={searchContainerRef} className={`relative ${className}`}>
      {/* Input Box */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={isMobile ? "Search courses & blogs..." : "Search courses, blogs, AI tools..."}
          className="w-full pl-9 pr-14 py-2 bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-xs text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
        />

        <div className="absolute right-2.5 flex items-center gap-1">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedIndex(-1);
                inputRef.current?.focus();
              }}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            !isMobile && (
              <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded shadow-2xs pointer-events-none">
                ⌘K
              </kbd>
            )
          )}
        </div>
      </div>

      {/* Dropdown Floating Modal */}
      {isOpen && (
        <div 
          className="absolute left-0 right-0 md:left-auto md:right-0 md:w-[480px] lg:w-[540px] mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 overflow-hidden text-slate-800 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Filter Pills Bar (when query exists) */}
          {trimmed.length > 0 && (
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors cursor-pointer ${
                    activeFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({totalResults})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('courses')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] flex items-center gap-1 transition-colors cursor-pointer ${
                    activeFilter === 'courses'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <GraduationCap className="w-3 h-3" />
                  Courses ({matchedCourses.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('blogs')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] flex items-center gap-1 transition-colors cursor-pointer ${
                    activeFilter === 'blogs'
                      ? 'bg-orange-500 text-white'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <BookOpen className="w-3 h-3" />
                  Blogs ({matchedBlogs.length})
                </button>
              </div>

              <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                Esc to close
              </span>
            </div>
          )}

          {/* Search Results Area */}
          <div className="max-h-[380px] overflow-y-auto p-2 space-y-3 divide-y divide-slate-100">
            {trimmed.length === 0 ? (
              /* Suggestions & Popular Searches State */
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                    <span>Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setQuery(term);
                          inputRef.current?.focus();
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-xl text-xs font-medium transition-colors cursor-pointer border border-slate-200 flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div 
                    onClick={() => {
                      if (onSearchCoursesTab) {
                        onSearchCoursesTab('');
                        setIsOpen(false);
                      }
                    }}
                    className="p-3 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 rounded-xl cursor-pointer transition-colors"
                  >
                    <div className="font-bold text-blue-900 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                      All Courses
                    </div>
                    <div className="text-[11px] text-blue-600/80 mt-0.5">{courses.length} active programs</div>
                  </div>

                  <div 
                    onClick={() => {
                      if (onSearchBlogsTab) {
                        onSearchBlogsTab('');
                        setIsOpen(false);
                      }
                    }}
                    className="p-3 bg-orange-50/50 hover:bg-orange-50 border border-orange-100 rounded-xl cursor-pointer transition-colors"
                  >
                    <div className="font-bold text-orange-900 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-orange-600" />
                      All Tech Blogs
                    </div>
                    <div className="text-[11px] text-orange-600/80 mt-0.5">{blogs.length} published guides</div>
                  </div>
                </div>
              </div>
            ) : totalResults === 0 ? (
              /* No Results State */
              <div className="text-center py-8 px-4 space-y-2">
                <Search className="w-8 h-8 text-slate-300 mx-auto" />
                <h4 className="font-bold text-sm text-slate-800">No matching courses or blogs found</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Try searching for keywords like "React", "Graphic Design", "AI", "CIT", or "Freelance".
                </p>
              </div>
            ) : (
              /* Results List */
              <>
                {/* Courses Section */}
                {(activeFilter === 'all' || activeFilter === 'courses') && matchedCourses.length > 0 && (
                  <div className="pt-2 first:pt-0 space-y-1.5">
                    <div className="px-3 py-1 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-blue-600">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5" />
                        Courses ({matchedCourses.length})
                      </span>
                      {onSearchCoursesTab && (
                        <button
                          type="button"
                          onClick={() => {
                            onSearchCoursesTab(query);
                            setIsOpen(false);
                          }}
                          className="hover:underline text-[10px] font-bold text-slate-500 hover:text-blue-600 cursor-pointer"
                        >
                          View in Courses page →
                        </button>
                      )}
                    </div>

                    <div className="space-y-1">
                      {matchedCourses.map((course, idx) => {
                        const isSelected = selectedIndex === idx && activeFilter !== 'blogs';
                        return (
                          <div
                            key={course.id}
                            onClick={() => handleCourseClick(course)}
                            className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'bg-blue-50 text-blue-900 border border-blue-200'
                                : 'hover:bg-slate-50 text-slate-800'
                            }`}
                          >
                            <div className="space-y-1 min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-xs text-slate-900 truncate">
                                  {course.title}
                                </span>
                                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-extrabold rounded">
                                  {course.category}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1">
                                {course.description}
                              </p>
                              <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-orange-500" />
                                  {course.duration}
                                </span>
                                <span className="font-bold text-orange-600">
                                  {course.fee}
                                </span>
                              </div>
                            </div>

                            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Blogs Section */}
                {(activeFilter === 'all' || activeFilter === 'blogs') && matchedBlogs.length > 0 && (
                  <div className="pt-2 space-y-1.5">
                    <div className="px-3 py-1 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-orange-600">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        Blogs & Career Guides ({matchedBlogs.length})
                      </span>
                      {onSearchBlogsTab && (
                        <button
                          type="button"
                          onClick={() => {
                            onSearchBlogsTab(query);
                            setIsOpen(false);
                          }}
                          className="hover:underline text-[10px] font-bold text-slate-500 hover:text-orange-600 cursor-pointer"
                        >
                          View in Blogs page →
                        </button>
                      )}
                    </div>

                    <div className="space-y-1">
                      {matchedBlogs.map((blog, idx) => {
                        const globalIndex = (activeFilter === 'all' ? matchedCourses.length : 0) + idx;
                        const isSelected = selectedIndex === globalIndex;
                        return (
                          <div
                            key={blog.id || blog.slug}
                            onClick={() => handleBlogClick(blog)}
                            className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'bg-orange-50 text-orange-900 border border-orange-200'
                                : 'hover:bg-slate-50 text-slate-800'
                            }`}
                          >
                            <div className="space-y-1 min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-xs text-slate-900 truncate">
                                  {blog.title}
                                </span>
                                <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded">
                                  {blog.category}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1">
                                {blog.excerpt}
                              </p>
                              <div className="flex items-center gap-3 text-[10px] text-slate-400">
                                <span>By {blog.author}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1 font-mono">
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  {blog.readTime}
                                </span>
                              </div>
                            </div>

                            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Quick Footer Bar */}
          {trimmed.length > 0 && totalResults > 0 && (
            <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="text-[11px]">
                Showing <strong className="text-slate-800">{totalResults}</strong> matches
              </span>
              <div className="flex items-center gap-2">
                {onSearchCoursesTab && matchedCourses.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      onSearchCoursesTab(query);
                      setIsOpen(false);
                    }}
                    className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    Courses View
                  </button>
                )}
                {onSearchBlogsTab && matchedBlogs.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      onSearchBlogsTab(query);
                      setIsOpen(false);
                    }}
                    className="text-[11px] font-bold text-orange-600 hover:underline cursor-pointer"
                  >
                    Blogs View
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
