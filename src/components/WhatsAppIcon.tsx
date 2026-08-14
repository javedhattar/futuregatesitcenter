/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface WhatsAppIconProps {
  className?: string;
  size?: number;
}

/**
 * Official WhatsApp vector logo icon with standard brand proportions.
 */
export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({ className = 'w-4 h-4', size }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
};

interface OfficialWhatsAppBadgeProps {
  phoneNumber?: string;
  whatsappUrl?: string;
  className?: string;
  variant?: 'pill' | 'button' | 'compact';
  label?: string;
}

/**
 * Official branded WhatsApp badge with phone number.
 */
export const OfficialWhatsAppBadge: React.FC<OfficialWhatsAppBadgeProps> = ({
  phoneNumber = '+92301-6775690',
  whatsappUrl = 'https://wa.me/923016775690',
  className = '',
  variant = 'pill',
  label = 'Chat on WhatsApp'
}) => {
  if (variant === 'button') {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] cursor-pointer ${className}`}
      >
        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
          <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
        </div>
        <span>{label}</span>
        <span className="font-mono text-white/90 text-[11px] font-semibold">({phoneNumber})</span>
      </a>
    );
  }

  if (variant === 'compact') {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 text-[#25D366] hover:text-[#1ea851] font-mono text-xs font-bold transition-colors ${className}`}
      >
        <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
        <span>{phoneNumber}</span>
      </a>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-3 py-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-slate-800 hover:text-slate-900 rounded-full text-xs font-medium transition-all ${className}`}
    >
      <div className="w-4 h-4 rounded-full bg-[#25D366] flex items-center justify-center text-white">
        <WhatsAppIcon className="w-2.5 h-2.5 text-white" />
      </div>
      <span className="font-bold text-[#128C7E] font-mono text-[11px]">{phoneNumber}</span>
    </a>
  );
};
