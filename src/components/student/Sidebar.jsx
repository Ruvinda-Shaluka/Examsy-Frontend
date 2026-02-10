import React from 'react';
import { LayoutDashboard, BookOpen, Calendar, Settings } from 'lucide-react';
import SidebarItem from './SidebarItem';
import { Link } from 'react-router-dom';
import { STUDENT_DATA } from '../../data/StudentMockData';

const Sidebar = () => {
    return (
        <aside className="w-72 bg-examsy-surface border-r border-zinc-200 dark:border-zinc-800 flex flex-col fixed h-full z-50">
            <div className="p-8">
                <Link to="/student/dashboard" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-examsy-primary rounded-xl flex items-center justify-center text-white font-black italic">E</div>
                    <span className="text-2xl font-black tracking-tighter text-examsy-text">EXAMSY<span className="text-examsy-primary">.</span></span>
                </Link>
            </div>

            <nav className="flex-1 mt-4">
                <SidebarItem to="/student/dashboard" icon={LayoutDashboard} label="Dashboard" exact />
                <SidebarItem to="/student/exams" icon={BookOpen} label="My Exams" />
                <SidebarItem to="/student/calendar" icon={Calendar} label="Calendar" />
                <SidebarItem to="/student/settings" icon={Settings} label="Settings" />
            </nav>

            <div className="p-8 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3 p-3 bg-examsy-bg rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-examsy-primary flex items-center justify-center text-white font-black">{STUDENT_DATA.avatar}</div>
                    <div className="overflow-hidden">
                        <p className="text-xs font-black truncate text-examsy-text">{STUDENT_DATA.name}</p>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase">{STUDENT_DATA.id}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

