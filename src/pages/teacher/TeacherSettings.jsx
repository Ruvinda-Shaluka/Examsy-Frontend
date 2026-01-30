import React from 'react';
import TeacherLayout from '../../layouts/TeacherLayout';
import { Camera, Mail, Shield, Smartphone } from 'lucide-react';

const TeacherSettings = () => {
    return (
        <TeacherLayout>
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
                {/* Profile Section */}
                <section className="bg-examsy-surface rounded-[40px] border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                    <div className="p-8 md:p-10 border-b border-zinc-100 dark:border-zinc-800">
                        <h2 className="text-2xl font-black text-examsy-text mb-1">Profile</h2>
                        <p className="text-examsy-muted font-bold">Manage your public information and avatar.</p>
                    </div>

                    <div className="p-8 md:p-10 flex flex-col md:flex-row gap-10 items-start">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-[32px] bg-examsy-primary/10 border-4 border-examsy-surface shadow-xl flex items-center justify-center text-examsy-primary font-black text-4xl overflow-hidden">
                                J
                            </div>
                            <button className="absolute -bottom-2 -right-2 p-3 bg-examsy-primary text-white rounded-2xl shadow-lg hover:scale-110 transition-transform">
                                <Camera size={18} />
                            </button>
                        </div>

                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-examsy-muted uppercase tracking-widest ml-1">Display Name</label>
                                <input type="text" defaultValue="Dr. Jane Smith" className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3 px-4 font-bold text-examsy-text outline-none focus:border-examsy-primary transition-colors" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-examsy-muted uppercase tracking-widest ml-1">Specialization</label>
                                <input type="text" defaultValue="Quantum Physics" className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3 px-4 font-bold text-examsy-text outline-none focus:border-examsy-primary transition-colors" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Notifications Section */}
                <section className="bg-examsy-surface rounded-[40px] border border-zinc-200 dark:border-zinc-800 p-8 md:p-10">
                    <h2 className="text-2xl font-black text-examsy-text mb-8">Notifications</h2>

                    <div className="space-y-6">
                        {[
                            { icon: Mail, label: 'Email Notifications', desc: 'Receive daily exam summaries via work email.' },
                            { icon: Smartphone, label: 'Mobile Alerts', desc: 'Get notified when a student submits an exam.' },
                            { icon: Shield, label: 'Security Alerts', desc: 'Notify me of login attempts from new devices.' }
                        ].map((pref, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-examsy-bg rounded-3xl border border-zinc-100 dark:border-zinc-800/50">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-examsy-surface rounded-2xl text-examsy-primary"><pref.icon size={20}/></div>
                                    <div>
                                        <p className="font-black text-examsy-text text-sm uppercase tracking-wider">{pref.label}</p>
                                        <p className="text-xs font-bold text-examsy-muted">{pref.desc}</p>
                                    </div>
                                </div>
                                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-examsy-primary shadow-inner cursor-pointer">
                                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </TeacherLayout>
    );
};

export default TeacherSettings;