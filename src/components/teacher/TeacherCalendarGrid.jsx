import React from 'react';
import { Clock, Plus } from 'lucide-react';

const TeacherCalendarGrid = ({ days, exams }) => {
    return (
        <div className="grid grid-cols-7 border-t border-l border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-inner">
            {/* Header Days */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-4 text-center font-black text-xs uppercase tracking-[0.2em] text-examsy-muted border-r border-b border-zinc-100 dark:border-zinc-800 bg-examsy-bg/50">
                    {day}
                </div>
            ))}

            {/* Calendar Slots */}
            {days.map(day => {
                const dayExams = exams.filter(e => e.day === day);
                return (
                    <div key={day} className="min-h-[150px] p-3 border-r border-b border-zinc-100 dark:border-zinc-800 transition-colors hover:bg-examsy-bg/20 relative group">
                        <div className="flex justify-between items-start">
                            <span className={`font-black text-sm ${day === new Date().getDate() ? 'text-examsy-primary' : 'text-examsy-muted'}`}>
                                {day.toString().padStart(2, '0')}
                            </span>
                            <button className="opacity-0 group-hover:opacity-100 p-1 bg-examsy-primary text-white rounded-lg transition-opacity">
                                <Plus size={14} />
                            </button>
                        </div>

                        <div className="mt-3 space-y-2">
                            {dayExams.map((exam, idx) => (
                                <div key={idx} className="p-2 bg-examsy-primary/90 dark:bg-examsy-primary/20 border-l-4 border-examsy-primary rounded-r-xl text-white dark:text-examsy-primary shadow-sm group/card cursor-pointer hover:scale-[1.02] transition-transform">
                                    <p className="text-[10px] font-black leading-tight uppercase">{exam.title}</p>
                                    <div className="flex items-center gap-1 mt-1 opacity-80 font-bold text-[9px]">
                                        <Clock size={10} />
                                        <span>{exam.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TeacherCalendarGrid;