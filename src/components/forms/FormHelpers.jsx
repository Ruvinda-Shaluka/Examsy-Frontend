import React from 'react';

// 1. Added value, onChange, and required to the props list here
export const InputField = ({ label, icon, id, type, placeholder, value, onChange, required }) => (
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

                // 2. Bound the React state to the HTML input here!
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    </div>
);

// 1. Added value, onChange, and required here too
export const SelectField = ({ label, id, options, value, onChange, required }) => (
    <div className="flex flex-col">
        <label className="font-bold text-[11px] text-examsy-muted uppercase tracking-widest pb-1.5" htmlFor={id}>
            {label}
        </label>
        <select
            id={id}
            className="bg-examsy-bg border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 text-sm focus:ring-4 focus:ring-examsy-primary/10 outline-none text-examsy-text transition-all duration-300 cursor-pointer"

            // 2. Bound the React state to the HTML select here!
            value={value}
            onChange={onChange}
            required={required}
        >
            {/* Note: I removed .toLowerCase() from the value.
                If the user selects "Grade 10", we want to send exactly "Grade 10" to Spring Boot,
                not "grade 10", so it matches your backend perfectly. */}
            {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);