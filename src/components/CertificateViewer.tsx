/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, CheckCircle2, Printer, ShieldCheck, Download, Share2 } from 'lucide-react';
import { StudentResult } from '../types';
import { useData } from '../context/DataContext';
import { BrandLogo } from './BrandLogo';

interface CertificateViewerProps {
  result: StudentResult;
  onClose?: () => void;
}

export const CertificateViewer: React.FC<CertificateViewerProps> = ({ result, onClose }) => {
  const { data } = useData();
  const settings = data.settings;

  const handlePrint = () => {
    window.print();
  };

  const instituteName = settings?.instituteName || 'Future Gates I.T Center';
  const tagline = settings?.tagline || 'Where Skills Become Your Income';
  const address = settings?.contactInfo?.address || settings?.footerAddress || 'Punjab, Pakistan';
  const email = settings?.contactInfo?.email || settings?.footerEmail || 'futuregatesitcenter@gmail.com';
  const phone = settings?.contactInfo?.phone || settings?.headerPhone || '+92301-6775690';
  
  const customStamp = settings?.certificateStampLogoUrl;
  const customSignature = settings?.certificateSignatureUrl;
  const signerName = settings?.certificateSignerName || 'Controller Exams';
  const registrarTitle = settings?.certificateRegistrarTitle || 'Authorized Registrar';

  return (
    <div className="space-y-6">
      {/* Top Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl shadow-md border border-slate-200 no-print">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-slate-800">
            Official Record Verified: <span className="font-mono text-brand-blue">{result.certificateNo}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-brand-blue hover:bg-brand-blue-light text-white text-xs font-bold rounded-lg flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print Transcript / Certificate
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Back to Search
            </button>
          )}
        </div>
      </div>

      {/* Official Certificate Document Card */}
      <div className="print-card bg-white rounded-2xl shadow-xl border-4 border-brand-blue/30 p-3 sm:p-6 md:p-10 relative overflow-hidden max-w-full">
        {/* Decorative corner borders */}
        <div className="absolute top-0 left-0 w-10 sm:w-16 h-10 sm:h-16 border-t-4 sm:border-t-8 border-l-4 sm:border-l-8 border-brand-orange" />
        <div className="absolute top-0 right-0 w-10 sm:w-16 h-10 sm:h-16 border-t-4 sm:border-t-8 border-r-4 sm:border-r-8 border-brand-orange" />
        <div className="absolute bottom-0 left-0 w-10 sm:w-16 h-10 sm:h-16 border-b-4 sm:border-b-8 border-l-4 sm:border-l-8 border-brand-orange" />
        <div className="absolute bottom-0 right-0 w-10 sm:w-16 h-10 sm:h-16 border-b-4 sm:border-b-8 border-r-4 sm:border-r-8 border-brand-orange" />

        {/* Certificate Header with Official Logo */}
        <div className="text-center space-y-3 border-b-2 border-slate-200 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Officially Verified Record
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <BrandLogo size="lg" className="mx-auto my-1" />
            <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 tracking-tight uppercase">
              {instituteName}
            </h2>
            <p className="text-xs font-bold text-brand-orange uppercase tracking-widest font-mono">
              {tagline}
            </p>
            <p className="text-[10px] text-slate-500">
              Campus: {address} | Email: {email} | Helpline: {phone}
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="text-center my-6 space-y-1">
          <h3 className="text-xl sm:text-2xl font-bold font-display text-brand-blue uppercase tracking-wider">
            Official Academic Transcript & Certificate
          </h3>
          <p className="text-xs text-slate-500 italic">This is to certify that the candidate listed below has successfully completed the prescribed course of study.</p>
        </div>

        {/* Student Particulars */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div>
            <span className="text-slate-400 font-medium block uppercase text-[10px]">Student Full Name:</span>
            <span className="text-base font-extrabold text-slate-900 font-display">{result.name}</span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block uppercase text-[10px]">Father / Guardian Name:</span>
            <span className="text-sm font-bold text-slate-800">{result.fatherName}</span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block uppercase text-[10px]">Roll Number:</span>
            <span className="text-sm font-mono font-bold text-brand-blue">{result.rollNo}</span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block uppercase text-[10px]">Enrollment Reference:</span>
            <span className="text-sm font-mono font-bold text-slate-700">{result.enrollmentNo}</span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block uppercase text-[10px]">Course Title:</span>
            <span className="text-sm font-bold text-slate-900">{result.courseName}</span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block uppercase text-[10px]">Duration & Session:</span>
            <span className="text-sm font-semibold text-slate-800">{result.duration} ({result.session})</span>
          </div>
        </div>

        {/* Marks Breakdown Table */}
        <div className="my-6 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-brand-blue text-white uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-3 border border-brand-blue-light">Evaluation Domain</th>
                <th className="p-3 border border-brand-blue-light text-center">Marks Obtained</th>
                <th className="p-3 border border-brand-blue-light text-center">Maximum Marks</th>
                <th className="p-3 border border-brand-blue-light text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              <tr>
                <td className="p-3 font-semibold">Theory & Technical Fundamentals</td>
                <td className="p-3 text-center font-mono font-bold">{result.theoryMarks}</td>
                <td className="p-3 text-center font-mono text-slate-500">200</td>
                <td className="p-3 text-center font-bold text-emerald-600">PASS</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Practical Lab & Live Project Execution</td>
                <td className="p-3 text-center font-mono font-bold">{result.practicalMarks}</td>
                <td className="p-3 text-center font-mono text-slate-500">250</td>
                <td className="p-3 text-center font-bold text-emerald-600">PASS</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Viva Voce & Technical Defense</td>
                <td className="p-3 text-center font-mono font-bold">{result.vivaMarks}</td>
                <td className="p-3 text-center font-mono text-slate-500">50</td>
                <td className="p-3 text-center font-bold text-emerald-600">PASS</td>
              </tr>
              <tr className="bg-brand-sand font-bold">
                <td className="p-3 text-slate-900 font-display text-sm">TOTAL EVALUATION SCORE</td>
                <td className="p-3 text-center font-mono text-sm text-brand-blue font-black">{result.totalMarks}</td>
                <td className="p-3 text-center font-mono text-sm text-slate-600">{result.maxMarks}</td>
                <td className="p-3 text-center font-bold text-emerald-600">{result.percentage}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Grade & Remarks Badge */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-emerald-50/50 p-4 rounded-xl border border-emerald-200/60 my-6">
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Final Grade:</span>
            <span className="text-3xl font-black font-display text-brand-blue">{result.grade}</span>
          </div>

          <div className="sm:col-span-2">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Assessment Remarks:</span>
            <p className="text-xs text-slate-700 italic mt-0.5">{result.remarks}</p>
          </div>
        </div>

        {/* Verification Credentials & Signatures */}
        <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4 items-end text-xs">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Certificate No:</p>
            <p className="font-mono font-bold text-slate-800">{result.certificateNo}</p>
            <p className="text-[10px] text-slate-400 uppercase font-bold mt-2">Date of Issue:</p>
            <p className="font-mono font-semibold text-slate-700">{result.issueDate}</p>
          </div>

          {/* Verification Badge/Official Stamp */}
          <div className="text-center flex flex-col items-center justify-center">
            {customStamp ? (
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full p-1 border-2 border-brand-orange shadow-md bg-white flex items-center justify-center overflow-hidden">
                <img
                  src={customStamp}
                  alt="Official Stamp"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-blue-dark text-brand-orange flex flex-col items-center justify-center p-1 shadow-md border-2 border-brand-orange">
                <Award className="w-6 h-6 text-brand-orange" />
                <span className="text-[7px] text-white font-extrabold uppercase tracking-tighter">Verified</span>
              </div>
            )}
            <span className="text-[9px] font-bold text-slate-500 mt-1 uppercase tracking-wider">Official Seal / Stamp</span>
          </div>

          {/* Controller / Registrar Electronic Signature */}
          <div className="text-right sm:text-right col-span-2 sm:col-span-1">
            <div className="min-h-12 border-b-2 border-slate-400 w-40 ml-auto mb-1 flex items-end justify-center pb-1 relative">
              {customSignature ? (
                <img
                  src={customSignature}
                  alt="Authorized Signature"
                  className="max-h-12 max-w-full object-contain"
                />
              ) : (
                <span className="text-blue-900 font-serif italic text-sm font-bold tracking-wider opacity-85 select-none">
                  {signerName}
                </span>
              )}
            </div>
            <p className="font-extrabold text-slate-900 text-[11px]">{registrarTitle}</p>
            <p className="text-[9px] text-slate-500">{instituteName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
