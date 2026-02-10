import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { STUDENT_DATA } from '../../data/StudentMockData';

const StudentSettings = () => (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
        <header>
            <h1 className="text-3xl font-black uppercase tracking-tight text-examsy-text">Student Settings</h1>
            <p className="text-examsy-muted font-bold">Manage your profile, identity verification, and notifications.</p>
        </header>

        <div className="grid gap-8">
            {/* Profile Section */}
            <div className="bg-examsy-surface p-8 rounded-[40px] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center gap-8 mb-10">
                    <div className="w-24 h-24 rounded-[32px] bg-examsy-primary flex items-center justify-center text-4xl text-white font-black shadow-lg shadow-purple-500/30">
                        {STUDENT_DATA.avatar}
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-examsy-text">{STUDENT_DATA.name}</h3>
                        <p className="text-sm font-bold text-examsy-muted">{STUDENT_DATA.major} • Year 3</p>
                        <button className="mt-4 text-xs font-black text-examsy-primary uppercase tracking-widest hover:underline">Change Photo</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-examsy-muted ml-4">Full Name</label>
                        <input
                            type="text"
                            defaultValue={STUDENT_DATA.name}
                            className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-3.5 font-bold text-examsy-text outline-none focus:border-examsy-primary transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-examsy-muted ml-4">Student ID</label>
                        <input
                            type="text"
                            readOnly
                            defaultValue={STUDENT_DATA.id}
                            className="w-full bg-examsy-bg/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-3.5 font-bold text-examsy-muted outline-none cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>

            {/* Security Section */}
            <div className="bg-examsy-surface p-8 rounded-[40px] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h3 className="text-lg font-black text-examsy-text mb-6">Security & Integrity</h3>
                <div className="flex items-center justify-between p-6 bg-examsy-bg rounded-2xl border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-4">
                        <ShieldCheck className="text-examsy-primary" />
                        <span className="font-bold text-examsy-text">Two-Factor Identity Verification</span>
                    </div>
                    <div className="w-12 h-6 bg-examsy-primary rounded-full relative p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default StudentSettings;