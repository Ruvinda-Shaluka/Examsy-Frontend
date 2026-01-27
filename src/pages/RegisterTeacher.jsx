import React, { useState } from 'react';
import { User, Mail, Lock, Briefcase, BookOpen, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useExamsyAuth } from '../hooks/useExamsyAuth';
import GoogleAuthButton from '../components/GoogleAuthButton';
import { InputField } from '../components/FormHelpers';

const RegisterTeacher = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Google Auth Hook triggers Step 2 (Instructor Details) on success
    const { login } = useExamsyAuth(() => setIsLoggedIn(true));

    return (
        <div className="min-h-screen bg-examsy-bg text-examsy-text transition-colors duration-500 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-xl bg-examsy-surface rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-colors duration-500">
                <div className="p-8 sm:p-10">

                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-extrabold tracking-tight">Teacher Registration</h2>
                            <p className="text-examsy-muted mt-1">Join the faculty to manage exams and students.</p>
                        </div>
                        <Link to="/" className="p-2 hover:bg-examsy-bg rounded-full transition-colors text-examsy-muted">
                            <X size={20} />
                        </Link>
                    </div>

                    {!isLoggedIn ? (
                        <div className="space-y-6">
                            {/* Standard Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputField label="Full Name" icon={<User size={18} />} id="t-name" type="text" placeholder="Dr. Jane Smith" />
                                <InputField label="Work Email" icon={<Mail size={18} />} id="t-email" type="email" placeholder="smith@examsy.edu" />
                                <InputField label="Username" icon={<User size={18} />} id="t-user" type="text" placeholder="jane_teacher" />
                                <InputField label="Password" icon={<Lock size={18} />} id="t-pass" type="password" placeholder="••••••••" />
                            </div>

                            <button className="w-full bg-examsy-primary text-white py-3 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2">
                                Create Teacher Account <ArrowRight size={18} />
                            </button>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-zinc-200 dark:border-zinc-800"></span>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase text-examsy-muted font-bold">
                                    <span className="bg-examsy-surface px-4">Or sign up with</span>
                                </div>
                            </div>

                            <GoogleAuthButton onClick={login} label="Register via Institution Account" />
                        </div>
                    ) : (
                        /* STEP 2: Collecting Specialized Teacher Data */
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputField label="Instructor ID" icon={<Briefcase size={18} />} id="t-id" type="text" placeholder="EMP-2026-X" />
                                <InputField label="Specialization" icon={<BookOpen size={18} />} id="t-sub" type="text" placeholder="Java / Physics" />
                            </div>

                            <p className="text-xs text-examsy-muted italic leading-relaxed">
                                Note: Your Instructor ID will be used to verify your authority to create exams and manage student rankings.
                            </p>

                            <button className="w-full bg-examsy-primary text-white py-4 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-indigo-500/20 text-lg">
                                Access Teacher Dashboard
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

export default RegisterTeacher;