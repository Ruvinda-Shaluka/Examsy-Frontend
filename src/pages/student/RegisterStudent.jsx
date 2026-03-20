import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Calendar, Hash, ArrowRight, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useExamsyAuth } from '../../hooks/useExamsyAuth.js';
import GoogleAuthButton from '../../components/forms/GoogleAuthButton.jsx';
import { InputField, SelectField } from '../../components/forms/FormHelpers.jsx';
import AuthLayout from '../../components/auth/AuthLayout.jsx';
import AuthHeader from '../../components/auth/AuthHeader.jsx';
import { authService } from '../../services/authService.js';
import CustomAlert from "../../components/common/CustomAlert.jsx";

// Helper function to generate a unique Student Index Number
const generateStudentIndexNumber = () => {
    const year = new Date().getFullYear();
    const uniqueHash = Date.now().toString(36).toUpperCase();
    return `STU-${year}-${uniqueHash}`;
};

const RegisterStudent = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [alert, setAlert] = useState(null);
    const { login } = useExamsyAuth(() => setStep(2));

    const [formData, setFormData] = useState({
        fullName: '', email: '', username: '', password: '',
        indexNumber: '', dateOfBirth: '', gender: 'Male', grade: 'Grade 10'
    });

    // Automatically generate the ID the millisecond the component loads
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            indexNumber: generateStudentIndexNumber()
        }));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleCompleteRegistration = async () => {
        setAlert(null);
        setIsLoading(true);
        try {
            await authService.registerStudent(formData);

            setAlert({
                type: 'success',
                title: 'Registration Successful',
                message: 'Your account has been created. Please log in to continue.',
                onClose: () => {
                    setAlert(null);
                    navigate('/login');
                }
            });
        } catch (err) {
            console.log(err.response);

            let errorMessage = "Please check your details and try again.";

            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.response?.data?.data) {
                errorMessage = typeof err.response.data.data === 'string'
                    ? err.response.data.data
                    : "Validation failed. Please check your inputs.";
            }

            setAlert({
                type: 'error',
                title: 'Registration Failed',
                message: errorMessage,
                onClose: () => setAlert(null)
            });
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
            {alert && (
                <CustomAlert
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                    onClose={alert.onClose}
                />
            )}

            <AuthHeader
                badgeIcon={GraduationCap}
                badgeText="Student Account"
                title="Create Your Account"
                subtitle={`Step ${step} of 2: ${step === 1 ? 'Basic Information' : 'Academic Profile'}`}
            />

            <div className="min-h-[330px]">
                {step === 1 ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
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
                            {/* 🟢 NEW: readOnly flag added here */}
                            <InputField label="Index Number" icon={<Hash size={18} />} id="indexNumber" value={formData.indexNumber} onChange={handleChange} type="text" placeholder="STU-2026-X" readOnly={true} />
                            <InputField label="Date of Birth" icon={<Calendar size={18} />} id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} type="date" />
                            <SelectField label="Gender" id="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
                            <SelectField label="Grade" id="grade" value={formData.grade} onChange={handleChange} options={['Grade 10', 'Grade 11', 'Advanced Level', 'University']} />
                        </div>

                        <p className="text-xs text-examsy-muted italic leading-relaxed bg-examsy-surface p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <span className="font-black text-examsy-text block mb-1">Enrollment Note:</span>
                            Your Index Number is automatically generated to uniquely identify you across all class sessions and exams.
                        </p>

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