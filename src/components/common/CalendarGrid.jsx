import React from 'react';
import { Clock } from 'lucide-react';

// 🟢 NEW: Added onExamClick to the destructured props
const CalendarGrid = ({ viewDate, exams, onExamClick }) => {
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
        <div className="grid grid-cols-7 border-t border-l border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-inner bg-examsy-surface">
            {/* Header */}
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                <div key={d} className="p-3 md:p-4 text-center font-black text-[9px] md:text-[10px] tracking-widest text-examsy-muted bg-examsy-bg/50 border-r border-b border-zinc-100 dark:border-zinc-800">
                    {d}
                </div>
            ))}

            {/* Days */}
            {calendarDays.map((day, i) => {
                const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

                // 🟢 NEW: Standardized Date Parsing for Spring Boot LocalDateTime
                const dayExams = safeExams.filter(e => {
                    if (!e.examDate) return false;

                    // Convert the backend ISO string to a standard JS Date object
                    const examDateObj = new Date(e.examDate);

                    return (
                        examDateObj.getFullYear() === year &&
                        examDateObj.getMonth() === month &&
                        examDateObj.getDate() === day
                    );
                });

                return (
                    <div key={`cal-slot-${i}`} className="min-h-[90px] md:min-h-[130px] p-1.5 md:p-2.5 border-r border-b border-zinc-100 dark:border-zinc-800 hover:bg-examsy-bg/20 transition-colors group">
                        {day && (
                            <>
                                <span className={`text-[10px] md:text-xs font-black ${isToday ? 'bg-examsy-primary text-white w-6 h-6 flex items-center justify-center rounded-full shadow-md' : 'text-examsy-muted'}`}>
                                    {day.toString().padStart(2, '0')}
                                </span>
                                <div className="mt-1.5 space-y-1.5">
                                    {dayExams.map((e, idx) => {

                                        // 🟢 Format the time neatly (e.g., "10:30 AM")
                                        const timeString = new Date(e.examDate).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        });

                                        return (
                                            <div
                                                key={e.id || `${e.title}-${idx}`}
                                                // 🟢 NEW: The Click Handler!
                                                onClick={() => onExamClick && onExamClick(e.classId)}
                                                className="p-1.5 md:p-2 rounded-lg text-white shadow-sm hover:shadow-md animate-in fade-in zoom-in-95 duration-300 cursor-pointer hover:scale-[1.02] transition-all"
                                                // 🟢 NEW: Dynamic Background Color from Backend
                                                style={{ backgroundColor: e.themeColorHex || '#4F46E5' }}
                                                title={`${e.courseName} - ${e.title}`} // Helpful tooltip on hover
                                            >
                                                <p className="text-[8px] md:text-[10px] font-black truncate leading-tight drop-shadow-sm">
                                                    {e.title}
                                                </p>
                                                <div className="hidden md:flex items-center gap-1 mt-1 opacity-90 text-[8px] font-bold drop-shadow-sm">
                                                    <Clock size={8}/> {timeString}
                                                </div>
                                            </div>
                                        );
                                    })}
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