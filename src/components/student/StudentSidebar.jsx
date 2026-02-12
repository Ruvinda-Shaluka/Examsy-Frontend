import React from 'react';
import { STUDENT_DATA } from '../../data/StudentMockData';
import TextPressure from "../logo/TextPressure.jsx";
import {Home, Calendar, FileCheck, Settings, ChevronLeft, Menu, ClipboardPenLine} from 'lucide-react';
import ToggleButton from '../landingPage/ToggleButton.jsx';
import {NavLink, useNavigate} from "react-router-dom";

const StudentSidebar = ({ isOpen, toggle }) => {
    const navigate = useNavigate();

    const navItems = [
        { icon: Home, label: 'Home', path: '/student/dashboard' },
        { icon: FileCheck, label: 'Grades', path: '/student/grading' },
        { icon: ClipboardPenLine, label: 'Mock Exams', path: '/student/mock-exams' },
        { icon: Calendar, label: 'Calendar', path: '/student/calendar' },
        { icon: Settings, label: 'Settings', path: '/student/settings' }
    ];

    return (
        /* - Mobile Closed: -translate-x-full w-0 (Fully hidden)
           - Laptop Closed: md:translate-x-0 md:w-20 (Narrow bar with icons)
           - Open (Any): translate-x-0 w-72 (Full width)
        */
        <aside className={`${isOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0 w-0 md:w-20'} fixed md:sticky top-0 h-screen bg-examsy-surface border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 flex flex-col z-[100] overflow-hidden`}>

            {/* Header: Centered icons when closed, space-between when open */}
            <div className={`h-20 flex items-center px-6 shrink-0 ${isOpen ? 'justify-between' : 'justify-center'}`}>
                {isOpen && (
                    <div className="w-32 shrink-0">
                        <TextPressure text="Examsy !" flex alpha={false} stroke={false} width weight={false} italic textColor="#465ed2" strokeColor="#5227FF" minFontSize={28} />
                    </div>
                )}
                <button onClick={toggle} className="p-2 hover:bg-examsy-bg rounded-xl text-examsy-muted transition-colors">
                    {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Navigation: Labels hidden when closed, icons always visible on desktop */}
            <nav className="flex-1 px-3 mt-4 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        onClick={() => window.innerWidth < 768 && toggle()}
                        className={({ isActive }) => `flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all duration-200 ${isActive ? 'bg-examsy-primary/10 text-examsy-primary' : 'text-examsy-muted hover:bg-examsy-bg'} ${!isOpen && 'justify-center px-0'}`}
                    >
                        <item.icon size={22} className="shrink-0" />
                        {isOpen && <span className="text-sm whitespace-nowrap">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Footer Profile: Hidden when closed */}
            <div className={`p-6 mt-auto border-t border-zinc-200 dark:border-zinc-800 space-y-6 ${!isOpen && 'hidden'}`}>
                <div className="flex justify-center"><ToggleButton /></div>
                <button onClick={() => { navigate('/student/settings'); toggle(); }} className="flex items-center gap-3 w-full p-2 bg-examsy-bg rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-examsy-primary text-white flex items-center justify-center font-bold">{STUDENT_DATA.avatar}</div>
                    <div className="text-left"><p className="text-xs font-black text-examsy-text truncate">{STUDENT_DATA.name}</p></div>
                </button>
            </div>
        </aside>
    );
};

export default StudentSidebar;