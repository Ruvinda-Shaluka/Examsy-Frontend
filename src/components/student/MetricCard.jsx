import React from 'react';

/**
 * MetricCard Component
 * Used to display key performance indicators (KPIs) like GPA,
 * total exams, or credits with a consistent brand look.
 */
const MetricCard = ({ icon, label, value, subValue }) => {
    return (
        <div className="bg-examsy-surface p-6 rounded-[32px] border border-zinc-200 dark:border-zinc-800 flex items-center gap-5 group hover:border-examsy-primary transition-all duration-300 shadow-sm hover:shadow-xl">
            {/* Icon Container - Uses primary color with 10% opacity */}
            <div className="w-14 h-14 bg-examsy-primary/10 text-examsy-primary rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                {/* If an icon is provided, render it; otherwise, default to the value's first char */}
                {icon ? (
                    React.cloneElement(icon, { size: 24 })
                ) : (
                    <span className="text-xl font-black">{String(value).charAt(0)}</span>
                )}
            </div>

            <div className="flex flex-col">
                {/* Label: Small, black-weighted, uppercase for a professional dashboard feel */}
                <p className="text-[10px] font-black uppercase tracking-widest text-examsy-muted mb-1 leading-none">
                    {label}
                </p>

                <div className="flex items-baseline gap-2">
                    {/* Main Value */}
                    <h4 className="text-2xl font-black text-examsy-text leading-none tracking-tight">
                        {value}
                    </h4>

                    {/* Optional sub-value (e.g., "+0.2 this month") */}
                    {subValue && (
                        <span className="text-xs font-bold text-emerald-500">
              {subValue}
            </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MetricCard;