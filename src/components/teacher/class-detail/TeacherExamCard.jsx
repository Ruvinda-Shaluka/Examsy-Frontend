import React, { useState } from 'react';
import { MoreVertical, ListChecks, FileUp, Type, Clock, Calendar, Edit2, Trash2 } from 'lucide-react';

const TeacherExamCard = ({ exam, onEditDeadline, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);

    // Dynamically assign a color and icon based on the exam type
    const getCardTheme = (type) => {
        switch(type) {
            case 'MCQ': return { color: '#059669', icon: ListChecks, label: 'Multiple Choice' }; // Green
            case 'SHORT': return { color: '#4F46E5', icon: Type, label: 'Short Answer' }; // Indigo
            case 'PDF': return { color: '#DB2777', icon: FileUp, label: 'PDF Upload' }; // Pink
            default: return { color: '#2563EB', icon: ListChecks, label: 'Exam' }; // Blue fallback
        }
    };

    const theme = getCardTheme(exam.examType);
    const Icon = theme.icon;

    return (
        <div className="bg-examsy-surface rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">

            {/* --- TOP BANNER --- */}
            <div className="h-28 relative rounded-t-[2rem] shrink-0" style={{ backgroundColor: theme.color }}>
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl z-0" />

                <div className="relative z-10 p-6 flex justify-between items-start">
                    <div>
                        <h3 className="text-white text-xl font-black truncate pr-4 drop-shadow-md">
                            {exam.title || 'Untitled Exam'}
                        </h3>
                        <p className="text-white/90 text-sm font-bold drop-shadow-sm mt-1">
                            {theme.label}
                        </p>
                    </div>

                    {/* Three Dots Menu */}
                    <div className="relative z-20">
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
                            className={`text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-xl transition-colors ${showMenu ? 'bg-white/20 text-white' : ''}`}
                        >
                            <MoreVertical size={20} />
                        </button>

                        {showMenu && (
                            <>
                                <div className="fixed inset-0 z-40 cursor-default" onClick={(e) => { e.stopPropagation(); setShowMenu(false); }} />
                                <div className="absolute right-0 top-8 w-48 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                                    <button
                                        onClick={() => { setShowMenu(false); onEditDeadline(exam); }}
                                        className="w-full text-left px-4 py-3 text-sm font-bold text-examsy-text hover:bg-examsy-bg transition-colors flex items-center gap-3"
                                    >
                                        <Edit2 size={16} className="text-examsy-primary" /> Update Deadline
                                    </button>
                                    <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1 mx-2"></div>
                                    <button
                                        onClick={() => { setShowMenu(false); onDelete(exam.id); }}
                                        className="w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-3"
                                    >
                                        <Trash2 size={16} /> Delete Exam
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* --- BOTTOM DETAILS (Relative Container) --- */}
            <div className="relative p-6 flex-1 flex flex-col justify-end bg-transparent rounded-b-[2rem]">

                {/* 🟢 FIXED FLOATING ICON: Absolutely positioned on the seam */}
                <div
                    className="absolute -top-8 left-6 w-16 h-16 rounded-[1.2rem] bg-examsy-bg border-4 border-examsy-surface shadow-lg flex items-center justify-center z-20"
                    style={{ color: theme.color }}
                >
                    <Icon size={24} strokeWidth={2.5} />
                </div>

                {/* Info Pills */}
                <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-3 text-examsy-text font-bold text-sm bg-examsy-bg/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
                        <Clock size={16} className="text-examsy-muted" />
                        <span>{exam.durationMinutes || 0} Minutes Allowed</span>
                    </div>
                    <div className="flex items-center gap-3 text-examsy-text font-bold text-sm bg-examsy-bg/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
                        <Calendar size={16} className="text-examsy-muted" />
                        <span>
                            {exam.deadlineTime
                                ? new Date(exam.deadlineTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
                                : 'No Deadline Set'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherExamCard;