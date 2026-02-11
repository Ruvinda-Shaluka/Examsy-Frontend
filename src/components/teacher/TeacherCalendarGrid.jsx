import React from 'react';
import { Clock } from 'lucide-react';

const TeacherCalendarGrid = ({ viewDate, exams }) => {
    const today = new Date();
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth()+1;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const calendarDays = [...Array(firstDayIndex).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
    return (
        <div className="grid grid-cols-7 border-t border-l border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-inner">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                <div key={d} className="p-3 md:p-4 text-center font-black text-[9px] md:text-[10px] tracking-widest text-examsy-muted bg-examsy-bg/50 border-r border-b border-zinc-100 dark:border-zinc-800">
                    {d}
                </div>
            ))}
            {calendarDays.map((day, i) => {
                const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

                // For demonstration, exams are only shown in the first month.
                // In production, your filtering logic will use 'e.month === month && e.year === year'
                const dayExams = exams.filter(e => {
                    const parts = e.day.split('/').map(Number);

                    let y, m, d;

                    if (String(parts[0]).length === 4) {
                        [y, m, d] = parts;       // YYYY/MM/DD
                    } else {
                        [m, d, y] = parts;       // MM/DD/YYYY
                    }

                    const date = new Date(y, m - 1, d);

                    return (
                        date.getFullYear() === year &&
                        date.getMonth() + 1 === month &&
                        date.getDate() === day
                    );
                });

                return (
                    <div key={`cal-slot-${year}-${month}-${day || 'empty'}-${i}`} className="min-h-[90px] md:min-h-[130px] p-1.5 md:p-2.5 border-r border-b border-zinc-100 dark:border-zinc-800 hover:bg-examsy-bg/20 transition-colors group">
                        {day && (
                            <>
                                <span className={`text-[10px] md:text-xs font-black ${isToday ? 'text-examsy-primary font-black' : 'text-examsy-muted'}`}>
                                    {day.toString().padStart(2, '0')}
                                </span>
                                <div className="mt-1.5 space-y-1">
                                    {dayExams.map((e, idx) => (
                                        <div key={`${e.title}-${idx}`} className="bg-examsy-primary p-1.5 rounded-lg text-white shadow-md animate-in fade-in zoom-in-95 duration-300">
                                            <p className="text-[8px] md:text-[9px] font-black truncate leading-none">{e.title}</p>
                                            <div className="hidden md:flex items-center gap-1 mt-1 opacity-80 text-[8px] font-bold">
                                                <Clock size={8}/> {e.time}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default TeacherCalendarGrid;