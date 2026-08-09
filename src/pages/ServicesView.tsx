/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Service } from '../types';
import { CheckCircle2, MessageSquare, Sparkles, Building2, Store } from 'lucide-react';

export const ServicesView: React.FC = () => {
  const { data } = useData();
  const [activeCategory, setActiveCategory] = useState<'all' | 'agency' | 'local-hub'>('all');

  const allServices = (data.services || []).filter((s) => s.isPublished !== false);

  const filteredServices = allServices.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  const handleInquire = (service: Service) => {
    const text = encodeURIComponent(
      `Hello Future Gates IT Center,\n\nI am interested in your service:\n*Service:* ${service.title}\n\nPlease share details and pricing.`
    );
    window.open(`https://wa.me/923016775690?text=${text}`, '_blank');
  };

  return (
    <div className="pb-16 space-y-12">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-brand-blue-dark to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-brand-orange">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-bold rounded-full uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Professional IT & Digital Agency
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight">
            Software, Digital Marketing & Printing Services
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
            From high-conversion custom web applications and SEO marketing to local printing, custom stamps, wedding cards, and online application filing.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center border-b border-slate-200">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-3 font-bold text-xs sm:text-sm transition-all border-b-2 cursor-pointer ${
              activeCategory === 'all'
                ? 'border-brand-orange text-brand-blue font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            All Services ({allServices.length})
          </button>
          <button
            onClick={() => setActiveCategory('agency')}
            className={`px-6 py-3 font-bold text-xs sm:text-sm transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
              activeCategory === 'agency'
                ? 'border-brand-orange text-brand-blue font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4 text-brand-orange" /> Digital Agency & Software
          </button>
          <button
            onClick={() => setActiveCategory('local-hub')}
            className={`px-6 py-3 font-bold text-xs sm:text-sm transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
              activeCategory === 'local-hub'
                ? 'border-brand-orange text-brand-blue font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Store className="w-4 h-4 text-emerald-600" /> Local Hub & Printing
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Service Cover Image */}
                <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                    <span className="px-2.5 py-1 bg-brand-orange text-white text-[10px] font-bold rounded uppercase shadow-sm">
                      {service.category === 'agency' ? 'Digital Agency' : 'Local Services'}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue font-display transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">Key Features Included:</span>
                    <div className="space-y-1">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="text-[11px] text-slate-700 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {service.techStack.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1">
                      {service.techStack.map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9.5px] font-mono rounded border border-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => handleInquire(service)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" /> Inquire via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
