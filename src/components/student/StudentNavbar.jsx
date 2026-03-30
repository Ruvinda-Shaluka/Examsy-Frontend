import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Menu, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ToggleButton from '../landingPage/ToggleButton.jsx';
import { studentService } from '../../services/studentService.js';
import { notificationService } from '../../services/notificationService.js';

const StudentNavbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const searchRef = useRef(null);

    const [profile, setProfile] = useState({ fullName: 'Loading...', major: '', profilePictureUrl: null });
    const [unreadCount, setUnreadCount] = useState(0);

    // 🟢 SEARCH STATES
    const [searchQuery, setSearchQuery] = useState('');
    const [classes, setClasses] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchNavData = async () => {
            try {
                const [profileData, countData, classData] = await Promise.all([
                    studentService.getProfile(),
                    notificationService.getUnreadCount(),
                    studentService.getEnrolledClasses() // This returns an array of StudentClassCardDTO
                ]);
                setProfile(profileData);
                setUnreadCount(countData);
                setClasses(classData || []);
            } catch (error) {
                console.error("Failed to load nav data", error);
                setProfile({ fullName: 'Student', major: 'Unknown Major' });
            }
        };
        fetchNavData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const initial = profile.fullName && profile.fullName !== 'Loading...'
        ? profile.fullName.charAt(0).toUpperCase() : 'S';

    // 🟢 FILTER LOGIC: Mapped specifically to StudentClassCardDTO
    const filteredClasses = classes.filter(cls => {
        const safeTitle = String(cls.title || '').toLowerCase();
        const safeTeacher = String(cls.teacher || '').toLowerCase();
        const query = searchQuery.toLowerCase();

        return safeTitle.includes(query) || safeTeacher.includes(query);
    });

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setIsDropdownOpen(e.target.value.length > 0);
    };

    return (
        <header className="h-20 bg-examsy-surface/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 md:px-6 flex items-center justify-between sticky top-0 z-[40] transition-colors duration-300">

            <div className="flex items-center gap-2 md:gap-4 flex-1">
                <button onClick={toggleSidebar} className="md:hidden p-2.5 text-examsy-muted hover:bg-examsy-bg rounded-xl transition-colors">
                    <Menu size={20} />
                </button>

                <div className="w-full max-w-sm relative" ref={searchRef}>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted group-focus-within:text-examsy-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search your classes..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={() => { if(searchQuery) setIsDropdownOpen(true); }}
                            className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-2 pl-11 pr-4 outline-none focus:border-examsy-primary transition-all text-xs md:text-sm text-examsy-text font-medium"
                        />
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                            {filteredClasses.length > 0 ? (
                                <div className="max-h-64 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-examsy-muted px-3 py-1">Enrolled Classes</p>
                                    {filteredClasses.map(cls => (
                                        <button
                                            key={cls.id}
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                setSearchQuery('');
                                                navigate(`/student/class/${cls.id}`);
                                            }}
                                            className="w-full flex items-center gap-3 p-3 hover:bg-examsy-bg rounded-xl transition-all text-left group"
                                        >
                                            <div className="p-2 bg-examsy-primary/10 text-examsy-primary rounded-lg group-hover:scale-110 transition-transform">
                                                <BookOpen size={16} />
                                            </div>
                                            <div className="overflow-hidden">
                                                {/* 🟢 Safely render mapped properties */}
                                                <p className="text-sm font-black text-examsy-text truncate">
                                                    {cls.title}
                                                </p>
                                                <p className="text-[10px] font-bold text-examsy-muted truncate">
                                                    {cls.teacher}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-6 text-center text-examsy-muted">
                                    <Search size={24} className="mx-auto mb-2 opacity-20" />
                                    <p className="text-xs font-black">No classes found.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
                <div className="min-w-[160px] flex justify-end"><ToggleButton /></div>

                <div className="flex items-center gap-2">
                    <button onClick={() => navigate('/student/notification')} className="p-2.5 text-examsy-muted hover:bg-examsy-bg hover:text-examsy-primary rounded-xl relative transition-all">
                        <Bell size={20} />
                        {unreadCount > 0 && <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-examsy-surface animate-pulse"></span>}
                    </button>

                    <button onClick={() => navigate('/student/settings')} className="flex items-center gap-3 p-1.5 pl-4 hover:bg-examsy-bg rounded-2xl transition-all border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 group">
                        <div className="text-right">
                            <p className="text-xs font-black text-examsy-text uppercase tracking-tight">{profile.fullName}</p>
                            <p className="text-[10px] font-bold text-examsy-muted">{profile.major || 'Set Major in Settings'}</p>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-examsy-primary/10 flex items-center justify-center text-examsy-primary font-black text-sm overflow-hidden border-2 border-transparent group-hover:border-examsy-primary/30 transition-all">
                            {profile.profilePictureUrl ? <img src={profile.profilePictureUrl} alt="Profile" className="w-full h-full object-cover" /> : initial}
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default StudentNavbar;