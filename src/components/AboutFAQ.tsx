/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Briefcase,
  Search,
  CheckCircle2,
  Sparkles,
  MessageCircleQuestion,
  ExternalLink
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'training' | 'enrollment' | 'verification' | 'career';
  question: string;
  answer: string;
  highlights?: string[];
}

const FAQ_DATA: FAQItem[] = [
  // 1. IT Training & Courses
  {
    id: 'training-prerequisites',
    category: 'training',
    question: 'Do I need prior coding or technical experience to enroll in your IT courses?',
    answer: 'No prior technical background is required for our foundational and beginner-track courses. Our programs start from the absolute fundamentals and progressively advance to professional, production-grade skills. However, basic familiarity with operating a computer and basic English literacy is helpful.',
    highlights: [
      'Beginner-friendly step-by-step guidance',
      '100% practical lab assignments with mentor feedback',
      'Advanced modules for intermediate learners'
    ]
  },
  {
    id: 'training-mode',
    category: 'training',
    question: 'Are classes conducted on-campus, online, or in hybrid mode?',
    answer: 'We offer both physical on-campus training at our Khushab Main Campus with dedicated computer lab workstations and high-speed internet, as well as live interactive online classes for students outside Khushab across Pakistan.',
    highlights: [
      'Equipped modern computer labs for hands-on practice',
      'Recorded lecture archives for revision',
      'Live Q&A sessions with senior instructors'
    ]
  },
  {
    id: 'training-curriculum',
    category: 'training',
    question: 'How often is the course curriculum updated with new technologies?',
    answer: 'Our curriculum is revised on a quarterly schedule to match evolving market demands. We integrate modern stacks including React, Node.js, Next.js, Tailwind CSS, AI prompt engineering and automation tools, modern UI/UX design workflows in Figma, and updated search engine & social media algorithms.',
    highlights: [
      'Quarterly industry-aligned curriculum updates',
      'Modern AI workflow integration',
      'Real-world client project simulations'
    ]
  },

  // 2. Course Enrollment & Admissions
  {
    id: 'enrollment-process',
    category: 'enrollment',
    question: 'How can I apply for course admission and what is the registration process?',
    answer: 'You can apply either online through our portal or in person at our campus. Online applicants fill out the Admission Form, select their preferred course and class batch timing (Morning / Evening / Weekend), and submit the initial registration fee through EasyPaisa, JazzCash, or direct bank transfer.',
    highlights: [
      'Simple online registration in under 3 minutes',
      'Instant admission confirmation slip generation',
      'Multiple payment methods supported'
    ]
  },
  {
    id: 'enrollment-fees',
    category: 'enrollment',
    question: 'What is the fee structure and are installment plans available?',
    answer: 'Our course fees are structured to be affordable and transparent with no hidden charges. Students can pay the tuition fee in easy monthly installments over the course duration. Merit-based concessions are also considered for deserving students.',
    highlights: [
      'Flexible monthly installment plans',
      'No surprise charges for lab use or software access',
      'Official fee receipts issued upon payment'
    ]
  },
  {
    id: 'enrollment-batch-timing',
    category: 'enrollment',
    question: 'What class shifts and timings are available for students and working professionals?',
    answer: 'We operate multiple flexible shifts throughout the week: Morning Batches (09:00 AM – 01:00 PM), Afternoon Batches (02:00 PM – 05:00 PM), and Special Evening / Weekend Batches designed specifically for university students and employed professionals.',
    highlights: [
      'Flexible morning, afternoon, and evening batches',
      'Weekend intensive options',
      'Batch transfer flexibility upon written request'
    ]
  },

  // 3. Certificate Verification & Credentials
  {
    id: 'verification-system',
    category: 'verification',
    question: 'How does the online certificate and transcript verification system work?',
    answer: 'Every student who successfully passes their practical evaluations and final project receives a tamper-proof certificate equipped with a unique Roll Number and Certificate ID. Anyone (including employers and embassies) can navigate to our official Verification Portal and instantly verify the student credential, grade, session, and transcript authenticity.',
    highlights: [
      'Real-time public database lookup by Roll No or Name',
      'Official digitized academic transcript with seal and signature',
      'Print-ready high-resolution verification certificate'
    ]
  },
  {
    id: 'verification-lost-cert',
    category: 'verification',
    question: 'Can I re-download or print my certificate if I lose the physical copy?',
    answer: 'Yes! Because your academic record is permanently stored on our portal, you or your employer can access and reprint your verified certificate transcript anytime using your assigned Student Roll Number.',
    highlights: [
      'Lifetime digital transcript access',
      'Instant re-print with official validation stamps',
      'Direct WhatsApp helpdesk support for credentials'
    ]
  },

  // 4. Career Support & Freelancing
  {
    id: 'career-freelancing',
    category: 'career',
    question: 'Do you provide mentorship for freelancing and landing remote client projects?',
    answer: 'Yes! Freelancing training is a core pillar of our philosophy ("Where Skills Become Your Income"). Every diploma and technical course includes dedicated practical training on Upwork, Fiverr, LinkedIn networking, proposal writing, portfolio building, and international client communication.',
    highlights: [
      'Live profile setup and gig optimization guidance',
      'Real client communication strategies',
      'Portfolio review by senior agency mentors'
    ]
  },
  {
    id: 'career-job-assistance',
    category: 'career',
    question: 'Will I get an internship or job recommendation after completing the course?',
    answer: 'Top-performing students are offered paid internships directly within our in-house Software Agency and Digital Printing unit. We also provide recommendation letters and direct referrals to our partner software houses across Punjab and remote agency networks.',
    highlights: [
      'In-house software agency internship opportunities',
      'Recommendation letters for top graduates',
      'Alumni career networking and job alerts'
    ]
  }
];

interface AboutFAQProps {
  onOpenEnrollment?: () => void;
  onNavigateContact?: () => void;
}

export const AboutFAQ: React.FC<AboutFAQProps> = ({ onOpenEnrollment, onNavigateContact }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'training' | 'enrollment' | 'verification' | 'career'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['training-prerequisites', 'verification-system']);

  const toggleFAQ = (id: string) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenIds(filteredFAQs.map(f => f.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.highlights?.some(h => h.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const categories = [
    { id: 'all', label: 'All Questions', count: FAQ_DATA.length, icon: HelpCircle },
    { id: 'training', label: 'IT Training & Courses', count: FAQ_DATA.filter(f => f.category === 'training').length, icon: BookOpen },
    { id: 'enrollment', label: 'Admissions & Enrollment', count: FAQ_DATA.filter(f => f.category === 'enrollment').length, icon: GraduationCap },
    { id: 'verification', label: 'Certificate Verification', count: FAQ_DATA.filter(f => f.category === 'verification').length, icon: ShieldCheck },
    { id: 'career', label: 'Freelancing & Career', count: FAQ_DATA.filter(f => f.category === 'career').length, icon: Briefcase }
  ];

  return (
    <section id="about-faq-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue rounded-full text-xs font-bold uppercase tracking-wider">
          <MessageCircleQuestion className="w-4 h-4 text-brand-blue" />
          Got Questions? We Have Answers
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Everything you need to know about our professional IT courses, admission requirements, online transcript verification, and career pathways.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="bg-slate-50 p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. fees, certificate verification, timings, freelancing)..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Tabs & Expand All Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                      : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 self-end sm:self-auto">
            <button
              onClick={expandAll}
              className="hover:text-brand-blue transition-colors cursor-pointer underline-offset-2 hover:underline"
            >
              Expand All
            </button>
            <span>•</span>
            <button
              onClick={collapseAll}
              className="hover:text-brand-blue transition-colors cursor-pointer underline-offset-2 hover:underline"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFAQs.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">No matching questions found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any questions matching "{searchQuery}". Try searching for another keyword or browse all categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 bg-brand-blue text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-brand-blue-dark transition-colors"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          filteredFAQs.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            // Category badge meta
            const badgeMeta = {
              training: { label: 'IT Training', color: 'text-blue-700 bg-blue-50 border-blue-200' },
              enrollment: { label: 'Enrollment', color: 'text-amber-700 bg-amber-50 border-amber-200' },
              verification: { label: 'Verification', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
              career: { label: 'Career Support', color: 'text-purple-700 bg-purple-50 border-purple-200' }
            }[faq.category];

            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-brand-blue shadow-md ring-1 ring-brand-blue/20'
                    : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${badgeMeta.color}`}>
                        {badgeMeta.label}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-brand-blue text-white rotate-180' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-slate-100 mt-1 space-y-4">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-4">
                      {faq.answer}
                    </p>

                    {faq.highlights && faq.highlights.length > 0 && (
                      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2">
                        <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                          Key Takeaways:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {faq.highlights.map((h, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions Contact Card */}
      <div className="bg-gradient-to-r from-slate-900 to-brand-blue-dark text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-base sm:text-lg font-extrabold font-display flex items-center justify-center md:justify-start gap-2">
            <HelpCircle className="w-5 h-5 text-brand-orange" />
            Still have questions about a specific course or batch?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Our admissions counselors and mentor Engr. Javed Akhtar are here to guide you through career selection, course registration, or credential validation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {onOpenEnrollment && (
            <button
              onClick={onOpenEnrollment}
              className="px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Enroll in a Course
            </button>
          )}
          {onNavigateContact && (
            <button
              onClick={onNavigateContact}
              className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Contact Support
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
