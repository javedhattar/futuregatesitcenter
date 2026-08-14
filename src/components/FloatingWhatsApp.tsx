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

  const phoneNumber = settings?.footerPhone || contact.phone || '+92301-6775690';
  const whatsappDigits = settings?.headerWhatsapp || contact.whatsapp || '923016775690';
  const whatsappUrl = `https://wa.me/${whatsappDigits}?text=Hello%20Future%20Gates%20IT%20Center%2C%20I%20want%20information%20about%20your%20courses%20and%20certifications.`;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`Chat on WhatsApp with Future Gates IT Center at ${phoneNumber}`}
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl shadow-emerald-600/40 transition-all duration-300 hover:scale-105 cursor-pointer ring-4 ring-white/80"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <WhatsAppIcon className="w-6 h-6 text-white" />
        </div>
        <div className="hidden sm:flex flex-col text-left pr-1">
          <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-950 leading-tight">
            Chat on WhatsApp
          </span>
          <span className="text-xs font-mono font-bold text-white leading-tight">
            {phoneNumber}
          </span>
        </div>
      </a>
    </div>
  );
};
