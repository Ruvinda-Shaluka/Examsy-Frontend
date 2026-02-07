import React from 'react';
import { Timer, CalendarClock, ListChecks, Type, FileUp, Calendar, Clock, Hourglass } from 'lucide-react';
import { EXAM_MODES, EXAM_TYPES } from '../../../data/TeacherTeachingData';

// This is the component Vite couldn't find.
// By keeping it here and removing the import, the error vanishes.
const TeacherExamTypeCard = ({ type, isSelected, onClick }) => {
    const icons = { mcq: ListChecks, short: Type, pdf: FileUp };
    const Icon = icons[type.id];

    return (
        <button
            onClick={() => onClick(type.id)}
            className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all gap-3 ${
                isSelected
                    ? 'border-examsy-primary bg-examsy-primary/5 text-examsy-primary'
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
        <div className="space-y-12 animate-fade-in pb-10">
            {/* 1. Mode Selection */}
            <div className="space-y-6">
                <h3 className="text-xl font-black text-examsy-text ml-2">1. Select Delivery Mode</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {EXAM_MODES.map(mode => (
                        <button
                            key={mode.id}
                            onClick={() => onChange(mode.id, data.type)}
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
                                <p className="text-sm font-bold text-examsy-muted leading-tight">{mode.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. Type Selection */}
            <div className="space-y-6">
                <h3 className="text-xl font-black text-examsy-text ml-2">2. Select Exam Format</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {EXAM_TYPES.map(type => (
                        <TeacherExamTypeCard
                            key={type.id}
                            type={type}
                            isSelected={data.type === type.id}
                            onClick={(typeId) => onChange(data.mode, typeId)}
                        />
                    ))}
                </div>
            </div>

            {/* 3. Schedule & Duration Section */}
            {data.mode && (
                <div className="space-y-6">
                    <h3 className="text-xl font-black text-examsy-text">3. Schedule & Duration</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-examsy-muted tracking-widest ml-1">
                                {data.mode === 'real-time' ? 'Exam Date' : 'Final Deadline Date'}
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted" size={18} />
                                <input
                                    type="date"
                                    className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-examsy-text outline-none focus:border-examsy-primary transition-all"
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
                                            className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-examsy-text outline-none focus:border-examsy-primary transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-examsy-muted tracking-widest ml-1">Submission Cut-off</label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted" size={18} />
                                        <input
                                            type="time"
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
                                            placeholder="e.g. 60"
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