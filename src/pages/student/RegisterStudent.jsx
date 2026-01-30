import React, { useState } from 'react';
import { User, Mail, Lock, Calendar, Hash, ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useExamsyAuth } from '../../hooks/useExamsyAuth.js';
import GoogleAuthButton from '../../components/forms/GoogleAuthButton.jsx';
import { InputField, SelectField } from '../../components/forms/FormHelpers.jsx';
import AuthLayout from '../../components/auth/AuthLayout.jsx';
import AuthHeader from '../../components/auth/AuthHeader.jsx';

const RegisterStudent = () => {
    const [step, setStep] = useState(1);
    const { login } = useExamsyAuth(() => setStep(2));

    return (
        <AuthLayout
            image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80"
            quote="The beautiful thing about learning is that no one can take it away from you."
            author="B.B. King"
        >
            <AuthHeader
                badgeIcon={GraduationCap}
                badgeText="Student Account"
                title="Create Your Account"
                subtitle={`Step ${step} of 2: ${step === 1 ? 'Basic Information' : 'Academic Profile'}`}
            />

            {/* Stable height container to prevent height-jump and scrollbars */}
            <div className="min-h-[330px]">
                {step === 1 ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                            <InputField label="Full Name" icon={<User size={18} />} id="fullname" type="text" placeholder="John Doe" />
                            <InputField label="Email" icon={<Mail size={18} />} id="email" type="email" placeholder="john@example.com" />
                            <InputField label="Username" icon={<Hash size={18} />} id="username" type="text" placeholder="johndoe_1" />
                            <InputField label="Password" icon={<Lock size={18} />} id="password" type="password" placeholder="••••••••" />
                        </div>
                        <button onClick={() => setStep(2)} className="w-full bg-examsy-primary text-white h-12 rounded-2xl font-bold text-base shadow-lg shadow-examsy-primary/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]">
                            Next Step <ArrowRight size={20} />
                        </button>
                        <div className="relative flex items-center gap-4 my-5 text-center">
                            <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
                            <span className="text-examsy-muted text-[10px] font-black uppercase tracking-widest">Or sign up with</span>
                            <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
                        </div>
                        <GoogleAuthButton onClick={login} />
                    </div>
                ) : (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                            <InputField label="Index Number" icon={<Hash size={18} />} id="index" type="text" placeholder="STU/2026/001" />
                            <InputField label="Date of Birth" icon={<Calendar size={18} />} id="dob" type="date" />
                            <SelectField label="Gender" id="gender" options={['Male', 'Female', 'Other']} />
                            <SelectField label="Grade" id="grade" options={['Grade 10', 'Grade 11', 'Advanced Level', 'University']} />
                        </div>
                        <button className="w-full bg-examsy-primary text-white h-12 rounded-2xl font-bold text-base shadow-lg shadow-examsy-primary/20 transition-all hover:scale-[1.01]">
                            Complete Registration
                        </button>
                        <button onClick={() => setStep(1)} className="w-full text-xs text-examsy-muted font-bold hover:text-examsy-text transition-colors mt-2">
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

export default RegisterStudent;