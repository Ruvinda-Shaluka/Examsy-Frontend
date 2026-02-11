import React, {useState} from 'react';
import TeacherCalendarGrid from "../teacher/TeacherCalendarGrid.jsx";
import {CalendarIcon, ChevronLeft, ChevronRight} from "lucide-react";

const CalendarView = ({exams}) => {
    // Tracks the month/year currently being viewed
    const [viewDate, setViewDate] = useState(new Date());

    const changeMonth = (offset) => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    };

    const handleJump = (e) => {
        if (e.target.value) setViewDate(new Date(e.target.value));
    };

    const monthName = viewDate.toLocaleString('default', { month: 'long' });
  return (
      <div className="bg-examsy-surface rounded-[32px] md:rounded-[40px] border border-zinc-200 dark:border-zinc-800 p-4 md:p-8 shadow-sm transition-all duration-500">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                  <div className="p-3 md:p-4 bg-examsy-primary/10 rounded-2xl text-examsy-primary">
                      <CalendarIcon size={24} />
                  </div>
                  <div>
                      {/* Title text stays white in dark mode automatically */}
                      <h2 className="text-xl md:text-2xl font-black text-examsy-text">Exam Schedule</h2>
                      <p className="text-examsy-muted font-bold text-sm">{monthName} {viewDate.getFullYear()}</p>
                  </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                  {/* Date Jumper: Fixed text visibility */}
                  <input
                      type="date"
                      onChange={handleJump}
                      className="bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs font-bold text-examsy-text outline-none focus:border-examsy-primary transition-colors"
                  />

                  <div className="flex items-center gap-1.5 bg-examsy-bg p-1 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                      <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-examsy-surface rounded-xl transition-colors text-examsy-text">
                          <ChevronLeft size={18}/>
                      </button>

                      {/* FIXED: Added 'text-examsy-text' to ensure visibility in dark mode */}
                      <button
                          onClick={() => setViewDate(new Date())}
                          className="px-4 py-1.5 hover:bg-examsy-surface rounded-xl font-black text-[10px] uppercase tracking-widest text-examsy-text transition-colors"
                      >
                          Today
                      </button>

                      <button onClick={() => changeMonth(1)} className="p-2 hover:bg-examsy-surface rounded-xl transition-colors text-examsy-text">
                          <ChevronRight size={18}/>
                      </button>
                  </div>
              </div>
          </div>

          <TeacherCalendarGrid viewDate={viewDate} exams={exams} />
      </div>
  );
};

export default CalendarView;
