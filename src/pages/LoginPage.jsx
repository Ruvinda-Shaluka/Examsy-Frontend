import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, User, GraduationCap, ChevronLeft } from 'lucide-react';
import TextPressure from '../components/logo/TextPressure.jsx';
import GoogleAuthButton from '../components/forms/GoogleAuthButton.jsx';
import { useTheme } from '../hooks/useTheme.jsx';

const LoginPage = () => {
    const { theme } = useTheme();
    const [role, setRole] = useState('student');

    const handleGoogleLogin = () => {
        console.log("Google login triggered");
    };

    return (
        <div className="min-h-screen w-full flex bg-examsy-bg transition-colors duration-500 relative overflow-hidden">

            {/* --- RETURN TO HOME BUTTON --- */}
            <Link
                to="/"
                className="absolute top-6 left-6 z-[110] flex items-center gap-2 px-4 py-2 bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-xl text-examsy-muted hover:text-examsy-primary hover:border-examsy-primary/30 transition-all duration-300 group shadow-sm"
            >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold text-sm">Return to Home</span>
            </Link>

            {/* --- LEFT SIDE (Visual Branding) --- */}
            <div className="hidden lg:flex w-5/12 bg-examsy-surface relative overflow-hidden items-center justify-center p-12 lg:p-20 border-r border-white/5">
                <div className="absolute top-0 left-0 w-full h-full bg-examsy-primary/5 blur-[150px] -z-10"></div>

                <div className="w-full max-w-md flex flex-col items-start z-10 relative">
                    <div className="mb-10 relative h-[60px] w-[200px]">
                        <TextPressure
                            text="Examsy !"
                            flex alpha={false} stroke={false} width weight={false} italic
                            textColor={theme === 'dark' ? '#fff' : '#465ed2'}
                            strokeColor="#5227FF"
                            minFontSize={36}
                        />
                    </div>

                    <img
                        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop"
                        alt="Learning Illustration"
                        className="w-full h-64 object-cover rounded-3xl shadow-2xl mb-8 border border-white/10 opacity-90 transition-all duration-500"
                    />

                    <h2 className="text-3xl font-bold text-examsy-text mb-3 leading-tight">
                        Empower Your Future.
                    </h2>
                    <div className="space-y-1.5">
                        <p className="text-lg text-examsy-muted leading-relaxed italic">
                            "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
                        </p>
                        <p className="text-examsy-primary font-black tracking-widest text-sm uppercase">— Malcolm X</p>
                    </div>
                </div>
            </div>


            {/* --- RIGHT SIDE (Login Form) --- */}
            <div className="w-full lg:w-7/12 flex items-center justify-center p-6 relative">
                <div className="w-full max-w-[480px] mx-auto py-8 animate-fade-in-up">

                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-black text-examsy-text mb-1 tracking-tight">Welcome Back</h1>
                        <p className="text-examsy-muted font-bold text-sm">Please enter your details to sign in.</p>

                        {/* ROLE TOGGLE BUTTON - Condensed Margin */}
                        <div className="mt-6 relative inline-flex p-1.5 bg-examsy-surface rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-inner w-72">
                            <div
                                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-examsy-primary rounded-xl transition-all duration-300 ease-out z-0 shadow-lg shadow-examsy-primary/30 ${
                                    role === 'teacher' ? 'translate-x-[calc(100%+0px)]' : 'translate-x-0'
                                }`}
                            />

                            <button
                                onClick={() => setRole('student')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold z-10 transition-colors duration-300 ${
                                    role === 'student' ? 'text-white' : 'text-examsy-muted hover:text-examsy-text'
                                }`}
                            >
                                <GraduationCap size={18} /> Student
                            </button>

                            <button
                                onClick={() => setRole('teacher')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold z-10 transition-colors duration-300 ${
                                    role === 'teacher' ? 'text-white' : 'text-examsy-muted hover:text-examsy-text'
                                }`}
                            >
                                <User size={18} /> Teacher
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <GoogleAuthButton onClick={handleGoogleLogin} label="Continue with Google" />
                    </div>

                    <div className="relative flex items-center gap-4 mb-6">
                        <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
                        <span className="text-examsy-muted text-[10px] font-black uppercase tracking-widest">Or Login With Email</span>
                        <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
                    </div>

                    {/* Form Fields - Tightened gap with space-y-4 */}
                    <form className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-widest text-examsy-muted ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                <input
                                    type="email"
                                    className="w-full pl-12 pr-4 h-12 bg-examsy-surface border border-zinc-200 dark:border-zinc-700 focus:border-examsy-primary focus:ring-4 focus:ring-examsy-primary/10 rounded-2xl outline-none transition-all text-examsy-text placeholder-examsy-muted/30 text-sm"
                                    placeholder="john@examsy.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-widest text-examsy-muted ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                <input
                                    type="password"
                                    className="w-full pl-12 pr-4 h-12 bg-examsy-surface border border-zinc-200 dark:border-zinc-700 focus:border-examsy-primary focus:ring-4 focus:ring-examsy-primary/10 rounded-2xl outline-none transition-all text-examsy-text placeholder-examsy-muted/30 text-sm"
                                    placeholder="••••••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                            <label className="flex items-center gap-2 cursor-pointer text-examsy-muted font-bold">
                                <input type="checkbox" className="w-4 h-4 rounded accent-examsy-primary border-zinc-300 dark:border-zinc-700" />
                                Remember me
                            </label>
                            <Link to="/forgot-password" class="text-examsy-primary font-black hover:underline underline-offset-4">
                                Forgot Password?
                            </Link>
                        </div>

                        <button type="submit" className="w-full bg-examsy-primary hover:bg-examsy-primary/90 text-white h-12 rounded-2xl font-black text-base shadow-lg shadow-examsy-primary/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]">
                            Sign In As {role.charAt(0).toUpperCase() + role.slice(1)} <ArrowRight size={20} />
                        </button>
                    </form>

                    <p className="text-center text-examsy-muted mt-6 font-bold text-sm">
                        Don't have an account yet? {' '}
                        <Link
                            to={role === 'student' ? "/register-student" : "/register-teacher"}
                            className="text-examsy-primary font-black hover:underline underline-offset-4 transition-all"
                        >
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;