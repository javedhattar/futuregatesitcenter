import React from 'react';
import mentorPhoto from '../assets/mentor-javed-hattar.png';
import {
  Sparkles,
  CheckCircle2,
  Bot,
  Palette,
  Video,
  Globe,
  FileSpreadsheet,
  TrendingUp,
  GraduationCap,
  Award,
  Star,
  Quote
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useData } from '../context/DataContext';

interface MentorSectionProps {
  onOpenEnrollment?: () => void;
}

export const MentorSection: React.FC<MentorSectionProps> = ({ onOpenEnrollment }) => {
  const { data } = useData();
  const contact = data.contact || {};
  const mentor = data.mentor || {
    name: 'Javed Hattar',
    title: 'IT Expert & Founder Mentor',
    subtitle: 'Future Gates IT Center — "Where Skills Become Your Income"',
    quote: 'Our single focus at Future Gates IT Center is to bridge the gap between theoretical knowledge and real market earning. Every student learns live project skills and freelancing strategies to build sustainable digital income.',
    photoUrl: '/assets/mentor-javed-hattar.png',
    badgeText: 'Lead Faculty',
    expertise: []
  };

  const displayPhoto = mentor.photoUrl && mentor.photoUrl !== '/assets/mentor-javed-hattar.png' 
    ? mentor.photoUrl 
    : mentorPhoto;

  const whatsappUrl = `https://wa.me/${contact.whatsapp || '923016775690'}?text=Hello%20Mentor%20${encodeURIComponent(mentor.name)}%2C%20I%20have%20a%20question%20about%20your%20courses%20at%20Future%20Gates%20IT%20Center.`;

  const mentorExpertise = (mentor.expertise && mentor.expertise.length > 0) ? mentor.expertise.map((item, i) => {
    const icons = [Bot, Palette, Video, Globe, FileSpreadsheet, TrendingUp];
    return {
      ...item,
      icon: icons[i % icons.length],
      color: item.color || 'bg-blue-50 text-blue-600 border-blue-200'
    };
  }) : [
    {
      title: 'Artificial Intelligence & AI Tools',
      description: 'Mastering ChatGPT, Midjourney, Claude, and AI Automation for productivity and freelancing.',
      icon: Bot,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      badge: 'High Demand'
    },
    {
      title: 'Graphic Designing',
      description: 'Adobe Photoshop, Illustrator, Brand Identity, Social Media Posts, and Marketing Collaterals.',
      icon: Palette,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      badge: 'Creative'
    },
    {
      title: 'Video Editing',
      description: 'Adobe Premiere Pro, CapCut Pro, YouTube Content Creation, Reels & Commercial Edits.',
      icon: Video,
      color: 'bg-rose-50 text-rose-600 border-rose-200',
      badge: 'Popular'
    },
    {
      title: 'WordPress Website Designing',
      description: 'Custom e-Commerce, Elementor Pro, Business Websites, Speed Optimization & SEO.',
      icon: Globe,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      badge: 'Core Skill'
    },
    {
      title: 'MS Office & Automation',
      description: 'Advanced Excel, Professional Powerpoint Presentations, Word, and Administrative Tools.',
      icon: FileSpreadsheet,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      badge: 'Essential'
    },
    {
      title: 'Digital Skills & Freelancing',
      description: 'Fiverr & Upwork Profile Setup, Client Proposal Writing, Communication & Income Scaling.',
      icon: TrendingUp,
      color: 'bg-orange-50 text-brand-orange border-orange-200',
      badge: 'Monetization'
    }
  ];

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-brand-blue-dark to-slate-950 text-white overflow-hidden border-y-4 border-brand-orange shadow-2xl">
      {/* Background Decorative Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-extrabold rounded-full uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            MEET OUR MENTOR
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
            Guided By Industry Leadership
          </h2>
          <p className="text-brand-orange font-bold font-sans text-sm sm:text-base uppercase tracking-wider">
            Future Gates IT Center — "Where Skills Become Your Income"
          </p>
        </div>

        {/* Main Mentor Feature Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Official Photo with Responsive Center Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md mx-auto group">
              {/* Decorative Frame Rings */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-orange via-blue-500 to-brand-orange rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-500" />
              
              <div className="relative bg-slate-900 border-2 border-white/20 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden flex flex-col items-center">
                {/* Institute Badge Overlay */}
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 z-20 shadow-lg">
                  <Award className="w-3.5 h-3.5 text-brand-orange" />
                  {mentor.badgeText || 'Lead Faculty'}
                </div>

                {/* Photo Display Frame - Preserves proportions and face centering */}
                <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-800 border border-white/10 flex items-center justify-center relative">
                  <img
                    src={displayPhoto}
                    alt={`${mentor.name} — ${mentor.title} at Future Gates IT Center`}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="400"
                  />
                  {/* Subtle Gradient Shadow Base */}
                  <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
                </div>

                {/* Mentor Card Footer Info */}
                <div className="mt-4 text-center space-y-1 z-10 w-full">
                  <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 bg-brand-orange/20 border border-brand-orange/30 rounded-full text-brand-orange text-xs font-bold uppercase tracking-wider mx-auto">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Lead IT Instructor & Mentor</span>
                  </div>
                  <h3 className="text-2xl font-black font-display text-white mt-2">{mentor.name}</h3>
                  <p className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                    {mentor.title}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Future Gates IT Center
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mentor Bio & Highlighted Skill Cards */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quote / Vision Block */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
              <Quote className="w-8 h-8 text-brand-orange/40 absolute top-4 right-4" />
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic font-serif">
                "{mentor.quote}"
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-brand-orange" />
                <span className="text-xs font-extrabold text-white uppercase tracking-wider font-display">
                  {mentor.name} — {mentor.title}
                </span>
              </div>
            </div>

            {/* Expertise Grid Header */}
            <div>
              <h4 className="text-xs font-extrabold text-brand-orange uppercase tracking-widest mb-1">
                Core Specializations
              </h4>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Mentorship Expertise & Training Pillars
              </h3>
            </div>

            {/* 6 Skill Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {mentorExpertise.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-slate-900/90 border border-white/10 hover:border-brand-orange/50 p-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 space-y-2 group"
                  >
                    <div className="flex justify-between items-center">
                      <div className={`p-2 rounded-lg border ${item.color} shrink-0`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-white/10 text-slate-300 rounded-full border border-white/10">
                        {item.badge}
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-white group-hover:text-brand-orange font-display transition-colors">
                      {item.title}
                    </h5>

                    <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
              {onOpenEnrollment && (
                <button
                  onClick={onOpenEnrollment}
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white px-7 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <GraduationCap className="w-4 h-4" /> Enroll Under Mentor
                </button>
              )}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] min-h-[44px]"
              >
                <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                  <WhatsAppIcon className="w-3 h-3 text-white" />
                </div>
                <span>Mentor WhatsApp Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
