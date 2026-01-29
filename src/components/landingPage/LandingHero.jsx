import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LandingHero = () => (
    <section className="relative pt-16 md:pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-examsy-primary/10 blur-[120px] rounded-full -z-10 opacity-50" />
        <div className="container mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-examsy-primary/10 border border-examsy-primary/20 text-examsy-primary text-xs md:text-sm font-medium mb-8">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-examsy-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-examsy-primary" />
                </span>
                New: AI-Powered OCR for Handwritten Exams
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
                The Future of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-examsy-primary to-indigo-400">Classroom Management</span>
            </h1>
            <p className="text-base md:text-xl text-examsy-muted mb-12 max-w-2xl mx-auto leading-relaxed px-4">
                <span className="font-bold text-examsy-text">Examsy</span> is an all-in-one platform to conduct exams, manage classes, and track student growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 px-6">
                <Link to="/register-teacher" className="w-full sm:w-auto px-8 py-4 bg-examsy-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg group">
                    Start for Free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl font-bold flex items-center justify-center gap-2">
                    Find Your Classes
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto pt-12 border-t border-zinc-200/10 text-examsy-text">
                <div><div className="text-2xl md:text-3xl font-extrabold mb-1">50+</div><div className="text-examsy-muted text-[10px] md:text-sm uppercase tracking-wider font-semibold">Institutions</div></div>
                <div><div className="text-2xl md:text-3xl font-extrabold mb-1">10k+</div><div className="text-examsy-muted text-[10px] md:text-sm uppercase tracking-wider font-semibold">Students</div></div>
                <div><div className="text-2xl md:text-3xl font-extrabold mb-1">99.9%</div><div className="text-examsy-muted text-[10px] md:text-sm uppercase tracking-wider font-semibold">Uptime</div></div>
                <div><div className="text-2xl md:text-3xl font-extrabold mb-1">24/7</div><div className="text-examsy-muted text-[10px] md:text-sm uppercase tracking-wider font-semibold">Support</div></div>
            </div>
        </div>
    </section>
);

export default LandingHero;