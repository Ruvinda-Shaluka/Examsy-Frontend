import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, Users, CalendarClock, ChevronRight, Activity } from 'lucide-react';

const TeacherOngoingExamCard = ({ exam, type }) => {
    const navigate = useNavigate();
    const isRealTime = type === 'real-time';

    return (
        <div className="bg-examsy-surface rounded-[32px] border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-xl hover:shadow-examsy-primary/5 transition-all group">
            <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl ${isRealTime ? 'bg-amber-500/10 text-amber-500' : 'bg-examsy-primary/10 text-examsy-primary'}`}>
                    {isRealTime ? <Timer size={22} /> : <CalendarClock size={22} />}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-examsy-bg rounded-full border border-zinc-100 dark:border-zinc-800">
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isRealTime ? 'bg-red-500' : 'bg-emerald-500'}`} />
                    <span className="text-[10px] font-black uppercase tracking-wider text-examsy-muted">
                        {isRealTime ? 'Live Now' : 'Accepting'}
                    </span>
                </div>
            </div>

            <div className="space-y-1 mb-6">
                <h3 className="text-lg font-black text-examsy-text group-hover:text-examsy-primary transition-colors">{exam.title}</h3>
                <p className="text-sm font-bold text-examsy-muted">{exam.class}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-t border-zinc-100 dark:border-zinc-800 text-examsy-text">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-examsy-muted uppercase tracking-widest">
                        {isRealTime ? 'Remaining' : 'Submissions'}
                    </p>
                    <div className="flex items-center gap-2 font-black">
                        <Activity size={14} className="text-examsy-primary" />
                        <span>{isRealTime ? '45m 12s' : `${exam.submissions}/${exam.totalStudents}`}</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-examsy-muted uppercase tracking-widest">
                        {isRealTime ? 'Active' : 'Deadline'}
                    </p>
                    <div className="flex items-center gap-2 font-black">
                        <Users size={14} className="text-examsy-primary" />
                        <span className="truncate text-xs">{isRealTime ? `${exam.activeStudents} Joined` : exam.deadline}</span>
                    </div>
                </div>
            </div>

            <button
                onClick={() => navigate(`/teacher/live-monitor/${exam.id}`)}
                className="w-full mt-4 py-3 bg-examsy-bg hover:bg-examsy-primary hover:text-white rounded-2xl text-examsy-text font-black text-sm transition-all flex items-center justify-center gap-2 group/btn"
            >
                Monitor Exam <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default TeacherOngoingExamCard;