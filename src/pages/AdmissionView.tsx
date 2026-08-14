/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GraduationCap, CheckCircle2, PhoneCall, Mail } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { useData } from '../context/DataContext';

export const AdmissionView: React.FC = () => {
  const { data, submitAdmission } = useData();
  const courses = data.courses || [];
  const settings = data.settings || {};
  const officialEmails = settings.notificationEmails || 'jakhter464@gmail.com, futuregatesitcenter@gmail.com';
  const primaryEmail = officialEmails.split(',')[0].trim() || 'jakhter464@gmail.com';

  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedCourseObj = courses.find((c) => c.id === courseId) || courses[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !whatsapp.trim()) return;

    setLoading(true);
    const newRecord = {
      fullName,
      fatherName,
      phone,
      whatsapp,
      email,
      courseId: courseId || courses[0]?.id,
      courseTitle: selectedCourseObj ? selectedCourseObj.title : 'Course',
      address,
      message,
    };

    await submitAdmission(newRecord);
    setLoading(false);
    setSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `Hello Future Gates IT Center,\n\nI want to apply for admission:\n*Name:* ${fullName}\n*Father Name:* ${fatherName}\n*Phone:* ${phone}\n*WhatsApp:* ${whatsapp}\n*Course:* ${selectedCourseObj?.title}\n*Address:* ${address}\n*Message:* ${message}`
    );
    window.open(`https://wa.me/923016775690?text=${text}`, '_blank');
  };

  const handleEmailSend = () => {
    const courseTitle = selectedCourseObj ? selectedCourseObj.title : 'Course';
    const sub = encodeURIComponent(`Admission Application - ${fullName} (${courseTitle})`);
    const body = encodeURIComponent(
      `Hello Future Gates IT Center Admissions Department,\n\n` +
      `Here are my admission application details:\n` +
      `• Student Name: ${fullName}\n` +
      `• Father / Guardian Name: ${fatherName}\n` +
      `• Course: ${courseTitle}\n` +
      `• Contact Phone: ${phone}\n` +
      `• WhatsApp: ${whatsapp}\n` +
      `• Email: ${email || 'N/A'}\n` +
      `• Address: ${address || 'N/A'}\n` +
      `• Remarks / Notes: ${message || 'N/A'}\n\n` +
      `Please confirm my admission slot and fee structure.\n\nThank you!`
    );
    window.open(`mailto:${primaryEmail}?subject=${sub}&body=${body}`, '_blank');
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
            Apply online for diploma courses, technical skill bootcamps, and professional IT training. Applications are instantly notified to our official admissions inbox.
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
                Thank you <strong>{fullName}</strong>. Your enrollment application for <strong>{selectedCourseObj?.title}</strong> has been logged and notified to the official inbox (<strong>{officialEmails}</strong>).
              </p>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-1 font-mono text-slate-800">
                <p><strong>Candidate:</strong> {fullName}</p>
                <p><strong>Course:</strong> {selectedCourseObj?.title}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>WhatsApp:</strong> {whatsapp}</p>
                <p className="text-[11px] text-emerald-700 font-bold pt-1">
                  ✓ Official Email Notified: {officialEmails}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleWhatsAppSend}
                  className="px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-500/25 transition-all cursor-pointer hover:scale-[1.01]"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Send via WhatsApp</span>
                </button>
                <button
                  onClick={handleEmailSend}
                  className="px-6 py-3 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer hover:scale-[1.01]"
                >
                  <Mail className="w-4 h-4 text-white" />
                  <span>Email Official Copy</span>
                </button>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFullName('');
                  setFatherName('');
                  setPhone('');
                  setWhatsapp('');
                  setEmail('');
                  setAddress('');
                  setMessage('');
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Submit Another Form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold font-display text-slate-900">Student Personal Information</h3>
                <p className="text-xs text-slate-500">
                  Submissions are recorded in the central administrative portal & forwarded to official email.
                </p>
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
                    {courses.map((c) => (
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
                  placeholder="e.g. Khushab / Joharabad / Sargodha"
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

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href="https://wa.me/923016775690"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="w-4 h-4" /> Direct Admission Helpline: 0301-6775690
                </a>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer uppercase tracking-wider disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Admission & Forward to Official Email'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
