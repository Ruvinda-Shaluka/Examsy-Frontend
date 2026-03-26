import React from 'react';
import { CheckCircle2, RotateCcw, Target } from 'lucide-react';

const ExamResult = ({ topic, questions = [], answers = {}, onRetry, onDashboard }) => {

    // Calculate the score dynamically based on the student's answers
    const correctCount = questions.reduce((total, question, index) => {
        if (answers[index] === question.correct) {
            return total + 1;
        }
        return total;
    }, 0);

    const totalQuestions = questions.length;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    return (
        <div className="bg-examsy-surface p-10 rounded-[32px] border border-zinc-200 dark:border-zinc-800 text-center space-y-6 animate-in zoom-in-95 duration-500 shadow-sm">

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
    );
};

export default ExamResult;