import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ to, icon: Icon, label, exact }) => (
    <NavLink
        to={to}
        end={exact}
        className={({ isActive }) =>
            `w-full flex items-center gap-4 px-6 py-4 transition-all duration-300 ${
                isActive
                    ? 'text-examsy-primary bg-examsy-primary/10 border-r-4 border-examsy-primary font-black'
                    : 'text-zinc-500 hover:text-examsy-text hover:bg-zinc-100 dark:hover:bg-zinc-800 font-bold'
            }`
        }
    >
        {Icon && <Icon size={20} />}
        <span className="text-sm uppercase tracking-widest">{label}</span>
    </NavLink>
);

export default SidebarItem;

