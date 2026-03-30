import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, User, GraduationCap, ChevronLeft, Eye, EyeOff } from 'lucide-react';

import TextPressure from '../components/logo/TextPressure.jsx';
import { useTheme } from '../theme/useTheme.jsx';
import { authService } from '../services/authService.js';
import CustomAlert from '../components/common/CustomAlert.jsx';
import { teacherService } from "../services/teacherService.js";
import GoogleAuthButton from '../components/forms/GoogleAuthButton.jsx'; // 🟢 Import the clean button

const LoginPage = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const [role, setRole] = useState('student');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setAlert(null);
        setIsLoading(true);

        try {
            await authService.login(identifier, password);
            const userRole = localStorage.getItem('examsy_role');

            if (
                (userRole === 'STUDENT' && role !== 'student') ||
                (userRole === 'TEACHER' && role !== 'teacher')
            ) {
                localStorage.removeItem('examsy_token');
                localStorage.removeItem('examsy_role');

                setAlert({
                    type: 'error',
                    title: 'Role Mismatch',
                    message: `This account is registered as a ${userRole.toLowerCase()}. Please switch the role toggle at the top and try again.`,
                    onClose: () => setAlert(null)
                });
                setIsLoading(false);
                return;
            }

            if (userRole === 'ADMIN') {
                setAlert({ type: 'success', title: 'Login Successful', message: `Welcome back, ${identifier}! Redirecting to your dashboard.` });
                setTimeout(() => { setAlert(null); window.location.href = '/admin/dashboard'; }, 1500);
            }
            else if (userRole === 'TEACHER') {
                try {
                    // 1. Rotate class codes for security
                    await teacherService.rotateClassCodes();

                    // 2. 🟢 FIRE AND FORGET: Trigger the 48-hour reminders silently in the background
                    teacherService.triggerUpcomingReminders().catch(err => {
                        console.error("Silent Reminder Dispatch Failed:", err);
                    });

                    setAlert({ type: 'success', title: 'Login Successful', message: `Welcome back, ${identifier}! Redirecting to your dashboard.` });
                    setTimeout(() => { setAlert(null); window.location.href = '/teacher/dashboard'; }, 1500);
                } catch (rotationError) {
                    console.error("Failed to rotate class codes during login:", rotationError);
                    setIsLoading(false);
                    setAlert({
                        type: 'error',
                        title: 'System Update Failed',
                        message: 'Updating class codes failed. For security reasons, you will be logged out. Please try again.',
                        onClose: () => {
                            localStorage.removeItem('examsy_token');
                            localStorage.removeItem('examsy_role');
                            setAlert(null);
                        }
                    });
                    return;
                }
            } else {
                setAlert({ type: 'success', title: 'Login Successful', message: `Welcome back, ${identifier}! Redirecting to your dashboard.` });
                setTimeout(() => { setAlert(null); window.location.href = '/student/dashboard'; }, 1500);
            }
        } catch (err) {
            console.error("Login failed", err);
            setAlert({ type: 'error', title: 'Login Failed', message: "Invalid username or password. Please try again.", onClose: () => setAlert(null) });
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-examsy-bg transition-colors duration-500 relative overflow-hidden">
            {alert && <CustomAlert type={alert.type} title={alert.title} message={alert.message} onClose={alert.onClose} />}

            <Link to="/" className="absolute top-6 left-6 z-[110] flex items-center gap-2 px-4 py-2 bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-xl text-examsy-muted hover:text-examsy-primary hover:border-examsy-primary/30 transition-all duration-300 group shadow-sm">
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold text-sm">Return to Home</span>
            </Link>

            <div className="hidden lg:flex w-5/12 bg-examsy-surface relative overflow-hidden items-center justify-center p-12 lg:p-20 border-r border-white/5">
                <div className="absolute top-0 left-0 w-full h-full bg-examsy-primary/5 blur-[150px] -z-10"></div>
                <div className="w-full max-w-md flex flex-col items-start z-10 relative">
                    <div className="mb-10 relative h-[60px] w-[200px]">
                        <TextPressure text="Examsy !" flex alpha={false} stroke={false} width weight={false} italic textColor={theme === 'dark' ? '#fff' : '#465ed2'} strokeColor="#5227FF" minFontSize={36} />
                    </div>
                    <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop" alt="Learning" className="w-full h-64 object-cover rounded-3xl shadow-2xl mb-8 border border-white/10 opacity-90 transition-all duration-500" />
                    <h2 className="text-3xl font-bold text-examsy-text mb-3 leading-tight">Empower Your Future.</h2>
                    <div className="space-y-1.5">
                        <p className="text-lg text-examsy-muted leading-relaxed italic">"Education is the passport to the future, for tomorrow belongs to those who prepare for it today."</p>
                        <p className="text-examsy-primary font-black tracking-widest text-sm uppercase">— Malcolm X</p>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-7/12 flex items-center justify-center p-6 relative">
                <div className="w-full max-w-[480px] mx-auto py-8 animate-fade-in-up">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-black text-examsy-text mb-1 tracking-tight">Welcome Back</h1>
                        <p className="text-examsy-muted font-bold text-sm">Please enter your details to sign in.</p>

                        <div className="mt-6 relative inline-flex p-1.5 bg-examsy-surface rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-inner w-72">
                            <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-examsy-primary rounded-xl transition-all duration-300 ease-out z-0 shadow-lg shadow-examsy-primary/30 ${role === 'teacher' ? 'translate-x-[calc(100%+0px)]' : 'translate-x-0'}`} />
                            <button type="button" onClick={() => setRole('student')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold z-10 transition-colors duration-300 ${role === 'student' ? 'text-white' : 'text-examsy-muted hover:text-examsy-text'}`}><GraduationCap size={18} /> Student</button>
                            <button type="button" onClick={() => setRole('teacher')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold z-10 transition-colors duration-300 ${role === 'teacher' ? 'text-white' : 'text-examsy-muted hover:text-examsy-text'}`}><User size={18} /> Teacher</button>
                        </div>
                    </div>

                    <div className="mb-6 flex justify-center w-full">
                        <GoogleAuthButton label="Continue with Google" role={role}/>
                    </div>

                    <div className="relative flex items-center gap-4 mb-6">
                        <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
                        <span className="text-examsy-muted text-[10px] font-black uppercase tracking-widest">Or Login With Username</span>
                        <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-widest text-examsy-muted ml-1">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required className="w-full pl-12 pr-4 h-12 bg-examsy-surface border border-zinc-200 dark:border-zinc-700 focus:border-examsy-primary focus:ring-4 focus:ring-examsy-primary/10 rounded-2xl outline-none transition-all text-examsy-text placeholder-examsy-muted/30 text-sm" placeholder="johndoe_1" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-widest text-examsy-muted ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-12 pr-12 h-12 bg-examsy-surface border border-zinc-200 dark:border-zinc-700 focus:border-examsy-primary focus:ring-4 focus:ring-examsy-primary/10 rounded-2xl outline-none transition-all text-examsy-text placeholder-examsy-muted/30 text-sm" placeholder="••••••••••••" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-examsy-primary transition-colors focus:outline-none">
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                            <label className="flex items-center gap-2 cursor-pointer text-examsy-muted font-bold">
                                <input type="checkbox" className="w-4 h-4 rounded accent-examsy-primary border-zinc-300 dark:border-zinc-700" /> Remember me
                            </label>
                            <Link to="/forgot-password" className="text-examsy-primary font-black hover:underline underline-offset-4">Forgot Password?</Link>
                        </div>

                        <button type="submit" disabled={isLoading} className="w-full bg-examsy-primary hover:bg-examsy-primary/90 text-white h-12 rounded-2xl font-black text-base shadow-lg shadow-examsy-primary/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50">
                            {isLoading ? 'Signing In...' : `Sign In As ${role.charAt(0).toUpperCase() + role.slice(1)}`} <ArrowRight size={20} />
                        </button>
                    </form>

                    <p className="text-center text-examsy-muted mt-6 font-bold text-sm">
                        Don't have an account yet? <Link to={role === 'student' ? "/register-student" : "/register-teacher"} className="text-examsy-primary font-black hover:underline underline-offset-4 transition-all">Sign up now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;