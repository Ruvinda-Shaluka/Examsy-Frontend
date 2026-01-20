import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, BarChart3, Users, MousePointer2, Clock, Twitter, Linkedin, Github } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-examsy-bg text-examsy-text transition-colors duration-300">

            {/* HERO SECTION */}
            <section className="pt-24 pb-20 px-6">
                <div className="container mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-examsy-primary/10 text-examsy-primary text-sm font-bold mb-6">
                        <Zap size={14} /> NEW: AI-Powered OCR Grading
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                        The Future of Classroom Management
                    </h1>
                    <p className="text-lg text-examsy-muted mb-10 max-w-2xl mx-auto">
                        Examsy is an all-in-one platform to conduct exams, manage classes, and track student progress with powerful analytics.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/register-teacher" className="px-8 py-3 bg-examsy-primary text-white font-bold rounded-lg hover:bg-examsy-primary/90 transition-all">
                            Get Started
                        </Link>
                        <Link to="/register-student" className="px-8 py-3 bg-examsy-surface border border-zinc-200 dark:border-zinc-700 font-bold rounded-lg hover:bg-examsy-surface/80 transition-all">
                            Join a Class
                        </Link>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="py-24 bg-examsy-surface/50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold mb-4">Why Choose Examsy?</h2>
                        <p className="text-examsy-muted">
                            From interactive online exams to automated grading of handwritten papers, we provide the tools you need to build a smarter classroom.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <FeatureCard
                            icon={<MousePointer2 size={32} className="text-examsy-primary" />}
                            title="Interactive Exams"
                            desc="Engage students with dynamic MCQs and receive instant results and performance reports."
                        />
                        <FeatureCard
                            icon={<Zap size={32} className="text-examsy-primary" />}
                            title="AI-Powered OCR"
                            desc="Automatically digitize and grade handwritten exam papers, saving you hours of manual work."
                        />
                        <FeatureCard
                            icon={<BarChart3 size={32} className="text-examsy-primary" />}
                            title="Classroom Analytics"
                            desc="Gain insights into student performance with detailed analytics and progress tracking."
                        />
                    </div>
                </div>
            </section>
            
            {/* FOOTER */}
            <footer className="py-12 bg-examsy-surface/30">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-examsy-muted mb-4">&copy; {new Date().getFullYear()} Examsy. All rights reserved.</p>
                    <div className="flex justify-center gap-6">
                        <a href="#" className="text-examsy-muted hover:text-examsy-primary"><Twitter /></a>
                        <a href="#" className="text-examsy-muted hover:text-examsy-primary"><Linkedin /></a>
                        <a href="#" className="text-examsy-muted hover:text-examsy-primary"><Github /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="p-8 bg-examsy-surface rounded-2xl border border-transparent hover:border-examsy-primary/20 hover:shadow-xl transition-all duration-300">
        <div className="w-16 h-16 bg-examsy-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-examsy-muted leading-relaxed">
            {desc}
        </p>
    </div>
);

export default LandingPage;