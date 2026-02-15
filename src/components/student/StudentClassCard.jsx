import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, User, BookOpen } from 'lucide-react';

const StudentClassCard = ({ id, title, section, bannerColor, teacher }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-examsy-surface rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group">
            {/* Clickable Header */}
            <div
                onClick={() => navigate(`/student/class/${id}`)}
                className={`h-32 p-8 flex flex-col justify-between relative overflow-hidden cursor-pointer ${bannerColor || 'bg-examsy-primary'}`}
            >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-10 blur-3xl" />
                <div className="flex justify-between items-start relative z-10">
                    <h3 className="text-white text-2xl font-black hover:underline truncate pr-4">{title}</h3>
                    <button onClick={(e) => e.stopPropagation()} className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-xl transition-colors">
                        <MoreVertical size={20} />
                    </button>
                </div>
                <p className="text-white/90 font-bold relative z-10">{section}</p>
            </div>

            <div className="p-8 pt-4 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-examsy-bg border-2 border-zinc-100 dark:border-zinc-800 flex items-center justify-center font-black text-examsy-primary">
                        {teacher?.charAt(0) || 'T'}
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase text-examsy-muted tracking-widest leading-none mb-1">Instructor</p>
                        <p className="font-bold text-examsy-text">{teacher}</p>
                    </div>
                </div>
            </div>

            <div className="px-8 py-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-examsy-bg/30">
                <span className="text-[10px] font-black text-examsy-muted uppercase tracking-widest">Active Enrollment</span>
                <div className="flex gap-2">
                    <button onClick={() => navigate(`/student/class/${id}`, { state: { defaultTab: 'people' } })} className="p-2 hover:bg-examsy-primary/10 hover:text-examsy-primary rounded-xl transition-all"><User size={18} /></button>
                    <button onClick={() => navigate(`/student/class/${id}`, { state: { defaultTab: 'classwork'} })} className="p-2 hover:bg-examsy-primary/10 hover:text-examsy-primary rounded-xl transition-all"><BookOpen size={18} /></button>
                </div>
            </div>
        </div>
    );
};

export default StudentClassCard;