import React, { useState, useEffect } from 'react';
import brandLogo from '../assets/brandlogo.png';
import mentorPhoto from '../assets/mentor-javed-hattar.png';
import {
  X,
  Lock,
  Plus,
  Trash2,
  Edit2,
  Save,
  Search,
  Upload,
  ShieldCheck,
  FileText,
  Users,
  Briefcase,
  BookOpen,
  Layout,
  Phone,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Check,
  Key,
  LogOut,
  Image as ImageIcon,
  Award,
  Sparkles,
  Sliders,
  Mail,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Send,
  MessageSquare
} from 'lucide-react';
import { Service, Course, BlogPost, StudentResult, HomepageConfig, ContactConfig, MentorConfig, EnrollmentApplication, ContactInquiry } from '../types';
import { useData } from '../context/DataContext';
import { SiteCustomizationPanel } from './SiteCustomizationPanel';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const {
    data,
    token,
    setToken,
    saveService,
    deleteService,
    reorderServices,
    saveCourse,
    deleteCourse,
    saveBlog,
    deleteBlog,
    saveVerification,
    deleteVerification,
    saveHomepage,
    saveContact,
    saveMentor,
    uploadImage,
    deleteAdmission,
    deleteInquiry,
    resendNotification
  } = useData();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'services' | 'courses' | 'blogs' | 'verifications' | 'homepage' | 'contact' | 'mentor' | 'admissions' | 'inquiries' | 'notifications' | 'settings' | 'siteSettings'>('services');
  const [resendingMap, setResendingMap] = useState<{ [key: string]: boolean }>({});
  const [resendStatusMap, setResendStatusMap] = useState<{ [key: string]: { success: boolean; msg: string } }>({});
  const [smtpStatus, setSmtpStatus] = useState<any>(null);
  const [testingSmtp, setTestingSmtp] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<{ success?: boolean; message?: string } | null>(null);
  const [testRecipient, setTestRecipient] = useState('futuregatesitcenter@gmail.com');
  const [leadSearch, setLeadSearch] = useState('');

  // Service Form State
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);

  // Course Form State
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);

  // Blog Form State
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);

  // Verification Form State
  const [editingVer, setEditingVer] = useState<Partial<StudentResult> | null>(null);
  const [verSearch, setVerSearch] = useState('');

  // Homepage Config Form State
  const [hpForm, setHpForm] = useState<HomepageConfig>(data.homepage);

  // Contact Config Form State
  const [contactForm, setContactForm] = useState<ContactConfig>(data.contact);

  // Mentor Config Form State
  const [mentorForm, setMentorForm] = useState<MentorConfig>(data.mentor || {
    name: 'Javed Hattar',
    title: 'IT Expert & Founder Mentor',
    subtitle: 'Future Gates IT Center — "Where Skills Become Your Income"',
    quote: 'Our single focus at Future Gates IT Center is to bridge the gap between theoretical knowledge and real market earning. Every student learns live project skills and freelancing strategies to build sustainable digital income.',
    photoUrl: '/assets/mentor-javed-hattar.png',
    badgeText: 'Lead Faculty & Founder',
    expertise: []
  });
  const [mentorSaveMsg, setMentorSaveMsg] = useState('');

  // Password change state
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState('');

  // Helper: File Upload to base64 & uploadImage API
  const handleFileUpload = async (file: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const uploadedUrl = await uploadImage(base64);
      if (uploadedUrl) {
        callback(uploadedUrl);
      } else {
        // Fallback to data URL if server upload fails
        callback(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (data.homepage) setHpForm(data.homepage);
    if (data.contact) setContactForm(data.contact);
    if (data.mentor) setMentorForm(data.mentor);
  }, [data]);

  // Load SMTP server notification status when admin is logged in
  useEffect(() => {
    if (token) {
      fetchSmtpStatus();
    }
  }, [token, activeTab]);

  const fetchSmtpStatus = async () => {
    try {
      const res = await fetch('/api/notifications/status', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        setSmtpStatus(json);
        if (json.destinationEmail) {
          setTestRecipient(json.destinationEmail);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch SMTP notification status', err);
    }
  };

  const handleResend = async (type: 'admission' | 'inquiry', id: string) => {
    const key = `${type}-${id}`;
    setResendingMap((prev) => ({ ...prev, [key]: true }));
    setResendStatusMap((prev) => ({ ...prev, [key]: { success: false, msg: 'Dispatching...' } }));

    try {
      const result = await resendNotification(type, id);
      if (result.success) {
        setResendStatusMap((prev) => ({ ...prev, [key]: { success: true, msg: 'Email Dispatched!' } }));
      } else {
        setResendStatusMap((prev) => ({ ...prev, [key]: { success: false, msg: result.error || 'Dispatch Failed' } }));
      }
    } catch (err: any) {
      setResendStatusMap((prev) => ({ ...prev, [key]: { success: false, msg: err.message || 'Dispatch error' } }));
    } finally {
      setResendingMap((prev) => ({ ...prev, [key]: false }));
      // Refresh status after 3 seconds
      setTimeout(() => {
        setResendStatusMap((prev) => {
          const updated = { ...prev };
          delete updated[key];
          return updated;
        });
      }, 5000);
    }
  };

  const handleTestSmtp = async () => {
    setTestingSmtp(true);
    setTestEmailResult(null);
    try {
      const res = await fetch('/api/notifications/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ testEmail: testRecipient })
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setTestEmailResult({ success: true, message: json.message || 'Test email dispatched successfully!' });
      } else {
        setTestEmailResult({ success: false, message: json.error || json.message || 'SMTP Test failed. Check credentials.' });
      }
      fetchSmtpStatus();
    } catch (err: any) {
      setTestEmailResult({ success: false, message: err.message || 'Connection error during SMTP test' });
    } finally {
      setTestingSmtp(false);
    }
  };

  // Modal accessibility: body-scroll lock & Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSaveMentorForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setMentorSaveMsg('');
    const ok = await saveMentor(mentorForm);
    if (ok) {
      setMentorSaveMsg('Mentor profile successfully updated!');
      setTimeout(() => setMentorSaveMsg(''), 4000);
    } else {
      setMentorSaveMsg('Failed to update mentor profile.');
    }
  };

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email.trim(), password })
      });
      const json = await res.json();
      if (res.ok && json.success && json.token) {
        setToken(json.token);
        setLoginError('');
      } else {
        setLoginError(json.error || 'Invalid administrator credentials');
      }
    } catch (err) {
      setLoginError('Unable to connect to authentication server. Please check your network connection.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (err) {
      // Ignore network errors on logout
    }
    setToken(null);
  };

  // Service Handlers
  const handleSaveServiceForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title) return;
    const ok = await saveService(editingService);
    if (ok) {
      setEditingService(null);
    }
  };

  const handleMoveService = async (index: number, direction: 'up' | 'down') => {
    const newServices = [...data.services];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newServices.length) return;

    const temp = newServices[index];
    newServices[index] = newServices[targetIdx];
    newServices[targetIdx] = temp;

    await reorderServices(newServices);
  };

  // Course Handlers
  const handleSaveCourseForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse || !editingCourse.title) return;
    const ok = await saveCourse(editingCourse);
    if (ok) {
      setEditingCourse(null);
    }
  };

  // Blog Handlers
  const handleSaveBlogForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog || !editingBlog.title) return;
    const ok = await saveBlog(editingBlog);
    if (ok) {
      setEditingBlog(null);
    }
  };

  // Verification Handlers
  const handleSaveVerForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVer || !editingVer.rollNo || !editingVer.name) return;
    const ok = await saveVerification(editingVer);
    if (ok) {
      setEditingVer(null);
    }
  };

  // Homepage Handler
  const handleSaveHomepageForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveHomepage(hpForm);
    alert('Homepage text and statistics updated successfully!');
  };

  // Contact Handler
  const handleSaveContactForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveContact(contactForm);
    alert('Contact details and social links updated successfully!');
  };

  // Password Change Handler
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassMsg('');
    if (!newPass || newPass.length < 8) {
      setPassMsg('Error: New password must be at least 8 characters long');
      return;
    }
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword: currPass, newPassword: newPass })
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setPassMsg('Password changed successfully!');
        setCurrPass('');
        setNewPass('');
      } else {
        setPassMsg(`Error: ${json.error || 'Failed to update password'}`);
      }
    } catch (err) {
      setPassMsg('Error: Failed to connect to server. Please try again.');
    }
  };

  const filteredVerifications = data.studentResults.filter(
    (v) =>
      v.name.toLowerCase().includes(verSearch.toLowerCase()) ||
      v.rollNo.toLowerCase().includes(verSearch.toLowerCase()) ||
      v.certificateNo.toLowerCase().includes(verSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full my-4 overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-brand-blue-dark to-brand-blue text-white p-4 sm:p-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={data.settings?.headerLogoUrl || brandLogo}
              alt="Future Gates IT Center Seal"
              width={46}
              height={46}
              className="w-11 h-11 object-contain shrink-0 filter drop-shadow-md bg-white/10 rounded-lg p-1"
              referrerPolicy="no-referrer"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = brandLogo; }}
            />
            <div>
              <h3 className="text-base sm:text-lg font-bold font-display">Future Gates IT Center — CMS Control Panel</h3>
              <p className="text-[11px] text-slate-300">Live Website Content, Services, Courses & Verification Management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {token && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto grow">
          {!token ? (
            /* Secure Login View */
            <div className="max-w-md mx-auto py-8 space-y-6">
              <div className="text-center space-y-2">
                <img
                  src={data.settings?.headerLogoUrl || brandLogo}
                  alt="Future Gates IT Center Official Seal"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain mx-auto filter drop-shadow-md"
                  referrerPolicy="no-referrer"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = brandLogo; }}
                />
                <h4 className="text-2xl font-bold font-display text-slate-900 pt-2">Administrator Authentication</h4>
                <p className="text-xs text-slate-500">Sign in to modify website content, manage student records, and edit courses.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                {loginError && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs font-medium rounded-lg border border-red-200">
                    {loginError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email / Username</label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="futuregatesitcenter@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-brand-blue focus:outline-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      title={showPassword ? 'Hide Password' : 'Show Password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3 bg-brand-blue hover:bg-brand-blue-light text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {loginLoading ? 'Authenticating...' : 'Sign In to CMS Panel'}
                </button>

                <p className="text-[11px] text-center text-slate-500 pt-2">
                  Authorized Personnel Access Only • All login events are recorded and rate-limited.
                </p>
              </form>
            </div>
          ) : (
            /* Authenticated CMS View */
            <div className="space-y-6">
              {/* Tabs Navigation */}
              <div className="flex flex-wrap border-b border-slate-200 gap-1 sm:gap-2">
                <button
                  onClick={() => setActiveTab('services')}
                  className={`px-3.5 py-2 font-bold text-xs rounded-t-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'services'
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" /> Services ({data.services.length})
                </button>

                <button
                  onClick={() => setActiveTab('courses')}
                  className={`px-3.5 py-2 font-bold text-xs rounded-t-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'courses'
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" /> Courses ({data.courses.length})
                </button>

                <button
                  onClick={() => setActiveTab('blogs')}
                  className={`px-3.5 py-2 font-bold text-xs rounded-t-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'blogs'
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" /> Blogs ({data.blogs.length})
                </button>

                <button
                  onClick={() => setActiveTab('verifications')}
                  className={`px-3.5 py-2 font-bold text-xs rounded-t-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'verifications'
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Certificates ({data.studentResults.length})
                </button>

                <button
                  onClick={() => setActiveTab('homepage')}
                  className={`px-3.5 py-2 font-bold text-xs rounded-t-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'homepage'
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Layout className="w-3.5 h-3.5" /> Homepage Text
                </button>

                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-3.5 py-2 font-bold text-xs rounded-t-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'contact'
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" /> Contact Info
                </button>

                <button
                  onClick={() => setActiveTab('mentor')}
                  className={`px-3.5 py-2 font-bold text-xs rounded-t-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'mentor'
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" /> Mentor
                </button>

                <button
                  onClick={() => setActiveTab('admissions')}
                  className={`px-3.5 py-2 font-bold text-xs rounded-t-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'admissions'
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" /> Admissions ({data.admissions?.length || 0})
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-3.5 py-2 font-bold text-xs rounded-t-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'inquiries'
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Messages ({data.inquiries?.length || 0})
                </button>

                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`px-3.5 py-2 font-bold text-xs rounded-t-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'notifications'
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" /> Email Alerts
                </button>

                <button
                  onClick={() => setActiveTab('siteSettings')}
                  className={`px-3.5 py-2 font-bold text-xs rounded-t-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'siteSettings'
                      ? 'bg-orange-600 text-white shadow-sm font-extrabold'
                      : 'text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" /> Website Settings
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-3.5 py-2 font-bold text-xs rounded-t-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Key className="w-3.5 h-3.5" /> Security
                </button>
              </div>

              {/* ==================== TAB 1: SERVICES ==================== */}
              {activeTab === 'services' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Manage Agency & Local Services</h4>
                      <p className="text-xs text-slate-500">Add, edit titles, categories, upload images, enable/disable or reorder services.</p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingService({
                          title: '',
                          description: '',
                          iconName: 'Sparkles',
                          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
                          category: 'agency',
                          features: ['High quality service', 'Fast delivery'],
                          techStack: ['Standard'],
                          isPublished: true
                        })
                      }
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" /> Add New Service
                    </button>
                  </div>

                  {/* Editing Service Drawer Modal */}
                  {editingService && (
                    <form onSubmit={handleSaveServiceForm} className="bg-slate-50 p-5 rounded-2xl border-2 border-brand-blue/30 space-y-4 shadow-lg">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <h5 className="font-bold text-xs text-brand-blue uppercase tracking-wide">
                          {editingService.id ? 'Edit Service Details' : 'Create New Service'}
                        </h5>
                        <button
                          type="button"
                          onClick={() => setEditingService(null)}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Service Title *</label>
                          <input
                            type="text"
                            required
                            value={editingService.title || ''}
                            onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                            className="w-full p-2.5 border rounded-lg bg-white text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Category *</label>
                          <select
                            value={editingService.category || 'agency'}
                            onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                            className="w-full p-2.5 border rounded-lg bg-white text-slate-900"
                          >
                            <option value="agency">Digital Agency & Software Development</option>
                            <option value="local-hub">Local Hub & Custom Printing Services</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">Description *</label>
                        <textarea
                          rows={3}
                          required
                          value={editingService.description || ''}
                          onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                          className="w-full p-2.5 border rounded-lg bg-white text-xs text-slate-900"
                        />
                      </div>

                      {/* Image Upload & Photo URL Section */}
                      <div className="space-y-2">
                        <label className="block font-bold text-slate-700 text-xs">Service Photo / Image URL</label>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <input
                            type="text"
                            value={editingService.imageUrl || ''}
                            onChange={(e) => setEditingService({ ...editingService, imageUrl: e.target.value })}
                            placeholder="https://... or upload image"
                            className="w-full p-2.5 border rounded-lg bg-white text-xs text-slate-900"
                          />
                          <label className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg flex items-center gap-2 cursor-pointer shrink-0">
                            <Upload className="w-4 h-4" /> Upload Photo
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(file, (url) => setEditingService({ ...editingService, imageUrl: url }));
                                }
                              }}
                            />
                          </label>
                        </div>

                        {editingService.imageUrl && (
                          <div className="relative w-36 h-24 rounded-lg overflow-hidden border border-slate-300 mt-2">
                            <img src={editingService.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                            <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1 rounded">Preview</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Key Features (comma separated)</label>
                          <input
                            type="text"
                            value={editingService.features ? editingService.features.join(', ') : ''}
                            onChange={(e) =>
                              setEditingService({
                                ...editingService,
                                features: e.target.value.split(',').map((f) => f.trim()).filter(Boolean)
                              })
                            }
                            className="w-full p-2.5 border rounded-lg bg-white text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Tech Stack / Tools (comma separated)</label>
                          <input
                            type="text"
                            value={editingService.techStack ? editingService.techStack.join(', ') : ''}
                            onChange={(e) =>
                              setEditingService({
                                ...editingService,
                                techStack: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                              })
                            }
                            className="w-full p-2.5 border rounded-lg bg-white text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isPublishedCheck"
                          checked={editingService.isPublished !== false}
                          onChange={(e) => setEditingService({ ...editingService, isPublished: e.target.checked })}
                          className="w-4 h-4 text-brand-blue rounded"
                        />
                        <label htmlFor="isPublishedCheck" className="text-xs font-bold text-slate-800 cursor-pointer">
                          Enable / Publish this service on website
                        </label>
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={() => setEditingService(null)}
                          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5"
                        >
                          <Save className="w-4 h-4" /> Save Service
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Services List Table */}
                  <div className="space-y-2">
                    {data.services.map((service, index) => (
                      <div
                        key={service.id}
                        className={`p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs transition-all ${
                          service.isPublished === false ? 'opacity-60 bg-slate-100' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={service.imageUrl}
                            alt={service.title}
                            className="w-14 h-14 rounded-lg object-cover border border-slate-300 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-sm">{service.title}</span>
                              <span
                                className={`px-2 py-0.5 text-[9.5px] font-bold rounded uppercase ${
                                  service.category === 'agency' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {service.category === 'agency' ? 'Digital Agency' : 'Local Hub'}
                              </span>
                              {service.isPublished === false && (
                                <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[9px] font-bold rounded">
                                  Disabled
                                </span>
                              )}
                            </div>
                            <p className="text-slate-500 text-[11px] line-clamp-1 max-w-xl">{service.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                          {/* Reorder Up/Down */}
                          <button
                            onClick={() => handleMoveService(index, 'up')}
                            disabled={index === 0}
                            className="p-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded cursor-pointer disabled:opacity-30"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveService(index, 'down')}
                            disabled={index === data.services.length - 1}
                            className="p-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded cursor-pointer disabled:opacity-30"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>

                          {/* Toggle Enabled */}
                          <button
                            onClick={() => saveService({ ...service, isPublished: service.isPublished === false ? true : false })}
                            className={`p-1.5 rounded cursor-pointer ${
                              service.isPublished === false ? 'bg-slate-200 text-slate-600' : 'bg-emerald-100 text-emerald-800'
                            }`}
                            title={service.isPublished === false ? 'Enable' : 'Disable'}
                          >
                            {service.isPublished === false ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => setEditingService(service)}
                            className="p-1.5 bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue rounded cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={async () => {
                              if (confirm(`Delete service "${service.title}"?`)) {
                                await deleteService(service.id);
                              }
                            }}
                            className="p-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==================== TAB 2: COURSES ==================== */}
              {activeTab === 'courses' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Manage IT Courses & Diplomas</h4>
                      <p className="text-xs text-slate-500">Edit course titles, fee structure, duration, syllabus, status and photo.</p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingCourse({
                          title: '',
                          duration: '3 Months',
                          category: 'Technical',
                          description: '',
                          longDescription: '',
                          fee: 'PKR 10,000',
                          syllabus: ['Module 1 basics', 'Module 2 practicals'],
                          skillsGained: ['Practical skill 1', 'Practical skill 2'],
                          featured: true,
                          status: 'Active'
                        })
                      }
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" /> Add New Course
                    </button>
                  </div>

                  {editingCourse && (
                    <form onSubmit={handleSaveCourseForm} className="bg-slate-50 p-5 rounded-2xl border-2 border-brand-blue/30 space-y-4 shadow-lg">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <h5 className="font-bold text-xs text-brand-blue uppercase tracking-wide">
                          {editingCourse.id ? 'Edit Course Details' : 'Create New Course'}
                        </h5>
                        <button type="button" onClick={() => setEditingCourse(null)} className="text-slate-400 hover:text-slate-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Course Title *</label>
                          <input
                            type="text"
                            required
                            value={editingCourse.title || ''}
                            onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                            className="w-full p-2.5 border rounded-lg bg-white"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Duration *</label>
                          <input
                            type="text"
                            required
                            value={editingCourse.duration || '3 Months'}
                            onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                            className="w-full p-2.5 border rounded-lg bg-white"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Fee *</label>
                          <input
                            type="text"
                            required
                            value={editingCourse.fee || 'PKR 10,000'}
                            onChange={(e) => setEditingCourse({ ...editingCourse, fee: e.target.value })}
                            className="w-full p-2.5 border rounded-lg bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Category</label>
                          <select
                            value={editingCourse.category || 'Technical'}
                            onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value as any })}
                            className="w-full p-2.5 border rounded-lg bg-white"
                          >
                            <option value="Technical">Technical</option>
                            <option value="Development">Development</option>
                            <option value="Design">Design</option>
                            <option value="Short Courses">Short Courses</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Status</label>
                          <select
                            value={editingCourse.status || 'Active'}
                            onChange={(e) => setEditingCourse({ ...editingCourse, status: e.target.value as any })}
                            className="w-full p-2.5 border rounded-lg bg-white"
                          >
                            <option value="Active">Active (Accepting Enrolments)</option>
                            <option value="Inactive">Inactive (Closed / Draft)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">Short Description *</label>
                        <input
                          type="text"
                          required
                          value={editingCourse.description || ''}
                          onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                          className="w-full p-2.5 border rounded-lg bg-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">Full Syllabus / Long Description</label>
                        <textarea
                          rows={3}
                          value={editingCourse.longDescription || ''}
                          onChange={(e) => setEditingCourse({ ...editingCourse, longDescription: e.target.value })}
                          className="w-full p-2.5 border rounded-lg bg-white text-xs"
                        />
                      </div>

                      {/* Course Image */}
                      <div className="space-y-2 text-xs">
                        <label className="block font-bold text-slate-700">Course Image URL / Photo Upload</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editingCourse.imageUrl || ''}
                            onChange={(e) => setEditingCourse({ ...editingCourse, imageUrl: e.target.value })}
                            placeholder="https://... or upload photo"
                            className="w-full p-2.5 border rounded-lg bg-white"
                          />
                          <label className="px-4 py-2.5 bg-slate-800 text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shrink-0">
                            <Upload className="w-4 h-4" /> Upload
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(file, (url) => setEditingCourse({ ...editingCourse, imageUrl: url }));
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="featuredCheck"
                          checked={editingCourse.featured || false}
                          onChange={(e) => setEditingCourse({ ...editingCourse, featured: e.target.checked })}
                          className="w-4 h-4 text-brand-blue rounded"
                        />
                        <label htmlFor="featuredCheck" className="text-xs font-bold text-slate-800 cursor-pointer">
                          Highlight as Featured Course on Homepage
                        </label>
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={() => setEditingCourse(null)}
                          className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg flex items-center gap-1.5"
                        >
                          <Save className="w-4 h-4" /> Save Course
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-2">
                    {data.courses.map((course) => (
                      <div
                        key={course.id}
                        className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          {course.imageUrl && (
                            <img src={course.imageUrl} alt={course.title} className="w-12 h-12 rounded-lg object-cover border" />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-sm">{course.title}</span>
                              <span className="px-2 py-0.5 bg-brand-orange/10 text-brand-orange font-bold text-[9.5px] rounded">
                                {course.duration}
                              </span>
                              <span className="font-mono text-emerald-600 font-bold">{course.fee}</span>
                              {course.status === 'Inactive' && (
                                <span className="px-1.5 py-0.5 bg-slate-200 text-slate-600 text-[9px] font-bold rounded">
                                  Inactive
                                </span>
                              )}
                            </div>
                            <p className="text-slate-500 text-[11px] line-clamp-1 max-w-xl">{course.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setEditingCourse(course)}
                            className="p-1.5 bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20 rounded cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm(`Delete course "${course.title}"?`)) {
                                await deleteCourse(course.id);
                              }
                            }}
                            className="p-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==================== TAB 3: BLOGS ==================== */}
              {activeTab === 'blogs' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Manage Published Blog Posts</h4>
                      <p className="text-xs text-slate-500">Create, edit, upload featured photo, publish/unpublish articles.</p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingBlog({
                          title: '',
                          excerpt: '',
                          category: 'Technical',
                          author: 'Future Gates Team',
                          publishedAt: 'August 2026',
                          readTime: '3 min read',
                          tags: ['IT', 'Education'],
                          content: ['Write paragraph 1...', 'Write paragraph 2...'],
                          isPublished: true
                        })
                      }
                      className="px-4 py-2 bg-brand-blue text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> New Blog Article
                    </button>
                  </div>

                  {editingBlog && (
                    <form onSubmit={handleSaveBlogForm} className="bg-slate-50 p-5 rounded-2xl border-2 border-brand-blue/30 space-y-4 shadow-lg">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <h5 className="font-bold text-xs text-brand-blue uppercase tracking-wide">
                          {editingBlog.id ? 'Edit Article' : 'Write New Article'}
                        </h5>
                        <button type="button" onClick={() => setEditingBlog(null)} className="text-slate-400">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Article Title *</label>
                          <input
                            type="text"
                            required
                            value={editingBlog.title || ''}
                            onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                            className="w-full p-2.5 border rounded-lg bg-white"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Category</label>
                          <input
                            type="text"
                            value={editingBlog.category || 'Career'}
                            onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                            className="w-full p-2.5 border rounded-lg bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">Excerpt / Summary</label>
                        <textarea
                          rows={2}
                          value={editingBlog.excerpt || ''}
                          onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                          className="w-full p-2.5 border rounded-lg bg-white text-xs"
                        />
                      </div>

                      {/* Featured Image Upload */}
                      <div className="space-y-2 text-xs">
                        <label className="block font-bold text-slate-700">Featured Article Image</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editingBlog.imageUrl || ''}
                            onChange={(e) => setEditingBlog({ ...editingBlog, imageUrl: e.target.value })}
                            placeholder="https://... or upload"
                            className="w-full p-2.5 border rounded-lg bg-white text-xs"
                          />
                          <label className="px-4 py-2.5 bg-slate-800 text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shrink-0">
                            <Upload className="w-4 h-4" /> Upload
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(file, (url) => setEditingBlog({ ...editingBlog, imageUrl: url }));
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">Content Paragraphs (Separate with double newlines)</label>
                        <textarea
                          rows={5}
                          value={Array.isArray(editingBlog.content) ? editingBlog.content.join('\n\n') : (editingBlog.content as unknown as string) || ''}
                          onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value.split('\n\n').filter(Boolean) })}
                          className="w-full p-2.5 border rounded-lg bg-white text-xs font-mono"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                        <button type="button" onClick={() => setEditingBlog(null)} className="px-4 py-2 bg-slate-200 text-xs font-bold rounded-lg">
                          Cancel
                        </button>
                        <button type="submit" className="px-5 py-2 bg-brand-blue text-white font-bold text-xs rounded-lg">
                          Save Article
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-2">
                    {data.blogs.map((b) => (
                      <div key={b.id || b._id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          {b.imageUrl && <img src={b.imageUrl} alt={b.title} className="w-12 h-12 rounded-lg object-cover border" />}
                          <div>
                            <span className="text-[10px] font-bold uppercase text-brand-orange">{b.category}</span>
                            <h6 className="font-bold text-slate-900">{b.title}</h6>
                            <p className="text-slate-500 text-[11px] line-clamp-1">{b.excerpt}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => setEditingBlog(b)}
                            className="p-1.5 bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20 rounded cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm(`Delete blog "${b.title}"?`)) {
                                await deleteBlog((b.id || b._id) as string);
                              }
                            }}
                            className="p-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==================== TAB 4: CERTIFICATE VERIFICATION ==================== */}
              {activeTab === 'verifications' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="relative w-full sm:w-72">
                      <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        value={verSearch}
                        onChange={(e) => setVerSearch(e.target.value)}
                        placeholder="Search roll no, candidate name..."
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800"
                      />
                    </div>

                    <button
                      onClick={() =>
                        setEditingVer({
                          rollNo: `FG-2026-${Math.floor(100 + Math.random() * 900)}`,
                          name: '',
                          fatherName: '',
                          enrollmentNo: `ENR-${Date.now().toString().slice(-6)}`,
                          courseName: 'Web Design & Development',
                          duration: '3 Months',
                          session: 'Jan 2026 - Mar 2026',
                          grade: 'A',
                          percentage: 85,
                          theoryMarks: 170,
                          practicalMarks: 215,
                          vivaMarks: 40,
                          totalMarks: 425,
                          maxMarks: 500,
                          issueDate: new Date().toISOString().split('T')[0],
                          certificateNo: `CER-2026-${Math.floor(10000 + Math.random() * 90000)}`,
                          verificationStatus: 'Verified',
                          remarks: 'Passed practical exams with distinction.'
                        })
                      }
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" /> Add Student Record
                    </button>
                  </div>

                  {/* Verification Form */}
                  {editingVer && (
                    <form onSubmit={handleSaveVerForm} className="bg-slate-50 p-5 rounded-2xl border-2 border-brand-blue/30 space-y-3 shadow-lg">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <h5 className="font-bold text-xs text-brand-blue uppercase tracking-wide">
                          Add / Edit Student Certificate Record
                        </h5>
                        <button type="button" onClick={() => setEditingVer(null)} className="text-slate-400">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Roll No (Unique ID) *</label>
                          <input
                            type="text"
                            required
                            value={editingVer.rollNo || ''}
                            onChange={(e) => setEditingVer({ ...editingVer, rollNo: e.target.value })}
                            className="w-full p-2 border rounded bg-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Student Name *</label>
                          <input
                            type="text"
                            required
                            value={editingVer.name || ''}
                            onChange={(e) => setEditingVer({ ...editingVer, name: e.target.value })}
                            className="w-full p-2 border rounded bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Father Name *</label>
                          <input
                            type="text"
                            required
                            value={editingVer.fatherName || ''}
                            onChange={(e) => setEditingVer({ ...editingVer, fatherName: e.target.value })}
                            className="w-full p-2 border rounded bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Course Title</label>
                          <input
                            type="text"
                            value={editingVer.courseName || ''}
                            onChange={(e) => setEditingVer({ ...editingVer, courseName: e.target.value })}
                            className="w-full p-2 border rounded bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Certificate No</label>
                          <input
                            type="text"
                            value={editingVer.certificateNo || ''}
                            onChange={(e) => setEditingVer({ ...editingVer, certificateNo: e.target.value })}
                            className="w-full p-2 border rounded bg-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Verification Status</label>
                          <select
                            value={editingVer.verificationStatus || 'Verified'}
                            onChange={(e) => setEditingVer({ ...editingVer, verificationStatus: e.target.value as any })}
                            className="w-full p-2 border rounded bg-white font-bold text-emerald-700"
                          >
                            <option value="Verified">Verified (Valid)</option>
                            <option value="Pending">Pending Audit</option>
                            <option value="Suspended">Suspended / Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600">Grade</label>
                          <input
                            type="text"
                            value={editingVer.grade || 'A+'}
                            onChange={(e) => setEditingVer({ ...editingVer, grade: e.target.value as any })}
                            className="w-full p-1.5 border rounded bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600">Percentage %</label>
                          <input
                            type="number"
                            value={editingVer.percentage || 85}
                            onChange={(e) => setEditingVer({ ...editingVer, percentage: Number(e.target.value) })}
                            className="w-full p-1.5 border rounded bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600">Total Marks</label>
                          <input
                            type="number"
                            value={editingVer.totalMarks || 425}
                            onChange={(e) => setEditingVer({ ...editingVer, totalMarks: Number(e.target.value) })}
                            className="w-full p-1.5 border rounded bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600">Max Marks</label>
                          <input
                            type="number"
                            value={editingVer.maxMarks || 500}
                            onChange={(e) => setEditingVer({ ...editingVer, maxMarks: Number(e.target.value) })}
                            className="w-full p-1.5 border rounded bg-white"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button type="button" onClick={() => setEditingVer(null)} className="px-3 py-1.5 bg-slate-200 text-xs font-bold rounded">
                          Cancel
                        </button>
                        <button type="submit" className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded">
                          Save Student Record
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Verification Table */}
                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold">
                        <tr>
                          <th className="p-3">Roll No / Cert No</th>
                          <th className="p-3">Candidate & Father</th>
                          <th className="p-3">Course Title</th>
                          <th className="p-3">Grade & Marks</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {filteredVerifications.map((v) => (
                          <tr key={v.rollNo} className="hover:bg-slate-50">
                            <td className="p-3 font-mono">
                              <span className="font-bold text-brand-blue block">{v.rollNo}</span>
                              <span className="text-[10px] text-slate-500">{v.certificateNo}</span>
                            </td>
                            <td className="p-3 font-semibold text-slate-900">
                              {v.name}
                              <span className="block text-[10px] font-normal text-slate-500">S/O {v.fatherName}</span>
                            </td>
                            <td className="p-3 text-slate-800">{v.courseName}</td>
                            <td className="p-3 font-mono">
                              <span className="font-bold text-emerald-600">{v.grade}</span> ({v.percentage}%)
                            </td>
                            <td className="p-3 text-right space-x-1">
                              <button
                                onClick={() => setEditingVer(v)}
                                className="p-1.5 text-brand-blue hover:bg-brand-blue/10 rounded cursor-pointer"
                                title="Edit Record"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={async () => {
                                  if (confirm(`Delete student record for ${v.rollNo}?`)) {
                                    await deleteVerification(v.rollNo);
                                  }
                                }}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                                title="Delete Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ==================== TAB 5: HOMEPAGE TEXT ==================== */}
              {activeTab === 'homepage' && (
                <form onSubmit={handleSaveHomepageForm} className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Manage Homepage Headlines & Statistics</h4>
                    <p className="text-slate-500 text-xs">Update your main website hero text, statistics numbers, and call-to-action buttons without touching code.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Hero Badge Text</label>
                      <input
                        type="text"
                        value={hpForm.heroBadge || ''}
                        onChange={(e) => setHpForm({ ...hpForm, heroBadge: e.target.value })}
                        className="w-full p-2.5 border rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Hero Main Title (Part 1)</label>
                      <input
                        type="text"
                        value={hpForm.heroTitle || ''}
                        onChange={(e) => setHpForm({ ...hpForm, heroTitle: e.target.value })}
                        className="w-full p-2.5 border rounded-lg bg-white font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Hero Title Highlight (Orange text)</label>
                      <input
                        type="text"
                        value={hpForm.heroSubtitle || ''}
                        onChange={(e) => setHpForm({ ...hpForm, heroSubtitle: e.target.value })}
                        className="w-full p-2.5 border rounded-lg bg-white font-bold text-brand-orange"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">CTA Primary Button Text</label>
                      <input
                        type="text"
                        value={hpForm.ctaPrimaryText || 'View All Courses'}
                        onChange={(e) => setHpForm({ ...hpForm, ctaPrimaryText: e.target.value })}
                        className="w-full p-2.5 border rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Hero Description Paragraph</label>
                    <textarea
                      rows={3}
                      value={hpForm.heroDescription || ''}
                      onChange={(e) => setHpForm({ ...hpForm, heroDescription: e.target.value })}
                      className="w-full p-2.5 border rounded-lg bg-white"
                    />
                  </div>

                  {/* Stats Cards */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                    <h5 className="font-bold text-slate-800 uppercase text-[10px] tracking-wide">Key Metrics & Trust Statistics</h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold">Graduates Trained</label>
                        <input
                          type="text"
                          value={hpForm.stats?.studentsCertified || '1,000+'}
                          onChange={(e) =>
                            setHpForm({ ...hpForm, stats: { ...hpForm.stats, studentsCertified: e.target.value } })
                          }
                          className="w-full p-2 border rounded font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold">Practical Labs</label>
                        <input
                          type="text"
                          value={hpForm.stats?.practicalLabs || '100%'}
                          onChange={(e) =>
                            setHpForm({ ...hpForm, stats: { ...hpForm.stats, practicalLabs: e.target.value } })
                          }
                          className="w-full p-2 border rounded font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold">Corporate Clients</label>
                        <input
                          type="text"
                          value={hpForm.stats?.corporateClients || '20+'}
                          onChange={(e) =>
                            setHpForm({ ...hpForm, stats: { ...hpForm.stats, corporateClients: e.target.value } })
                          }
                          className="w-full p-2 border rounded font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold">Experienced Faculty</label>
                        <input
                          type="text"
                          value={hpForm.stats?.experiencedFaculty || '15+'}
                          onChange={(e) =>
                            setHpForm({ ...hpForm, stats: { ...hpForm.stats, experiencedFaculty: e.target.value } })
                          }
                          className="w-full p-2 border rounded font-mono font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button type="submit" className="px-6 py-2.5 bg-brand-blue hover:bg-brand-blue-light text-white font-bold text-xs rounded-xl shadow">
                      Save Homepage Content
                    </button>
                  </div>
                </form>
              )}

              {/* ==================== TAB 6: CONTACT INFORMATION ==================== */}
              {activeTab === 'contact' && (
                <form onSubmit={handleSaveContactForm} className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Manage Official Contact Details & Social Links</h4>
                    <p className="text-slate-500 text-xs">Update your phone number, WhatsApp, email, physical location address, and social links across the website header and footer.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={contactForm.phone || ''}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full p-2.5 border rounded-lg bg-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">WhatsApp Number (e.g. 923016775690)</label>
                      <input
                        type="text"
                        value={contactForm.whatsapp || ''}
                        onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                        className="w-full p-2.5 border rounded-lg bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Official Email Address</label>
                      <input
                        type="email"
                        value={contactForm.email || ''}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full p-2.5 border rounded-lg bg-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Campus Physical Address</label>
                      <input
                        type="text"
                        value={contactForm.address || ''}
                        onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                        className="w-full p-2.5 border rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                    <h5 className="font-bold text-slate-800 uppercase text-[10px] tracking-wide">Social Media Handles</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold">Facebook URL</label>
                        <input
                          type="text"
                          value={contactForm.facebook || ''}
                          onChange={(e) => setContactForm({ ...contactForm, facebook: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold">Twitter URL</label>
                        <input
                          type="text"
                          value={contactForm.twitter || ''}
                          onChange={(e) => setContactForm({ ...contactForm, twitter: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold">LinkedIn URL</label>
                        <input
                          type="text"
                          value={contactForm.linkedin || ''}
                          onChange={(e) => setContactForm({ ...contactForm, linkedin: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold">YouTube URL</label>
                        <input
                          type="text"
                          value={contactForm.youtube || ''}
                          onChange={(e) => setContactForm({ ...contactForm, youtube: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button type="submit" className="px-6 py-2.5 bg-brand-blue hover:bg-brand-blue-light text-white font-bold text-xs rounded-xl shadow">
                      Save Contact Information
                    </button>
                  </div>
                </form>
              )}

              {/* ==================== TAB: MENTOR MANAGEMENT ==================== */}
              {activeTab === 'mentor' && (
                <form onSubmit={handleSaveMentorForm} className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Manage Javed Hattar Mentor Profile & Photograph</h4>
                      <p className="text-slate-500">Update photograph, bio quote, designation, badge, and core specializations.</p>
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue-light text-white font-bold rounded-xl shadow flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4" /> Save Mentor Profile
                    </button>
                  </div>

                  {mentorSaveMsg && (
                    <div className={`p-3 font-bold rounded-lg ${mentorSaveMsg.includes('Failed') ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
                      {mentorSaveMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Photo Upload & Preview Card */}
                    <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-slate-200 space-y-4">
                      <label className="block font-bold text-slate-800">Mentor Official Photograph</label>
                      
                      <div className="w-full h-64 rounded-xl bg-slate-900 border border-slate-200 overflow-hidden flex items-center justify-center relative">
                        <img
                          src={(mentorForm.photoUrl && mentorForm.photoUrl !== '/assets/mentor-javed-hattar.png') ? mentorForm.photoUrl : mentorPhoto}
                          alt="Mentor Preview"
                          className="w-full h-full object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-slate-600">Upload New Photo File</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0], (url) => setMentorForm({ ...mentorForm, photoUrl: url }));
                            }
                          }}
                          className="w-full text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-bold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Image Asset Path / URL</label>
                        <input
                          type="text"
                          value={mentorForm.photoUrl || ''}
                          onChange={(e) => setMentorForm({ ...mentorForm, photoUrl: e.target.value })}
                          placeholder="/assets/mentor-javed-hattar.png"
                          className="w-full p-2 border rounded bg-slate-50"
                        />
                      </div>
                    </div>

                    {/* Main Mentor Info Fields */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Mentor Name *</label>
                          <input
                            type="text"
                            required
                            value={mentorForm.name || ''}
                            onChange={(e) => setMentorForm({ ...mentorForm, name: e.target.value })}
                            className="w-full p-2.5 border rounded-lg bg-white"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Title / Designation *</label>
                          <input
                            type="text"
                            required
                            value={mentorForm.title || ''}
                            onChange={(e) => setMentorForm({ ...mentorForm, title: e.target.value })}
                            className="w-full p-2.5 border rounded-lg bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Badge Text</label>
                          <input
                            type="text"
                            value={mentorForm.badgeText || ''}
                            onChange={(e) => setMentorForm({ ...mentorForm, badgeText: e.target.value })}
                            placeholder="Lead Faculty & Founder"
                            className="w-full p-2.5 border rounded-lg bg-white"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Tagline / Subtitle</label>
                          <input
                            type="text"
                            value={mentorForm.subtitle || ''}
                            onChange={(e) => setMentorForm({ ...mentorForm, subtitle: e.target.value })}
                            className="w-full p-2.5 border rounded-lg bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Mentor Vision Statement / Quote</label>
                        <textarea
                          rows={3}
                          value={mentorForm.quote || ''}
                          onChange={(e) => setMentorForm({ ...mentorForm, quote: e.target.value })}
                          className="w-full p-2.5 border rounded-lg bg-white"
                        />
                      </div>

                      {/* Mentor Specializations */}
                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center">
                          <label className="font-bold text-slate-800 uppercase tracking-wide">Core Specializations ({mentorForm.expertise?.length || 0})</label>
                          <button
                            type="button"
                            onClick={() => {
                              const current = mentorForm.expertise || [];
                              setMentorForm({
                                ...mentorForm,
                                expertise: [
                                  ...current,
                                  { title: 'New Skill', description: 'Skill description', badge: 'Popular' }
                                ]
                              });
                            }}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] rounded-md flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add Specialization
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {mentorForm.expertise?.map((exp, idx) => (
                            <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2 relative group">
                              <button
                                type="button"
                                onClick={() => {
                                  const current = [...(mentorForm.expertise || [])];
                                  current.splice(idx, 1);
                                  setMentorForm({ ...mentorForm, expertise: current });
                                }}
                                className="absolute top-2 right-2 text-slate-400 hover:text-red-600 p-1 rounded"
                                title="Remove Specialization"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>

                              <input
                                type="text"
                                value={exp.title}
                                onChange={(e) => {
                                  const current = [...(mentorForm.expertise || [])];
                                  current[idx] = { ...current[idx], title: e.target.value };
                                  setMentorForm({ ...mentorForm, expertise: current });
                                }}
                                placeholder="Specialization Title"
                                className="w-full p-1.5 border rounded font-bold pr-8"
                              />

                              <textarea
                                rows={2}
                                value={exp.description}
                                onChange={(e) => {
                                  const current = [...(mentorForm.expertise || [])];
                                  current[idx] = { ...current[idx], description: e.target.value };
                                  setMentorForm({ ...mentorForm, expertise: current });
                                }}
                                placeholder="Description"
                                className="w-full p-1.5 border rounded"
                              />

                              <input
                                type="text"
                                value={exp.badge}
                                onChange={(e) => {
                                  const current = [...(mentorForm.expertise || [])];
                                  current[idx] = { ...current[idx], badge: e.target.value };
                                  setMentorForm({ ...mentorForm, expertise: current });
                                }}
                                placeholder="Badge (e.g. High Demand)"
                                className="w-full p-1.5 border rounded text-[11px]"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* ==================== TAB 7: LEADS & ADMISSIONS ==================== */}
              {activeTab === 'admissions' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <span>Online Enrolment Applications</span>
                        <span className="px-2 py-0.5 bg-brand-blue/10 text-brand-blue font-mono text-xs rounded-full">
                          {data.admissions?.length || 0} Total
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500">
                        Applications submitted by students via website forms. Each submission triggers an automatic email to <strong>futuregatesitcenter@gmail.com</strong>.
                      </p>
                    </div>

                    <div className="w-full sm:w-64">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={leadSearch}
                          onChange={(e) => setLeadSearch(e.target.value)}
                          placeholder="Search applicant name, phone, course..."
                          className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {(!data.admissions || data.admissions.length === 0) ? (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-500 text-xs space-y-2">
                      <Users className="w-8 h-8 mx-auto text-slate-400" />
                      <p className="font-bold text-slate-700">No online course applications received yet.</p>
                      <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                        When visitors fill out the admission form on the website, their details and email dispatch status will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {data.admissions
                        .filter((adm) => {
                          if (!leadSearch.trim()) return true;
                          const q = leadSearch.toLowerCase();
                          return (
                            adm.fullName?.toLowerCase().includes(q) ||
                            adm.phone?.toLowerCase().includes(q) ||
                            adm.whatsapp?.toLowerCase().includes(q) ||
                            adm.courseTitle?.toLowerCase().includes(q) ||
                            adm.email?.toLowerCase().includes(q)
                          );
                        })
                        .map((adm) => {
                          const resendKey = `admission-${adm.id}`;
                          const isResending = Boolean(resendingMap[resendKey]);
                          const resendStatus = resendStatusMap[resendKey];

                          return (
                            <div key={adm.id} className="p-4 bg-white rounded-2xl border border-slate-200 text-xs space-y-3 shadow-sm hover:border-brand-blue/30 transition-all">
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-2.5">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-900 text-sm">{adm.fullName}</span>
                                    {adm.fatherName && (
                                      <span className="text-[11px] text-slate-500">S/O {adm.fatherName}</span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    Submitted: {new Date(adm.submittedAt).toLocaleString()}
                                  </span>
                                </div>

                                {/* Email Status Badge */}
                                <div className="flex items-center gap-2 flex-wrap">
                                  {adm.emailStatus === 'sent' && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[11px] rounded-full">
                                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                      <span>Email Sent</span>
                                      {adm.emailDispatchedAt && (
                                        <span className="text-[9px] text-emerald-600 font-mono">
                                          ({new Date(adm.emailDispatchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                                        </span>
                                      )}
                                    </span>
                                  )}

                                  {adm.emailStatus === 'failed' && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 border border-red-200 text-red-700 font-bold text-[11px] rounded-full" title={adm.emailError || 'Email dispatch failed'}>
                                      <AlertCircle className="w-3 h-3 text-red-600" />
                                      <span>Email Failed</span>
                                    </span>
                                  )}

                                  {(!adm.emailStatus || adm.emailStatus === 'pending') && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 font-bold text-[11px] rounded-full">
                                      <RefreshCw className="w-3 h-3 text-amber-600 animate-spin" />
                                      <span>Email Pending</span>
                                    </span>
                                  )}

                                  <button
                                    onClick={async () => {
                                      if (confirm(`Delete application for ${adm.fullName}?`)) {
                                        if (adm.id) await deleteAdmission(adm.id);
                                      }
                                    }}
                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                    title="Delete Application"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl">
                                <div>
                                  <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Course Applied</span>
                                  <span className="font-bold text-brand-blue">{adm.courseTitle}</span>
                                </div>

                                <div>
                                  <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Contact Phone / WhatsApp</span>
                                  <div className="font-mono text-slate-800 space-x-1">
                                    <span>{adm.phone}</span>
                                    {adm.whatsapp && adm.whatsapp !== adm.phone && (
                                      <span className="text-slate-500">(WA: {adm.whatsapp})</span>
                                    )}
                                  </div>
                                </div>

                                <div>
                                  <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Applicant Email</span>
                                  <span className="font-mono text-slate-700">{adm.email || 'N/A'}</span>
                                </div>
                              </div>

                              {adm.address && (
                                <p className="text-slate-600 text-xs">
                                  <strong>Address:</strong> {adm.address}
                                </p>
                              )}

                              {adm.message && (
                                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-700 text-xs italic">
                                  "{adm.message}"
                                </div>
                              )}

                              {/* Email Error Notice if Failed */}
                              {adm.emailStatus === 'failed' && adm.emailError && (
                                <div className="p-2 bg-red-50 border border-red-100 rounded-lg text-red-700 text-[11px] flex items-center justify-between gap-2">
                                  <span className="truncate"><strong>Failure Reason:</strong> {adm.emailError}</span>
                                </div>
                              )}

                              {/* Action Buttons */}
                              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                                <div className="flex items-center gap-2">
                                  {adm.whatsapp && (
                                    <a
                                      href={`https://wa.me/${adm.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(adm.fullName)}%2C%20regarding%20your%20admission%20application%20at%20Future%20Gates%20IT%20Center...`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
                                    >
                                      <Send className="w-3.5 h-3.5" /> WhatsApp Applicant
                                    </a>
                                  )}

                                  {adm.email && (
                                    <a
                                      href={`mailto:${adm.email}?subject=Admission Application - Future Gates IT Center&body=Dear ${encodeURIComponent(adm.fullName)},%0D%0A%0D%0AThank you for applying for the ${encodeURIComponent(adm.courseTitle)} course at Future Gates IT Center.`}
                                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all"
                                    >
                                      <Mail className="w-3.5 h-3.5" /> Email Applicant
                                    </a>
                                  )}
                                </div>

                                <div className="flex items-center gap-2">
                                  {resendStatus && (
                                    <span className={`text-[11px] font-bold ${resendStatus.success ? 'text-emerald-600' : 'text-red-600'}`}>
                                      {resendStatus.msg}
                                    </span>
                                  )}

                                  <button
                                    onClick={() => handleResend('admission', adm.id)}
                                    disabled={isResending}
                                    className="px-3 py-1.5 bg-brand-blue hover:bg-brand-blue-dark disabled:opacity-50 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                                  >
                                    <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                                    {isResending ? 'Dispatching...' : 'Resend Email to Official Inbox'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}

              {/* ==================== TAB 8: CONTACT INQUIRIES & MESSAGES ==================== */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <span>Website Contact Inquiries</span>
                        <span className="px-2 py-0.5 bg-brand-blue/10 text-brand-blue font-mono text-xs rounded-full">
                          {data.inquiries?.length || 0} Total
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500">
                        Inquiries submitted through the Contact Us form. Automatically dispatched to <strong>futuregatesitcenter@gmail.com</strong>.
                      </p>
                    </div>

                    <div className="w-full sm:w-64">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={leadSearch}
                          onChange={(e) => setLeadSearch(e.target.value)}
                          placeholder="Search sender, phone, message..."
                          className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {(!data.inquiries || data.inquiries.length === 0) ? (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-500 text-xs space-y-2">
                      <MessageSquare className="w-8 h-8 mx-auto text-slate-400" />
                      <p className="font-bold text-slate-700">No contact messages received yet.</p>
                      <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                        Inquiries sent from the Contact page will be recorded here with delivery receipts.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {data.inquiries
                        .filter((inq) => {
                          if (!leadSearch.trim()) return true;
                          const q = leadSearch.toLowerCase();
                          return (
                            inq.name?.toLowerCase().includes(q) ||
                            inq.phone?.toLowerCase().includes(q) ||
                            inq.email?.toLowerCase().includes(q) ||
                            inq.subject?.toLowerCase().includes(q) ||
                            inq.message?.toLowerCase().includes(q)
                          );
                        })
                        .map((inq) => {
                          const resendKey = `inquiry-${inq.id}`;
                          const isResending = Boolean(resendingMap[resendKey]);
                          const resendStatus = resendStatusMap[resendKey];

                          return (
                            <div key={inq.id} className="p-4 bg-white rounded-2xl border border-slate-200 text-xs space-y-3 shadow-sm hover:border-brand-blue/30 transition-all">
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-2.5">
                                <div>
                                  <span className="font-bold text-slate-900 text-sm">{inq.name}</span>
                                  <span className="text-[10px] text-slate-400 font-mono block">
                                    Received: {new Date(inq.submittedAt).toLocaleString()}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">
                                  {inq.emailStatus === 'sent' && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[11px] rounded-full">
                                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                      <span>Email Sent</span>
                                      {inq.emailDispatchedAt && (
                                        <span className="text-[9px] text-emerald-600 font-mono">
                                          ({new Date(inq.emailDispatchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                                        </span>
                                      )}
                                    </span>
                                  )}

                                  {inq.emailStatus === 'failed' && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 border border-red-200 text-red-700 font-bold text-[11px] rounded-full" title={inq.emailError || 'Email dispatch failed'}>
                                      <AlertCircle className="w-3 h-3 text-red-600" />
                                      <span>Email Failed</span>
                                    </span>
                                  )}

                                  {(!inq.emailStatus || inq.emailStatus === 'pending') && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 font-bold text-[11px] rounded-full">
                                      <RefreshCw className="w-3 h-3 text-amber-600 animate-spin" />
                                      <span>Email Pending</span>
                                    </span>
                                  )}

                                  <button
                                    onClick={async () => {
                                      if (confirm(`Delete message from ${inq.name}?`)) {
                                        if (inq.id) await deleteInquiry(inq.id);
                                      }
                                    }}
                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                    title="Delete Message"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl">
                                <div>
                                  <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Subject</span>
                                  <span className="font-bold text-brand-blue">{inq.subject || 'General Inquiry'}</span>
                                </div>

                                <div>
                                  <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Phone</span>
                                  <span className="font-mono text-slate-800">{inq.phone}</span>
                                </div>

                                <div>
                                  <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Email</span>
                                  <span className="font-mono text-slate-700">{inq.email || 'N/A'}</span>
                                </div>
                              </div>

                              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 text-xs whitespace-pre-wrap">
                                {inq.message}
                              </div>

                              {inq.emailStatus === 'failed' && inq.emailError && (
                                <div className="p-2 bg-red-50 border border-red-100 rounded-lg text-red-700 text-[11px]">
                                  <strong>Failure Reason:</strong> {inq.emailError}
                                </div>
                              )}

                              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                                <div className="flex items-center gap-2">
                                  {inq.phone && (
                                    <a
                                      href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.name)}%2C%20regarding%20your%20inquiry%20at%20Future%20Gates%20IT%20Center...`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
                                    >
                                      <Send className="w-3.5 h-3.5" /> WhatsApp Reply
                                    </a>
                                  )}

                                  {inq.email && (
                                    <a
                                      href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject || 'Inquiry')} - Future Gates IT Center`}
                                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all"
                                    >
                                      <Mail className="w-3.5 h-3.5" /> Email Reply
                                    </a>
                                  )}
                                </div>

                                <div className="flex items-center gap-2">
                                  {resendStatus && (
                                    <span className={`text-[11px] font-bold ${resendStatus.success ? 'text-emerald-600' : 'text-red-600'}`}>
                                      {resendStatus.msg}
                                    </span>
                                  )}

                                  <button
                                    onClick={() => handleResend('inquiry', inq.id)}
                                    disabled={isResending}
                                    className="px-3 py-1.5 bg-brand-blue hover:bg-brand-blue-dark disabled:opacity-50 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                                  >
                                    <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                                    {isResending ? 'Dispatching...' : 'Resend Email to Official Inbox'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}

              {/* ==================== TAB 9: EMAIL ALERTS & SMTP CONFIGURATION ==================== */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <span>Email Notifications & SMTP Server Status</span>
                      </h4>
                      <p className="text-xs text-slate-500">
                        Automatic notifications for Contact Form submissions and Online Course Admissions.
                      </p>
                    </div>

                    <button
                      onClick={fetchSmtpStatus}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Refresh Status
                    </button>
                  </div>

                  {/* Configuration Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">SMTP Server Status</span>
                        {smtpStatus?.configured ? (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Configured
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span> Standby Mode
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700 font-mono">
                        Host: <strong>{smtpStatus?.host || 'smtp.hostinger.com'}</strong>
                      </p>
                      <p className="text-xs text-slate-700 font-mono">
                        Port: <strong>{smtpStatus?.port || 465}</strong> (SSL/TLS: {smtpStatus?.secure ? 'Yes' : 'Auto'})
                      </p>
                      <p className="text-xs text-slate-700 font-mono">
                        Auth User: <strong>{smtpStatus?.user || 'futuregatesitcenter@gmail.com'}</strong>
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Notification Target</span>
                      <p className="text-xs text-slate-900 font-bold font-mono break-all">
                        {smtpStatus?.destinationEmail || 'futuregatesitcenter@gmail.com'}
                      </p>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        All online admission forms and contact inquiries are sent to this official destination mailbox.
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Submission Dispatch Stats</span>
                      <div className="grid grid-cols-2 gap-2 text-center pt-1">
                        <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-100">
                          <span className="text-base font-extrabold text-emerald-700 block font-mono">
                            {(data.admissions?.filter((a) => a.emailStatus === 'sent').length || 0) +
                             (data.inquiries?.filter((i) => i.emailStatus === 'sent').length || 0)}
                          </span>
                          <span className="text-[10px] text-emerald-800 font-bold">Emails Sent</span>
                        </div>
                        <div className="bg-slate-100 p-2 rounded-xl border border-slate-200">
                          <span className="text-base font-extrabold text-slate-700 block font-mono">
                            {(data.admissions?.length || 0) + (data.inquiries?.length || 0)}
                          </span>
                          <span className="text-[10px] text-slate-600 font-bold">Total Inbound</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Test Email Tool */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                      <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                        <Send className="w-4 h-4 text-brand-blue" />
                        <span>Send Test Email Notification</span>
                      </h5>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Verify SMTP connectivity and mailbox authentication by sending a live test notification.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Destination Test Email</label>
                        <input
                          type="email"
                          value={testRecipient}
                          onChange={(e) => setTestRecipient(e.target.value)}
                          placeholder="futuregatesitcenter@gmail.com"
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                        />
                      </div>

                      <div className="self-end">
                        <button
                          onClick={handleTestSmtp}
                          disabled={testingSmtp || !testRecipient.trim()}
                          className="px-5 py-2 bg-brand-blue hover:bg-brand-blue-dark disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer h-[38px]"
                        >
                          <Send className={`w-3.5 h-3.5 ${testingSmtp ? 'animate-spin' : ''}`} />
                          <span>{testingSmtp ? 'Testing Handshake...' : 'Send Test Notification'}</span>
                        </button>
                      </div>
                    </div>

                    {testEmailResult && (
                      <div
                        className={`p-3.5 rounded-xl border text-xs font-semibold flex items-start gap-2.5 ${
                          testEmailResult.success
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                        }`}
                      >
                        {testEmailResult.success ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="font-bold">{testEmailResult.success ? 'SMTP Connection Successful!' : 'SMTP Connection Failed'}</p>
                          <p className="text-[11px] mt-0.5 opacity-90">{testEmailResult.message}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Production SMTP Setup Guidelines for Hostinger / cPanel */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs space-y-3 text-slate-700">
                    <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      SMTP Configuration Reference (Production Environment)
                    </h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      To enable live SMTP delivery in production on your Hostinger/cPanel server or Cloud container, configure these server environment variables in your server configuration or <code>.env</code> file:
                    </p>
                    <div className="bg-slate-900 text-slate-100 p-3.5 rounded-xl font-mono text-[11px] space-y-1 overflow-x-auto">
                      <p className="text-emerald-400"># Hostinger / Standard SMTP Server Settings</p>
                      <p>SMTP_HOST=smtp.hostinger.com</p>
                      <p>SMTP_PORT=465</p>
                      <p>SMTP_SECURE=true</p>
                      <p>SMTP_USER=futuregatesitcenter@gmail.com</p>
                      <p>SMTP_PASSWORD=your_email_password_here</p>
                      <p>EMAIL_TO=futuregatesitcenter@gmail.com</p>
                      <p>EMAIL_FROM="Future Gates IT Center" &lt;futuregatesitcenter@gmail.com&gt;</p>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Even if SMTP credentials are being configured, every admission and contact message is securely and permanently saved to the database.
                    </p>
                  </div>
                </div>
              )}

              {/* ==================== WEBSITE SETTINGS & BRAND CUSTOMIZATION ==================== */}
              {activeTab === 'siteSettings' && (
                <SiteCustomizationPanel />
              )}

              {/* ==================== TAB 8: SECURITY ==================== */}
              {activeTab === 'settings' && (
                <form onSubmit={handleChangePassword} className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 max-w-md mx-auto text-xs">
                  <div className="text-center space-y-1">
                    <div className="w-10 h-10 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center mx-auto">
                      <Key className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">Change Master Password</h4>
                    <p className="text-slate-500 text-[11px]">Update the master login password for your Admin Panel.</p>
                  </div>

                  {passMsg && (
                    <div
                      className={`p-3 text-xs font-bold rounded-lg ${
                        passMsg.startsWith('Error') ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {passMsg}
                    </div>
                  )}

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      required
                      value={currPass}
                      onChange={(e) => setCurrPass(e.target.value)}
                      className="w-full p-2.5 border rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">New Password (min 6 chars)</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="w-full p-2.5 border rounded-lg bg-white"
                    />
                  </div>

                  <button type="submit" className="w-full py-2.5 bg-brand-blue hover:bg-brand-blue-light text-white font-bold text-xs rounded-xl shadow">
                    Update Password
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
