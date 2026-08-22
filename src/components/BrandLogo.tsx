/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import brandLogoPng from '../assets/brandlogo.png';
import brandLogoSvg from '../assets/brandlogo.svg';
import { useData } from '../context/DataContext';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  iconOnly?: boolean;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  customLogoUrl?: string;
}

/**
 * Built-in vector Brand Seal Icon as a 100% infallible fallback.
 * Ensures the official Future Gates IT Center seal renders with zero network dependency.
 */
export const OfficialSealVector: React.FC<{ size?: number; className?: string }> = ({
  size = 48,
  className = ''
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 800"
    width={size}
    height={size}
    style={{ width: `${size}px`, height: `${size}px` }}
    className={`shrink-0 select-none ${className}`}
  >
    <defs>
      <path id="topArcFallback" d="M 125,400 A 275,275 0 1,1 675,400" />
      <path id="bottomArcFallback" d="M 675,400 A 275,275 0 0,1 125,400" />
      <linearGradient id="sealGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
    </defs>

    {/* Outer Scalloped Badge Border */}
    <path
      d="M 400 20 Q 415 28 429 23 Q 443 18 456 28 Q 469 38 482 35 Q 496 32 507 44 Q 518 56 530 55 Q 542 55 551 69 Q 560 83 571 85 Q 582 87 589 102 Q 596 117 605 122 Q 614 127 618 143 Q 622 159 629 166 Q 636 173 638 190 Q 640 207 644 216 Q 648 225 647 242 Q 646 259 648 269 Q 650 279 646 296 Q 642 313 642 324 Q 642 335 635 351 Q 628 367 626 378 Q 624 389 614 403 Q 624 411 626 422 Q 628 433 635 449 Q 642 465 642 476 Q 642 487 646 504 Q 650 521 648 531 Q 646 541 647 558 Q 648 575 644 584 Q 640 593 638 610 Q 636 627 629 634 Q 622 641 618 657 Q 614 673 605 678 Q 596 683 589 698 Q 582 713 571 715 Q 560 717 551 731 Q 542 745 530 745 Q 518 744 507 756 Q 496 768 482 765 Q 469 762 456 772 Q 443 782 429 777 Q 415 772 400 780 Q 385 772 371 777 Q 357 782 344 772 Q 331 762 318 765 Q 304 768 293 756 Q 282 744 270 745 Q 258 745 249 731 Q 240 717 229 715 Q 218 713 211 698 Q 204 683 195 678 Q 186 673 182 657 Q 178 641 171 634 Q 164 627 162 610 Q 160 593 156 584 Q 152 575 153 558 Q 154 541 152 531 Q 150 521 154 504 Q 158 487 158 476 Q 158 465 165 449 Q 172 433 174 422 Q 176 411 186 397 Q 176 389 174 378 Q 172 367 165 351 Q 158 335 158 324 Q 158 313 152 296 Q 148 279 150 269 Q 152 259 153 242 Q 154 225 156 216 Q 160 207 162 190 Q 164 173 171 166 Q 178 159 182 143 Q 186 127 195 122 Q 204 117 211 102 Q 218 87 229 85 Q 240 83 249 69 Q 258 55 270 55 Q 282 56 293 44 Q 304 32 318 35 Q 331 38 344 28 Q 357 18 371 23 Q 385 28 400 20 Z"
      fill="#021B4E"
    />

    {/* Outer Navy Circle Body */}
    <circle cx="400" cy="400" r="365" fill="#021B4E" />
    <circle cx="400" cy="400" r="350" fill="none" stroke="#FFFFFF" strokeWidth="4" />

    {/* Top Arc Text */}
    <text fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="44" letterSpacing="4">
      <textPath href="#topArcFallback" startOffset="50%" textAnchor="middle">FUTURE GATES i.T CENTER</textPath>
    </text>

    {/* Stars */}
    <polygon points="125,400 131,382 149,382 134,371 140,353 125,364 110,353 116,371 101,382 119,382" fill="#FFFFFF" transform="translate(-10, 0)" />
    <polygon points="675,400 681,382 699,382 684,371 690,353 675,364 660,353 666,371 651,382 669,382" fill="#FFFFFF" transform="translate(10, 0)" />

    {/* Bottom Arc Text */}
    <text fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="38" letterSpacing="2">
      <textPath href="#bottomArcFallback" startOffset="50%" textAnchor="middle">Where Skills Become Your Income</textPath>
    </text>

    {/* Center White Circle */}
    <circle cx="400" cy="400" r="248" fill="#FFFFFF" />
    <circle cx="400" cy="400" r="238" fill="#021B4E" />
    <circle cx="400" cy="400" r="230" fill="#FFFFFF" />
    <circle cx="400" cy="400" r="225" fill="#FFFFFF" />

    {/* Center Graphics */}
    <g transform="translate(400, 400)">
      <path d="M -115,-70 A 135,135 0 0,1 115,-70" fill="none" stroke="#021B4E" strokeWidth="16" strokeLinecap="round" />
      <path d="M -115,70 A 135,135 0 0,0 115,70" fill="none" stroke="#021B4E" strokeWidth="16" strokeLinecap="round" />
      <rect x="-170" y="-120" width="340" height="230" rx="20" fill="none" stroke="#021B4E" strokeWidth="18" />
      <path d="M -200,110 L 200,110 L 170,140 L -170,140 Z" fill="#021B4E" stroke="#021B4E" strokeWidth="4" />
      <rect x="-35" y="112" width="70" height="8" rx="4" fill="#FFFFFF" />
      <circle cx="-100" cy="-60" r="14" fill="#FF8C00" />
      <circle cx="100" cy="-60" r="14" fill="#FF8C00" />
      <path d="M 0,-155 L 75,-120 L 0,-85 L -75,-120 Z" fill="#021B4E" />
      <path d="M -45,-105 L -45,-75 Q 0,-45 45,-75 L 45,-105" fill="#021B4E" />
      <polygon points="50,-108 80,-80 80,-10 70,-10 70,-75" fill="#FF8C00" />
      <path d="M -90,-20 L -130,20 L -90,60" fill="none" stroke="#FF8C00" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 90,-20 L 130,20 L 90,60" fill="none" stroke="#FF8C00" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 20,-25 L -20,65" fill="none" stroke="#021B4E" strokeWidth="16" strokeLinecap="round" />
      <text x="0" y="180" fill="#021B4E" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="30" letterSpacing="4" textAnchor="middle">EST. 2026</text>
    </g>
  </svg>
);

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
  // Prioritize bundled SVG/PNG assets, or valid custom URLs
  let initialSrc = brandLogoSvg || brandLogoPng;
  
  if (customLogoUrl && customLogoUrl.trim() !== '' && customLogoUrl !== '/brandlogo.png') {
    initialSrc = customLogoUrl;
  } else if (isLight && settings?.footerLogoUrl && settings.footerLogoUrl.trim() !== '' && settings.footerLogoUrl !== '/brandlogo.png') {
    initialSrc = settings.footerLogoUrl;
  } else if (!isLight && settings?.headerLogoUrl && settings.headerLogoUrl.trim() !== '' && settings.headerLogoUrl !== '/brandlogo.png') {
    initialSrc = settings.headerLogoUrl;
  }

  const [currentSrc, setCurrentSrc] = React.useState<string>(initialSrc);
  const [useVectorFallback, setUseVectorFallback] = React.useState<boolean>(false);

  React.useEffect(() => {
    let nextSrc = brandLogoSvg || brandLogoPng;
    if (customLogoUrl && customLogoUrl.trim() !== '' && customLogoUrl !== '/brandlogo.png') {
      nextSrc = customLogoUrl;
    } else if (isLight && settings?.footerLogoUrl && settings.footerLogoUrl.trim() !== '' && settings.footerLogoUrl !== '/brandlogo.png') {
      nextSrc = settings.footerLogoUrl;
    } else if (!isLight && settings?.headerLogoUrl && settings.headerLogoUrl.trim() !== '' && settings.headerLogoUrl !== '/brandlogo.png') {
      nextSrc = settings.headerLogoUrl;
    }
    setCurrentSrc(nextSrc);
    setUseVectorFallback(false);
  }, [customLogoUrl, isLight, settings?.footerLogoUrl, settings?.headerLogoUrl]);

  const handleImageError = () => {
    if (currentSrc !== brandLogoPng && brandLogoPng) {
      setCurrentSrc(brandLogoPng);
    } else {
      setUseVectorFallback(true);
    }
  };

  const instituteName = settings?.instituteName || 'Future Gates IT Center';
  const tagline = settings?.tagline || 'Where Skills Become Your Income';

  // Split institute name for styled display
  const nameParts = instituteName.split(' ');
  const mainName = nameParts.slice(0, 2).join(' ');
  const subName = nameParts.slice(2).join(' ');

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none min-w-0 max-w-full ${className}`}>
      {/* Official Brand Seal Logo Mark */}
      {useVectorFallback ? (
        <OfficialSealVector size={numericSize} className="filter drop-shadow-sm hover:scale-105 transition-transform" />
      ) : (
        <img
          src={currentSrc}
          alt={`${instituteName} Official Logo`}
          width={numericSize}
          height={numericSize}
          style={{ width: `${numericSize}px`, height: `${numericSize}px` }}
          className="object-contain shrink-0 filter drop-shadow-sm hover:scale-105 transition-transform"
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          onError={handleImageError}
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

