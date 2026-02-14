import React from 'react';

const ShortAnswerView = ({ question, value, onChange }) => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
        <h2 className="text-2xl font-black leading-snug">{question?.text}</h2>
        <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full h-80 bg-examsy-surface border-2 border-zinc-200 dark:border-zinc-800 rounded-[32px] p-8 font-bold text-examsy-text outline-none focus:border-examsy-primary transition-all resize-none shadow-inner"
        />
    </div>
);

export default ShortAnswerView;