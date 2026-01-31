import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ToggleButton from '../landingPage/ToggleButton.jsx';
import { MOCK_TEACHER } from '../../data/TeacherMockData';

const TeacherNavbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    return (
        <header className="h-20 bg-examsy-surface/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 md:px-6 flex items-center justify-between sticky top-0 z-[40] transition-colors duration-300">

            {/* --- LEFT SIDE: Menu Toggle & Search --- */}
            <div className="flex items-center gap-2 md:gap-4 flex-1">
                {/* Mobile Menu Toggle: Opens Sidebar where mobile profile/clock live */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden p-2.5 text-examsy-muted hover:bg-examsy-bg rounded-xl transition-colors"
                >
                    <Menu size={20} />
                </button>

                {/* Search Bar: Aligned to the left */}
                <div className="w-full max-w-sm">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted group-focus-within:text-examsy-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-2 pl-11 pr-4 outline-none focus:border-examsy-primary transition-all text-xs md:text-sm text-examsy-text font-medium"
                        />
                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDE: Desktop Only Actions --- */}
            {/* Hidden on mobile to keep navbar clean as requested */}
            <div className="hidden md:flex items-center gap-6">

                {/* Fixed-width Clock Container: Prevents navbar jittering when time updates */}
                <div className="min-w-[160px] flex justify-end">
                    <ToggleButton />
                </div>

                <div className="flex items-center gap-2">
                    {/* Notifications */}
                    <button className="p-2.5 text-examsy-muted hover:bg-examsy-bg hover:text-examsy-primary rounded-xl relative transition-all">
                        <Bell size={20} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-examsy-surface"></span>
                    </button>

                    {/* Profile Section: Redirects to settings */}
                    <button
                        onClick={() => navigate('/teacher/settings')}
                        className="flex items-center gap-3 p-1.5 pl-4 hover:bg-examsy-bg rounded-2xl transition-all border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 group"
                    >
                        <div className="text-right">
                            <p className="text-xs font-black text-examsy-text uppercase tracking-tight">{MOCK_TEACHER.name}</p>
                            <p className="text-[10px] font-bold text-examsy-muted">{MOCK_TEACHER.role}</p>
                        </div>

                        {/* Profile Image/Avatar logic */}
                        <div className="w-10 h-10 rounded-xl bg-examsy-primary/10 flex items-center justify-center text-examsy-primary font-black text-sm overflow-hidden border-2 border-transparent group-hover:border-examsy-primary/30 transition-all">
                            {MOCK_TEACHER.profileImage ? (
                                <img
                                    src={MOCK_TEACHER.profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                MOCK_TEACHER.avatar
                            )}
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default TeacherNavbar;