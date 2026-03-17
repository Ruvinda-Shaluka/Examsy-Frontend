import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ChevronLeft, Eye, EyeOff, Loader2, KeyRound } from 'lucide-react';
import { authService } from '../services/authService.js';
import CustomAlert from '../components/common/CustomAlert.jsx';
import TextPressure from '../components/logo/TextPressure.jsx';
import { useTheme } from '../theme/useTheme.jsx';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();

    // The 3 phases: 1 = Email, 2 = Code, 3 = New Password
    const [step, setStep] = useState(1);

    // Form Data
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array for 6 OTP boxes
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // NEW: Confirm password state

    // UI States
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [alert, setAlert] = useState(null);

    // Refs for OTP inputs
    const inputRefs = useRef([]);

    // 🟢 OTP Input Handlers
    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return; // Only allow numbers

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value !== '' && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (otp[index] === '' && index > 0) {
                // Focus previous input if current is empty
                inputRefs.current[index - 1].focus();
            } else {
                // Clear current input
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            }
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
        if (pastedData.some(isNaN)) return; // Ignore if non-numbers pasted

        const newOtp = [...otp];
        pastedData.forEach((val, i) => { if (i < 6) newOtp[i] = val; });
        setOtp(newOtp);

        // Focus the last filled input
        const lastIndex = Math.min(pastedData.length - 1, 5);
        inputRefs.current[lastIndex].focus();
    };


    // 🟢 STEP 1: Request Code
    const handleRequestCode = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAlert(null);
        try {
            await authService.sendPasswordResetCode(email);
            setStep(2);
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
        const fullCode = otp.join('');
        if (fullCode.length !== 6) return;

        setIsLoading(true);
        setAlert(null);
        try {
            await authService.verifyResetCode(email, fullCode);
            setStep(3);
            setAlert(null);
        } catch (err) {
            setAlert({ type: 'error', title: 'Invalid Code', message: 'The code is incorrect or has expired.' });
        } finally {
            setIsLoading(false);
        }
    };

    // 🟢 STEP 3: Update Password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setAlert(null);

        // Frontend Validation: Check if passwords match
        if (newPassword !== confirmPassword) {
            setAlert({ type: 'error', title: 'Passwords mismatch', message: 'The passwords you entered do not match. Please try again.' });
            return;
        }

        setIsLoading(true);
        try {
            const fullCode = otp.join('');
            await authService.resetPassword(email, fullCode, newPassword);
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
        <div className="min-h-screen w-full flex bg-examsy-bg transition-colors duration-500 relative overflow-hidden">

            {alert && <CustomAlert type={alert.type} title={alert.title} message={alert.message} onClose={alert.onClose || (() => setAlert(null))} />}

            {/* Back Button */}
            <Link to="/login" className="absolute top-6 left-6 z-[110] flex items-center gap-2 px-4 py-2 bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-xl text-examsy-muted hover:text-examsy-primary hover:border-examsy-primary/30 transition-all duration-300 group shadow-sm">
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold text-sm">Return to Login</span>
            </Link>

            {/* --- LEFT SIDE (Visual Branding) --- */}
            <div className="hidden lg:flex w-5/12 bg-examsy-surface relative overflow-hidden items-center justify-center p-12 lg:p-20 border-r border-white/5">
                <div className="absolute top-0 left-0 w-full h-full bg-examsy-primary/5 blur-[150px] -z-10"></div>
                <div className="w-full max-w-md flex flex-col items-start z-10 relative">
                    <div className="mb-10 relative h-[60px] w-[200px]">
                        <TextPressure text="Examsy !" flex alpha={false} stroke={false} width weight={false} italic textColor={theme === 'dark' ? '#fff' : '#465ed2'} strokeColor="#5227FF" minFontSize={36} />
                    </div>
                    {/* Aesthetic Security/Learning Image */}
                    <img src="https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=2000&auto=format&fit=crop" alt="Abstract Innovation" className="w-full h-64 object-cover rounded-3xl shadow-2xl mb-8 border border-white/10 opacity-90 transition-all duration-500" />
                    <h2 className="text-3xl font-bold text-examsy-text mb-3 leading-tight">Secure Your Progress.</h2>
                    <div className="space-y-1.5">
                        <p className="text-lg text-examsy-muted leading-relaxed italic">"Obstacles don't have to stop you. If you run into a wall, don't turn around and give up. Figure out how to climb it."</p>
                        <p className="text-examsy-primary font-black tracking-widest text-sm uppercase">— Michael Jordan</p>
                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDE (Form) --- */}
            <div className="w-full lg:w-7/12 flex items-center justify-center p-6 relative">

                {/* Wider Card for better form spacing */}
                <div className="w-full max-w-[500px] bg-examsy-surface p-8 md:p-12 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-fade-in-up duration-300">

                    {/* Headers */}
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-examsy-primary/10 text-examsy-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <KeyRound size={32} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-examsy-text mb-3 tracking-tight">
                            {step === 1 ? 'Forgot Password?' : step === 2 ? 'Verify Identity' : 'New Password'}
                        </h1>
                        <p className="text-examsy-muted font-bold text-sm leading-relaxed px-4">
                            {step === 1 ? "Enter the email associated with your account. We'll send you a secure reset code."
                                : step === 2 ? `Enter the 6-digit verification code sent to ${email}`
                                    : "Your identity has been verified. Create a strong, new password for your account."}
                        </p>
                    </div>

                    {/* --- STEP 1 FORM (Email) --- */}
                    {step === 1 && (
                        <form onSubmit={handleRequestCode} className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase tracking-widest text-examsy-muted ml-1">Account Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="johndoe@example.com"
                                           className="w-full pl-12 pr-4 h-14 bg-examsy-bg border border-zinc-200 dark:border-zinc-700 focus:border-examsy-primary focus:ring-4 focus:ring-examsy-primary/10 rounded-2xl outline-none transition-all text-examsy-text font-bold text-sm" />
                                </div>
                            </div>
                            <button type="submit" disabled={isLoading} className="w-full bg-examsy-primary text-white h-14 rounded-2xl font-black shadow-lg shadow-examsy-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex justify-center items-center gap-2 disabled:opacity-50">
                                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <>Send Reset Code <ArrowRight size={20} /></>}
                            </button>
                        </form>
                    )}

                    {/* --- STEP 2 FORM (OTP) --- */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyCode} className="space-y-8 animate-in fade-in slide-in-from-right-4">
                            <div className="space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-widest text-examsy-muted ml-1 block text-center">6-Digit Secure Code</label>
                                {/* Entertaining OTP Input Group */}
                                <div className="flex justify-center gap-2 sm:gap-4" onPaste={handleOtpPaste}>
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            onChange={(e) => handleOtpChange(e, index)}
                                            onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                            className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black bg-examsy-bg border border-zinc-200 dark:border-zinc-700 focus:border-examsy-primary focus:ring-4 focus:ring-examsy-primary/10 rounded-2xl outline-none transition-all text-examsy-text shadow-inner"
                                        />
                                    ))}
                                </div>
                            </div>
                            <button type="submit" disabled={isLoading || otp.join('').length !== 6} className="w-full bg-examsy-primary text-white h-14 rounded-2xl font-black shadow-lg shadow-examsy-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex justify-center items-center gap-2 disabled:opacity-50">
                                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <>Verify Code <ArrowRight size={20} /></>}
                            </button>
                            <button type="button" onClick={() => setStep(1)} className="w-full text-center text-xs text-examsy-muted font-bold hover:text-examsy-text transition-colors">
                                Didn't receive code? Try another email
                            </button>
                        </form>
                    )}

                    {/* --- STEP 3 FORM (Passwords) --- */}
                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-6 animate-in fade-in slide-in-from-right-4">

                            {/* New Password */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase tracking-widest text-examsy-muted ml-1">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                    <input type={showPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={8} placeholder="••••••••••••"
                                           className="w-full pl-12 pr-12 h-14 bg-examsy-bg border border-zinc-200 dark:border-zinc-700 focus:border-examsy-primary focus:ring-4 focus:ring-examsy-primary/10 rounded-2xl outline-none transition-all text-examsy-text text-sm" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-examsy-primary focus:outline-none">
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase tracking-widest text-examsy-muted ml-1">Confirm New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                    <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={8} placeholder="••••••••••••"
                                           className="w-full pl-12 pr-12 h-14 bg-examsy-bg border border-zinc-200 dark:border-zinc-700 focus:border-examsy-primary focus:ring-4 focus:ring-examsy-primary/10 rounded-2xl outline-none transition-all text-examsy-text text-sm" />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-examsy-primary focus:outline-none">
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" disabled={isLoading} className="w-full bg-emerald-500 text-white h-14 rounded-2xl font-black shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex justify-center items-center gap-2 mt-4 disabled:opacity-50">
                                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <>Save Password & Login</>}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;