import React from 'react';
import { STUDENT_DATA } from '../../data/StudentMockData';
import StudentLayout from "../../layouts/StudentLayout.jsx";

const StudentCalendar = () => (<StudentLayout studentData={STUDENT_DATA} activePage="calendar">
    <div className="animate-fade-in space-y-8">
        <h1 className="text-3xl font-black uppercase tracking-tight text-examsy-text">Academic Schedule</h1>
        <div className="bg-examsy-surface p-8 rounded-[40px] border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="grid grid-cols-7 gap-px bg-zinc-200 dark:bg-zinc-800 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                {[...Array(35)].map((_, i) => {
                    const day = (i % 31) + 1;
                    const event = STUDENT_DATA.calendar.find(e => e.day === day);
                    return (
                        <div key={i} className="aspect-square bg-examsy-surface p-4 flex flex-col justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                            <span className="text-xs font-black text-examsy-muted">{day}</span>
                            {event && (
                                <div
                                    className={`${event.color} h-2 rounded-full w-full shadow-sm`}
                                    title={event.title}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
</StudentLayout>
);

export default StudentCalendar;