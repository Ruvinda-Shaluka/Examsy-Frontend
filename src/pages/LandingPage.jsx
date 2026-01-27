import React from 'react';
import {Link} from 'react-router-dom';
import {BarChart3, MousePointer2, Zap} from 'lucide-react';
import ToggleButton from '../components/ToggleButton.jsx';
import TextPressure from '../components/TextPressure.jsx';
import LandingPageFooter from "../components/LandingPageFooter.jsx";
import { useTheme } from '../hooks/useTheme.jsx'; // Import your hook

const LandingPage = () => {
    const { theme } = useTheme(); // Get the current theme status

    return (
        <div className="bg-examsy-bg min-h-screen text-examsy-text transition-colors duration-500">
            <nav className="p-4 bg-examsy-surface text-examsy-text flex justify-between items-center shadow-md transition-colors duration-500">
                <div style={{position: 'relative', height: '48px', width: '150px'}}>
                    <TextPressure
                        text="Examsy !"
                        flex
                        alpha={false}
                        stroke={false}
                        width
                        weight={false}
                        italic
                        textColor={theme === 'dark' ? '#6366f1' : '#465ed2'} // Dynamic color for visibility
                        strokeColor="#5227FF"
                        minFontSize={28}
                    />
                </div>
                <div className="flex items-center">
                    <Link to="/register-student"
                          className="mr-6 font-semibold hover:text-examsy-primary transition-colors">Student</Link>
                    <Link to="/register-teacher"
                          className="mr-6 font-semibold hover:text-examsy-primary transition-colors">Teacher</Link>
                    <ToggleButton/>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="pt-24 pb-20 px-6">
                <div className="container mx-auto text-center">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-examsy-primary/10 text-examsy-primary text-sm font-bold mb-6">
                        <Zap size={14}/> NEW: AI-Powered OCR Grading
                    </div>
                    {/* Explicitly used text-examsy-text for the H1 visibility */}
                    <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-examsy-text">
                        The Future of Classroom Management
                    </h1>
                    <p className="text-lg text-examsy-muted mb-10 max-w-2xl mx-auto">
                        <span className="font-bold">Examsy</span> is an all-in-one platform to conduct exams, manage classes, and track student progress with powerful analytics.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/register-teacher"
                              className="px-8 py-3 bg-examsy-primary text-white font-bold rounded-lg hover:bg-examsy-primary/90 transition-all">
                            Get Started
                        </Link>
                        <Link to="/register-student"
                              className="px-8 py-3 bg-examsy-surface text-examsy-text border border-zinc-200 dark:border-zinc-700 font-bold rounded-lg hover:bg-opacity-80 transition-all">
                            Join a Class
                        </Link>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="py-24 bg-examsy-surface transition-colors duration-500">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2 text-examsy-text">
                            Why Choose
                            <span className="inline-block relative top-[2px]">
                                <TextPressure
                                    text="Examsy ?"
                                    flex
                                    alpha={false}
                                    stroke={false}
                                    width
                                    weight={false}
                                    italic
                                    textColor={theme === 'dark' ? '#f8fafc' : '#0f172a'} // Dynamic visibility
                                    strokeColor="#5227FF"
                                    minFontSize={36}
                                />
                            </span>
                        </h2>
                        <p className="text-examsy-muted">
                            From interactive online exams to automated grading of handwritten papers, we provide the tools you need to build a smarter classroom.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<MousePointer2 size={32} className="text-examsy-primary"/>}
                            title="Interactive Exams"
                            desc="Engage students with dynamic MCQs and receive instant results and performance reports."
                        />
                        <FeatureCard
                            icon={<Zap size={32} className="text-examsy-primary"/>}
                            title="AI-Powered OCR"
                            desc="Automatically digitize and grade handwritten exam papers, saving you hours of manual work."
                        />
                        <FeatureCard
                            icon={<BarChart3 size={32} className="text-examsy-primary"/>}
                            title="Classroom Analytics"
                            desc="Gain insights into student performance with detailed analytics and progress tracking."
                        />
                    </div>
                </div>
            </section>
            <LandingPageFooter/>
        </div>
    );
};

const FeatureCard = ({icon, title, desc}) => (
    <div
        className="p-8 bg-examsy-bg rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-examsy-primary/50 hover:shadow-xl transition-all duration-300">
        <div className="w-16 h-16 bg-examsy-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-examsy-text">{title}</h3>
        <p className="text-examsy-muted leading-relaxed">
            {desc}
        </p>
    </div>
);

export default LandingPage;