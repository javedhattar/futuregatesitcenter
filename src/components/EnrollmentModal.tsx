/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, CheckCircle2, GraduationCap, PhoneCall, Mail } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useData } from '../context/DataContext';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourseId?: string;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  selectedCourseId,
}) => {
  const { data, submitAdmission } = useData();
  const courses = data.courses || [];
  const officialEmail = data.settings?.notificationEmails || 'futuregatesitcenter@gmail.com';

  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [courseId, setCourseId] = useState(selectedCourseId || (courses[0]?.id || ''));
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !whatsapp.trim()) {
      setError('Please fill in required fields (Name, Phone, and WhatsApp).');
      return;
    }

    const courseObj = courses.find((c) => c.id === courseId);
    const courseTitle = courseObj ? courseObj.title : 'Course';

    const newRecord = {
      fullName,
      fatherName,
      phone,
      whatsapp,
      email,
      courseId,
      courseTitle,
      address,
      message,
    };

    await submitAdmission(newRecord);
    setIsSubmitted(true);
    setError('');
  };

  const selectedCourseObj = courses.find((c) => c.id === courseId);

  const handleWhatsAppSend = () => {
    const courseTitle = selectedCourseObj ? selectedCourseObj.title : 'Course';
    const text = encodeURIComponent(
      `Hello Future Gates IT Center,\n\nI want to apply for admission:\n*Name:* ${fullName}\n*Father Name:* ${fatherName}\n*Phone:* ${phone}\n*WhatsApp:* ${whatsapp}\n*Course:* ${courseTitle}\n*Address:* ${address}\n*Notes:* ${message}`
    );
    window.open(`https://wa.me/923016775690?text=${text}`, '_blank');
  };

  const handleEmailSend = () => {
    const courseTitle = selectedCourseObj ? selectedCourseObj.title : 'Course';
    const recipient = officialEmail.split(',')[0].trim() || 'futuregatesitcenter@gmail.com';
    const subject = encodeURIComponent(`Admission Application - ${fullName} (${courseTitle})`);
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
    window.open(`mailto:${recipient}?subject=${subject}&body=${body}`, '_blank');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setFatherName('');
    setPhone('');
    setWhatsapp('');
    setEmail('');
    setAddress('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 my-8">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-brand-blue-dark to-brand-blue text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display">Course Admission Form</h3>
              <p className="text-xs text-slate-200 mt-0.5">
                Future Gates IT Center - Where Skills Become Your Income
              </p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-display">
                Admission Application Submitted!
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed max-w-md mx-auto">
                Thank you <strong>{fullName}</strong>. Your enrollment request for{' '}
                <strong>{selectedCourseObj?.title}</strong> has been received and notified to the official administration inbox (<strong>{officialEmail}</strong>).
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-1.5 font-mono text-slate-700">
                <p><strong>Candidate:</strong> {fullName}</p>
                <p><strong>Course:</strong> {selectedCourseObj?.title}</p>
                <p><strong>Contact Phone:</strong> {phone}</p>
                <p><strong>WhatsApp:</strong> {whatsapp}</p>
                <p className="text-[11px] text-emerald-700 font-bold pt-1">
                  ✓ Official Email Notified: {officialEmail}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                <button
                  onClick={handleWhatsAppSend}
                  className="py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/25 transition-all cursor-pointer hover:scale-[1.01]"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Send via WhatsApp</span>
                </button>
                <button
                  onClick={handleEmailSend}
                  className="py-3 px-4 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer hover:scale-[1.01]"
                >
                  <Mail className="w-4 h-4 text-white" />
                  <span>Email to Official Office</span>
                </button>
              </div>
              <button
                onClick={handleReset}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Done & Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs font-semibold border border-red-200">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Muhammad Usman"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Father / Guardian Name
                  </label>
                  <input
                    type="text"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    placeholder="e.g. Abdul Rehman"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="0301-6775690"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Course *
                  </label>
                  <select
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue"
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
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  City / Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Khushab / Joharabad / Sargodha"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Additional Notes / Timing Preferences
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Morning or evening batch preference..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div className="pt-3 flex items-center justify-between gap-3 border-t border-slate-100">
                <a
                  href="https://wa.me/923016775690"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Direct Call/WhatsApp Help
                </a>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold rounded-lg text-xs shadow-md transition-all cursor-pointer"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
