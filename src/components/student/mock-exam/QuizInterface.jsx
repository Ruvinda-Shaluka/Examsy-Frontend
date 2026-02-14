import React from 'react';
import { Timer, CheckCircle2, ArrowRight } from 'lucide-react';

const QuizInterface = ({ questions, currentIdx, setCurrentIdx, answers, setAnswers, onFinish }) => {
    const currentQuestion = questions[currentIdx];

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center bg-examsy-surface p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-examsy-primary/10 text-examsy-primary rounded-lg flex items-center justify-center font-black text-sm">
                        {currentIdx + 1}
                    </div>
                    <div className="w-32 h-1.5 bg-examsy-bg rounded-full overflow-hidden">
                        <div
                            className="h-full bg-examsy-primary transition-all duration-500"
                            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 text-amber-500 rounded-lg border border-amber-500/20 text-[10px] font-black">
                    <Timer size={14} /> NO LIMIT
                </div>
            </div>

            <div className="bg-examsy-surface p-8 rounded-[32px] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
                <h2 className="text-lg font-black leading-relaxed">{currentQuestion?.q}</h2>
                <div className="grid gap-3">
                    {currentQuestion?.options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => setAnswers({...answers, [currentIdx]: i})}
                            className={`w-full p-4 text-left rounded-2xl border-2 transition-all flex items-center justify-between group ${
                                answers[currentIdx] === i
                                    ? 'border-examsy-primary bg-examsy-primary/5'
                                    : 'border-zinc-100 dark:border-zinc-800 hover:border-examsy-primary/40'
                            }`}
                        >
                            <span className={`text-sm font-bold ${answers[currentIdx] === i ? 'text-examsy-primary' : 'text-examsy-muted group-hover:text-examsy-text'}`}>
                                {String.fromCharCode(65 + i)}. {opt}
                            </span>
                            {answers[currentIdx] === i && <CheckCircle2 className="text-examsy-primary" size={16}/>}
                        </button>
                    ))}
                </div>

                <div className="flex justify-between pt-4">
                    <button
                        disabled={currentIdx === 0}
                        onClick={() => setCurrentIdx(prev => prev - 1)}
                        className="px-6 py-2 text-examsy-muted font-black uppercase tracking-widest text-[10px] hover:text-examsy-primary disabled:opacity-0 transition-all"
                    >
                        Previous
                    </button>
                    {currentIdx === questions.length - 1 ? (
                        <button
                            onClick={onFinish}
                            className="bg-examsy-primary text-white px-8 py-3 rounded-xl font-black text-sm shadow-lg hover:scale-105 transition-all"
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            onClick={() => setCurrentIdx(prev => prev + 1)}
                            className="flex items-center gap-2 text-examsy-primary font-black uppercase tracking-widest text-[10px] hover:translate-x-1 transition-all"
                        >
                            Next <ArrowRight size={14} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizInterface;