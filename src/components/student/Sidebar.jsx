import React from 'react';
import { LayoutDashboard, BookOpen, Calendar, Settings, LogOut } from 'lucide-react';
import SidebarItem from './SidebarItem';
import { STUDENT_DATA } from '../../data/StudentMockData';

const Sidebar = ({ activeTab, setActiveTab }) => {
    return (
        <aside className="w-72 bg-examsy-surface border-r border-zinc-200 dark:border-zinc-800 flex flex-col fixed h-full z-50 transition-colors duration-500">
            <div className="p-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-examsy-primary rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-purple-500/20">E</div>
                    <span className="text-2xl font-black tracking-tighter text-examsy-text">EXAMSY<span className="text-examsy-primary">.</span></span>
                </div>
            </div>

            <nav className="flex-1 mt-4">
                <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                <SidebarItem icon={BookOpen} label="My Exams" active={activeTab === 'exams'} onClick={() => setActiveTab('exams')} />
                <SidebarItem icon={Calendar} label="Calendar" active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} />
                <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
            </nav>

            <div className="p-8 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3 p-3 bg-examsy-bg rounded-2xl border border-zinc-100 dark:border-zinc-800">
                    <div className="w-10 h-10 rounded-xl bg-examsy-primary flex items-center justify-center text-white font-black">{STUDENT_DATA.avatar}</div>
                    <div className="overflow-hidden">
                        <p className="text-xs font-black truncate text-examsy-text">{STUDENT_DATA.name}</p>
                        <p className="text-[10px] text-examsy-muted font-bold uppercase">{STUDENT_DATA.id}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;