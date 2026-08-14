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
  Info,
  Award,
  FileCheck
} from 'lucide-react';
import { SiteSettings, MediaItem, MediaCategory } from '../types';
import { useData, defaultSiteSettings } from '../context/DataContext';

export const SiteCustomizationPanel: React.FC = () => {
  const { data, saveSettings, resetSettings, saveMediaItem, deleteMediaItem, uploadImage } = useData();
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(data.settings || defaultSiteSettings);
  const [activeSubTab, setActiveSubTab] = useState<'header' | 'footer' | 'certificate' | 'branding' | 'typography' | 'seo' | 'social' | 'contact' | 'media'>('header');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Media Library state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [newMediaCat, setNewMediaCat] = useState<MediaCategory>('General');
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [uploadingLogoField, setUploadingLogoField] = useState<string | null>(null);

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

  // Quick save for individual logo fields
  const handleQuickSaveLogoField = async (targetField: 'headerLogoUrl' | 'mobileLogoUrl' | 'footerLogoUrl' | 'faviconUrl' | 'ogImageUrl' | 'certificateStampLogoUrl' | 'certificateSignatureUrl', url: string) => {
    const updated = {
      ...(data.settings || defaultSiteSettings),
      ...settingsForm,
      [targetField]: url
    };
    setSettingsForm(updated);
    const ok = await saveSettings(updated);
    if (ok) {
      showNotification(`Logo updated and saved permanently!`);
    } else {
      showNotification(`Failed to save logo setting.`, 'error');
    }
  };

  // Sync a single logo across all slots (Header, Mobile, Footer, Favicon)
  const handleSyncLogoToAllSlots = async (logoUrl: string) => {
    if (!logoUrl) {
      showNotification('No logo URL available to sync.', 'error');
      return;
    }
    const updated = {
      ...(data.settings || defaultSiteSettings),
      ...settingsForm,
      headerLogoUrl: logoUrl,
      mobileLogoUrl: logoUrl,
      footerLogoUrl: logoUrl,
      faviconUrl: logoUrl,
      ogImageUrl: logoUrl
    };
    setSettingsForm(updated);
    const ok = await saveSettings(updated);
    if (ok) {
      showNotification('Logo synchronized across Header, Mobile, Footer, Favicon & SEO tags!');
    } else {
      showNotification('Failed to sync logos.', 'error');
    }
  };

  // Reset all logos to default bundled seal
  const handleResetAllLogos = async () => {
    const updated = {
      ...(data.settings || defaultSiteSettings),
      ...settingsForm,
      headerLogoUrl: '/brandlogo.png',
      mobileLogoUrl: '/brandlogo.png',
      footerLogoUrl: '/brandlogo.png',
      faviconUrl: '/brandlogo.png',
      ogImageUrl: '/brandlogo.png'
    };
    setSettingsForm(updated);
    const ok = await saveSettings(updated);
    if (ok) {
      showNotification('All logos reset to official Future Gates IT Center seal!');
    }
  };

  // Helper for Master Logo Upload (Applies to all slots in 1 click)
  const handleMasterLogoUpload = async (file: File) => {
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('File size exceeds 15MB limit. Please upload a smaller image.');
      return;
    }

    setUploadingLogoField('headerLogoUrl');

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = reader.result as string;
        const uploadedUrl = await uploadImage(base64, true);
        const finalUrl = uploadedUrl || base64;

        if (finalUrl) {
          const updated = {
            ...(data.settings || defaultSiteSettings),
            ...settingsForm,
            headerLogoUrl: finalUrl,
            mobileLogoUrl: finalUrl,
            footerLogoUrl: finalUrl,
            faviconUrl: finalUrl,
            ogImageUrl: finalUrl
          };
          setSettingsForm(updated);
          await saveSettings(updated);
          showNotification('Master logo uploaded and applied to Header, Mobile, Footer & Favicon!');

          // Also register in media library
          saveMediaItem({
            filename: file.name,
            url: finalUrl,
            category: 'Logos',
            size: `${Math.round(file.size / 1024)} KB`,
            dimensions: 'Master Logo'
          }, base64);
        }
      } catch (err) {
        console.error('Master logo upload error:', err);
        showNotification('Failed to process image upload.', 'error');
      } finally {
        setUploadingLogoField(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Helper for logo file uploads
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: 'headerLogoUrl' | 'mobileLogoUrl' | 'footerLogoUrl' | 'faviconUrl' | 'ogImageUrl' | 'certificateStampLogoUrl' | 'certificateSignatureUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('File size exceeds 15MB limit. Please upload a smaller image.');
      e.target.value = '';
      return;
    }

    setUploadingLogoField(targetField);

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = reader.result as string;
        const uploadedUrl = await uploadImage(base64, true);
        const finalUrl = uploadedUrl || base64;
        
        if (finalUrl) {
          const updated = {
            ...(data.settings || defaultSiteSettings),
            ...settingsForm,
            [targetField]: finalUrl
          };
          setSettingsForm(updated);
          const ok = await saveSettings(updated);
          if (ok) {
            showNotification(`Logo photo uploaded and updated instantly!`);
          } else {
            showNotification(`Logo saved in local browser storage.`, 'success');
          }
          // Also register in media library
          saveMediaItem({
            filename: file.name,
            url: finalUrl,
            category: 'Logos',
            size: `${Math.round(file.size / 1024)} KB`,
            dimensions: 'Auto'
          }, base64);
        } else {
          showNotification('Failed to process image.', 'error');
        }
      } catch (err) {
        console.error('Logo upload error:', err);
        showNotification('Failed to process image upload.', 'error');
      } finally {
        setUploadingLogoField(null);
        e.target.value = '';
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
          { id: 'certificate', label: 'Certificate & Stamp', icon: Award },
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
          <div className="border-b border-slate-100 pb-4 flex flex-col md:flex-row justify-between md:items-center gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layout className="w-5 h-5 text-blue-600" />
                Header Logos & Website Branding
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Manage header logos, mobile marks, footer branding, and browser favicon across all pages.</p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  const activeLogo = settingsForm.headerLogoUrl || settingsForm.faviconUrl || '/brandlogo.png';
                  handleSyncLogoToAllSlots(activeLogo);
                }}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 border border-blue-200 cursor-pointer"
                title="Synchronize the current desktop logo across Header, Mobile, Footer and Favicon"
              >
                <Check className="w-3.5 h-3.5" />
                Sync Active Logo To All Slots
              </button>

              <button
                type="button"
                onClick={handleResetAllLogos}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 border border-slate-200 cursor-pointer"
                title="Reset all logos to official Future Gates bundled seal"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset All To Official Seal
              </button>
            </div>
          </div>

          {/* Master 1-Click Logo Uploader Hero Box */}
          <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-md border border-blue-900/40 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-white/10 p-2 flex items-center justify-center border border-white/20 shrink-0 backdrop-blur-sm">
                  <img
                    src={settingsForm.headerLogoUrl || settingsForm.faviconUrl || '/brandlogo.png'}
                    alt="Current Brand Logo"
                    className="max-h-full max-w-full object-contain filter drop-shadow"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/brandlogo.png';
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-white">Master Brand Logo</span>
                    <span className="text-[10px] font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30 px-2 py-0.5 rounded-full">
                      1-Click Deploy Everywhere
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    Upload your official Future Gates IT Center logo once. It will instantly update across Desktop Header, Mobile Header, Footer, Favicon, and Certificate seals with full persistence.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
                <input
                  id="master-logo-file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleMasterLogoUpload(f);
                    e.target.value = '';
                  }}
                />
                <label
                  htmlFor="master-logo-file-input"
                  className="w-full md:w-auto px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  {uploadingLogoField === 'headerLogoUrl' ? 'Uploading & Syncing...' : 'Upload & Apply Logo Everywhere'}
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Desktop Header Logo */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">Desktop Header Logo</span>
                  {settingsForm.headerLogoUrl ? (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Custom Active</span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-bold bg-slate-100 px-1.5 py-0.5 rounded">Default Seal</span>
                  )}
                </div>

                <div
                  className="h-20 bg-white rounded-lg border border-slate-200 p-2 flex items-center justify-center relative overflow-hidden group cursor-pointer"
                  onClick={() => document.getElementById('file-headerLogoUrl')?.click()}
                  title="Click to upload or replace desktop header logo"
                >
                  <img
                    src={settingsForm.headerLogoUrl || '/brandlogo.png'}
                    alt="Header Logo"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/brandlogo.png'; }}
                  />
                  {uploadingLogoField === 'headerLogoUrl' && (
                    <div className="absolute inset-0 bg-white/95 flex items-center justify-center gap-1.5 text-xs font-bold text-blue-600">
                      <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </div>
                  )}
                </div>

                <input
                  id="file-headerLogoUrl"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleLogoUpload(e, 'headerLogoUrl')}
                />

                <div className="flex gap-2">
                  <label
                    htmlFor="file-headerLogoUrl"
                    className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-center rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5 border border-blue-200"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    {uploadingLogoField === 'headerLogoUrl' ? 'Uploading...' : 'Upload Logo'}
                  </label>
                  {settingsForm.headerLogoUrl && (
                    <button
                      type="button"
                      onClick={() => handleQuickSaveLogoField('headerLogoUrl', '')}
                      className="px-2.5 py-2 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold rounded-lg cursor-pointer border border-red-200"
                      title="Reset to default seal"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-1 pt-1">
                <input
                  type="text"
                  placeholder="Paste Logo URL..."
                  value={settingsForm.headerLogoUrl || ''}
                  onChange={(e) => setSettingsForm(prev => ({ ...prev, headerLogoUrl: e.target.value }))}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => handleQuickSaveLogoField('headerLogoUrl', settingsForm.headerLogoUrl || '')}
                  className="px-2.5 py-1.5 bg-slate-900 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer shrink-0"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Mobile Header Logo */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">Mobile Header Logo</span>
                  {settingsForm.mobileLogoUrl ? (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Custom Active</span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-medium">Auto (Same)</span>
                  )}
                </div>

                <div
                  className="h-20 bg-white rounded-lg border border-slate-200 p-2 flex items-center justify-center relative overflow-hidden group cursor-pointer"
                  onClick={() => document.getElementById('file-mobileLogoUrl')?.click()}
                  title="Click to upload mobile header logo"
                >
                  <img
                    src={settingsForm.mobileLogoUrl || settingsForm.headerLogoUrl || '/brandlogo.png'}
                    alt="Mobile Logo"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/brandlogo.png'; }}
                  />
                  {uploadingLogoField === 'mobileLogoUrl' && (
                    <div className="absolute inset-0 bg-white/95 flex items-center justify-center gap-1.5 text-xs font-bold text-blue-600">
                      <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </div>
                  )}
                </div>

                <input
                  id="file-mobileLogoUrl"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleLogoUpload(e, 'mobileLogoUrl')}
                />

                <div className="flex gap-2">
                  <label
                    htmlFor="file-mobileLogoUrl"
                    className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-center rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5 border border-blue-200"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    {uploadingLogoField === 'mobileLogoUrl' ? 'Uploading...' : 'Upload'}
                  </label>
                  {settingsForm.mobileLogoUrl && (
                    <button
                      type="button"
                      onClick={() => handleQuickSaveLogoField('mobileLogoUrl', '')}
                      className="px-2.5 py-2 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold rounded-lg cursor-pointer border border-red-200"
                      title="Reset to desktop logo"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-1 pt-1">
                <input
                  type="text"
                  placeholder="Paste Logo URL..."
                  value={settingsForm.mobileLogoUrl || ''}
                  onChange={(e) => setSettingsForm(prev => ({ ...prev, mobileLogoUrl: e.target.value }))}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => handleQuickSaveLogoField('mobileLogoUrl', settingsForm.mobileLogoUrl || '')}
                  className="px-2.5 py-1.5 bg-slate-900 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer shrink-0"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Footer Logo */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">Footer Logo (Light)</span>
                  {settingsForm.footerLogoUrl ? (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Custom Active</span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-medium">Auto (Header)</span>
                  )}
                </div>

                <div
                  className="h-20 bg-slate-900 rounded-lg border border-slate-800 p-2 flex items-center justify-center relative overflow-hidden group cursor-pointer"
                  onClick={() => document.getElementById('file-footerLogoUrl')?.click()}
                  title="Click to upload footer logo"
                >
                  <img
                    src={settingsForm.footerLogoUrl || settingsForm.headerLogoUrl || '/brandlogo.png'}
                    alt="Footer Logo"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/brandlogo.png'; }}
                  />
                  {uploadingLogoField === 'footerLogoUrl' && (
                    <div className="absolute inset-0 bg-slate-900/95 flex items-center justify-center gap-1.5 text-xs font-bold text-blue-400">
                      <div className="w-3.5 h-3.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </div>
                  )}
                </div>

                <input
                  id="file-footerLogoUrl"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleLogoUpload(e, 'footerLogoUrl')}
                />

                <div className="flex gap-2">
                  <label
                    htmlFor="file-footerLogoUrl"
                    className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-center rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5 border border-blue-200"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    {uploadingLogoField === 'footerLogoUrl' ? 'Uploading...' : 'Upload'}
                  </label>
                  {settingsForm.footerLogoUrl && (
                    <button
                      type="button"
                      onClick={() => handleQuickSaveLogoField('footerLogoUrl', '')}
                      className="px-2.5 py-2 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold rounded-lg cursor-pointer border border-red-200"
                      title="Reset to header logo"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-1 pt-1">
                <input
                  type="text"
                  placeholder="Paste Logo URL..."
                  value={settingsForm.footerLogoUrl || ''}
                  onChange={(e) => setSettingsForm(prev => ({ ...prev, footerLogoUrl: e.target.value }))}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => handleQuickSaveLogoField('footerLogoUrl', settingsForm.footerLogoUrl || '')}
                  className="px-2.5 py-1.5 bg-slate-900 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer shrink-0"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Favicon Mark */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">Favicon Mark</span>
                  {settingsForm.faviconUrl ? (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Custom Active</span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-bold bg-slate-100 px-1.5 py-0.5 rounded">Default Seal</span>
                  )}
                </div>

                <div
                  className="h-20 bg-white rounded-lg border border-slate-200 p-2 flex items-center justify-center relative overflow-hidden group cursor-pointer"
                  onClick={() => document.getElementById('file-faviconUrl')?.click()}
                  title="Click to upload browser favicon icon"
                >
                  <img
                    src={settingsForm.faviconUrl || '/brandlogo.png'}
                    alt="Favicon"
                    className="w-10 h-10 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/brandlogo.png'; }}
                  />
                  {uploadingLogoField === 'faviconUrl' && (
                    <div className="absolute inset-0 bg-white/95 flex items-center justify-center gap-1.5 text-xs font-bold text-blue-600">
                      <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </div>
                  )}
                </div>

                <input
                  id="file-faviconUrl"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleLogoUpload(e, 'faviconUrl')}
                />

                <div className="flex gap-2">
                  <label
                    htmlFor="file-faviconUrl"
                    className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-center rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5 border border-blue-200"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    {uploadingLogoField === 'faviconUrl' ? 'Uploading...' : 'Upload'}
                  </label>
                  {settingsForm.faviconUrl && (
                    <button
                      type="button"
                      onClick={() => handleQuickSaveLogoField('faviconUrl', '')}
                      className="px-2.5 py-2 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold rounded-lg cursor-pointer border border-red-200"
                      title="Reset to default favicon"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-1 pt-1">
                <input
                  type="text"
                  placeholder="Favicon URL..."
                  value={settingsForm.faviconUrl || ''}
                  onChange={(e) => setSettingsForm(prev => ({ ...prev, faviconUrl: e.target.value }))}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => handleQuickSaveLogoField('faviconUrl', settingsForm.faviconUrl || '')}
                  className="px-2.5 py-1.5 bg-slate-900 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer shrink-0"
                >
                  Apply
                </button>
              </div>
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

          {/* Admin Link Visibility & Secret Access Controls */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Admin Portal Privacy & Visitor Visibility</h4>
              </div>
            </div>
            
            <p className="text-xs text-slate-600">
              Control whether the public & website visitors can see the "Admin" login button in the header and footer.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                settingsForm.showAdminHeaderButton ? 'bg-orange-50 border-orange-300 text-orange-950 font-bold' : 'bg-white border-slate-200 text-slate-600'
              }`}>
                <div>
                  <span className="text-xs font-bold block">Header Top Bar "Admin" Button</span>
                  <span className="text-[10px] text-slate-500">Show button in the top black strip</span>
                </div>
                <input
                  type="checkbox"
                  checked={settingsForm.showAdminHeaderButton === true}
                  onChange={(e) => setSettingsForm(prev => ({ ...prev, showAdminHeaderButton: e.target.checked }))}
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-400"
                />
              </label>

              <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                settingsForm.showAdminFooterLink ? 'bg-orange-50 border-orange-300 text-orange-950 font-bold' : 'bg-white border-slate-200 text-slate-600'
              }`}>
                <div>
                  <span className="text-xs font-bold block">Footer "Staff Admin" Link</span>
                  <span className="text-[10px] text-slate-500">Show link in footer legal column</span>
                </div>
                <input
                  type="checkbox"
                  checked={settingsForm.showAdminFooterLink === true}
                  onChange={(e) => setSettingsForm(prev => ({ ...prev, showAdminFooterLink: e.target.checked }))}
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-400"
                />
              </label>
            </div>

            <div className="p-3 bg-white/80 rounded-lg border border-amber-200/80 text-[11px] text-slate-700 space-y-1">
              <span className="font-bold text-amber-900 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-700" /> How to Access Admin Panel When Hidden from Visitors:
              </span>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li><strong>Keyboard Shortcut:</strong> Press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px] text-slate-800">Ctrl + Shift + A</kbd> (or <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px] text-slate-800">Cmd + Shift + A</kbd>) anywhere on the website.</li>
                <li><strong>Direct Secret URL:</strong> Visit <code className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px] text-blue-700">yourdomain.com/admin</code> or <code className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px] text-blue-700">yourdomain.com/#admin</code> in your browser.</li>
              </ul>
            </div>
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

          {/* Footer Logo Dedicated Control */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <label className="text-xs font-bold text-slate-800 block">Footer Official Logo (Light on Dark)</label>
                <span className="text-[11px] text-slate-500">Upload a light/transparent logo photo specifically for the dark footer banner.</span>
              </div>
              {settingsForm.footerLogoUrl && (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Custom Active</span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div className="h-20 bg-slate-900 rounded-xl border border-slate-800 p-2 flex items-center justify-center relative overflow-hidden">
                {settingsForm.footerLogoUrl ? (
                  <img src={settingsForm.footerLogoUrl} alt="Footer Logo Preview" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-[11px] text-slate-400 font-medium">Using Default Institute Logo</span>
                )}
              </div>

              <div className="sm:col-span-2 flex flex-col gap-2">
                <div className="flex gap-2">
                  <label className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                    <Upload className="w-4 h-4" />
                    Upload Footer Photo / Logo
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleLogoUpload(e, 'footerLogoUrl')} />
                  </label>
                  {settingsForm.footerLogoUrl && (
                    <button
                      type="button"
                      onClick={() => handleQuickSaveLogoField('footerLogoUrl', '')}
                      className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold rounded-xl cursor-pointer border border-red-200 transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Or paste direct image URL (https://...)"
                    value={settingsForm.footerLogoUrl || ''}
                    onChange={(e) => setSettingsForm(prev => ({ ...prev, footerLogoUrl: e.target.value }))}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleQuickSaveLogoField('footerLogoUrl', settingsForm.footerLogoUrl || '')}
                    className="px-3 py-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl cursor-pointer shrink-0 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
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

      {/* SECTION: CERTIFICATE & TRANSCRIPT BRANDING (STAMP, E-SIGNATURE, REGISTRAR) */}
      {activeSubTab === 'certificate' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-500" />
              Certificate & Transcript Official Seal & E-Signature
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Upload your own institute seal/stamp image and official electronic signature to appear on every verified certificate and transcript.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Official Seal / Stamp Image */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <label htmlFor="file-cert-stamp" className="text-xs font-bold text-slate-900 block cursor-pointer">Official Seal / Stamp</label>
                    <span className="text-[11px] text-slate-500">Appears in the center of student transcripts and certificates</span>
                  </div>
                  {settingsForm.certificateStampLogoUrl ? (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Custom Active</span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-medium">Default</span>
                  )}
                </div>

                <div className="h-32 bg-white rounded-xl border-2 border-dashed border-slate-300 p-3 flex flex-col items-center justify-center relative overflow-hidden">
                  {settingsForm.certificateStampLogoUrl ? (
                    <img
                      src={settingsForm.certificateStampLogoUrl}
                      alt="Certificate Official Stamp"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-center space-y-1">
                      <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Award className="w-6 h-6 text-brand-orange" />
                      </div>
                      <span className="text-[11px] text-slate-400 font-semibold">Using Default Future Gates Verified Badge</span>
                    </div>
                  )}
                  {uploadingLogoField === 'certificateStampLogoUrl' && (
                    <div className="absolute inset-0 bg-white/90 flex items-center justify-center gap-1.5 text-xs font-bold text-orange-600">
                      <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
                      Uploading Stamp...
                    </div>
                  )}
                </div>

                <input
                  id="file-cert-stamp"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleLogoUpload(e, 'certificateStampLogoUrl')}
                />

                <div className="flex gap-2">
                  <label
                    htmlFor="file-cert-stamp"
                    className="flex-1 px-4 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-600 text-center rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5 border border-orange-200"
                  >
                    <Upload className="w-4 h-4" />
                    {uploadingLogoField === 'certificateStampLogoUrl' ? 'Uploading Stamp...' : 'Upload Stamp Image'}
                  </label>
                  {settingsForm.certificateStampLogoUrl && (
                    <button
                      type="button"
                      onClick={() => handleQuickSaveLogoField('certificateStampLogoUrl', '')}
                      className="px-3 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold rounded-xl cursor-pointer border border-red-200"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-1.5 pt-2 border-t border-slate-200">
                <input
                  type="text"
                  placeholder="Or paste Direct Image URL..."
                  value={settingsForm.certificateStampLogoUrl || ''}
                  onChange={(e) => setSettingsForm(prev => ({ ...prev, certificateStampLogoUrl: e.target.value }))}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 font-mono bg-white"
                />
                <button
                  type="button"
                  onClick={() => handleQuickSaveLogoField('certificateStampLogoUrl', settingsForm.certificateStampLogoUrl || '')}
                  className="px-3 py-2 bg-slate-900 hover:bg-orange-600 text-white text-xs font-bold rounded-xl cursor-pointer shrink-0 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* 2. Official Electronic Signature */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <label htmlFor="file-cert-signature" className="text-xs font-bold text-slate-900 block cursor-pointer">Authorized E-Signature</label>
                    <span className="text-[11px] text-slate-500">Appears above the Registrar authority title (transparent PNG recommended)</span>
                  </div>
                  {settingsForm.certificateSignatureUrl ? (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Custom Active</span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-medium">Default</span>
                  )}
                </div>

                <div className="h-32 bg-white rounded-xl border-2 border-dashed border-slate-300 p-3 flex flex-col items-center justify-center relative overflow-hidden">
                  {settingsForm.certificateSignatureUrl ? (
                    <img
                      src={settingsForm.certificateSignatureUrl}
                      alt="Authorized Signature"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-center space-y-1">
                      <span className="text-blue-900 font-serif italic text-lg font-bold">
                        {settingsForm.certificateSignerName || 'Controller Exams'}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold">Using Default Calligraphic Signature Text</span>
                    </div>
                  )}
                  {uploadingLogoField === 'certificateSignatureUrl' && (
                    <div className="absolute inset-0 bg-white/90 flex items-center justify-center gap-1.5 text-xs font-bold text-blue-600">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      Uploading Signature...
                    </div>
                  )}
                </div>

                <input
                  id="file-cert-signature"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleLogoUpload(e, 'certificateSignatureUrl')}
                />

                <div className="flex gap-2">
                  <label
                    htmlFor="file-cert-signature"
                    className="flex-1 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-center rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5 border border-blue-200"
                  >
                    <Upload className="w-4 h-4" />
                    {uploadingLogoField === 'certificateSignatureUrl' ? 'Uploading Signature...' : 'Upload Signature Image'}
                  </label>
                  {settingsForm.certificateSignatureUrl && (
                    <button
                      type="button"
                      onClick={() => handleQuickSaveLogoField('certificateSignatureUrl', '')}
                      className="px-3 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold rounded-xl cursor-pointer border border-red-200"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-1.5 pt-2 border-t border-slate-200">
                <input
                  type="text"
                  placeholder="Or paste Direct Signature URL..."
                  value={settingsForm.certificateSignatureUrl || ''}
                  onChange={(e) => setSettingsForm(prev => ({ ...prev, certificateSignatureUrl: e.target.value }))}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono bg-white"
                />
                <button
                  type="button"
                  onClick={() => handleQuickSaveLogoField('certificateSignatureUrl', settingsForm.certificateSignatureUrl || '')}
                  className="px-3 py-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl cursor-pointer shrink-0 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Signatory Text Details */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Signatory Titles & Text Labels</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Signer Name / Fallback Calligraphy</label>
                <input
                  type="text"
                  value={settingsForm.certificateSignerName || ''}
                  onChange={(e) => setSettingsForm(prev => ({ ...prev, certificateSignerName: e.target.value }))}
                  placeholder="Controller Exams (e.g. Engr. Jameel Akhter)"
                  className="w-full text-xs px-3 py-2.5 bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Registrar / Authority Title</label>
                <input
                  type="text"
                  value={settingsForm.certificateRegistrarTitle || ''}
                  onChange={(e) => setSettingsForm(prev => ({ ...prev, certificateRegistrarTitle: e.target.value }))}
                  placeholder="Authorized Registrar (e.g. Managing Director)"
                  className="w-full text-xs px-3 py-2.5 bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Quick Guidance Info Box */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 space-y-1">
              <span className="font-bold text-amber-950 block">Tips for Best Visual Quality on Certificates & Transcripts:</span>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                <li><strong>Institute Header Logo:</strong> Configured under the <em>Header & Nav</em> tab (it automatically renders at the top of every transcript).</li>
                <li><strong>Official Seal / Stamp:</strong> Circular PNG with transparent background recommended for clean printing.</li>
                <li><strong>E-Signature:</strong> Scanned signature with a transparent background (PNG format) displays sharpest on paper prints and PDF downloads.</li>
              </ul>
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

            {/* Google Maps Configuration */}
            <div className="md:col-span-2 space-y-3 pt-2 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-blue-600" />
                    Google Maps Embed iFrame / Link
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Paste either the complete <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[10px]">&lt;iframe src="..."&gt;</code> code from Google Maps or direct embed URL. It will automatically extract and configure the map.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const officialEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6745.16018738322!2d72.34236961699489!3d32.29626569078067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3921172b8c953429%3A0x4bc4326c6b7ff459!2sFuture%20Gates%20iT%20Center!5e0!3m2!1sen!2s!4v1786733912521!5m2!1sen!2s';
                    setSettingsForm(prev => ({
                      ...prev,
                      contactInfo: {
                        ...prev.contactInfo,
                        googleMapsEmbedUrl: officialEmbed,
                        googleMapsUrl: 'https://maps.google.com/?q=Future+Gates+iT+Center+Khushab'
                      }
                    }));
                    showNotification('Set official Future Gates iT Center map embed link!');
                  }}
                  className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-bold rounded-lg transition-all self-start sm:self-auto cursor-pointer"
                >
                  Reset to Official Campus Map
                </button>
              </div>

              <textarea
                rows={2}
                placeholder='Paste <iframe src="https://www.google.com/maps/embed?..."></iframe> or embed URL'
                value={settingsForm.contactInfo.googleMapsEmbedUrl || ''}
                onChange={(e) => {
                  let val = e.target.value.trim();
                  // Check if full iframe code was pasted and extract src
                  if (val.includes('<iframe') && val.includes('src=')) {
                    const match = val.match(/src=["']([^"']+)["']/);
                    if (match && match[1]) {
                      val = match[1];
                    }
                  }
                  setSettingsForm(prev => ({
                    ...prev,
                    contactInfo: { ...prev.contactInfo, googleMapsEmbedUrl: val }
                  }));
                }}
                className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Direct Google Maps Link (for "Get Directions" button)</label>
                  <input
                    type="text"
                    placeholder="https://maps.google.com/?q=Future+Gates+iT+Center"
                    value={settingsForm.contactInfo.googleMapsUrl || ''}
                    onChange={(e) => setSettingsForm(prev => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, googleMapsUrl: e.target.value }
                    }))}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Map Live Preview */}
              {settingsForm.contactInfo.googleMapsEmbedUrl && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold text-slate-600 block">Map Preview:</span>
                  <div className="h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                    <iframe
                      title="Map Preview"
                      src={settingsForm.contactInfo.googleMapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                </div>
              )}
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

                  <div className="flex flex-col gap-1 pt-1.5 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
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
                        type="button"
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

                    <div className="grid grid-cols-2 gap-1 pt-1">
                      <button
                        type="button"
                        onClick={() => handleQuickSaveLogoField('headerLogoUrl', m.url)}
                        className="px-1.5 py-1 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 rounded text-[9.5px] font-bold transition-colors text-center"
                        title="Set as Desktop Header Logo"
                      >
                        Use as Logo
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickSaveLogoField('footerLogoUrl', m.url)}
                        className="px-1.5 py-1 bg-slate-100 hover:bg-slate-800 hover:text-white text-slate-700 rounded text-[9.5px] font-bold transition-colors text-center"
                        title="Set as Footer Logo"
                      >
                        Footer Logo
                      </button>
                    </div>
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
