/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useData } from '../context/DataContext';

export const FloatingWhatsApp: React.FC = () => {
  const { data } = useData();
  const settings = data?.settings;
  const contact = data?.contact || {};

  const phoneNumber = settings?.headerWhatsapp || contact.whatsapp || '923016775690';
  const cleanDigits = phoneNumber.replace(/[^0-9]/g, '') || '923016775690';
  const whatsappUrl = `https://wa.me/${cleanDigits}?text=Hello%20Future%20Gates%20IT%20Center%2C%20I%20want%20information%20about%20your%20courses%20and%20certifications.`;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center">
      {/* Tooltip on hover */}
      <div
        className={`absolute right-full mr-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-xl pointer-events-none whitespace-nowrap transition-all duration-200 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        Chat with us on WhatsApp
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat on WhatsApp"
        className="relative w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl shadow-emerald-600/50 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ring-4 ring-white/90"
      >
        {/* Subtle Online Pulse Wave */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />
        
        {/* Official WhatsApp Logo Icon */}
        <WhatsAppIcon className="w-8 h-8 text-white relative z-10 drop-shadow-sm" />
      </a>
    </div>
  );
};

