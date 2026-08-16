/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ShieldCheck, Award, AlertCircle, CheckCircle2, User, FileText, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { StudentResult } from '../types';
import { CertificateViewer } from '../components/CertificateViewer';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const VerificationView: React.FC = () => {
  const { data } = useData();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundResult, setFoundResult] = useState<StudentResult | null>(null);

  const allRecords = data.studentResults || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const trimmed = query.trim().toLowerCase();
    const result = allRecords.find(
      (r) =>
        r.rollNo.toLowerCase() === trimmed ||
        r.certificateNo.toLowerCase() === trimmed ||
        r.enrollmentNo.toLowerCase() === trimmed ||
        r.name.toLowerCase().includes(trimmed)
    );

    setSearched(true);
    setFoundResult(result || null);
  };

  const handleQuickSelect = (rollNo: string) => {
    setQuery(rollNo);
    const result = allRecords.find((r) => r.rollNo === rollNo);
    setSearched(true);
    setFoundResult(result || null);
  };

  return (
    <div className="pb-16 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Certificate Verification', isCurrent: true }
        ]}
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-brand-blue-dark to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-brand-orange">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full uppercase">
            <ShieldCheck className="w-4 h-4" /> Official Validation System
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight">
            Student Certificate Verification
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Verify academic transcripts, roll numbers, and official certificates issued by Future Gates I.T Center Punjab.
          </p>
        </div>
      </section>

      {/* Main Search Section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-xl font-bold font-display text-slate-900">
              Certificate & Roll Number Lookup
            </h2>
            <p className="text-xs text-slate-500">
              Enter candidate Roll Number (e.g. <strong className="text-brand-blue font-mono">FG-2026-101</strong>) or Certificate Number (e.g. <strong className="text-brand-blue font-mono">CER-2026-50912</strong>) below.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Roll No or Certificate No..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-brand-blue hover:bg-brand-blue-light text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Verify Record
            </button>
          </form>

          {/* Quick Trial Chips */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-500 text-[11px] font-bold">Try Sample Rolls:</span>
            {allRecords.slice(0, 4).map((r) => (
              <button
                key={r.rollNo}
                onClick={() => handleQuickSelect(r.rollNo)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-brand-orange/10 hover:text-brand-orange text-slate-700 font-mono font-bold text-[11px] rounded-lg transition-colors cursor-pointer border border-slate-200"
              >
                {r.rollNo} ({r.name.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Result Display Section */}
      <section className="max-w-4xl mx-auto px-4">
        {searched && (
          <div>
            {foundResult ? (
              <CertificateViewer result={foundResult} onClose={() => setSearched(false)} />
            ) : (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 font-display">Record Not Found</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    No verified certificate or transcript record matched key <strong className="font-mono text-red-700">{query}</strong>.
                  </p>
                </div>
                <div className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  If your certificate was recently issued, please allow 24-48 hours for database indexing, or contact our head office at <strong>+92301-6775690</strong>.
                </div>
                <button
                  onClick={() => {
                    setQuery('');
                    setSearched(false);
                  }}
                  className="px-4 py-2 bg-slate-800 text-white font-bold text-xs rounded-lg cursor-pointer"
                >
                  Try Another Search
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
