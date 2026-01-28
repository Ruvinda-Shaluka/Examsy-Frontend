import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, MousePointer2, Zap, ArrowRight } from 'lucide-react';
import ToggleButton from '../components/ToggleButton.jsx';
import TextPressure from '../components/TextPressure.jsx';
import LandingPageFooter from "../components/LandingPageFooter.jsx";
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';
import { useTheme } from '../hooks/useTheme.jsx';

const FeatureCard = ({ icon, title, desc }) => (
    <div className="h-[360px] w-full flex flex-col items-center justify-center text-center p-8 bg-examsy-bg rounded-[40px] border border-zinc-200 dark:border-zinc-800 shadow-xl transition-colors duration-500">
        <div className="text-examsy-primary mb-5">
            {React.cloneElement(icon, { size: 44 })}
        </div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-examsy-muted text-base leading-relaxed max-w-sm">{desc}</p>
    </div>
);

const LandingPage = () => {
    const { theme } = useTheme();

    return (
        <div className="bg-examsy-bg min-h-screen text-examsy-text transition-colors duration-500">
            {/* Navbar - Fixed height used for pinning reference (h-20) */}
            <nav className="h-20 p-4 bg-examsy-surface/80 backdrop-blur-md text-examsy-text flex justify-between items-center shadow-md sticky top-0 z-[100] border-b border-white/5">
                <div style={{ position: 'relative', height: '48px', width: '150px' }}>
                    <TextPressure
                        text="Examsy !"
                        flex alpha={false} stroke={false} width weight={false} italic
                        textColor="#465ed2" strokeColor="#5227FF" minFontSize={28}
                    />
                </div>
                <div className="flex items-center">
                    <Link to="/register-student" className="mr-6 font-semibold hover:text-examsy-primary">Student</Link>
                    <Link to="/register-teacher" className="mr-6 font-semibold hover:text-examsy-primary">Teacher</Link>
                    <ToggleButton />
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="relative pt-24 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-examsy-primary/10 blur-[120px] rounded-full -z-10 opacity-50"></div>
                <div className="container mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-examsy-primary/10 border border-examsy-primary/20 text-examsy-primary text-sm font-medium mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-examsy-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-examsy-primary"></span>
                        </span>
                        New: AI-Powered OCR for Handwritten Exams
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
                        The Future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-examsy-primary to-indigo-400">Classroom Management</span>
                    </h1>
                    <p className="text-xl text-examsy-muted mb-12 max-w-2xl mx-auto leading-relaxed">
                        <span className="font-bold text-examsy-text">Examsy</span> is an all-in-one platform to conduct exams, manage classes, and track student growth with effortless automation.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                        <Link to="/register-teacher" className="px-8 py-4 bg-examsy-primary hover:bg-examsy-primary/90 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-examsy-primary/20 group">
                            Start for Free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/register-student" className="px-8 py-4 bg-examsy-surface border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-2xl font-bold flex items-center gap-2 transition-all">
                            Find Your Classes
                        </Link>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE SECTION - THE FIX IS HERE */}
            <section className="relative bg-examsy-surface">
                <div className="container mx-auto px-6">
                    {/* Sticky Header: Pins exactly below the 5rem (h-20) navbar.
                        'z-50' ensures it stays above cards until they stack.
                    */}
                    <div className="sticky top-20 z-50 pt-12 pb-8 bg-examsy-surface flex flex-col items-center text-center">
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <h2 className="text-4xl font-bold">Why Choose</h2>
                            <div className="h-[60px] w-[220px] relative">
                                <TextPressure
                                    text="Examsy ?"
                                    flex alpha={false} stroke={false} width weight={false} italic
                                    textColor={theme === 'dark' ? '#fff' : '#000'}
                                    strokeColor="#5227FF"
                                    minFontSize={40}
                                />
                            </div>
                        </div>
                        <p className="text-examsy-muted mt-4 max-w-xl">
                            Experience a smarter way to prepare. Our platform is built to stack the odds in your favor, one module at a time.
                        </p>
                    </div>

                    {/* SCROLLABLE STACK AREA */}
                    <div className="max-w-4xl mx-auto pb-24">
                        <ScrollStack
                            itemStackDistance={18}
                            stackPosition="50%" // Pins cards in the center of the viewport
                            baseScale={0.98}
                            blurAmount={3}
                        >
                            <ScrollStackItem>
                                <FeatureCard icon={<MousePointer2 />} title="Interactive Exams" desc="Engage students with dynamic MCQs and real-time feedback loops." />
                            </ScrollStackItem>
                            <ScrollStackItem>
                                <FeatureCard icon={<Zap />} title="AI-Powered OCR" desc="Digitize and grade handwritten papers in seconds with custom AI." />
                            </ScrollStackItem>
                            <ScrollStackItem>
                                <FeatureCard icon={<BarChart3 />} title="Classroom Analytics" desc="Gain deep insights into performance and identify learning gaps." />
                            </ScrollStackItem>
                        </ScrollStack>
                    </div>
                </div>
            </section>

            <LandingPageFooter />
        </div>
    );
};

export default LandingPage;