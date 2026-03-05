import React, { useState, useEffect } from 'react';
import TextPressure from "../logo/TextPressure.jsx";
import {Home, Calendar, Settings, ChevronLeft, Menu, ClipboardPenLine, BellDot} from 'lucide-react';
import { NavLink, useNavigate } from "react-router-dom";
import ToggleButton from "../landingPage/ToggleButton.jsx";
import SignOutButton from '../common/SignOutButton.jsx';
import { studentService } from '../../services/studentService.js'; // 🟢 Import the real service

const StudentSidebar = ({ isOpen, toggle }) => {
    const navigate = useNavigate();

    // State to hold the real profile data
    const [profile, setProfile] = useState({
        name: 'Loading...',
        avatar: 'S',
        profilePictureUrl: null
    });

    // Fetch the profile data when the sidebar mounts
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await studentService.getProfile();
                setProfile({
                    name: data.fullName || 'Student',
                    avatar: data.fullName ? data.fullName.charAt(0).toUpperCase() : 'S',
                    profilePictureUrl: data.profilePictureUrl || null
                });
            } catch (error) {
                console.error("Failed to load sidebar profile data", error);
                // Fallback if the network fails
                setProfile({ name: 'Student', avatar: 'S', profilePictureUrl: null });
            }
        };
        loadProfile();
    }, []);

    const navItems = [
        { icon: Home, label: 'Home', path: '/student/dashboard' },
        { icon: ClipboardPenLine, label: 'Mock Exams', path: '/student/mock-exams' },
        { icon: Calendar, label: 'Calendar', path: '/student/calendar' },
        {icon: BellDot, label: 'Notification', path: '/student/notification' },
        { icon: Settings, label: 'Settings', path: '/student/settings' }
    ];

    return (
        <aside className={`${isOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0 w-0 md:w-20'} fixed md:sticky top-0 h-screen bg-examsy-surface border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 flex flex-col z-[100] overflow-hidden`}>

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

            {/* Mobile Bottom Section */}
            <div className={`p-6 mt-auto border-t border-zinc-200 dark:border-zinc-800 space-y-4 md:hidden ${!isOpen && 'hidden'}`}>
                <div className="flex justify-center">
                    <ToggleButton />
                </div>

                {/* Using real profile data for the mobile display */}
                <button
                    onClick={() => { navigate('/student/settings'); toggle(); }}
                    className="flex items-center gap-3 w-full p-2 bg-examsy-bg rounded-2xl border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-all"
                >
                    <div className="w-10 h-10 rounded-xl bg-examsy-primary text-white flex items-center justify-center font-bold overflow-hidden">
                        {profile.profilePictureUrl ? (
                            <img src={profile.profilePictureUrl} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            profile.avatar
                        )}
                    </div>
                    <div className="text-left">
                        <p className="text-xs font-black text-examsy-text truncate">{profile.name}</p>
                    </div>
                </button>

                <SignOutButton isOpen={isOpen} />
            </div>

            {/* Desktop Sign Out (when sidebar is retracted) */}
            <div className={`p-3 mt-auto border-t border-zinc-200 dark:border-zinc-800 hidden md:block`}>
                <SignOutButton isOpen={isOpen} />
            </div>
        </aside>
    );
};

export default StudentSidebar;