import React from 'react';

/**
 * Reusable Input Field with Icon support
 * Responsive to Examsy Dark/Light theme
 */
export const InputField = ({ label, icon, id, type, placeholder }) => (
    <div className="flex flex-col">
        <label className="font-semibold text-xs text-examsy-muted uppercase tracking-wider pb-2 flex items-center gap-2" htmlFor={id}>
            {label}
        </label>
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                {icon}
            </div>
            <input
                className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-700 rounded-xl pl-14 pr-4 py-3 text-sm focus:ring-2 focus:ring-examsy-primary outline-none text-examsy-text transition-all duration-300"
                type={type}
                id={id}
                placeholder={placeholder}
            />
        </div>
    </div>
);

/**
 * Reusable Select Dropdown
 * Essential for collecting Grade/Gender data
 */
export const SelectField = ({ label, id, options }) => (
    <div className="flex flex-col">
        <label className="font-semibold text-xs text-examsy-muted uppercase tracking-wider pb-2" htmlFor={id}>
            {label}
        </label>
        <select
            id={id}
            className="bg-examsy-bg border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-examsy-primary outline-none text-examsy-text transition-all duration-300 cursor-pointer"
        >
            {options.map(opt => (
                <option key={opt} value={opt.toLowerCase()}>
                    {opt}
                </option>
            ))}
        </select>
    </div>
);