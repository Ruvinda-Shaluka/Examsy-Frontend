import React, { useState } from 'react';
import { User, Mail, Lock, Briefcase, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useExamsyAuth } from '../hooks/useExamsyAuth';
import GoogleAuthButton from '../components/forms/GoogleAuthButton.jsx';
import { InputField } from '../components/forms/FormHelpers.jsx';
import AuthLayout from '../components/auth/AuthLayout.jsx';
import AuthHeader from '../components/auth/AuthHeader.jsx';

const RegisterTeacher = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { login } = useExamsyAuth(() => setIsLoggedIn(true));

    return (
        <AuthLayout
            image="https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80"
            quote="It is the supreme art of the teacher to awaken joy in creative expression and knowledge."
            author="Albert Einstein"
        >
            <AuthHeader
                badgeIcon={ShieldCheck}
                badgeText="Faculty Registration"
                title="Join the Faculty"
                subtitle={!isLoggedIn ? 'Step 1: Account Setup' : 'Step 2: Professional Verification'}
            />

            {/* Stable height container to prevent layout jumps between steps */}
            <div className="min-h-[330px]">
                {!isLoggedIn ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                            <InputField label="Full Name" icon={<User size={18} />} id="t-name" type="text" placeholder="Dr. Jane Smith" />
                            <InputField label="Work Email" icon={<Mail size={18} />} id="t-email" type="email" placeholder="smith@examsy.edu" />
                            <InputField label="Username" icon={<User size={18} />} id="t-user" type="text" placeholder="jane_teacher" />
                            <InputField label="Password" icon={<Lock size={18} />} id="t-pass" type="password" placeholder="••••••••" />
                        </div>
                        <button onClick={() => setIsLoggedIn(true)} className="w-full bg-examsy-primary text-white h-12 rounded-2xl font-bold text-base shadow-lg shadow-examsy-primary/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]">
                            Next Step <ArrowRight size={20} />
                        </button>
                        <div className="relative flex items-center gap-4 my-5 text-center">
                            <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
                            <span className="text-examsy-muted text-[10px] font-black uppercase tracking-widest">Institutional Access</span>
                            <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
                        </div>
                        <GoogleAuthButton onClick={login} label="Register via Institution Account" />
                    </div>
                ) : (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                            <InputField label="Instructor ID" icon={<Briefcase size={18} />} id="t-id" type="text" placeholder="EMP-2026-X" />
                            <InputField label="Specialization" icon={<BookOpen size={18} />} id="t-sub" type="text" placeholder="Java / Physics" />
                        </div>
                        <p className="text-xs text-examsy-muted italic leading-relaxed bg-examsy-surface p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <span className="font-black text-examsy-text block mb-1">Verification Note:</span>
                            Your Instructor ID is required to verify your authority to manage exams.
                        </p>
                        <button className="w-full bg-examsy-primary text-white h-12 rounded-2xl font-bold text-base shadow-lg shadow-examsy-primary/20 transition-all hover:scale-[1.01]">
                            Access Teacher Dashboard
                        </button>
                        <button onClick={() => setIsLoggedIn(false)} className="w-full text-xs text-examsy-muted font-bold hover:text-examsy-text transition-colors mt-2">
                            ← Back to Step 1
                        </button>
                    </div>
                )}
            </div>

            <p className="text-center text-examsy-muted mt-6 font-bold text-sm">
                Already have an account? <Link to="/login" className="text-examsy-primary font-black hover:underline underline-offset-4">Log in</Link>
            </p>
        </AuthLayout>
    );
};

export default RegisterTeacher;