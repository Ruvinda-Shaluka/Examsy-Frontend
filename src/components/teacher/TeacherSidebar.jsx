import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// Added FileCheck icon for Grading
import { Home, Calendar, BookOpen, FileCheck, Archive, Settings, ChevronLeft, Menu } from 'lucide-react';
import TextPressure from "../logo/TextPressure.jsx";
import ToggleButton from '../landingPage/ToggleButton.jsx';
import { MOCK_TEACHER } from '../../data/TeacherMockData';

const TeacherSidebar = ({ isOpen, toggle }) => {
    const navigate = useNavigate();

    const navItems = [
        { icon: Home, label: 'Home', path: '/teacher/dashboard' },
        { icon: Calendar, label: 'Calendar', path: '/teacher/calendar' },
        { icon: BookOpen, label: 'Teaching', path: '/teacher/teaching' },
        { icon: FileCheck, label: 'Grading', path: '/teacher/grading' }, // NEW SECTION
        { icon: Archive, label: 'Archived classes', path: '/teacher/archived' },
        { icon: Settings, label: 'Settings', path: '/teacher/settings' },
    ];

    return (
        <aside className={`${isOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0 w-0 md:w-20'} fixed md:sticky top-0 h-screen bg-examsy-surface border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 flex flex-col z-[100]`}>
            <div className="h-20 flex items-center justify-between px-6">
                {isOpen && (
                    <div className="w-32 shrink-0">
                        <TextPressure text="Examsy !" flex alpha={false} stroke={false} width weight={false} italic textColor="#465ed2" strokeColor="#5227FF" minFontSize={28} />
                    </div>
                )}
                <button onClick={toggle} className="p-2 hover:bg-examsy-bg rounded-xl text-examsy-muted transition-colors">
                    {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
                </button>
            </div>

            <nav className="flex-1 px-3 mt-4 space-y-1">
                {navItems.map((item) => (
                    <NavLink key={item.label} to={item.path} onClick={() => window.innerWidth < 768 && toggle()} className={({ isActive }) => `flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all duration-200 ${isActive ? 'bg-examsy-primary/10 text-examsy-primary' : 'text-examsy-muted hover:bg-examsy-bg'}`}>
                        <item.icon size={22} className="shrink-0" />
                        {isOpen && <span className="text-sm">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className={`md:hidden p-6 mt-auto border-t border-zinc-200 dark:border-zinc-800 space-y-6 ${!isOpen && 'hidden'}`}>
                <div className="flex justify-center"><ToggleButton /></div>
                <button onClick={() => { navigate('/teacher/settings'); toggle(); }} className="flex items-center gap-3 w-full p-2 bg-examsy-bg rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-examsy-primary text-white flex items-center justify-center font-bold">{MOCK_TEACHER.avatar}</div>
                    <div className="text-left"><p className="text-xs font-black text-examsy-text truncate">{MOCK_TEACHER.name}</p></div>
                </button>
            </div>
        </aside>
    );
};

export default TeacherSidebar;