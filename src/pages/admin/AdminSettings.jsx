import React, { useState, useRef } from 'react';
import AdminLayout from "../../layouts/AdminLayout";
import { ADMIN_PROFILE } from '../../data/AdminMockData';
import {
    Mail,
    ShieldAlert,
    Save,
    Camera,
    User,
    Lock,
    BadgeCheck,
    BellRing,
    Server
} from 'lucide-react';

const AdminSettings = () => {
    // Initialize state from Mock Data
    const [profile, setProfile] = useState(ADMIN_PROFILE);

    // Admin specific settings state
    const [settings, setSettings] = useState({
        reportAlerts: true,  // Get notified when students report classes
        systemLogs: false,   // Daily email of system health
        maintenanceMode: false // Toggle for system maintenance (visual only for now)
    });

    const fileInputRef = useRef(null);

    // Handle Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile({ ...profile, avatar: null, profileImage: reader.result }); // Assuming structure update
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // Future backend: POST/PATCH to /api/admin/profile
        alert("Admin configuration saved successfully.");
    };

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-8 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* --- HEADER & SAVE --- */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-examsy-text tracking-tight">System Configuration</h1>
                        <p className="text-examsy-muted font-bold text-sm mt-1">Manage your administrator profile and system alerts.</p>
                    </div>
                    <button
                        onClick={handleSave}
                        className="w-full sm:w-auto bg-examsy-primary text-white px-8 py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        <Save size={18} /> Save Changes
                    </button>
                </div>

                {/* --- 1. PROFILE SECTION --- */}
                <section className="bg-examsy-surface rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-8 md:p-10 shadow-sm transition-colors duration-500">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">

                        {/* Photo Upload Area */}
                        <div className="flex flex-col items-center gap-4 mx-auto lg:mx-0">
                            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                                <div className="w-40 h-40 rounded-[2.5rem] bg-examsy-primary/10 border-4 border-examsy-surface shadow-2xl overflow-hidden flex items-center justify-center text-examsy-primary text-5xl font-black transition-all group-hover:border-examsy-primary/30">
                                    {profile.profileImage ? (
                                        <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        // Render Initials or Icon if no image
                                        <span className="uppercase">{typeof profile.avatar === 'string' ? profile.avatar : <User size={48} />}</span>
                                    )}
                                </div>
                                <div className="absolute -bottom-2 -right-2 p-3 bg-examsy-primary text-white rounded-2xl shadow-xl scale-90 group-hover:scale-100 group-hover:rotate-12 transition-all duration-300">
                                    <Camera size={20} />
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-examsy-muted">Admin Avatar</p>
                        </div>

                        {/* Text Fields */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">

                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-examsy-muted uppercase tracking-widest ml-1">Administrator Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted group-focus-within:text-examsy-primary transition-colors" size={18} />
                                    <input
                                        value={profile.name}
                                        onChange={e => setProfile({...profile, name: e.target.value})}
                                        className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-examsy-text outline-none focus:border-examsy-primary focus:ring-4 focus:ring-examsy-primary/10 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Role (Read Only) */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-examsy-muted uppercase tracking-widest ml-1">System Role</label>
                                <div className="relative">
                                    <BadgeCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
                                    <input
                                        value={profile.role}
                                        readOnly
                                        className="w-full bg-emerald-500/5 border border-emerald-500/20 rounded-2xl py-3.5 pl-12 pr-4 font-black text-emerald-600 outline-none cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Admin ID (Read Only) */}
                            <div className="space-y-2 sm:col-span-2">
                                <label className="text-[10px] font-black text-examsy-muted uppercase tracking-widest ml-1">Admin ID</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted" size={18} />
                                    <input
                                        value={profile.id}
                                        readOnly
                                        className="w-full bg-examsy-bg/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-examsy-muted outline-none cursor-not-allowed font-mono tracking-wider"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 2. SYSTEM PREFERENCES SECTION --- */}
                <section className="bg-examsy-surface rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-8 md:p-10 shadow-sm transition-colors duration-500">
                    <h2 className="text-2xl font-black text-examsy-text mb-8 flex items-center gap-3">
                        <Server size={24} className="text-examsy-primary" />
                        System Preferences
                    </h2>

                    <div className="space-y-4">
                        {/* Preference Items */}
                        <div className="flex justify-between items-center p-6 bg-examsy-bg rounded-3xl border border-zinc-200 dark:border-zinc-800/50 hover:border-examsy-primary/30 transition-colors">
                            <div className="flex items-center gap-5">
                                <div className="p-3 bg-red-500/10 text-red-500 rounded-2xl">
                                    <ShieldAlert size={22} />
                                </div>
                                <div>
                                    <p className="font-black text-examsy-text text-sm uppercase tracking-wider">Report Alerts</p>
                                    <p className="text-xs font-bold text-examsy-muted leading-snug mt-0.5">Immediate notifications for high-priority class reports.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleSetting('reportAlerts')}
                                className={`shrink-0 w-14 h-8 rounded-full transition-all flex items-center px-1 shadow-inner ${settings.reportAlerts ? 'bg-examsy-primary' : 'bg-zinc-300 dark:bg-zinc-700'}`}
                            >
                                <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${settings.reportAlerts ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        <div className="flex justify-between items-center p-6 bg-examsy-bg rounded-3xl border border-zinc-200 dark:border-zinc-800/50 hover:border-examsy-primary/30 transition-colors">
                            <div className="flex items-center gap-5">
                                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
                                    <Mail size={22} />
                                </div>
                                <div>
                                    <p className="font-black text-examsy-text text-sm uppercase tracking-wider">System Log Digest</p>
                                    <p className="text-xs font-bold text-examsy-muted leading-snug mt-0.5">Receive a daily email summary of system performance and errors.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleSetting('systemLogs')}
                                className={`shrink-0 w-14 h-8 rounded-full transition-all flex items-center px-1 shadow-inner ${settings.systemLogs ? 'bg-examsy-primary' : 'bg-zinc-300 dark:bg-zinc-700'}`}
                            >
                                <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${settings.systemLogs ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        <div className="flex justify-between items-center p-6 bg-examsy-bg rounded-3xl border border-zinc-200 dark:border-zinc-800/50 hover:border-examsy-primary/30 transition-colors">
                            <div className="flex items-center gap-5">
                                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl">
                                    <BellRing size={22} />
                                </div>
                                <div>
                                    <p className="font-black text-examsy-text text-sm uppercase tracking-wider">Maintenance Mode</p>
                                    <p className="text-xs font-bold text-examsy-muted leading-snug mt-0.5">Prevent new user logins during scheduled updates (Safety Lock).</p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleSetting('maintenanceMode')}
                                className={`shrink-0 w-14 h-8 rounded-full transition-all flex items-center px-1 shadow-inner ${settings.maintenanceMode ? 'bg-amber-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
                            >
                                <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>

                    </div>
                </section>
            </div>
        </AdminLayout>
    );
};

export default AdminSettings;