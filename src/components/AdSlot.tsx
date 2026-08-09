/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Megaphone } from 'lucide-react';

interface AdSlotProps {
  type?: 'banner' | 'in-feed' | 'sidebar';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ type = 'banner', className = '' }) => {
  return (
    <div
      className={`bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4 text-center my-6 flex flex-col items-center justify-center text-slate-400 no-print ${className}`}
      aria-label="Advertisement Container"
    >
      <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
        <Megaphone className="w-3 h-3 text-brand-orange/60" />
        <span>Advertisement Area</span>
      </div>
      <p className="text-[10px] text-slate-400 max-w-sm">
        Sponsor or Google AdSense ad units will be rendered here.
      </p>
    </div>
  );
};
