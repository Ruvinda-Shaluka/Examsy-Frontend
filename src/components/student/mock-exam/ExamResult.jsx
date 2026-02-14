import React from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';

const ExamResult = ({ topic, onRetry, onDashboard }) => (
    <div className="bg-examsy-surface p-10 rounded-[32px] border border-zinc-200 dark:border-zinc-800 text-center space-y-6 animate-in zoom-in-95 duration-500">
        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
        </div>
        <h2 className="text-3xl font-black">AI Practice Complete!</h2>
        <p className="text-examsy-muted font-bold">Topic: <span className="text-examsy-text">{topic}</span></p>
        <div className="bg-examsy-bg p-6 rounded-2xl inline-block px-12 border border-zinc-200 dark:border-zinc-800">
            <p className="text-[9px] font-black uppercase tracking-widest text-examsy-muted mb-1">Total Score</p>
            <p className="text-4xl font-black text-examsy-primary">80%</p>
        </div>
        <div className="flex gap-3 justify-center pt-2">
            <button onClick={onRetry} className="flex items-center gap-2 px-6 py-3 bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-xl font-black text-xs hover:bg-examsy-bg transition-all">
                <RotateCcw size={14} /> New Exam
            </button>
            <button onClick={onDashboard} className="px-6 py-3 bg-examsy-primary text-white rounded-xl font-black text-xs shadow-lg transition-all">
                Finish
            </button>
        </div>
    </div>
);

export default ExamResult;