import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

const RegisterStudent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleGoogleSuccess = (response) => {
        console.log("Google Data Received:", response);
        setIsLoggedIn(true); // Reveal the rest of the form
    };

    return (
        <div className="min-h-screen bg-examsy-bg text-examsy-text py-12 px-4 transition-colors duration-300">
            <div className="relative max-w-xl mx-auto">
                <div className="relative px-4 py-10 bg-examsy-surface shadow-2xl rounded-3xl sm:p-10 border border-zinc-200 dark:border-zinc-800">
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-extrabold text-examsy-primary">Student Registration</h1>
                            <p className="text-examsy-muted mt-2">Join your classrooms and track your progress.</p>
                        </div>

                        {!isLoggedIn ? (
                            <div className="flex flex-col items-center justify-center py-10 space-y-6">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    theme="filled_blue"
                                    shape="pill"
                                    text="continue_with"
                                />
                                <p className="text-xs text-examsy-muted italic text-center">
                                    Login with Google first to secure your academic profile.
                                </p>
                            </div>
                        ) : (
                            <form className="mt-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <InputGroup label="Full Name" id="fullname" type="text" placeholder="John Doe" />
                                    <InputGroup label="Student ID" id="studentid" type="text" placeholder="STU-12345" />
                                    <InputGroup label="Username" id="username" type="text" placeholder="johndoe99" />
                                    <div className="flex flex-col">
                                        <label className="font-semibold text-sm text-examsy-muted pb-1" htmlFor="grade">Grade/Level</label>
                                        <select id="grade" className="bg-examsy-bg border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-examsy-primary outline-none">
                                            <option>Grade 10</option>
                                            <option>Grade 11</option>
                                            <option>A/L Batch</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <button type="submit" className="w-full py-3 bg-examsy-primary text-white font-bold rounded-xl hover:opacity-90 transition shadow-lg shadow-indigo-500/20">
                                        Complete Profile
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

// Reusable Input Component
const InputGroup = ({ label, id, type, placeholder }) => (
    <div>
        <label className="font-semibold text-sm text-examsy-muted pb-1 block" htmlFor={id}>{label}</label>
        <input
            className="bg-examsy-bg border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-examsy-primary outline-none text-examsy-text"
            type={type}
            id={id}
            placeholder={placeholder}
        />
    </div>
);

export default RegisterStudent;