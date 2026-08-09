/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GraduationCap, CheckCircle2, Send, PhoneCall } from 'lucide-react';
import { COURSES } from '../data';

export const AdmissionView: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [courseId, setCourseId] = useState(COURSES[0].id);
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !whatsapp.trim()) return;

    const courseObj = COURSES.find((c) => c.id === courseId);
    const newRecord = {
      id: `ADM-${Date.now()}`,
      fullName,
      fatherName,
      phone,
      whatsapp,
      email,
      courseId,
      courseTitle: courseObj ? courseObj.title : 'Course',
      address,
      message,
      submittedAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('fg_enrollments') || '[]');
      localStorage.setItem('fg_enrollments', JSON.stringify([newRecord, ...existing]));
    } catch (e) {
      console.error(e);
    }

    setSubmitted(true);
  };

  const selectedCourseObj = COURSES.find((c) => c.id === courseId);

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `Hello Future Gates IT Center,\n\nI want to apply for admission:\n*Name:* ${fullName}\n*Father Name:* ${fatherName}\n*Phone:* ${phone}\n*WhatsApp:* ${whatsapp}\n*Course:* ${selectedCourseObj?.title}\n*Address:* ${address}\n*Message:* ${message}`
    );
    window.open(`https://wa.me/923016775690?text=${text}`, '_blank');
  };

  return (
    <div className="pb-16 space-y-10">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-brand-blue-dark to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-brand-orange">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-bold rounded-full uppercase">
            <GraduationCap className="w-4 h-4" /> Enrollment Portal 2026
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight">
            Online Admission Application
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Apply online for diploma courses, technical skill bootcamps, and professional IT training.
          </p>
        </div>
      </section>

      {/* Main Form Container */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold font-display text-slate-900">
                Application Received!
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you <strong>{fullName}</strong>. Your enrollment application for <strong>{selectedCourseObj?.title}</strong> has been logged.
              </p>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-1 font-mono text-slate-800">
                <p><strong>Candidate:</strong> {fullName}</p>
                <p><strong>Course:</strong> {selectedCourseObj?.title}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>WhatsApp:</strong> {whatsapp}</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <button
                  onClick={handleWhatsAppSend}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow"
                >
                  <Send className="w-4 h-4" /> Send Application Copy via WhatsApp
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-slate-200 text-slate-800 font-bold text-xs rounded-xl"
                >
                  Submit Another Form
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold font-display text-slate-900">Student Personal Information</h3>
                <p className="text-xs text-slate-500">Provide candidate details for academic registration.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Student Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Muhammad Farhan"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Father / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    placeholder="e.g. Muhammad Siddique"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="0301-6775690"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Program / Course *</label>
                  <select
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  >
                    {COURSES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} ({c.duration} - {c.fee})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City / Residential Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Khushab / Rawalpindi / Sargodha"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Batch / Shift Preference</label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Morning batch, Evening batch, or Online weekend class..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href="https://wa.me/923016775690"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="w-4 h-4" /> Direct Admission Helpline
                </a>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer uppercase tracking-wider"
                >
                  Submit Admission Application
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
