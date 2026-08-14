/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2, MessageSquare, ExternalLink, Navigation } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { useData } from '../context/DataContext';

export const ContactView: React.FC = () => {
  const { data, submitInquiry } = useData();
  const contact = data.contact || {};
  const settings = data.settings || {};
  const officialEmails = settings.notificationEmails || 'futuregatesitcenter@gmail.com';
  const primaryEmail = officialEmails.split(',')[0].trim() || 'futuregatesitcenter@gmail.com';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const phoneDisplay = settings.headerPhone || contact.phone || '+92301-6775690';
  const whatsappNumber = settings.headerWhatsapp || contact.whatsapp || '923016775690';
  const addressDisplay = settings.footerAddress || contact.address || 'Future Gates IT Center, Main Campus, Khushab, Punjab, Pakistan';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Future%20Gates%20IT%20Center%2C%20I%20have%20an%20inquiry.`;
  
  // Official Future Gates IT Center Google Map Embed Link
  const defaultEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6745.16018738322!2d72.34236961699489!3d32.29626569078067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3921172b8c953429%3A0x4bc4326c6b7ff459!2sFuture%20Gates%20iT%20Center!5e0!3m2!1sen!2s!4v1786733912521!5m2!1sen!2s';
  const mapEmbedUrl = settings.contactInfo?.googleMapsEmbedUrl || contact.mapEmbedUrl || defaultEmbedUrl;
  const directMapsUrl = settings.contactInfo?.googleMapsUrl || 'https://maps.google.com/?q=Future+Gates+iT+Center+Khushab';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setLoading(true);
    const inquiry = {
      name,
      email,
      phone,
      subject: subject || 'General Inquiry',
      message,
    };

    await submitInquiry(inquiry);
    setLoading(false);
    setSubmitted(true);
  };

  const handleEmailCopy = () => {
    const sub = encodeURIComponent(`Inquiry from Website: ${subject || 'General Inquiry'} - ${name}`);
    const body = encodeURIComponent(
      `Hello Future Gates IT Center Team,\n\n` +
      `• Inquirer Name: ${name}\n` +
      `• Contact Phone: ${phone}\n` +
      `• Email: ${email || 'N/A'}\n` +
      `• Subject: ${subject || 'General Inquiry'}\n\n` +
      `Message:\n${message}\n\n` +
      `Please get back to me as soon as possible.`
    );
    window.open(`mailto:${primaryEmail}?subject=${sub}&body=${body}`, '_blank');
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `Hello Future Gates IT Center,\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email || 'N/A'}\n*Subject:* ${subject || 'Inquiry'}\n*Message:* ${message}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="pb-16 space-y-12">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-brand-blue-dark to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-brand-orange">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-bold rounded-full uppercase">
            Official Helpline & Inquiry Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight">
            Contact Future Gates I.T Center
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Have questions about admissions, technical courses, or software agency services? Inquiries are automatically sent to our official administrative team.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold font-display text-slate-900">Get In Touch With Us</h2>
              <p className="text-xs text-slate-600 mt-1">
                Reach out via WhatsApp, phone, official email, or visit our head office campus in Khushab, Punjab.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 uppercase">Campus Location</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                    {addressDisplay}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 uppercase flex items-center gap-1.5">
                    <span>Phone & WhatsApp Helpline</span>
                    <span className="text-[10px] bg-[#25D366]/20 text-[#128C7E] px-1.5 py-0.2 rounded font-sans font-bold">Active</span>
                  </h4>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#128C7E] hover:text-[#075E54] font-bold font-mono hover:underline mt-0.5 flex items-center gap-1.5">
                    <span>{phoneDisplay}</span>
                    <span className="text-[11px] font-sans font-normal text-slate-500">(Click to Chat on WhatsApp)</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 uppercase">Official Admin Email</h4>
                  <div className="space-y-0.5 mt-0.5">
                    {officialEmails.split(',').map((em, idx) => (
                      <a
                        key={idx}
                        href={`mailto:${em.trim()}`}
                        className="text-xs text-slate-700 font-mono hover:underline block font-semibold text-brand-blue"
                      >
                        {em.trim()}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 uppercase">Office Hours</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Monday to Saturday: 9:00 AM – 7:00 PM (PKT)
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.01] cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
              </div>
              <span>Direct WhatsApp Inquiry</span>
              <span className="font-mono text-white/95 font-semibold">({phoneDisplay})</span>
            </a>
          </div>

          {/* Right Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div>
              <h3 className="text-xl font-bold font-display text-slate-900">Send An Online Inquiry</h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill out this form. Submissions are delivered to our admin dashboard & official inboxes (<strong>{officialEmails}</strong>).
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg font-display">Inquiry Dispatched Successfully!</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you <strong>{name}</strong>. Your inquiry has been submitted and notifications sent to the official institute inboxes (<strong>{officialEmails}</strong>).
                </p>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-1.5 font-mono text-slate-700">
                  <p><strong>Name:</strong> {name}</p>
                  <p><strong>Phone:</strong> {phone}</p>
                  <p><strong>Email:</strong> {email || 'N/A'}</p>
                  <p><strong>Subject:</strong> {subject || 'General Inquiry'}</p>
                  <p className="text-[11px] text-emerald-700 font-bold pt-1">
                    ✓ Official Inboxes Notified: {officialEmails}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={handleWhatsAppSend}
                    className="py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/25 transition-all cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Send via WhatsApp</span>
                  </button>
                  <button
                    onClick={handleEmailCopy}
                    className="py-3 px-4 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-white" />
                    <span>Email Direct Copy</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setSubject('');
                    setMessage('');
                  }}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Muhammad Ali"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-brand-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300-1234567"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:ring-2 focus:ring-brand-blue focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Email (Optional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-brand-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Web Dev Course Fee & Timing"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-brand-blue focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Message / Query *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your inquiry or question here..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-50"
                >
                  <Send className="w-4 h-4" /> {loading ? 'Submitting...' : 'Submit Inquiry & Notify Official Email'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Official Google Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <div className="p-5 sm:p-6 bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Live Campus Map</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-orange" />
                Future Gates iT Center — Main Campus
              </h3>
              <p className="text-xs text-slate-300">
                {addressDisplay}
              </p>
            </div>

            <a
              href={directMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Live Directions</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

          <div className="w-full h-80 sm:h-96 md:h-[450px] relative bg-slate-100">
            <iframe
              title="Future Gates iT Center Official Location"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
