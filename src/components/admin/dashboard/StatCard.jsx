import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ label, value, change, icon: Icon, color }) => {
    const isPositive = change.startsWith('+');

    return (
        <div className="bg-examsy-surface p-6 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl text-white shadow-lg ${color}`}>
                    <Icon size={24} />
                </div>
                <span className={`text-xs font-black px-2 py-1 rounded-lg flex items-center gap-1 ${
                    isPositive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
                }`}>
                    {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {change}
                </span>
            </div>
            <div>
                <h3 className="text-3xl font-black text-examsy-text tracking-tight">{value}</h3>
                <p className="text-sm font-bold text-examsy-muted mt-1">{label}</p>
            </div>
        </div>
    );
};

export default StatCard;