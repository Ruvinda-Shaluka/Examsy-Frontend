import React, { useState } from 'react';
import { User, Mail, Lock, Briefcase, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useExamsyAuth } from '../../hooks/useExamsyAuth.js';
import GoogleAuthButton from '../../components/forms/GoogleAuthButton.jsx';
import { InputField } from '../../components/forms/FormHelpers.jsx';
import AuthLayout from '../../components/auth/AuthLayout.jsx';
import AuthHeader from '../../components/auth/AuthHeader.jsx';
import { authService } from '../../services/authService.js';
import CustomAlert from "../../components/common/CustomAlert.jsx";

const RegisterTeacher = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Alert State
    const [alert, setAlert] = useState(null);
    const { login } = useExamsyAuth(() => setStep(2));

    const [formData, setFormData] = useState({
        fullName: '', workEmail: '', username: '', password: '',
        instructorId: '', specialization: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleCompleteRegistration = async () => {
        setAlert(null); // Clear any existing alerts
        setIsLoading(true);
        try {
            await authService.registerTeacher(formData);
            // Trigger Success Alert
            setAlert({
                type: 'success',
                title: 'Registration Successful',
                message: 'Your faculty account has been created. Please log in.',
                onClose: () => {
                    setAlert(null);
                    navigate('/login');
                }
            });
        } catch (err) {
            console.error(err);
            // Trigger Error Alert
            setAlert({
                type: 'error',
                title: 'Registration Failed',
                message: err.response?.data?.message || "Please verify your details and try again.",
                onClose: () => setAlert(null)
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            image="https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80"
            quote="It is the supreme art of the teacher to awaken joy in creative expression and knowledge."
            author="Albert Einstein"
        >
            {/* Render the CustomAlert if the alert state is not null */}
            {alert && (
                <CustomAlert
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                    onClose={alert.onClose}
                />
            )}

            <AuthHeader
                badgeIcon={ShieldCheck}
                badgeText="Faculty Registration"
                title="Join the Faculty"
                subtitle={step === 1 ? 'Step 1: Account Setup' : 'Step 2: Professional Verification'}
            />

            <div className="min-h-[330px]">
                {step === 1 ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                            <InputField label="Full Name" icon={<User size={18} />} id="fullName" value={formData.fullName} onChange={handleChange} type="text" placeholder="Dr. Jane Smith" />
                            <InputField label="Work Email" icon={<Mail size={18} />} id="workEmail" value={formData.workEmail} onChange={handleChange} type="email" placeholder="smith@examsy.edu" />
                            <InputField label="Username" icon={<User size={18} />} id="username" value={formData.username} onChange={handleChange} type="text" placeholder="jane_teacher" />
                            <InputField label="Password" icon={<Lock size={18} />} id="password" value={formData.password} onChange={handleChange} type="password" placeholder="••••••••" />
                        </div>
                        <button onClick={() => setStep(2)} className="w-full bg-examsy-primary text-white h-12 rounded-2xl font-bold text-base shadow-lg shadow-examsy-primary/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]">
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
                            <InputField label="Instructor ID" icon={<Briefcase size={18} />} id="instructorId" value={formData.instructorId} onChange={handleChange} type="text" placeholder="EMP-2026-X" />
                            <InputField label="Specialization" icon={<BookOpen size={18} />} id="specialization" value={formData.specialization} onChange={handleChange} type="text" placeholder="Java / Physics" />
                        </div>
                        <p className="text-xs text-examsy-muted italic leading-relaxed bg-examsy-surface p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <span className="font-black text-examsy-text block mb-1">Verification Note:</span>
                            Your Instructor ID is required to verify your authority to manage exams.
                        </p>
                        <button onClick={handleCompleteRegistration} disabled={isLoading} className="w-full bg-examsy-primary text-white h-12 rounded-2xl font-bold text-base shadow-lg shadow-examsy-primary/20 transition-all hover:scale-[1.01] disabled:opacity-50">
                            {isLoading ? 'Verifying...' : 'Access Teacher Dashboard'}
                        </button>
                        <button onClick={() => setStep(1)} disabled={isLoading} className="w-full text-xs text-examsy-muted font-bold hover:text-examsy-text transition-colors mt-2">
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