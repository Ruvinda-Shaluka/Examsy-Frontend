import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, Target, BookOpen, X, XCircle } from 'lucide-react';

const ExamResult = ({ topic, questions = [], answers = {}, onRetry, onDashboard }) => {
    // 🟢 State for the Explanation Popup Modal
    const [showExplanations, setShowExplanations] = useState(false);

    const correctCount = questions.reduce((total, question, index) => {
        if (answers[index] === question.correct) {
            return total + 1;
        }
        return total;
    }, 0);

    const totalQuestions = questions.length;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    return (
        <>
            <div className="bg-examsy-surface p-10 rounded-[32px] border border-zinc-200 dark:border-zinc-800 text-center space-y-6 animate-in zoom-in-95 duration-500 shadow-sm relative z-10">
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-500/20">
                    <CheckCircle2 size={40} />
                </div>

                <div>
                    <h2 className="text-3xl font-black text-examsy-text">AI Practice Complete!</h2>
                    <p className="text-examsy-muted font-bold mt-2">
                        Subject Topic: <span className="text-examsy-primary uppercase tracking-widest text-[11px] ml-1 px-2 py-1 bg-examsy-primary/10 rounded-md">{topic}</span>
                    </p>
                </div>

                <div className="bg-examsy-bg p-8 rounded-[24px] inline-block px-16 border border-zinc-200 dark:border-zinc-800 shadow-inner relative overflow-hidden">
                    <Target size={120} className="absolute -right-10 -bottom-10 text-zinc-200 dark:text-zinc-800/50 -z-0 transform rotate-12" />

                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-examsy-muted mb-2">Total Score</p>
                        <p className={`text-6xl font-black ${percentage >= 50 ? 'text-emerald-500' : 'text-red-500'}`}>
                            {percentage}%
                        </p>
                        <p className="text-sm font-bold text-examsy-muted mt-2">
                            You scored {correctCount} out of {totalQuestions}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <button
                        onClick={() => setShowExplanations(true)}
                        className="flex items-center justify-center gap-2 px-8 py-3.5 bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl font-black text-sm text-examsy-text hover:border-examsy-primary/50 transition-all hover:-translate-y-1 shadow-sm"
                    >
                        <BookOpen size={16} /> Review Answers
                    </button>
                    <button
                        onClick={onRetry}
                        className="flex items-center justify-center gap-2 px-8 py-3.5 bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl font-black text-sm text-examsy-text hover:bg-examsy-bg hover:border-examsy-primary/30 transition-all hover:-translate-y-1 shadow-sm"
                    >
                        <RotateCcw size={16} /> New Exam
                    </button>
                    <button
                        onClick={onDashboard}
                        className="px-8 py-3.5 bg-examsy-primary text-white rounded-2xl font-black text-sm shadow-lg shadow-examsy-primary/20 transition-all hover:-translate-y-1 hover:bg-examsy-primary/90"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>

            {/* 🟢 EXPLANATION MODAL POPUP */}
            {showExplanations && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-examsy-surface w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col rounded-[32px] border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in zoom-in-95 duration-300">

                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-zinc-200 dark:border-zinc-800 bg-examsy-bg">
                            <div>
                                <h3 className="text-xl font-black text-examsy-text">Answer Review</h3>
                                <p className="text-xs font-bold text-examsy-muted mt-1">Detailed explanations for your exam.</p>
                            </div>
                            <button onClick={() => setShowExplanations(false)} className="p-2 bg-examsy-surface hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="p-6 overflow-y-auto space-y-6">
                            {questions.map((q, idx) => {
                                const isCorrect = answers[idx] === q.correct;
                                const studentAnswerStr = answers[idx] !== undefined ? q.options[answers[idx]] : "Skipped";
                                const correctAnswerStr = q.options[q.correct];

                                return (
                                    <div key={idx} className={`p-5 rounded-2xl border ${isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                                        <div className="flex gap-3 items-start">
                                            <div className="mt-1">
                                                {isCorrect ? <CheckCircle2 className="text-emerald-500" size={20} /> : <XCircle className="text-red-500" size={20} />}
                                            </div>
                                            <div className="space-y-3 w-full">
                                                <h4 className="font-black text-sm text-examsy-text leading-snug">{idx + 1}. {q.q}</h4>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
                                                    <div className="p-3 bg-examsy-surface rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                        <span className="text-examsy-muted block mb-1 text-[10px] uppercase tracking-wider">Your Answer</span>
                                                        <span className={isCorrect ? 'text-emerald-500' : 'text-red-500'}>{studentAnswerStr}</span>
                                                    </div>
                                                    {!isCorrect && (
                                                        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                                            <span className="text-emerald-600 block mb-1 text-[10px] uppercase tracking-wider">Correct Answer</span>
                                                            <span className="text-emerald-500">{correctAnswerStr}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="p-4 bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-xl">
                                                    <span className="text-examsy-primary block mb-1 text-[10px] font-black uppercase tracking-wider">AI Explanation</span>
                                                    <p className="text-sm font-semibold text-examsy-muted leading-relaxed">{q.explanation}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExamResult;