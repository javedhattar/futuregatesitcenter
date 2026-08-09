/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import brandLogo from '../assets/brandlogo.png';
import { useData } from '../context/DataContext';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  iconOnly?: boolean;
  size?: number;
  customLogoUrl?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'dark',
  iconOnly = false,
  size = 50,
  customLogoUrl,
}) => {
  const { data } = useData();
  const settings = data?.settings;

  const isLight = variant === 'light';

  // Determine active logo URL
  let logoSrc = brandLogo;
  if (customLogoUrl && customLogoUrl.trim() !== '') {
    logoSrc = customLogoUrl;
  } else if (isLight && settings?.footerLogoUrl && settings.footerLogoUrl.trim() !== '') {
    logoSrc = settings.footerLogoUrl;
  } else if (!isLight && settings?.headerLogoUrl && settings.headerLogoUrl.trim() !== '') {
    logoSrc = settings.headerLogoUrl;
  }

  const instituteName = settings?.instituteName || 'Future Gates IT Center';
  const tagline = settings?.tagline || 'Where Skills Become Your Income';

  // Split institute name for styled display
  const nameParts = instituteName.split(' ');
  const mainName = nameParts.slice(0, 2).join(' ');
  const subName = nameParts.slice(2).join(' ');

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Brand Seal Logo Mark */}
      <img
        src={logoSrc}
        alt={`${instituteName} Logo`}
        width={size}
        height={size}
        style={{ width: `${size}px`, height: `${size}px` }}
        className="object-contain shrink-0 filter drop-shadow-sm hover:scale-105 transition-transform"
        referrerPolicy="no-referrer"
      />

      {!iconOnly && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`font-display font-extrabold leading-none tracking-tight text-base sm:text-lg uppercase ${
                isLight ? 'text-white' : 'text-slate-900'
              }`}
            >
              {mainName}
            </span>
            {subName && (
              <span
                className={`font-display font-light leading-none tracking-tight text-base sm:text-lg uppercase ${
                  isLight ? 'text-brand-orange' : 'text-brand-orange-dark'
                }`}
              >
                {subName}
              </span>
            )}
          </div>

          <span
            className={`font-sans font-bold tracking-wider text-[8.5px] sm:text-[9.5px] uppercase mt-0.5 ${
              isLight ? 'text-brand-orange opacity-95' : 'text-brand-orange'
            }`}
          >
            {tagline}
          </span>

          <span
            className={`text-[7.5px] sm:text-[8px] leading-tight hidden sm:block ${
              isLight ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Accredited IT Training & Certification Verification
          </span>
        </div>
      )}
    </div>
  );
};
