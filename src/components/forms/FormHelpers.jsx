import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const InputField = ({ label, icon, id, type, placeholder, value, onChange, required, readOnly }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const currentType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="flex flex-col">
            <label className="font-bold text-[11px] text-examsy-muted uppercase tracking-widest pb-1.5 flex items-center gap-2" htmlFor={id}>
                {label}
            </label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                    {icon}
                </div>
                <input
                    className={`w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-700 rounded-2xl pl-14 py-3 text-sm focus:ring-4 focus:ring-examsy-primary/10 outline-none text-examsy-text transition-all duration-300 placeholder-examsy-muted/30 ${isPassword ? 'pr-12' : 'pr-4'} ${readOnly ? 'opacity-60 cursor-not-allowed select-none' : ''}`}
                    type={currentType}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    readOnly={readOnly}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-examsy-primary transition-colors focus:outline-none"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
        </div>
    );
};

export const SelectField = ({ label, id, options, value, onChange, required }) => (
    <div className="flex flex-col">
        <label className="font-bold text-[11px] text-examsy-muted uppercase tracking-widest pb-1.5" htmlFor={id}>
            {label}
        </label>
        <select
            id={id}
            className="bg-examsy-bg border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 text-sm focus:ring-4 focus:ring-examsy-primary/10 outline-none text-examsy-text transition-all duration-300 cursor-pointer"
            value={value}
            onChange={onChange}
            required={required}
        >
            {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);