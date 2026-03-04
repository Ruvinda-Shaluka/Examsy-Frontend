import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, Settings, Hexagon } from 'lucide-react';
import TextPressure from "../logo/TextPressure.jsx";
import SignOutButton from '../common/SignOutButton.jsx';

const AdminSidebar = () => {
    const navItems = [
        { icon: ShieldAlert, label: "Reports Console", path: "/admin/reports" },
        { icon: Settings, label: "Admin Settings", path: "/admin/settings" },
    ];

    return (
        <aside className="w-20 md:w-64 bg-examsy-surface border-r border-zinc-200 dark:border-zinc-800 h-screen fixed left-0 top-0 flex flex-col z-30 transition-all duration-300">
            {/* Logo Area */}
            <div className="h-20 flex items-center justify-center md:justify-start md:px-8 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 text-examsy-primary">
                    <Hexagon size={28} strokeWidth={2.5} />
                    <span className="hidden md:block font-black text-2xl tracking-tight text-examsy-text">
                    <TextPressure text="Examsy.Admin" flex alpha={false} stroke={false} width weight={false} italic textColor="#465ed2" strokeColor="#5227FF" minFontSize={32} />
                    </span>
                </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 py-8 px-4 flex flex-col space-y-4">
                <div className="space-y-4 flex-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center gap-4 p-3 rounded-2xl transition-all group relative
                                ${isActive
                                ? 'bg-examsy-primary text-white shadow-lg shadow-purple-500/30'
                                : 'text-examsy-muted hover:bg-examsy-bg hover:text-examsy-text'
                            }
                            `}
                        >
                            <item.icon size={22} strokeWidth={2} />
                            <span className="hidden md:block font-bold text-sm">{item.label}</span>
                            <span className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-examsy-primary rounded-r-full opacity-0 group-[.active]:opacity-100 transition-opacity"></span>
                        </NavLink>
                    ))}
                </div>

                {/* Sign Out Button placed at the bottom */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <SignOutButton isOpen={true} />
                </div>
            </nav>
        </aside>
    );
};

export default AdminSidebar;