import React, { useState } from 'react';
import { User, Mail, Lock, Calendar, Hash, ArrowRight, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useExamsyAuth } from '../../hooks/useExamsyAuth.js';
import GoogleAuthButton from '../../components/forms/GoogleAuthButton.jsx';
import { InputField, SelectField } from '../../components/forms/FormHelpers.jsx';
import AuthLayout from '../../components/auth/AuthLayout.jsx';
import AuthHeader from '../../components/auth/AuthHeader.jsx';
import { authService } from '../../services/authService.js';
import customAlert from "../../components/common/CustomAlert.jsx"; // Ensure this path is correct

const RegisterStudent = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useExamsyAuth(() => setStep(2));

    // 1. Memory Bank for the Form
    const [formData, setFormData] = useState({
        fullName: '', email: '', username: '', password: '',
        indexNumber: '', dateOfBirth: '', gender: 'Male', grade: 'Grade 10'
    });

    // 2. Universal Change Handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // 3. Submission Logic
    const handleCompleteRegistration = async () => {
        setError('');
        setIsLoading(true);
        try {
            await authService.registerStudent(formData);
            // alert("Registration successful! Please log in.");
            customAlert(
                {
                    type: 'success',
                    title: 'Registration Successful',
                    message: 'Your account has been created. Please log in to continue.',
                }
            )
            navigate('/login'); // Redirect to login on success
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Registration failed. Please check your details.");
        } finally {
            setIsLoading(false);
        }
    };

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

            <div className="min-h-[330px]">
                {/* Display Error Message if Registration Fails */}
                {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-bold text-center">{error}</div>}

                {step === 1 ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                            {/* Notice the ids match the formData keys! */}
                            <InputField label="Full Name" icon={<User size={18} />} id="fullName" value={formData.fullName} onChange={handleChange} type="text" placeholder="John Doe" />
                            <InputField label="Email" icon={<Mail size={18} />} id="email" value={formData.email} onChange={handleChange} type="email" placeholder="john@example.com" />
                            <InputField label="Username" icon={<Hash size={18} />} id="username" value={formData.username} onChange={handleChange} type="text" placeholder="johndoe_1" />
                            <InputField label="Password" icon={<Lock size={18} />} id="password" value={formData.password} onChange={handleChange} type="password" placeholder="••••••••" />
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
                            <InputField label="Index Number" icon={<Hash size={18} />} id="indexNumber" value={formData.indexNumber} onChange={handleChange} type="text" placeholder="STU/2026/001" />
                            <InputField label="Date of Birth" icon={<Calendar size={18} />} id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} type="date" />
                            <SelectField label="Gender" id="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
                            <SelectField label="Grade" id="grade" value={formData.grade} onChange={handleChange} options={['Grade 10', 'Grade 11', 'Advanced Level', 'University']} />
                        </div>
                        <button onClick={handleCompleteRegistration} disabled={isLoading} className="w-full bg-examsy-primary text-white h-12 rounded-2xl font-bold text-base shadow-lg shadow-examsy-primary/20 transition-all hover:scale-[1.01] disabled:opacity-50">
                            {isLoading ? 'Creating Account...' : 'Complete Registration'}
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

export default RegisterStudent;