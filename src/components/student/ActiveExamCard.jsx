import React from 'react';
import { FileText } from 'lucide-react';

const ActiveExamCard = ({ exam, onStart }) => (
    <div className="bg-examsy-surface p-6 rounded-[32px] border border-zinc-200 dark:border-zinc-800 flex justify-between items-center group hover:border-examsy-primary transition-all shadow-sm">
        <div className="flex gap-6 items-center">
            <div className="p-4 bg-examsy-bg rounded-2xl text-examsy-primary group-hover:bg-examsy-primary group-hover:text-white transition-colors">
                <FileText size={24} />
            </div>
            <div>
                <h3 className="font-black text-lg text-examsy-text">{exam.title}</h3>
                <p className="text-sm font-bold text-examsy-muted">{exam.class} • {exam.duration || `${exam.timeLimit}m`}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="text-xs font-black text-examsy-primary uppercase tracking-widest mb-2">
                {exam.date ? `${exam.date} @ ${exam.time}` : 'Available Now'}
            </p>
            <button
                onClick={onStart}
                className="px-6 py-2.5 bg-examsy-primary text-white rounded-xl text-xs font-black shadow-lg shadow-purple-500/20 hover:scale-105 transition-transform"
            >
                Start Now
            </button>
        </div>
    </div>
);

export default ActiveExamCard;