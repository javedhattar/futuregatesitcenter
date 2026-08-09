import React, { useState, useEffect } from 'react';
import {
  Save,
  RotateCcw,
  Upload,
  Image as ImageIcon,
  Check,
  Palette,
  Type,
  Layout,
  Globe,
  Share2,
  Phone,
  Sliders,
  Trash2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';
import { SiteSettings, MediaItem, MediaCategory } from '../types';
import { useData, defaultSiteSettings } from '../context/DataContext';

export const SiteCustomizationPanel: React.FC = () => {
  const { data, saveSettings, resetSettings, saveMediaItem, deleteMediaItem, uploadImage } = useData();
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(data.settings || defaultSiteSettings);
  const [activeSubTab, setActiveSubTab] = useState<'header' | 'footer' | 'branding' | 'typography' | 'seo' | 'social' | 'contact' | 'media'>('header');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Media Library state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [newMediaCat, setNewMediaCat] = useState<MediaCategory>('General');
  const [uploadingMedia, setUploadingMedia] = useState(false);

  useEffect(() => {
    if (data.settings) {
      setSettingsForm(data.settings);
    }
  }, [data.settings]);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 4000);
  };

  const handleSave = async () => {
    setSaving(true);
    const ok = await saveSettings(settingsForm);
    setSaving(false);
    if (ok) {
      showNotification('Website Settings saved permanently!');
    } else {
      showNotification('Failed to save settings. Please try again.', 'error');
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all site settings back to default Future Gates IT Center branding?')) {
      setSaving(true);
      const ok = await resetSettings();
      setSaving(false);
      if (ok) {
        setSettingsForm(defaultSiteSettings);
        showNotification('Site settings restored to default Future Gates branding!');
      } else {
        showNotification('Failed to reset settings.', 'error');
      }
    }
  };

  // Helper for logo file uploads
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: 'headerLogoUrl' | 'mobileLogoUrl' | 'footerLogoUrl' | 'faviconUrl' | 'ogImageUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      const uploadedUrl = await uploadImage(base64);
      if (uploadedUrl) {
        setSettingsForm(prev => ({
          ...prev,
          [targetField]: uploadedUrl
        }));
        showNotification(`${targetField} updated successfully!`);
        // Also register in media library
        saveMediaItem({
          filename: file.name,
          url: uploadedUrl,
          category: 'Logos',
          size: `${Math.round(file.size / 1024)} KB`,
          dimensions: 'Auto'
        });
      } else {
        showNotification('Failed to upload image.', 'error');
      }
    };
    reader.readAsDataURL(file);
  };

  // Helper for Media Library Upload
  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMedia(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      const ok = await saveMediaItem({
        filename: file.name,
        category: newMediaCat,
        size: `${Math.round(file.size / 1024)} KB`,
        dimensions: 'Auto'
      }, base64);
      setUploadingMedia(false);
      if (ok) {
        showNotification('Image uploaded to Media Library!');
      } else {
        showNotification('Upload failed.', 'error');
      }
    };
    reader.readAsDataURL(file);
  };

  // Color Presets
  const applyColorPreset = (presetName: string) => {
    if (presetName === 'default') {
      setSettingsForm(prev => ({
        ...prev,
        colors: { ...defaultSiteSettings.colors }
      }));
    } else if (presetName === 'royal') {
      setSettingsForm(prev => ({
        ...prev,
        colors: {
          primary: '#1e40af',
          secondary: '#0f172a',
          accent: '#0284c7',
          button: '#2563eb',
          background: '#ffffff',
          text: '#1e293b',
          heading: '#0f172a',
          link: '#1d4ed8'
        }
      }));
    } else if (presetName === 'emerald') {
      setSettingsForm(prev => ({
        ...prev,
        colors: {
          primary: '#047857',
          secondary: '#022c22',
          accent: '#10b981',
          button: '#059669',
          background: '#ffffff',
          text: '#1f2937',
          heading: '#064e3b',
          link: '#047857'
        }
      }));
    } else if (presetName === 'amber') {
      setSettingsForm(prev => ({
        ...prev,
        colors: {
          primary: '#d97706',
          secondary: '#1c1917',
          accent: '#f59e0b',
          button: '#ea580c',
          background: '#ffffff',
          text: '#292524',
          heading: '#1c1917',
          link: '#d97706'
        }
      }));
    }
    showNotification(`Applied ${presetName} color scheme preset!`);
  };

  const mediaList = data.media || [];
  const filteredMedia = selectedCategory === 'All'
    ? mediaList
    : mediaList.filter(m => m.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-6 h-6 text-orange-400" />
            <h2 className="text-xl font-bold tracking-tight text-white">Website Settings & Branding Customizer</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Control institute logos, contact information, navigation menus, social links, colors, and site identity across all public pages without touching source code.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1.5 border border-slate-700 cursor-pointer"
            title="Reset to default brand defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Settings Permanently'}
          </button>
        </div>
      </div>

      {/* Save Notification Alert */}
      {msg && (
        <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md ${
          msg.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          <Check className="w-4 h-4" />
          {msg.text}
        </div>
      )}

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar">
        {[
          { id: 'header', label: 'Header & Nav', icon: Layout },
          { id: 'footer', label: 'Footer Settings', icon: Layout },
          { id: 'branding', label: 'Branding & Colors', icon: Palette },
          { id: 'typography', label: 'Typography', icon: Type },
          { id: 'seo', label: 'SEO & Identity', icon: Globe },
          { id: 'social', label: 'Social Links', icon: Share2 },
          { id: 'contact', label: 'Contact Info', icon: Phone },
          { id: 'media', label: 'Media Library', icon: ImageIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                active
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* SECTION 1: HEADER & NAVIGATION SETTINGS */}
      {activeSubTab === 'header' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layout className="w-5 h-5 text-blue-600" />
              Header Logos & Top Announcement Bar
            </h3>
            <p className="text-xs text-slate-500 mt-1">Manage header logos, tagline, contact strip, and navigation tab visibility.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Header Logo */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <label className="text-xs font-bold text-slate-800 block">Desktop Header Logo</label>
              <div className="h-20 bg-white rounded-lg border border-slate-200 p-2 flex items-center justify-center relative overflow-hidden">
                {settingsForm.headerLogoUrl ? (
                  <img src={settingsForm.headerLogoUrl} alt="Header Logo" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-[11px] text-slate-400 font-medium">Using Default Brand Mark</span>
                )}
              </div>
              <div className="flex gap-2">
                <label className="flex-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 text-center rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-1">
                  <Upload className="w-3.5 h-3.5" />
                  Upload
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleLogoUpload(e, 'headerLogoUrl')} />
                </label>
                {settingsForm.headerLogoUrl && (
                  <button
                    onClick={() => setSettingsForm(prev => ({ ...prev, headerLogoUrl: '' }))}
                    className="px-2.5 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
              <input
                type="text"
                placeholder="Or paste image URL"
                value={settingsForm.headerLogoUrl || ''}
                onChange={(e) => setSettingsForm(prev => ({ ...prev, headerLogoUrl: e.target.value }))}
                className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Mobile Logo */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <label className="text-xs font-bold text-slate-800 block">Mobile Header Logo</label>
              <div className="h-20 bg-white rounded-lg border border-slate-200 p-2 flex items-center justify-center relative overflow-hidden">
                {settingsForm.mobileLogoUrl ? (
                  <img src={settingsForm.mobileLogoUrl} alt="Mobile Logo" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-[11px] text-slate-400 font-medium">Same as Desktop Logo</span>
                )}
              </div>
              <div className="flex gap-2">
                <label className="flex-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 text-center rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-1">
                  <Upload className="w-3.5 h-3.5" />
                  Upload
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleLogoUpload(e, 'mobileLogoUrl')} />
                </label>
                {settingsForm.mobileLogoUrl && (
                  <button
                    onClick={() => setSettingsForm(prev => ({ ...prev, mobileLogoUrl: '' }))}
                    className="px-2.5 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
              <input
                type="text"
                placeholder="Or paste image URL"
                value={settingsForm.mobileLogoUrl || ''}
                onChange={(e) => setSettingsForm(prev => ({ ...prev, mobileLogoUrl: e.target.value }))}
                className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Favicon */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <label className="text-xs font-bold text-slate-800 block">Favicon Mark</label>
              <div className="h-20 bg-white rounded-lg border border-slate-200 p-2 flex items-center justify-center relative overflow-hidden">
                {settingsForm.faviconUrl ? (
                  <img src={settingsForm.faviconUrl} alt="Favicon" className="w-8 h-8 object-contain" />
                ) : (
                  <span className="text-[11px] text-slate-400 font-medium">Default Favicon</span>
                )}
              </div>
              <div className="flex gap-2">
                <label className="flex-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 text-center rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-1">
                  <Upload className="w-3.5 h-3.5" />
                  Upload
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleLogoUpload(e, 'faviconUrl')} />
                </label>
                {settingsForm.faviconUrl && (
                  <button
                    onClick={() => setSettingsForm(prev => ({ ...prev, faviconUrl: '' }))}
                    className="px-2.5 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
              <input
                type="text"
                placeholder="Favicon URL"
                value={settingsForm.faviconUrl || ''}
                onChange={(e) => setSettingsForm(prev => ({ ...prev, faviconUrl: e.target.value }))}
                className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Institute Name</label>
              <input
                type="text"
                value={settingsForm.instituteName}
                onChange={(e) => setSettingsForm(prev => ({ ...prev, instituteName: e.target.value }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Tagline</label>
              <input
                type="text"
                value={settingsForm.tagline}
                onChange={(e) => setSettingsForm(prev => ({ ...prev, tagline: e.target.value }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold text-orange-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Header Display Phone</label>
              <input
                type="text"
                value={settingsForm.headerPhone}
                onChange={(e) => setSettingsForm(prev => ({ ...prev, headerPhone: e.target.value }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Header WhatsApp Number (Digits only)</label>
              <input
                type="text"
                value={settingsForm.headerWhatsapp}
                onChange={(e) => setSettingsForm(prev => ({ ...prev, headerWhatsapp: e.target.value }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Header CTA Button Text</label>
              <input
                type="text"
                value={settingsForm.headerCtaText}
                onChange={(e) => setSettingsForm(prev => ({ ...prev, headerCtaText: e.target.value }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Header CTA Target Link</label>
              <select
                value={settingsForm.headerCtaLink}
                onChange={(e) => setSettingsForm(prev => ({ ...prev, headerCtaLink: e.target.value }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value="admission">Admission Page / Form</option>
                <option value="courses">Courses List</option>
                <option value="verification">Verification Page</option>
                <option value="contact">Contact Page</option>
              </select>
            </div>
          </div>

          {/* Announcement Bar Settings */}
          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Top Announcement Bar Strip</h4>
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-emerald-400">
                <input
                  type="checkbox"
                  checked={settingsForm.showAnnouncementBar}
                  onChange={(e) => setSettingsForm(prev => ({ ...prev, showAnnouncementBar: e.target.checked }))}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400"
                />
                Enable Strip
              </label>
            </div>

            {settingsForm.showAnnouncementBar && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Announcement Text</label>
                  <input
                    type="text"
                    value={settingsForm.announcementText}
                    onChange={(e) => setSettingsForm(prev => ({ ...prev, announcementText: e.target.value }))}
                    className="w-full text-xs p-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">CTA Button Label</label>
                  <input
                    type="text"
                    value={settingsForm.announcementBtnText}
                    onChange={(e) => setSettingsForm(prev => ({ ...prev, announcementBtnText: e.target.value }))}
                    className="w-full text-xs p-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Nav Items Visibility */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Header Navigation Menu Items Visibility</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.keys(settingsForm.navItemsVisibility).map((key) => {
                const k = key as keyof typeof settingsForm.navItemsVisibility;
                const isVisible = settingsForm.navItemsVisibility[k];
                return (
                  <label key={key} className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isVisible ? 'bg-blue-50/50 border-blue-200 text-blue-900' : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}>
                    <span className="text-xs font-bold capitalize">{key}</span>
                    <input
                      type="checkbox"
                      checked={isVisible}
                      onChange={(e) => setSettingsForm(prev => ({
                        ...prev,
                        navItemsVisibility: {
                          ...prev.navItemsVisibility,
                          [k]: e.target.checked
                        }
                      }))}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: FOOTER SETTINGS */}
      {activeSubTab === 'footer' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layout className="w-5 h-5 text-blue-600" />
              Footer Content & Legal Links
            </h3>
            <p className="text-xs text-slate-500 mt-1">Configure footer logo, description, quick links, contacts, and copyright statement.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Footer About Description</label>
                <textarea
                  rows={4}
                  value={settingsForm.footerDescription}
                  onChange={(e) => setSettingsForm(prev => ({ ...prev, footerDescription: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Copyright Statement</label>
                <input
                  type="text"
                  value={settingsForm.footerCopyrightText}
                  onChange={(e) => setSettingsForm(prev => ({ ...prev, footerCopyrightText: e.target.value }))}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Footer Contact Phone</label>
                <input
                  type="text"
                  value={settingsForm.footerPhone}
                  onChange={(e) => setSettingsForm(prev => ({ ...prev, footerPhone: e.target.value }))}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Footer Contact Email</label>
                <input
                  type="text"
                  value={settingsForm.footerEmail}
                  onChange={(e) => setSettingsForm(prev => ({ ...prev, footerEmail: e.target.value }))}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Footer Campus Address</label>
                <input
                  type="text"
                  value={settingsForm.footerAddress}
                  onChange={(e) => setSettingsForm(prev => ({ ...prev, footerAddress: e.target.value }))}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Footer Navigation Columns Visibility</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { field: 'showFooterQuickLinks', label: 'Institute Navigation' },
                { field: 'showFooterCourses', label: 'Popular Courses' },
                { field: 'showFooterServices', label: 'Agency Services' },
                { field: 'showFooterLegal', label: 'Legal Pages Links' },
              ].map((item) => (
                <label key={item.field} className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-semibold text-slate-700">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={(settingsForm as any)[item.field]}
                    onChange={(e) => setSettingsForm(prev => ({ ...prev, [item.field]: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: BRANDING & COLORS */}
      {activeSubTab === 'branding' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Palette className="w-5 h-5 text-blue-600" />
                Color Theme & Brand Palette
              </h3>
              <p className="text-xs text-slate-500 mt-1">Customize primary brand colors using visual pickers or preset themes.</p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500">Presets:</span>
              <button onClick={() => applyColorPreset('default')} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold cursor-pointer hover:bg-blue-100">
                Default Future Gates
              </button>
              <button onClick={() => applyColorPreset('royal')} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-bold cursor-pointer hover:bg-slate-200">
                Royal Blue
              </button>
              <button onClick={() => applyColorPreset('emerald')} className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold cursor-pointer hover:bg-emerald-100">
                Emerald
              </button>
              <button onClick={() => applyColorPreset('amber')} className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold cursor-pointer hover:bg-amber-100">
                Warm Amber
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: 'primary', label: 'Primary Brand Color' },
              { key: 'secondary', label: 'Secondary / Dark Canvas' },
              { key: 'accent', label: 'Accent Highlight Color' },
              { key: 'button', label: 'Button Accent Color' },
              { key: 'background', label: 'Page Background' },
              { key: 'text', label: 'Body Text Color' },
              { key: 'heading', label: 'Headings Text Color' },
              { key: 'link', label: 'Hyperlinks Color' },
            ].map((c) => {
              const colorKey = c.key as keyof typeof settingsForm.colors;
              const val = settingsForm.colors[colorKey];
              return (
                <div key={c.key} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-800 block">{c.label}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={val}
                      onChange={(e) => setSettingsForm(prev => ({
                        ...prev,
                        colors: { ...prev.colors, [colorKey]: e.target.value }
                      }))}
                      className="w-9 h-9 rounded-lg border border-slate-300 cursor-pointer p-0.5 bg-white"
                    />
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => setSettingsForm(prev => ({
                        ...prev,
                        colors: { ...prev.colors, [colorKey]: e.target.value }
                      }))}
                      className="flex-1 text-xs px-2.5 py-2 rounded-lg border border-slate-200 font-mono focus:outline-none uppercase"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Theme Preview Card */}
          <div className="p-5 rounded-2xl border space-y-3 shadow-inner" style={{ backgroundColor: settingsForm.colors.background, borderColor: '#e2e8f0' }}>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: settingsForm.colors.accent }}>Live Theme Preview Card</span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase text-white" style={{ backgroundColor: settingsForm.colors.primary }}>
                Active Color Test
              </span>
            </div>
            <h3 className="text-lg font-extrabold" style={{ color: settingsForm.colors.heading }}>
              Future Gates IT Center — Where Skills Become Your Income
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: settingsForm.colors.text }}>
              This preview reflects your custom color choices in real-time. Buttons, borders, and accents across all public views update automatically.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow" style={{ backgroundColor: settingsForm.colors.button }}>
                Primary Action Button
              </button>
              <a href="#" className="text-xs font-bold underline" style={{ color: settingsForm.colors.link }}>
                Sample Link Text →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: TYPOGRAPHY */}
      {activeSubTab === 'typography' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Type className="w-5 h-5 text-blue-600" />
              Font Family & Scale Controls
            </h3>
            <p className="text-xs text-slate-500 mt-1">Adjust primary typography pairings and base sizing across the portal.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Main Body Font</label>
              <select
                value={settingsForm.typography.mainFont}
                onChange={(e) => setSettingsForm(prev => ({
                  ...prev,
                  typography: { ...prev.typography, mainFont: e.target.value }
                }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-semibold"
              >
                <option value="Plus Jakarta Sans, sans-serif">Plus Jakarta Sans (Default)</option>
                <option value="Inter, sans-serif">Inter</option>
                <option value="Poppins, sans-serif">Poppins</option>
                <option value="Roboto, sans-serif">Roboto</option>
                <option value="Playfair Display, serif">Playfair Display (Serif)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Heading Font</label>
              <select
                value={settingsForm.typography.headingFont}
                onChange={(e) => setSettingsForm(prev => ({
                  ...prev,
                  typography: { ...prev.typography, headingFont: e.target.value }
                }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-semibold"
              >
                <option value="Plus Jakarta Sans, sans-serif">Plus Jakarta Sans (Default)</option>
                <option value="Inter, sans-serif">Inter</option>
                <option value="Poppins, sans-serif">Poppins</option>
                <option value="Playfair Display, serif">Playfair Display</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Base Font Size</label>
              <select
                value={settingsForm.typography.baseFontSize}
                onChange={(e) => setSettingsForm(prev => ({
                  ...prev,
                  typography: { ...prev.typography, baseFontSize: e.target.value }
                }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value="14px">14px (Compact)</option>
                <option value="15px">15px (Standard)</option>
                <option value="16px">16px (Comfortable - Recommended)</option>
                <option value="18px">18px (Large Display)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: SEO & WEBSITE IDENTITY */}
      {activeSubTab === 'seo' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Website Identity & Search Engine Metadata (SEO)
            </h3>
            <p className="text-xs text-slate-500 mt-1">Manage global meta titles, keywords, site description, and social sharing image.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Global Site Title</label>
              <input
                type="text"
                value={settingsForm.siteTitle}
                onChange={(e) => setSettingsForm(prev => ({ ...prev, siteTitle: e.target.value }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Short Brand Name</label>
              <input
                type="text"
                value={settingsForm.siteShortName}
                onChange={(e) => setSettingsForm(prev => ({ ...prev, siteShortName: e.target.value }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-800 block mb-1">Meta Description (150-160 chars for best Google Search results)</label>
              <textarea
                rows={3}
                value={settingsForm.metaDescription}
                onChange={(e) => setSettingsForm(prev => ({ ...prev, metaDescription: e.target.value }))}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-800 block mb-1">Meta Keywords (Comma separated)</label>
              <input
                type="text"
                value={settingsForm.metaKeywords}
                onChange={(e) => setSettingsForm(prev => ({ ...prev, metaKeywords: e.target.value }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Author / Organization Name</label>
              <input
                type="text"
                value={settingsForm.authorName}
                onChange={(e) => setSettingsForm(prev => ({ ...prev, authorName: e.target.value }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">OpenGraph Social Banner Image URL</label>
              <input
                type="text"
                placeholder="/brandlogo.png"
                value={settingsForm.ogImageUrl || ''}
                onChange={(e) => setSettingsForm(prev => ({ ...prev, ogImageUrl: e.target.value }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: SOCIAL MEDIA LINKS */}
      {activeSubTab === 'social' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-blue-600" />
              Social Media Handles & Direct Links
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Social icons on the public header/footer are automatically hidden if the link field is left completely empty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: 'facebook', label: 'Facebook Page URL', placeholder: 'https://facebook.com/yourpage' },
              { key: 'instagram', label: 'Instagram Profile URL', placeholder: 'https://instagram.com/yourprofile' },
              { key: 'youtube', label: 'YouTube Channel URL', placeholder: 'https://youtube.com/c/yourchannel' },
              { key: 'tiktok', label: 'TikTok Profile URL', placeholder: 'https://tiktok.com/@yourhandle' },
              { key: 'linkedin', label: 'LinkedIn Company URL', placeholder: 'https://linkedin.com/company/yourcompany' },
              { key: 'whatsapp', label: 'WhatsApp Direct Link', placeholder: 'https://wa.me/923016775690' },
              { key: 'github', label: 'GitHub Repository URL', placeholder: 'https://github.com/yourorg' },
              { key: 'twitter', label: 'Twitter / X Handle URL', placeholder: 'https://x.com/yourhandle' },
            ].map((s) => {
              const k = s.key as keyof typeof settingsForm.socialMedia;
              return (
                <div key={s.key}>
                  <label className="text-xs font-bold text-slate-800 block mb-1">{s.label}</label>
                  <input
                    type="url"
                    placeholder={s.placeholder}
                    value={settingsForm.socialMedia[k] || ''}
                    onChange={(e) => setSettingsForm(prev => ({
                      ...prev,
                      socialMedia: {
                        ...prev.socialMedia,
                        [k]: e.target.value
                      }
                    }))}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 7: CONTACT INFORMATION */}
      {activeSubTab === 'contact' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              Centralized Campus Contact Details
            </h3>
            <p className="text-xs text-slate-500 mt-1">Updates official contact numbers, address, and Google Maps embed location globally.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Primary Phone Number</label>
              <input
                type="text"
                value={settingsForm.contactInfo.phone}
                onChange={(e) => setSettingsForm(prev => ({
                  ...prev,
                  contactInfo: { ...prev.contactInfo, phone: e.target.value }
                }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Official WhatsApp Number</label>
              <input
                type="text"
                value={settingsForm.contactInfo.whatsapp}
                onChange={(e) => setSettingsForm(prev => ({
                  ...prev,
                  contactInfo: { ...prev.contactInfo, whatsapp: e.target.value }
                }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Official Email Address</label>
              <input
                type="email"
                value={settingsForm.contactInfo.email}
                onChange={(e) => setSettingsForm(prev => ({
                  ...prev,
                  contactInfo: { ...prev.contactInfo, email: e.target.value }
                }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Business Hours</label>
              <input
                type="text"
                value={settingsForm.contactInfo.businessHours}
                onChange={(e) => setSettingsForm(prev => ({
                  ...prev,
                  contactInfo: { ...prev.contactInfo, businessHours: e.target.value }
                }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-800 block mb-1">Campus Physical Address</label>
              <input
                type="text"
                value={settingsForm.contactInfo.address}
                onChange={(e) => setSettingsForm(prev => ({
                  ...prev,
                  contactInfo: { ...prev.contactInfo, address: e.target.value }
                }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-800 block mb-1">Emergency Message / Verification Notice</label>
              <input
                type="text"
                value={settingsForm.contactInfo.emergencyMessage}
                onChange={(e) => setSettingsForm(prev => ({
                  ...prev,
                  contactInfo: { ...prev.contactInfo, emergencyMessage: e.target.value }
                }))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-emerald-700 bg-emerald-50/30"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8: MEDIA LIBRARY & ASSET MANAGER */}
      {activeSubTab === 'media' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                Media Library & Image Manager
              </h3>
              <p className="text-xs text-slate-500 mt-1">Upload and organize images for logos, mentor profile, course covers, and blog banners.</p>
            </div>

            {/* Category Upload Control */}
            <div className="flex items-center gap-2">
              <select
                value={newMediaCat}
                onChange={(e) => setNewMediaCat(e.target.value as MediaCategory)}
                className="text-xs p-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
              >
                <option value="General">General</option>
                <option value="Logos">Logos</option>
                <option value="Mentor">Mentor</option>
                <option value="Courses">Courses</option>
                <option value="Services">Services</option>
                <option value="Blogs">Blogs</option>
                <option value="Homepage">Homepage</option>
              </select>

              <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow">
                <Upload className="w-3.5 h-3.5" />
                {uploadingMedia ? 'Uploading...' : 'Upload Media File'}
                <input type="file" accept="image/*" className="hidden" onChange={handleMediaUpload} disabled={uploadingMedia} />
              </label>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {['All', 'Logos', 'Mentor', 'Courses', 'Services', 'Blogs', 'Homepage', 'General'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMedia.map((m) => (
              <div key={m.id} className="group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden space-y-2 relative flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="h-28 bg-white flex items-center justify-center p-2 border-b border-slate-100 relative">
                  <img src={m.url} alt={m.filename} className="max-h-full max-w-full object-contain" />
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-slate-900/80 text-white text-[9px] font-bold rounded uppercase">
                    {m.category}
                  </span>
                </div>

                <div className="p-2.5 space-y-1">
                  <p className="text-[11px] font-bold text-slate-800 truncate" title={m.filename}>{m.filename}</p>
                  <p className="text-[10px] text-slate-400">{m.size || 'Auto'} • {m.dimensions || 'N/A'}</p>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(m.url);
                        showNotification('Image URL copied to clipboard!');
                      }}
                      className="p-1 bg-white hover:bg-slate-200 text-slate-700 rounded border border-slate-200 cursor-pointer text-[10px] flex items-center gap-1 font-semibold"
                      title="Copy URL"
                    >
                      <Copy className="w-3 h-3" />
                      Copy URL
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete image "${m.filename}" from Media Library?`)) {
                          deleteMediaItem(m.id);
                        }
                      }}
                      className="p-1 bg-red-50 hover:bg-red-100 text-red-600 rounded cursor-pointer"
                      title="Delete Image"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredMedia.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-400 space-y-2">
                <ImageIcon className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs font-semibold">No media items found in "{selectedCategory}" category.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
