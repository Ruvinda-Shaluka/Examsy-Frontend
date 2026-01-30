import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, BookOpen, Archive, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import TextPressure from "../logo/TextPressure.jsx";

const TeacherSidebar = ({ isOpen, toggle }) => {
    const navItems = [
        { icon: Home, label: 'Home', path: '/teacher/dashboard' },
        { icon: Calendar, label: 'Calendar', path: '/teacher/calendar' },
        { icon: BookOpen, label: 'Teaching', path: '/teacher/teaching' },
        { icon: Archive, label: 'Archived classes', path: '/teacher/archived' },
        { icon: Settings, label: 'Settings', path: '/teacher/settings' },
    ];

    return (
        <aside className={`${isOpen ? 'w-72' : 'w-20'} bg-examsy-surface border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 flex flex-col z-50 sticky top-0 h-screen`}>
            <div className="p-6 flex items-center justify-between">
                <h1 className={`font-black text-examsy-primary text-5xl tracking-tighter transition-opacity duration-200 ${!isOpen && 'opacity-0'}`}>
                    <TextPressure
                        text="Examsy !"
                        flex alpha={false} stroke={false} width weight={false} italic
                        textColor="#465ed2" strokeColor="#5227FF" minFontSize={36}
                    />
                </h1>
                <button onClick={toggle} className="p-2 hover:bg-examsy-bg rounded-xl text-examsy-muted transition-colors">
                    {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>

            <nav className="flex-1 px-3 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all duration-200 group
                            ${isActive
                            ? 'bg-examsy-primary/10 text-examsy-primary'
                            : 'text-examsy-muted hover:bg-examsy-bg hover:text-examsy-text'}
                        `}
                    >
                        <item.icon size={22} className="shrink-0" />
                        <span className={`transition-opacity duration-300 whitespace-nowrap ${!isOpen && 'hidden'}`}>
                            {item.label}
                        </span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default TeacherSidebar;