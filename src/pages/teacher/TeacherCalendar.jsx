import React from 'react';
import TeacherLayout from '../../layouts/TeacherLayout';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const TeacherCalendar = () => {
    // Basic day array for demonstration
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const exams = [
        { day: 14, title: 'Physics Mid-Term', time: '10:00 AM' },
        { day: 22, title: 'SQL Quiz', time: '02:00 PM' },
    ];

    return (
        <TeacherLayout>
            <div className="bg-examsy-surface rounded-[40px] border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-examsy-primary/10 rounded-2xl text-examsy-primary">
                            <CalendarIcon size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-examsy-text">Exam Schedule</h2>
                            <p className="text-examsy-muted font-bold text-sm">January 2026</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-examsy-bg rounded-xl transition-colors border border-zinc-200 dark:border-zinc-800"><ChevronLeft size={20}/></button>
                        <button className="px-4 py-2 bg-examsy-bg rounded-xl font-black text-sm">Today</button>
                        <button className="p-2 hover:bg-examsy-bg rounded-xl transition-colors border border-zinc-200 dark:border-zinc-800"><ChevronRight size={20}/></button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 border-t border-l border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="p-4 text-center font-black text-xs uppercase tracking-widest text-examsy-muted border-r border-b border-zinc-100 dark:border-zinc-800 bg-examsy-bg/50">
                            {day}
                        </div>
                    ))}
                    {days.map(day => {
                        const exam = exams.find(e => e.day === day);
                        return (
                            <div key={day} className="min-h-[140px] p-3 border-r border-b border-zinc-100 dark:border-zinc-800 transition-colors hover:bg-examsy-bg/30">
                                <span className="font-bold text-examsy-muted">{day}</span>
                                {exam && (
                                    <div className="mt-2 p-2 bg-examsy-primary rounded-xl text-white shadow-lg shadow-examsy-primary/20 animate-fade-in">
                                        <p className="text-[10px] font-black leading-tight truncate">{exam.title}</p>
                                        <div className="flex items-center gap-1 mt-1 opacity-80">
                                            <Clock size={10} />
                                            <span className="text-[9px] font-bold">{exam.time}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </TeacherLayout>
    );
};

export default TeacherCalendar;