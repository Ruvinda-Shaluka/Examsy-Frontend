import React from 'react';
import { Timer, CalendarClock, ListChecks, Type, FileUp, Calendar, Clock, Hourglass } from 'lucide-react';

// Define structural constants here instead of using mock data files
const EXAM_MODES = [
    { id: 'real-time', title: 'Real-Time Exam', desc: 'Fixed start/end time for all students.' },
    { id: 'deadline', title: 'Deadline Based', desc: 'Students choose when to start before a deadline.' }
];

const EXAM_TYPES = [
    { id: 'mcq', title: 'MCQ (FORMS)' },
    { id: 'short', title: 'SHORT ANSWERS' },
    { id: 'pdf', title: 'PAPER (PDF)' }
];

const TeacherExamTypeCard = ({ type, isSelected, onClick }) => {
    const icons = { mcq: ListChecks, short: Type, pdf: FileUp };
    const Icon = icons[type.id];

    return (
        <button
            onClick={() => onClick(type.id)}
            className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all gap-3 ${
                isSelected
                    ? 'border-examsy-primary bg-examsy-primary/5 text-examsy-primary shadow-md shadow-examsy-primary/10'
                    : 'border-zinc-200 dark:border-zinc-800 bg-examsy-surface text-examsy-muted hover:border-examsy-primary/50'
            }`}
        >
            <Icon size={32} />
            <span className="font-black text-xs uppercase tracking-widest">{type.title}</span>
        </button>
    );
};

const TeacherExamModeSelector = ({ data, onChange }) => {

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 pb-10">

            {/* 1. Exam Title Section */}
            <div className="space-y-6">
                <h3 className="text-xl font-black text-examsy-text ml-2">1. Exam Title</h3>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => onChange('title', e.target.value)}
                    placeholder="e.g. Grade 11 Midterm Assessment"
                    className="w-full bg-examsy-surface border-2 border-zinc-200 dark:border-zinc-800 rounded-[32px] py-5 px-6 font-black text-xl text-examsy-text outline-none focus:border-examsy-primary transition-all shadow-sm"
                />
            </div>

            {/* 2. Mode Selection */}
            <div className="space-y-6">
                <h3 className="text-xl font-black text-examsy-text ml-2">2. Select Delivery Mode</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {EXAM_MODES.map(mode => (
                        <button
                            key={mode.id}
                            onClick={() => onChange('mode', mode.id)}
                            className={`p-8 rounded-[32px] border-2 text-left transition-all flex items-start gap-5 ${
                                data.mode === mode.id
                                    ? 'border-examsy-primary bg-examsy-primary/5 shadow-lg shadow-examsy-primary/5'
                                    : 'border-zinc-200 dark:border-zinc-800 bg-examsy-surface hover:border-examsy-primary/30'
                            }`}
                        >
                            <div className={`p-4 rounded-2xl ${data.mode === mode.id ? 'bg-examsy-primary text-white' : 'bg-examsy-bg text-examsy-muted'}`}>
                                {mode.id === 'real-time' ? <Timer size={24} /> : <CalendarClock size={24} />}
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-examsy-text">{mode.title}</h4>
                                <p className="text-sm font-bold text-examsy-muted leading-tight mt-1">{mode.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. Type Selection */}
            <div className="space-y-6">
                <h3 className="text-xl font-black text-examsy-text ml-2">3. Select Exam Format</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {EXAM_TYPES.map(type => (
                        <TeacherExamTypeCard
                            key={type.id}
                            type={type}
                            isSelected={data.type === type.id}
                            onClick={(typeId) => onChange('type', typeId)}
                        />
                    ))}
                </div>
            </div>

            {/* 4. Schedule & Duration Section */}
            {data.mode && (
                <div className="space-y-6">
                    <h3 className="text-xl font-black text-examsy-text ml-2">4. Schedule & Duration</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-[32px]">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-examsy-muted tracking-widest ml-1">
                                {data.mode === 'real-time' ? 'Exam Date' : 'Final Deadline Date'}
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted" size={18} />
                                {/* Standard YYYY-MM-DD input for proper backend parsing */}
                                <input
                                    type="date"
                                    value={data.date}
                                    onChange={(e) => onChange('date', e.target.value)}
                                    className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-examsy-text outline-none focus:border-examsy-primary transition-all uppercase placeholder:text-examsy-muted/50"
                                />
                            </div>
                        </div>

                        {data.mode === 'real-time' ? (
                            <>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-examsy-muted tracking-widest ml-1">Start Time</label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted" size={18} />
                                        <input
                                            type="time"
                                            value={data.startTime}
                                            onChange={(e) => onChange('startTime', e.target.value)}
                                            className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-examsy-text outline-none focus:border-examsy-primary transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-examsy-muted tracking-widest ml-1">Duration (Minutes)</label>
                                    <div className="relative">
                                        <Hourglass className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted" size={18} />
                                        <input
                                            type="number"
                                            value={data.duration}
                                            placeholder="e.g. 60"
                                            onChange={(e) => onChange('duration', e.target.value)}
                                            className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-examsy-text outline-none focus:border-examsy-primary transition-all"
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-examsy-muted tracking-widest ml-1">Deadline Time</label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted" size={18} />
                                        <input
                                            type="time"
                                            value={data.deadlineTime}
                                            onChange={(e) => onChange('deadlineTime', e.target.value)}
                                            className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-examsy-text outline-none focus:border-examsy-primary transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-examsy-muted tracking-widest ml-1">Duration (Minutes)</label>
                                    <div className="relative">
                                        <Hourglass className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted" size={18} />
                                        <input
                                            type="number"
                                            value={data.duration}
                                            placeholder="e.g. 60"
                                            onChange={(e) => onChange('duration', e.target.value)}
                                            className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-examsy-text outline-none focus:border-examsy-primary transition-all"
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherExamModeSelector;