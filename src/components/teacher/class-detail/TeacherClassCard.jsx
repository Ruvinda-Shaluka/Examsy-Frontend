import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, TrendingUp, FolderOpen } from 'lucide-react';

const TeacherClassCard = ({ id, title, section, bannerColor }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-examsy-surface rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
            {/* Clickable Header */}
            <div
                onClick={() => navigate(`/teacher/class/${id}`)}
                className={`h-28 p-6 flex flex-col justify-between relative overflow-hidden cursor-pointer ${bannerColor || 'bg-examsy-primary'}`}
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                <div className="flex justify-between items-start relative z-10">
                    <h3 className="text-white text-xl font-black hover:underline truncate pr-4">{title}</h3>
                    <button onClick={(e) => e.stopPropagation()} className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors">
                        <MoreVertical size={20} />
                    </button>
                </div>
                <p className="text-white/90 text-sm font-bold relative z-10">{section}</p>
            </div>

            <div className="p-6 h-32 flex items-center">
                <div className="w-16 h-16 rounded-full bg-examsy-bg border-4 border-examsy-surface -mt-16 shadow-lg flex items-center justify-center font-black text-examsy-primary">
                    {title.charAt(0)}
                </div>
            </div>

            <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end gap-3 text-examsy-muted">
                <button className="p-2 hover:bg-examsy-bg rounded-xl transition-colors"><TrendingUp size={18} /></button>
                <button className="p-2 hover:bg-examsy-bg rounded-xl transition-colors"><FolderOpen size={18} /></button>
            </div>
        </div>
    );
};

export default TeacherClassCard;