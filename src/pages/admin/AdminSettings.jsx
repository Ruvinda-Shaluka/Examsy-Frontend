import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from "../../layouts/AdminLayout";
import { adminService } from '../../services/adminService';
import CustomAlert from '../../components/common/CustomAlert';
import { Mail, ShieldAlert, Save, Camera, User, Lock, BadgeCheck, BellRing, Server } from 'lucide-react';

const AdminSettings = () => {
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [alert, setAlert] = useState(null);

    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const [profile, setProfile] = useState({
        id: '',
        fullName: '',
        roleLevel: '',
        profilePictureUrl: null
    });

    const [settings, setSettings] = useState({
        reportAlerts: true,
        systemLogs: false,
        maintenanceMode: false
    });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await adminService.getProfile();
                setProfile({
                    id: data.id,
                    fullName: data.fullName || '',
                    roleLevel: data.roleLevel || 'SYSTEM_ADMIN',
                    profilePictureUrl: data.profilePictureUrl || null
                });
            } catch (error) {
                setAlert({ type: 'error', title: 'Error', message: 'Failed to load profile.' });
            } finally {
                setIsLoading(false);
            }
        };
        loadProfile();
    }, []);

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5242880) {
                setAlert({ type: 'error', title: 'File Too Large', message: 'Image must be under 5MB.' });
                fileInputRef.current.value = ""; return;
            }
            setSelectedImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreviewUrl(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST', body: formData
        });
        const data = await response.json();
        if (data.secure_url) return data.secure_url;
        throw new Error("Upload failed");
    };

    const handleSave = async () => {
        setIsSaving(true);
        let finalImageUrl = profile.profilePictureUrl;

        try {
            if (selectedImageFile) {
                finalImageUrl = await uploadToCloudinary(selectedImageFile);
            }

            await adminService.updateProfile({
                fullName: profile.fullName,
                profilePictureUrl: finalImageUrl
            });

            setProfile(prev => ({ ...prev, profilePictureUrl: finalImageUrl }));
            setSelectedImageFile(null);
            setAlert({ type: 'success', title: 'Saved!', message: 'Admin profile updated successfully.' });

        } catch (error) {
            setAlert({ type: 'error', title: 'Save Failed', message: 'Could not update profile.' });
        } finally {
            setIsSaving(false);
        }
    };

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (isLoading) return <AdminLayout><div className="p-10 text-center font-bold">Loading configuration...</div></AdminLayout>;

    const displayImage = imagePreviewUrl || profile.profilePictureUrl;
    const initial = profile.fullName ? profile.fullName.charAt(0).toUpperCase() : 'A';

    return (
        <AdminLayout>
            {alert && <CustomAlert type={alert.type} title={alert.title} message={alert.message} onClose={() => setAlert(null)} />}

            <div className="max-w-4xl mx-auto space-y-8 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-examsy-text tracking-tight">System Configuration</h1>
                        <p className="text-examsy-muted font-bold text-sm mt-1">Manage your administrator profile and system alerts.</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full sm:w-auto bg-examsy-primary text-white px-8 py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                        <Save size={18} /> {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

                {/* PROFILE SECTION */}
                <section className="bg-examsy-surface rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-8 md:p-10 shadow-sm transition-colors duration-500">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        <div className="flex flex-col items-center gap-4 mx-auto lg:mx-0">
                            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                                <div className="w-40 h-40 rounded-[2.5rem] bg-examsy-primary/10 border-4 border-examsy-surface shadow-2xl overflow-hidden flex items-center justify-center text-examsy-primary text-5xl font-black transition-all group-hover:border-examsy-primary/30">
                                    {displayImage ? (
                                        <img src={displayImage} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="uppercase">{initial}</span>
                                    )}
                                </div>
                                <div className="absolute -bottom-2 -right-2 p-3 bg-examsy-primary text-white rounded-2xl shadow-xl scale-90 group-hover:scale-100 group-hover:rotate-12 transition-all duration-300">
                                    <Camera size={20} />
                                </div>
                                <input type="file" ref={fileInputRef} onChange={handleImageSelect} className="hidden" accept="image/*" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-examsy-muted">Admin Avatar</p>
                        </div>

                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-examsy-muted uppercase tracking-widest ml-1">Administrator Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted group-focus-within:text-examsy-primary transition-colors" size={18} />
                                    <input
                                        value={profile.fullName}
                                        onChange={e => setProfile({...profile, fullName: e.target.value})}
                                        className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-examsy-text outline-none focus:border-examsy-primary focus:ring-4 focus:ring-examsy-primary/10 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-examsy-muted uppercase tracking-widest ml-1">System Role</label>
                                <div className="relative">
                                    <BadgeCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
                                    <input
                                        value={profile.roleLevel.replace('_', ' ')}
                                        readOnly
                                        className="w-full bg-emerald-500/5 border border-emerald-500/20 rounded-2xl py-3.5 pl-12 pr-4 font-black text-emerald-600 outline-none cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <label className="text-[10px] font-black text-examsy-muted uppercase tracking-widest ml-1">Admin ID</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted" size={18} />
                                    <input
                                        value={`AD-${String(profile.id).padStart(5, '0')}`}
                                        readOnly
                                        className="w-full bg-examsy-bg/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-examsy-muted outline-none cursor-not-allowed font-mono tracking-wider"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SYSTEM PREFERENCES (Visual Client-Side Only per request) */}
                <section className="bg-examsy-surface rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-8 md:p-10 shadow-sm transition-colors duration-500">
                    <h2 className="text-2xl font-black text-examsy-text mb-8 flex items-center gap-3">
                        <Server size={24} className="text-examsy-primary" />
                        System Preferences
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-6 bg-examsy-bg rounded-3xl border border-zinc-200 dark:border-zinc-800/50 hover:border-examsy-primary/30 transition-colors">
                            <div className="flex items-center gap-5">
                                <div className="p-3 bg-red-500/10 text-red-500 rounded-2xl"><ShieldAlert size={22} /></div>
                                <div>
                                    <p className="font-black text-examsy-text text-sm uppercase tracking-wider">Report Alerts</p>
                                    <p className="text-xs font-bold text-examsy-muted leading-snug mt-0.5">Immediate notifications for high-priority class reports.</p>
                                </div>
                            </div>
                            <button onClick={() => toggleSetting('reportAlerts')} className={`shrink-0 w-14 h-8 rounded-full transition-all flex items-center px-1 shadow-inner ${settings.reportAlerts ? 'bg-examsy-primary' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
                                <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${settings.reportAlerts ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                        {/* More visual toggles can stay here... */}
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
};

export default AdminSettings;