import React from 'react';
import { Clock } from 'lucide-react';

const CalendarGrid = ({ viewDate, exams }) => {
    const today = new Date();
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth(); // 0-indexed (0 = Jan)

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    // Create array for empty slots + days
    const calendarDays = [
        ...Array(firstDayIndex).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
    ];

    // Safety check: Ensure exams is an array
    const safeExams = Array.isArray(exams) ? exams : [];

    return (
        <div className="grid grid-cols-7 border-t border-l border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-inner">
            {/* Header */}
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                <div key={d} className="p-3 md:p-4 text-center font-black text-[9px] md:text-[10px] tracking-widest text-examsy-muted bg-examsy-bg/50 border-r border-b border-zinc-100 dark:border-zinc-800">
                    {d}
                </div>
            ))}

            {/* Days */}
            {calendarDays.map((day, i) => {
                const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

                // Filter exams for this specific day
                const dayExams = safeExams.filter(e => {
                    if (!e.date) return false;

                    // Standardize parsing for DD/MM/YYYY format
                    const parts = e.date.split('/');
                    if (parts.length !== 3) return false;

                    const dayVal = parseInt(parts[0], 10);
                    const monthVal = parseInt(parts[1], 10) - 1; // Convert to 0-index
                    const yearVal = parseInt(parts[2], 10);

                    return (
                        yearVal === year &&
                        monthVal === month &&
                        dayVal === day
                    );
                });

                return (
                    <div key={`cal-slot-${i}`} className="min-h-[90px] md:min-h-[130px] p-1.5 md:p-2.5 border-r border-b border-zinc-100 dark:border-zinc-800 hover:bg-examsy-bg/20 transition-colors group">
                        {day && (
                            <>
                                <span className={`text-[10px] md:text-xs font-black ${isToday ? 'text-examsy-primary' : 'text-examsy-muted'}`}>
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

export default CalendarGrid;