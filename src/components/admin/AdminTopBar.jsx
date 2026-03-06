import React, { useState, useEffect } from 'react';
import { Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ToggleButton from "../landingPage/ToggleButton.jsx";
import { adminService } from '../../services/adminService';

const AdminTopBar = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        fullName: 'Loading...',
        roleLevel: 'ADMIN',
        profilePictureUrl: null
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await adminService.getProfile();
                setProfile(data);
            } catch (error) {
                console.error("Failed to load admin profile", error);
                setProfile({ fullName: 'Administrator', roleLevel: 'SYSTEM ADMIN', profilePictureUrl: null });
            }
        };
        fetchProfile();
    }, []);

    const initial = profile.fullName ? profile.fullName.charAt(0).toUpperCase() : 'A';

    return (
        <header className="h-20 px-6 md:px-12 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-examsy-bg z-20">
            <div className="flex items-center gap-3 bg-examsy-surface px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 w-96 shadow-sm">
                <Search size={20} className="text-examsy-muted" />
                <input
                    type="text"
                    placeholder="Search reports, users, or classes..."
                    className="bg-transparent border-none outline-none text-sm font-bold text-examsy-text flex-1 placeholder:text-examsy-muted"
                />
            </div>

            <div className="flex items-center gap-6">
                <ToggleButton/>

                <button
                    onClick={() => navigate('/admin/reports')}
                    className="p-3 bg-examsy-surface rounded-xl text-examsy-muted hover:text-examsy-primary hover:bg-examsy-primary/10 transition-all relative border border-zinc-200 dark:border-zinc-800"
                >
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <button
                    onClick={() => navigate('/admin/settings')}
                    className="flex items-center gap-3 bg-examsy-surface pl-4 pr-2 py-2 rounded-[18px] border border-zinc-200 dark:border-zinc-800 hover:border-examsy-primary/50 transition-all group"
                >
                    <div className="text-right hidden md:block">
                        <p className="font-black text-sm text-examsy-text leading-tight group-hover:text-examsy-primary transition-colors">{profile.fullName}</p>
                        <p className="text-[10px] font-bold text-examsy-muted uppercase tracking-wider">{profile.roleLevel.replace('_', ' ')}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-examsy-primary flex items-center justify-center text-white font-black text-lg shadow-lg shadow-purple-500/20 overflow-hidden">
                        {profile.profilePictureUrl ? (
                            <img src={profile.profilePictureUrl} alt="Admin" className="w-full h-full object-cover" />
                        ) : (
                            initial
                        )}
                    </div>
                </button>
            </div>
        </header>
    );
};

export default AdminTopBar;