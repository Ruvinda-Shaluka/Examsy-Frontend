import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const MCQView = ({ question, selectedAnswer, onSelect }) => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
        <h2 className="text-2xl font-black leading-snug">{question?.text}</h2>
        <div className="grid gap-4">
            {question?.options.map((option, idx) => (
                <button
                    key={idx}
                    onClick={() => onSelect(option)}
                    className={`w-full p-6 text-left rounded-[32px] border-2 transition-all flex items-center justify-between group ${
                        selectedAnswer === option ? 'border-examsy-primary bg-examsy-primary/5 shadow-lg' : 'border-zinc-100 dark:border-zinc-800'
                    }`}
                >
                    <span className={`font-bold ${selectedAnswer === option ? 'text-examsy-primary' : 'text-examsy-muted'}`}>
                        {String.fromCharCode(65 + idx)}. {option}
                    </span>
                    {selectedAnswer === option && <CheckCircle2 className="text-examsy-primary" size={20}/>}
                </button>
            ))}
        </div>
    </div>
);

export default MCQView;