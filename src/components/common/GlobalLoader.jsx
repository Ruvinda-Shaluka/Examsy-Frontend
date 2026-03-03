import React from 'react';
import { Hexagon, Sparkles } from 'lucide-react';

const GlobalLoader = ({ message = "Loading Examsy..." }) => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-examsy-bg/80 backdrop-blur-md transition-all duration-300">

            {/* Logo Animation Container */}
            <div className="relative flex items-center justify-center mb-8">
                {/* Background Glow */}
                <div className="absolute w-32 h-32 bg-examsy-primary/20 rounded-full blur-2xl animate-pulse" />

                {/* Spinning Hexagon Outlines */}
                <div className="absolute w-20 h-20 text-examsy-primary/30 animate-[spin_3s_linear_infinite]">
                    <Hexagon size={80} strokeWidth={1} />
                </div>
                <div className="absolute w-24 h-24 text-examsy-primary/10 animate-[spin_4s_linear_infinite_reverse]">
                    <Hexagon size={96} strokeWidth={1} />
                </div>

                {/* Main Static Hexagon with Pulse */}
                <div className="relative z-10 text-examsy-primary animate-bounce shadow-examsy-primary/50 drop-shadow-2xl">
                    <Hexagon size={48} strokeWidth={2.5} fill="currentColor" className="text-examsy-primary" />
                    {/* Inner Sparkle */}
                    <Sparkles
                        size={16}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white animate-pulse"
                    />
                </div>
            </div>

            {/* Loading Text */}
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-xl font-black text-examsy-text tracking-tight flex items-center gap-1">
                    {message}
                    <span className="flex gap-0.5 ml-1">
                        <span className="animate-[bounce_1s_infinite_0ms] text-examsy-primary">.</span>
                        <span className="animate-[bounce_1s_infinite_200ms] text-examsy-primary">.</span>
                        <span className="animate-[bounce_1s_infinite_400ms] text-examsy-primary">.</span>
                    </span>
                </h2>
                <p className="text-xs font-bold text-examsy-muted uppercase tracking-widest">
                    Please wait a moment
                </p>
            </div>
        </div>
    );
};

export default GlobalLoader;