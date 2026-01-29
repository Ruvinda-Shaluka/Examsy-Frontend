import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import TextPressure from '../logo/TextPressure.jsx';
import { useTheme } from '../../hooks/useTheme.jsx';

const AuthLayout = ({ children, image, quote, author }) => {
    const { theme } = useTheme();

    return (
        <div className="min-h-screen w-full flex bg-examsy-bg transition-colors duration-500 relative overflow-hidden">
            {/* Return Button */}
            <Link to="/" className="absolute top-4 left-6 z-[110] flex items-center gap-2 px-4 py-2 bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-xl text-examsy-muted hover:text-examsy-primary transition-all shadow-sm">
                <ChevronLeft size={18} />
                <span className="font-bold text-xs">Return to Home</span>
            </Link>

            {/* Left Branding - Balanced Height */}
            <div className="hidden lg:flex w-5/12 bg-examsy-surface relative overflow-hidden items-center justify-center p-12 lg:p-16 border-r border-white/5">
                <div className="absolute top-0 left-0 w-full h-full bg-examsy-primary/5 blur-[150px] -z-10"></div>
                <div className="w-full max-w-md flex flex-col items-start z-10 relative">
                    <div className="mb-6 relative h-[50px] w-[180px]">
                        <TextPressure text="Examsy !" flex alpha={false} stroke={false} width weight={false} italic textColor={theme === 'dark' ? '#fff' : '#465ed2'} strokeColor="#5227FF" minFontSize={32} />
                    </div>
                    {/* Reduced Image height to h-64 to match the shorter form side */}
                    <img src={image} alt="Branding" className="w-full h-64 object-cover rounded-3xl shadow-2xl mb-8 border border-white/10 opacity-90" />
                    <h2 className="text-2xl font-bold text-examsy-text mb-3 leading-tight">Empower Your Future.</h2>
                    <div className="space-y-1.5">
                        <p className="text-base text-examsy-muted leading-relaxed italic">"{quote}"</p>
                        <p className="text-examsy-primary font-bold tracking-widest text-xs uppercase">— {author}</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Optimized Padding to remove scrollbar */}
            <div className="w-full lg:w-7/12 flex flex-col justify-center items-center p-6 relative">
                <div className="w-full max-w-[520px] mx-auto py-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;