import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ToggleButton from './ToggleButton.jsx';
import TextPressure from '../logo/TextPressure.jsx';
import { useTheme } from '../../hooks/useTheme.jsx';

const LandingNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Body scroll lock remains here
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    }, [isMenuOpen]);

    return (
        <nav className="h-20 p-4 bg-examsy-surface text-examsy-text flex justify-between items-center shadow-md sticky top-0 z-[150] border-b border-white/5">
            {/* Logo */}
            <div style={{ position: 'relative', height: '48px', width: '150px' }}>
                <TextPressure
                    text="Examsy !"
                    flex alpha={false} stroke={false} width weight={false} italic
                    textColor="#465ed2" strokeColor="#5227FF" minFontSize={28}
                />
            </div>

            {/* --- DESKTOP NAVIGATION --- */}
            <div className="hidden md:flex items-center gap-6">
                <Link to="/login" className="font-semibold hover:text-examsy-primary transition-colors">Login</Link>
                <Link to="/register-student" className="font-semibold hover:text-examsy-primary transition-colors">Student</Link>
                <Link to="/register-teacher" className="font-semibold hover:text-examsy-primary transition-colors">Teacher</Link>
                <div className="pl-2 border-l border-zinc-200 dark:border-zinc-800">
                    {/* The clock is now inside this component */}
                    <ToggleButton />
                </div>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="md:hidden flex items-center z-[210]">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2.5 text-examsy-primary bg-examsy-surface rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
                >
                    {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* --- SOLID OPAQUE MOBILE MENU --- */}
            <div className={`fixed inset-0 z-[200] md:hidden transition-all duration-500 ease-in-out ${
                isMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
            }`}>
                <div className="absolute inset-0 bg-examsy-bg transition-colors duration-500" />

                <div className="relative flex flex-col h-full pt-24 px-8">
                    {/* Navigation Links */}
                    <div className="flex flex-col justify-center items-center gap-2 w-full">
                        <Link onClick={() => setIsMenuOpen(false)} to="/login" className="w-full text-center text-4xl font-black py-6 border-b border-zinc-200/20 dark:border-zinc-800/20 hover:text-examsy-primary">Login</Link>
                        <Link onClick={() => setIsMenuOpen(false)} to="/register-student" className="w-full text-center text-4xl font-black py-6 border-b border-zinc-200/20 dark:border-zinc-800/20 hover:text-examsy-primary">Student</Link>
                        <Link onClick={() => setIsMenuOpen(false)} to="/register-teacher" className="w-full text-center text-4xl font-black py-6 hover:text-examsy-primary">Teacher</Link>
                    </div>

                    {/* Bottom Status Card */}
                    <div className="mt-auto mb-16 w-full flex justify-center">
                        <div className="p-6 bg-examsy-surface rounded-[32px] border border-zinc-200 dark:border-zinc-800 shadow-2xl scale-110">
                            {/* ToggleButton now handles the mobile time display too */}
                            <ToggleButton />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default LandingNavbar;