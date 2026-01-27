import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

const RegisterTeacher = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleGoogleSuccess = (response) => {
        setIsLoggedIn(true);
    };

    return (
        <div className="min-h-screen bg-examsy-bg text-examsy-text py-12 px-4 transition-colors duration-300">
            <div className="relative max-w-xl mx-auto">
                <div className="relative px-4 py-10 bg-examsy-surface shadow-2xl rounded-3xl sm:p-10 border border-zinc-200 dark:border-zinc-800">
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-extrabold text-examsy-primary">Teacher Onboarding</h1>
                            <p className="text-examsy-muted mt-2">Create exams and manage your classes.</p>
                        </div>

                        {!isLoggedIn ? (
                            <div className="flex flex-col items-center justify-center py-10">
                                <GoogleLogin onSuccess={handleGoogleSuccess} theme="filled_blue" shape="pill" />
                            </div>
                        ) : (
                            <form className="mt-5 space-y-4 animate-in fade-in duration-500">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <InputGroup label="Full Name" id="t-name" type="text" placeholder="Prof. Anderson" />
                                    <InputGroup label="Instructor ID" id="t-id" type="text" placeholder="EDU-990" />
                                    <InputGroup label="Specialization" id="t-subject" type="text" placeholder="Advanced Java" />
                                    <InputGroup label="Department" id="t-dept" type="text" placeholder="Computer Science" />
                                </div>
                                <div className="mt-8">
                                    <button type="submit" className="w-full py-3 bg-examsy-primary text-white font-bold rounded-xl hover:opacity-90 transition">
                                        Access Teacher Dashboard
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputGroup = ({ label, id, type, placeholder }) => (
    <div>
        <label className="font-semibold text-sm text-examsy-muted pb-1 block" htmlFor={id}>{label}</label>
        <input
            className="bg-examsy-bg border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-examsy-primary outline-none text-examsy-text placeholder:opacity-50"
            type={type}
            id={id}
            placeholder={placeholder}
        />
    </div>
);

export default RegisterTeacher;