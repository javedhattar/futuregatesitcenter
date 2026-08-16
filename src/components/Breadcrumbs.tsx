/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { navigateTo } from '../utils/routes';

export interface BreadcrumbItem {
  name: string;
  url?: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url?: string) => {
    if (url) {
      e.preventDefault();
      navigateTo(url);
    }
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500 font-medium ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0">
        <li className="flex items-center gap-1.5">
          <a
            href="/"
            onClick={(e) => handleClick(e, '/')}
            className="flex items-center gap-1 text-slate-500 hover:text-brand-blue transition-colors cursor-pointer"
            title="Go to Homepage"
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span>Home</span>
          </a>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1 || item.isCurrent;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
              {isLast || !item.url ? (
                <span
                  aria-current="page"
                  className="font-bold text-brand-blue truncate max-w-[200px] sm:max-w-xs md:max-w-md"
                  title={item.name}
                >
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.url}
                  onClick={(e) => handleClick(e, item.url)}
                  className="text-slate-600 hover:text-brand-blue transition-colors cursor-pointer truncate max-w-[150px] sm:max-w-xs"
                >
                  {item.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
