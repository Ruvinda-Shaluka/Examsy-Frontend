import React, { useState } from 'react';
import { User, Mail, Lock, Briefcase, BookOpen, ArrowRight, ChevronLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useExamsyAuth } from '../hooks/useExamsyAuth';
import GoogleAuthButton from '../components/GoogleAuthButton';
import { InputField } from '../components/FormHelpers';
import TextPressure from '../components/TextPressure.jsx';
import { useTheme } from '../hooks/useTheme.jsx';

const RegisterTeacher = () => {
    const { theme } = useTheme();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { login } = useExamsyAuth(() => setIsLoggedIn(true));

    return (
        <div className="min-h-screen w-full flex bg-examsy-bg transition-colors duration-500 relative">

            {/* RETURN TO HOME */}
            <Link to="/" className="absolute top-6 left-6 z-[110] flex items-center gap-2 px-4 py-2 bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-xl text-examsy-muted hover:text-examsy-primary transition-all shadow-sm">
                <ChevronLeft size={20} />
                <span className="font-bold text-sm">Return to Home</span>
            </Link>

            {/* --- LEFT SIDE (Visual Branding) --- */}
            <div className="hidden lg:flex w-5/12 bg-examsy-surface relative overflow-hidden items-center justify-center p-12 lg:p-20 border-r border-white/5">
                <div className="absolute top-0 left-0 w-full h-full bg-examsy-primary/5 blur-[150px] -z-10"></div>
                <div className="w-full max-w-md flex flex-col items-start z-10 relative">
                    <div className="mb-12 relative h-[60px] w-[200px]">
                        <TextPressure
                            text="Examsy !"
                            flex alpha={false} stroke={false} width weight={false} italic
                            textColor={theme === 'dark' ? '#fff' : '#465ed2'}
                            strokeColor="#5227FF"
                            minFontSize={36}
                        />
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80&w=2070&auto=format&fit=crop"
                        alt="Teacher explaining"
                        className="w-full h-64 object-cover rounded-3xl shadow-2xl mb-10 border border-white/10 opacity-90 grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                    />
                    <h2 className="text-3xl font-bold text-examsy-text mb-4 leading-tight">Inspire the Next Generation.</h2>
                    <p className="text-lg text-examsy-muted leading-relaxed italic">
                        "It is the supreme art of the teacher to awaken joy in creative expression and knowledge."
                    </p>
                </div>
            </div>

            {/* --- RIGHT SIDE (Registration Form) --- */}
            <div className="w-full lg:w-7/12 flex items-center justify-center p-6 md:p-12 relative overflow-y-auto">
                <div className="w-full max-w-[550px] mx-auto py-12">
                    <div className="text-center lg:text-left mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-examsy-primary/10 text-examsy-primary text-xs font-bold uppercase tracking-widest mb-4">
                            <ShieldCheck size={14}/> Faculty Registration
                        </div>
                        <h1 className="text-4xl font-extrabold text-examsy-text mb-3">Join the Faculty</h1>
                        <p className="text-examsy-muted text-lg">{!isLoggedIn ? 'Step 1: Account Setup' : 'Step 2: Professional Verification'}</p>
                    </div>

                    {!isLoggedIn ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputField label="Full Name" icon={<User size={18} />} id="t-name" type="text" placeholder="Dr. Jane Smith" />
                                <InputField label="Work Email" icon={<Mail size={18} />} id="t-email" type="email" placeholder="smith@examsy.edu" />
                                <InputField label="Username" icon={<User size={18} />} id="t-user" type="text" placeholder="jane_teacher" />
                                <InputField label="Password" icon={<Lock size={18} />} id="t-pass" type="password" placeholder="••••••••" />
                            </div>
                            <button onClick={() => setIsLoggedIn(true)} className="w-full bg-examsy-primary text-white h-14 rounded-2xl font-bold text-lg shadow-lg shadow-examsy-primary/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]">
                                Next Step <ArrowRight size={20} />
                            </button>
                            <div className="relative flex items-center gap-4 my-8">
                                <div className="h-px bg-zinc-300 dark:bg-zinc-700 flex-1"></div>
                                <span className="text-examsy-muted text-xs font-bold uppercase">Institutional Access</span>
                                <div className="h-px bg-zinc-300 dark:bg-zinc-700 flex-1"></div>
                            </div>
                            <GoogleAuthButton onClick={login} label="Register via Institution Account" />
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputField label="Instructor ID" icon={<Briefcase size={18} />} id="t-id" type="text" placeholder="EMP-2026-X" />
                                <InputField label="Specialization" icon={<BookOpen size={18} />} id="t-sub" type="text" placeholder="Java / Physics" />
                            </div>
                            <p className="text-sm text-examsy-muted italic leading-relaxed bg-examsy-surface p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                <span className="font-bold text-examsy-text block mb-1">Verification Note:</span>
                                Your Instructor ID is required to verify your authority to create exams and manage student rankings within the Examsy platform.
                            </p>
                            <button className="w-full bg-examsy-primary text-white h-14 rounded-2xl font-bold text-lg shadow-lg shadow-examsy-primary/25 transition-all hover:scale-[1.01]">
                                Access Teacher Dashboard
                            </button>
                            <button onClick={() => setIsLoggedIn(false)} className="w-full text-examsy-muted font-bold hover:text-examsy-text transition-colors">
                                Back to Step 1
                            </button>
                        </div>
                    )}

                    <p className="text-center text-examsy-muted mt-10 font-medium">
                        Already have an account? <Link to="/login" className="text-examsy-primary font-extrabold hover:underline">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterTeacher;