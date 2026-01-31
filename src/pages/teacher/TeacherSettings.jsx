import React, { useState, useRef } from 'react';
import TeacherLayout from '../../layouts/TeacherLayout';
import { MOCK_TEACHER } from '../../data/TeacherMockData';
import { Mail, Smartphone, Shield, Save, Camera, MapPin, User } from 'lucide-react';

const TeacherSettings = () => {
    const [profile, setProfile] = useState(MOCK_TEACHER);
    const [notifs, setNotifs] = useState({ email: true, mobile: false, security: true });
    const fileInputRef = useRef(null);

    // Handle Local Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile({ ...profile, profileImage: reader.result, avatar: null });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // Future backend: POST/PATCH profile to /api/teacher/profile
        alert("Settings and Profile Photo saved to database!");
    };

    return (
        <TeacherLayout>
            <div className="max-w-4xl mx-auto space-y-8 pb-10 animate-fade-in">

                {/* --- PROFILE SECTION --- */}
                <section className="bg-examsy-surface rounded-[40px] border border-zinc-200 dark:border-zinc-800 p-10 shadow-sm transition-colors duration-500">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                        <div>
                            <h2 className="text-2xl font-black text-examsy-text">Teacher Profile</h2>
                            <p className="text-examsy-muted font-bold text-sm">Update your identity and professional details.</p>
                        </div>
                        <button onClick={handleSave} className="w-full sm:w-auto bg-examsy-primary text-white px-8 py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-all">
                            <Save size={18} /> Save Changes
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Photo Upload Area */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative group">
                                <div className="w-40 h-40 rounded-[48px] bg-examsy-primary/10 border-4 border-examsy-surface shadow-2xl overflow-hidden flex items-center justify-center text-examsy-primary text-5xl font-black">
                                    {profile.profileImage ? (
                                        <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        profile.avatar || <User size={48} />
                                    )}
                                </div>
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="absolute -bottom-2 -right-2 p-4 bg-examsy-primary text-white rounded-2xl shadow-xl hover:scale-110 transition-transform z-10"
                                >
                                    <Camera size={20} />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-examsy-muted">JPG or PNG (Max 2MB)</p>
                        </div>

                        {/* Text Fields */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-examsy-muted uppercase tracking-[0.2em] ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted" size={16} />
                                    <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-4 font-bold text-examsy-text outline-none focus:border-examsy-primary" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-examsy-muted uppercase tracking-[0.2em] ml-1">Specialization</label>
                                <input value={profile.specialization} onChange={e => setProfile({...profile, specialization: e.target.value})} className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3 px-4 font-bold text-examsy-text outline-none focus:border-examsy-primary" />
                            </div>
                            <div className="space-y-1.5 sm:col-span-2">
                                <label className="text-[10px] font-black text-examsy-muted uppercase tracking-[0.2em] ml-1">Office Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted" size={16} />
                                    <input value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-4 font-bold text-examsy-text outline-none focus:border-examsy-primary" />
                                </div>
                            </div>
                            <div className="space-y-1.5 sm:col-span-2">
                                <label className="text-[10px] font-black text-examsy-muted uppercase tracking-[0.2em] ml-1">Professional Bio</label>
                                <textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 px-4 font-bold text-examsy-text h-32 resize-none outline-none focus:border-examsy-primary" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- NOTIFICATIONS SECTION (Preserved) --- */}
                <section className="bg-examsy-surface rounded-[40px] border border-zinc-200 dark:border-zinc-800 p-10 shadow-sm transition-colors duration-500">
                    <h2 className="text-2xl font-black text-examsy-text mb-8">Notification Preferences</h2>
                    <div className="space-y-4">
                        {[
                            { id: 'email', icon: Mail, label: 'Email Notifications', desc: 'Receive class updates and exam results via work email.' },
                            { id: 'mobile', icon: Smartphone, label: 'Push Notifications', desc: 'Real-time alerts on your mobile device for submissions.' },
                            { id: 'security', icon: Shield, label: 'Security Alerts', desc: 'Notify me of unauthorized login attempts to my account.' }
                        ].map(item => (
                            <div key={item.id} className="flex justify-between items-center p-6 bg-examsy-bg rounded-3xl border border-zinc-200 dark:border-zinc-800/50">
                                <div className="flex items-center gap-5">
                                    <div className="p-3 bg-examsy-surface rounded-2xl text-examsy-primary"><item.icon size={22}/></div>
                                    <div className="pr-4">
                                        <p className="font-black text-examsy-text text-sm uppercase tracking-wider">{item.label}</p>
                                        <p className="text-xs font-bold text-examsy-muted leading-snug">{item.desc}</p>
                                    </div>
                                </div>
                                <button onClick={() => setNotifs({...notifs, [item.id]: !notifs[item.id]})} className={`shrink-0 w-14 h-7 rounded-full transition-all flex items-center px-1 ${notifs[item.id] ? 'bg-examsy-primary' : 'bg-zinc-400'}`}>
                                    <div className={`w-5 h-5 bg-white rounded-full transition-all ${notifs[item.id] ? 'translate-x-7' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </TeacherLayout>
    );
};

export default TeacherSettings;