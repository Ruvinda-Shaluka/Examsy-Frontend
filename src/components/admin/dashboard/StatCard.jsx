import React from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

const StatCard = ({ label, value, change, icon: Icon, color, onClick }) => {
    // If the change string starts with '+', it's positive (green). Otherwise, it's negative/warning (red).
    const isPositive = change.startsWith('+');
    const isClickable = !!onClick;

    return (
        <div
            onClick={onClick}
            className={`relative overflow-hidden bg-examsy-surface p-6 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300 group ${
                isClickable ? 'cursor-pointer hover:-translate-y-1.5 hover:shadow-xl hover:border-red-500/30' : 'hover:-translate-y-1 hover:shadow-md'
            }`}
        >
            {/* Subtle background glow effect on hover */}
            <div className="absolute -inset-4 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem] pointer-events-none"></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-3 rounded-2xl text-white shadow-lg ${color}`}>
                    <Icon size={24} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg flex items-center gap-1 ${
                    isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                }`}>
                    {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {change}
                </span>
            </div>

            <div className="relative z-10 flex items-end justify-between">
                <div>
                    <h3 className="text-4xl font-black text-examsy-text tracking-tight mb-1">{value}</h3>
                    <p className="text-sm font-bold text-examsy-muted">{label}</p>
                </div>

                {/* If clickable, show a little arrow on hover */}
                {isClickable && (
                    <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-red-500 pb-1">
                        <ArrowRight size={20} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;