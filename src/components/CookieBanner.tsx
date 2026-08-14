/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Cookie, X, Check } from 'lucide-react';

interface CookieBannerProps {
  onNavigateToCookies: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigateToCookies }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('fg_cookie_consent');
    if (!consent) {
      // Show after short delay
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('fg_cookie_consent', 'accepted');
    if (typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-40 bg-slate-900 border border-slate-700 text-white rounded-2xl shadow-2xl p-5 no-print animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
            <Cookie className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm font-display text-white">Cookie & Privacy Notice</h4>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
        We use essential cookies and third-party advertising cookies (such as Google AdSense) to analyze portal traffic, personalize ad experiences, and support open educational content.
      </p>

      <div className="mt-4 flex items-center justify-between gap-3 pt-2 border-t border-slate-800 text-xs">
        <button
          onClick={() => {
            setIsVisible(false);
            onNavigateToCookies();
          }}
          className="text-slate-400 hover:text-amber-400 font-semibold underline transition-colors cursor-pointer"
        >
          Cookie Policy & Settings
        </button>

        <button
          onClick={handleAccept}
          className="px-4 py-2 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl flex items-center gap-1.5 shadow transition-all cursor-pointer"
        >
          <Check className="w-4 h-4" /> Accept Cookies
        </button>
      </div>
    </div>
  );
};
