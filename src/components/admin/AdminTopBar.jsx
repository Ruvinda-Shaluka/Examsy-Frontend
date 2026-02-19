import React from 'react';
import { Search, Bell, Sun, Moon, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_PROFILE } from '../../data/AdminMockData';
import ToggleButton from "../landingPage/ToggleButton.jsx";

// Assuming you have a theme context, if not, this is a placeholder UI
const ThemeTogglePlaceholder = () => (
    <div className="flex items-center bg-examsy-surface p-1 rounded-full border border-zinc-200 dark:border-zinc-800">
        <button className="p-1 rounded-full text-examsy-muted"><Sun size={16} /></button>
        <button className="p-1 rounded-full bg-examsy-primary text-white"><Moon size={16} /></button>
    </div>
);

const AdminTopBar = () => {
    const navigate = useNavigate();
    // In a real app, get current time dynamically
    const currentTime = "09:41:10 AM";

    return (
        <header className="h-20 px-6 md:px-12 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-examsy-bg z-20">
            {/* Search Bar */}
            <div className="flex items-center gap-3 bg-examsy-surface px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 w-96 shadow-sm">
                <Search size={20} className="text-examsy-muted" />
                <input
                    type="text"
                    placeholder="Search reports, users, or classes..."
                    className="bg-transparent border-none outline-none text-sm font-bold text-examsy-text flex-1 placeholder:text-examsy-muted"
                />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6">
                {/* Time Widget */}
{/*                <div className="hidden md:flex items-center gap-2 bg-examsy-surface px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 font-black text-sm tabular-nums text-examsy-text">
                    <Clock size={16} className="text-examsy-primary" />
                    {currentTime}
                </div>

                 Theme Toggle Placeholder
                <ThemeTogglePlaceholder />*/}
                <ToggleButton/>

                {/* Notification - Redirects to Reports */}
                <button
                    onClick={() => navigate('/admin/reports')}
                    className="p-3 bg-examsy-surface rounded-xl text-examsy-muted hover:text-examsy-primary hover:bg-examsy-primary/10 transition-all relative border border-zinc-200 dark:border-zinc-800"
                >
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Admin Profile - Redirects to Settings */}
                <button
                    onClick={() => navigate('/admin/settings')}
                    className="flex items-center gap-3 bg-examsy-surface pl-4 pr-2 py-2 rounded-[18px] border border-zinc-200 dark:border-zinc-800 hover:border-examsy-primary/50 transition-all group"
                >
                    <div className="text-right hidden md:block">
                        <p className="font-black text-sm text-examsy-text leading-tight group-hover:text-examsy-primary transition-colors">{ADMIN_PROFILE.name}</p>
                        <p className="text-[10px] font-bold text-examsy-muted uppercase tracking-wider">{ADMIN_PROFILE.role}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-examsy-primary flex items-center justify-center text-white font-black text-lg shadow-lg shadow-purple-500/20">
                        {ADMIN_PROFILE.avatar}
                    </div>
                </button>
            </div>
        </header>
    );
};

export default AdminTopBar;