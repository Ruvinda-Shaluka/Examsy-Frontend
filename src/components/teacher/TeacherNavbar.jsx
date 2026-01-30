import React from 'react';
import { Search, Bell, Grid, UserCircle } from 'lucide-react';
import ToggleButton from '../landingPage/ToggleButton.jsx';

const TeacherNavbar = ({ toggleSidebar }) => {
    return (
        <header className="h-20 bg-examsy-surface/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-6 flex items-center justify-between sticky top-0 z-[40] transition-colors duration-300">
            {/* Search Section */}
            <div className="flex-1 max-w-2xl hidden md:block">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted group-focus-within:text-examsy-primary transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search for students, exams, or classes..."
                        className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-4 focus:ring-examsy-primary/10 focus:border-examsy-primary transition-all font-medium text-sm text-examsy-text"
                    />
                </div>
            </div>

            {/* Actions Section */}
            <div className="flex items-center gap-3 md:gap-6 ml-auto">
                <div className="hidden sm:block">
                    <ToggleButton />
                </div>

                <button className="p-2.5 text-examsy-muted hover:bg-examsy-bg hover:text-examsy-primary rounded-xl transition-all relative">
                    <Bell size={22} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-examsy-surface"></span>
                </button>

                <button className="p-2.5 text-examsy-muted hover:bg-examsy-bg rounded-xl transition-all">
                    <Grid size={22} />
                </button>

                <div className="h-8 w-px bg-zinc-200 dark:border-zinc-800"></div>

                <button className="flex items-center gap-3 p-1.5 pr-3 hover:bg-examsy-bg rounded-2xl transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-examsy-primary/10 flex items-center justify-center text-examsy-primary overflow-hidden">
                        <UserCircle size={24} />
                    </div>
                    <div className="hidden lg:block text-left">
                        <p className="text-xs font-black text-examsy-text uppercase tracking-wider">Dr. Jane Smith</p>
                        <p className="text-[10px] font-bold text-examsy-muted">Faculty Head</p>
                    </div>
                </button>
            </div>
        </header>
    );
};

export default TeacherNavbar;