import React from 'react';

export const InputField = ({ label, icon, id, type, placeholder }) => (
    <div className="flex flex-col">
        <label className="font-bold text-[11px] text-examsy-muted uppercase tracking-widest pb-1.5 flex items-center gap-2" htmlFor={id}>
            {label}
        </label>
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                {icon}
            </div>
            <input
                className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-700 rounded-2xl pl-14 pr-4 py-3 text-sm focus:ring-4 focus:ring-examsy-primary/10 outline-none text-examsy-text transition-all duration-300 placeholder-examsy-muted/30"
                type={type}
                id={id}
                placeholder={placeholder}
            />
        </div>
    </div>
);

export const SelectField = ({ label, id, options }) => (
    <div className="flex flex-col">
        <label className="font-bold text-[11px] text-examsy-muted uppercase tracking-widest pb-1.5" htmlFor={id}>
            {label}
        </label>
        <select
            id={id}
            className="bg-examsy-bg border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 text-sm focus:ring-4 focus:ring-examsy-primary/10 outline-none text-examsy-text transition-all duration-300 cursor-pointer"
        >
            {options.map(opt => (
                <option key={opt} value={opt.toLowerCase()}>{opt}</option>
            ))}
        </select>
    </div>
);