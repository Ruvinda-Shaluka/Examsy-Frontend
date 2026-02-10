import React from 'react';

const MetricCard = ({ icon, value, label }) => (
    <div className="bg-examsy-surface p-4 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 bg-examsy-primary/10 text-examsy-primary rounded-xl flex items-center justify-center font-black">{icon}</div>
        <div>
            <p className="text-sm font-black text-examsy-text">{value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-examsy-muted">{label}</p>
        </div>
    </div>
);

export default MetricCard;

