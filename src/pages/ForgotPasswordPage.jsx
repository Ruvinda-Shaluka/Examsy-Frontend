import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ChevronLeft, Hash, Eye, EyeOff, Loader2 } from 'lucide-react';
import { authService } from '../services/authService.js';
import CustomAlert from '../components/common/CustomAlert.jsx';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();

    // The 3 phases: 1 = Email, 2 = Code, 3 = New Password
    const [step, setStep] = useState(1);

    // Form Data
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // UI States
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [alert, setAlert] = useState(null);

    // 🟢 STEP 1: Request Code
    const handleRequestCode = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAlert(null);
        try {
            await authService.sendPasswordResetCode(email);
            setStep(2); // Move to code entry
            setAlert({ type: 'success', title: 'Code Sent!', message: `A 6-digit code has been sent to ${email}.` });
        } catch (err) {
            setAlert({ type: 'error', title: 'Error', message: 'Could not send reset code. Check your email address.' });
        } finally {
            setIsLoading(false);
        }
    };

    // 🟢 STEP 2: Verify Code
    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAlert(null);
        try {
            await authService.verifyResetCode(email, code);
            setStep(3); // Move to password reset
            setAlert(null); // Clear alert so they can focus on typing password
        } catch (err) {
            setAlert({ type: 'error', title: 'Invalid Code', message: 'The code is incorrect or has expired.' });
        } finally {
            setIsLoading(false);
        }
    };

    // 🟢 STEP 3: Update Password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAlert(null);
        try {
            await authService.resetPassword(email, code, newPassword);
            setAlert({
                type: 'success',
                title: 'Password Updated!',
                message: 'Your password has been changed successfully. You can now log in.',
                onClose: () => {
                    setAlert(null);
                    navigate('/login');
                }
            });
        } catch (err) {
            setAlert({ type: 'error', title: 'Error', message: 'Failed to update password. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-examsy-bg transition-colors duration-500 relative p-6">

            {alert && <CustomAlert type={alert.type} title={alert.title} message={alert.message} onClose={() => setAlert(null)} />}

            <Link to="/login" className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-xl text-examsy-muted hover:text-examsy-primary transition-all duration-300 shadow-sm">
                <ChevronLeft size={20} /> <span className="font-bold text-sm">Back to Login</span>
            </Link>

            <div className="w-full max-w-md bg-examsy-surface p-8 md:p-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in zoom-in-95 duration-300">

                {/* Headers change dynamically based on the step */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-examsy-text mb-2">
                        {step === 1 ? 'Forgot Password?' : step === 2 ? 'Enter Code' : 'New Password'}
                    </h1>
                    <p className="text-examsy-muted font-bold text-sm">
                        {step === 1 ? "Enter your email to receive a secure reset code."
                            : step === 2 ? "Check your inbox for the 6-digit verification code."
                                : "Create a strong, new password for your account."}
                    </p>
                </div>

                {/* --- STEP 1 FORM --- */}
                {step === 1 && (
                    <form onSubmit={handleRequestCode} className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-widest text-examsy-muted ml-1">Account Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="johndoe@example.com"
                                       className="w-full pl-12 pr-4 h-12 bg-examsy-bg border border-zinc-200 dark:border-zinc-700 focus:border-examsy-primary rounded-2xl outline-none transition-all text-examsy-text font-bold text-sm" />
                            </div>
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-examsy-primary text-white h-12 rounded-2xl font-black shadow-lg hover:scale-[1.01] transition-all flex justify-center items-center gap-2 disabled:opacity-50">
                            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <>Send Reset Code <ArrowRight size={20} /></>}
                        </button>
                    </form>
                )}

                {/* --- STEP 2 FORM --- */}
                {step === 2 && (
                    <form onSubmit={handleVerifyCode} className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-widest text-examsy-muted ml-1">6-Digit Code</label>
                            <div className="relative">
                                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required maxLength={6} placeholder="123456"
                                       className="w-full pl-12 pr-4 h-12 bg-examsy-bg border border-zinc-200 dark:border-zinc-700 focus:border-examsy-primary rounded-2xl outline-none transition-all text-examsy-text font-black tracking-widest text-lg" />
                            </div>
                        </div>
                        <button type="submit" disabled={isLoading || code.length !== 6} className="w-full bg-examsy-primary text-white h-12 rounded-2xl font-black shadow-lg hover:scale-[1.01] transition-all flex justify-center items-center gap-2 disabled:opacity-50">
                            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <>Verify Code <ArrowRight size={20} /></>}
                        </button>
                    </form>
                )}

                {/* --- STEP 3 FORM --- */}
                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-widest text-examsy-muted ml-1">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                <input type={showPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={8} placeholder="••••••••••••"
                                       className="w-full pl-12 pr-12 h-12 bg-examsy-bg border border-zinc-200 dark:border-zinc-700 focus:border-examsy-primary rounded-2xl outline-none transition-all text-examsy-text text-sm" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-examsy-primary">
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-emerald-500 text-white h-12 rounded-2xl font-black shadow-lg hover:scale-[1.01] transition-all flex justify-center items-center gap-2 disabled:opacity-50">
                            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <>Update Password</>}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordPage;