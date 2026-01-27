import React, { useState } from 'react';
import { User, Mail, Lock, Calendar, Hash, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useExamsyAuth } from '../hooks/useExamsyAuth';
import GoogleAuthButton from '../components/GoogleAuthButton';
import { InputField, SelectField } from '../components/FormHelpers';

const RegisterStudent = () => {
    const [step, setStep] = useState(1);

    // Google Auth Hook triggers Step 2 on success
    const { login } = useExamsyAuth(() => setStep(2));

    return (
        <div className="min-h-screen bg-examsy-bg text-examsy-text transition-colors duration-500 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-xl bg-examsy-surface rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-colors duration-500">
                <div className="p-8 sm:p-10">

                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-extrabold tracking-tight">Join as a Student</h2>
                            <p className="text-examsy-muted mt-1">Start your journey with Examsy today.</p>
                        </div>
                        <Link to="/" className="p-2 hover:bg-examsy-bg rounded-full transition-colors text-examsy-muted">
                            <X size={20} />
                        </Link>
                    </div>

                    {step === 1 ? (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputField label="Full Name" icon={<User size={18} />} id="fullname" type="text" placeholder="John Doe" />
                                <InputField label="Email" icon={<Mail size={18} />} id="email" type="email" placeholder="john@example.com" />
                                <InputField label="Username" icon={<Hash size={18} />} id="username" type="text" placeholder="johndoe_1" />
                                <InputField label="Password" icon={<Lock size={18} />} id="password" type="password" placeholder="••••••••" />
                            </div>

                            <button className="w-full bg-examsy-primary text-white py-3 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2">
                                Create Account <ArrowRight size={18} />
                            </button>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-zinc-200 dark:border-zinc-800"></span>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase text-examsy-muted font-bold">
                                    <span className="bg-examsy-surface px-4">Or sign up with</span>
                                </div>
                            </div>

                            <GoogleAuthButton onClick={login} />
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputField label="Index Number" icon={<Hash size={18} />} id="index" type="text" placeholder="STU/2026/001" />
                                <InputField label="Date of Birth" icon={<Calendar size={18} />} id="dob" type="date" />
                                <SelectField label="Gender" id="gender" options={['Male', 'Female', 'Other']} />
                                <SelectField label="Grade" id="grade" options={['Grade 10', 'Grade 11', 'Advanced Level', 'University']} />
                            </div>
                            <button className="w-full bg-examsy-primary text-white py-4 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-indigo-500/20 text-lg">
                                Complete Registration
                            </button>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-center">
                        <p className="text-sm text-examsy-muted">
                            Already have an account? <Link to="/login" className="text-examsy-primary font-bold hover:underline">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterStudent; // CRITICAL: This was missing!