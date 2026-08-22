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
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  customLogoUrl?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'dark',
  iconOnly = false,
  size = 48,
  customLogoUrl,
}) => {
  const { data } = useData();
  const settings = data?.settings;

  const isLight = variant === 'light';

  // Normalize size
  let numericSize = 48;
  if (typeof size === 'number') {
    numericSize = size;
  } else if (size === 'sm') {
    numericSize = 36;
  } else if (size === 'md') {
    numericSize = 48;
  } else if (size === 'lg') {
    numericSize = 64;
  } else if (size === 'xl') {
    numericSize = 80;
  }

  // Determine active logo URL
  let logoSrc = brandLogo;
  if (customLogoUrl && customLogoUrl.trim() !== '') {
    logoSrc = customLogoUrl;
  } else if (isLight && settings?.footerLogoUrl && settings.footerLogoUrl.trim() !== '') {
    logoSrc = settings.footerLogoUrl;
  } else if (!isLight && settings?.headerLogoUrl && settings.headerLogoUrl.trim() !== '') {
    logoSrc = settings.headerLogoUrl;
  }

  const [errorCount, setErrorCount] = React.useState(0);

  React.useEffect(() => {
    setErrorCount(0);
  }, [logoSrc]);

  let activeLogoSrc = logoSrc || brandLogo;
  if (errorCount === 1) {
    activeLogoSrc = brandLogo;
  }

  const instituteName = settings?.instituteName || 'Future Gates IT Center';
  const tagline = settings?.tagline || 'Where Skills Become Your Income';

  // Split institute name for styled display
  const nameParts = instituteName.split(' ');
  const mainName = nameParts.slice(0, 2).join(' ');
  const subName = nameParts.slice(2).join(' ');

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none min-w-0 max-w-full ${className}`}>
      {/* Official Brand Seal Logo Mark */}
      {errorCount >= 2 ? (
        <div
          style={{ width: `${numericSize}px`, height: `${numericSize}px` }}
          className="rounded-xl bg-gradient-to-br from-blue-600 via-slate-900 to-orange-500 flex items-center justify-center text-white font-extrabold text-base sm:text-lg shadow-md shrink-0 border border-white/20"
        >
          FG
        </div>
      ) : (
        <img
          src={activeLogoSrc}
          alt={`${instituteName} Official Logo`}
          width={numericSize}
          height={numericSize}
          style={{ width: `${numericSize}px`, height: `${numericSize}px` }}
          className="object-contain shrink-0 filter drop-shadow-sm hover:scale-105 transition-transform"
          referrerPolicy="no-referrer"
          onError={() => setErrorCount((prev) => prev + 1)}
        />
      )}

      {!iconOnly && (
        <div className="flex flex-col justify-center min-w-0 flex-1">
          <div className="flex items-center gap-1 sm:gap-1.5 flex-nowrap truncate">
            <span
              className={`font-display font-extrabold leading-none tracking-tight text-sm sm:text-base md:text-lg uppercase whitespace-nowrap ${
                isLight ? 'text-white' : 'text-slate-900'
              }`}
            >
              {mainName}
            </span>
            {subName && (
              <span
                className={`font-display font-bold leading-none tracking-tight text-sm sm:text-base md:text-lg uppercase whitespace-nowrap ${
                  isLight ? 'text-brand-orange' : 'text-brand-orange-dark'
                }`}
              >
                {subName}
              </span>
            )}
          </div>

          <span
            className={`font-sans font-bold tracking-wider text-[8px] sm:text-[9.5px] uppercase mt-0.5 truncate ${
              isLight ? 'text-brand-orange opacity-95' : 'text-brand-orange'
            }`}
          >
            {tagline}
          </span>

          <span
            className={`text-[7.5px] sm:text-[8px] leading-tight hidden md:block truncate ${
              isLight ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Professional IT Training & Certificate Verification
          </span>
        </div>
      )}
    </div>
  );
};
