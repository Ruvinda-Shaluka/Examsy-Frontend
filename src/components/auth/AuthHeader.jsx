import React from 'react';

const AuthHeader = ({ badgeIcon: Icon, badgeText, title, subtitle }) => (
    <div className="text-center lg:text-left mb-6 min-h-[100px]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-examsy-primary/10 text-examsy-primary text-[10px] font-black uppercase tracking-[0.2em] mb-3">
            {Icon && <Icon size={14}/>} {badgeText}
        </div>
        <h1 className="text-3xl font-black text-examsy-text mb-1 tracking-tight">{title}</h1>
        <p className="text-examsy-muted text-sm font-bold">{subtitle}</p>
    </div>
);

export default AuthHeader;