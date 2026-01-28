import React, { useState } from 'react';
import { User, Mail, Lock, Calendar, Hash, ArrowRight, ChevronLeft, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useExamsyAuth } from '../hooks/useExamsyAuth';
import GoogleAuthButton from '../components/GoogleAuthButton';
import { InputField, SelectField } from '../components/FormHelpers';
import TextPressure from '../components/TextPressure.jsx';
import { useTheme } from '../hooks/useTheme.jsx';

const RegisterStudent = () => {
    const { theme } = useTheme();
    const [step, setStep] = useState(1);
    const { login } = useExamsyAuth(() => setStep(2));

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
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                        alt="Students Studying"
                        className="w-full h-64 object-cover rounded-3xl shadow-2xl mb-10 border border-white/10 opacity-90 grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                    />
                    <h2 className="text-3xl font-bold text-examsy-text mb-4 leading-tight">Unlock Your Potential.</h2>
                    <p className="text-lg text-examsy-muted leading-relaxed italic">
                        "The beautiful thing about learning is that no one can take it away from you."
                    </p>
                </div>
            </div>

            {/* --- RIGHT SIDE (Registration Form) --- */}
            <div className="w-full lg:w-7/12 flex items-center justify-center p-6 md:p-12 relative overflow-y-auto">
                <div className="w-full max-w-[550px] mx-auto py-12">
                    <div className="text-center lg:text-left mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-examsy-primary/10 text-examsy-primary text-xs font-bold uppercase tracking-widest mb-4">
                            <GraduationCap size={14}/> Student Account
                        </div>
                        <h1 className="text-4xl font-extrabold text-examsy-text mb-3">Create Your Account</h1>
                        <p className="text-examsy-muted text-lg">Step {step} of 2: {step === 1 ? 'Basic Information' : 'Academic Profile'}</p>
                    </div>

                    {step === 1 ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputField label="Full Name" icon={<User size={18} />} id="fullname" type="text" placeholder="John Doe" />
                                <InputField label="Email" icon={<Mail size={18} />} id="email" type="email" placeholder="john@example.com" />
                                <InputField label="Username" icon={<Hash size={18} />} id="username" type="text" placeholder="johndoe_1" />
                                <InputField label="Password" icon={<Lock size={18} />} id="password" type="password" placeholder="••••••••" />
                            </div>
                            <button onClick={() => setStep(2)} className="w-full bg-examsy-primary text-white h-14 rounded-2xl font-bold text-lg shadow-lg shadow-examsy-primary/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]">
                                Next Step <ArrowRight size={20} />
                            </button>
                            <div className="relative flex items-center gap-4 my-8">
                                <div className="h-px bg-zinc-300 dark:bg-zinc-700 flex-1"></div>
                                <span className="text-examsy-muted text-xs font-bold uppercase">Or sign up with</span>
                                <div className="h-px bg-zinc-300 dark:bg-zinc-700 flex-1"></div>
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
                            <button className="w-full bg-examsy-primary text-white h-14 rounded-2xl font-bold text-lg shadow-lg shadow-examsy-primary/25 transition-all hover:scale-[1.01]">
                                Complete Registration
                            </button>
                            <button onClick={() => setStep(1)} className="w-full text-examsy-muted font-bold hover:text-examsy-text transition-colors">
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

export default RegisterStudent;