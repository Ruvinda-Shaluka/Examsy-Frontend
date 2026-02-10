import React, { useState, useEffect } from 'react';
import { ArrowLeft, Timer, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

const ExamInterface = ({ exam, onExit }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(5400); // 90 mins
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div className="fixed inset-0 bg-examsy-bg z-[100] flex flex-col animate-in fade-in zoom-in-95 duration-500 text-examsy-text">
            {/* Header */}
            <header className="h-20 bg-examsy-surface border-b border-zinc-200 dark:border-zinc-800 px-12 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-6">
                    <button onClick={onExit} className="p-2 hover:bg-examsy-bg rounded-xl transition-colors text-examsy-muted hover:text-examsy-text">
                        <ArrowLeft size={20}/>
                    </button>
                    <div>
                        <h2 className="font-black uppercase tracking-tighter">{exam.title}</h2>
                        <p className="text-[10px] font-black text-examsy-muted uppercase tracking-widest"> Proctoring Active</p>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3 px-6 py-2 bg-red-500/10 text-red-500 rounded-full border border-red-500/20">
                        <Timer size={18} className="animate-pulse" />
                        <span className="font-black tabular-nums tracking-widest">{formatTime(timeLeft)}</span>
                    </div>
                    <button className="bg-examsy-primary text-white px-8 py-2.5 rounded-xl font-black text-sm hover:scale-105 transition-transform shadow-lg shadow-purple-500/30">
                        Submit Exam
                    </button>
                </div>
            </header>

            {/* Body */}
            <div className="flex-1 flex overflow-hidden">
                {/* Navigator Sidebar */}
                <aside className="w-80 border-r border-zinc-100 dark:border-zinc-800 p-8 space-y-8 overflow-y-auto bg-examsy-surface/50">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-examsy-muted">Navigator</h3>
                    <div className="grid grid-cols-4 gap-3">
                        {[...Array(20)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentQuestion(i)}
                                className={`w-full aspect-square rounded-xl flex items-center justify-center font-black text-xs transition-all ${
                                    currentQuestion === i
                                        ? 'bg-examsy-primary text-white shadow-lg'
                                        : answers[i]
                                            ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                                            : 'bg-examsy-surface border border-zinc-200 dark:border-zinc-800 text-examsy-muted hover:border-examsy-primary'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Content */}
                <main className="flex-1 p-12 overflow-y-auto bg-examsy-bg">
                    <div className="max-w-3xl mx-auto space-y-12">
                        <div className="space-y-4">
                            <span className="text-xs font-black uppercase text-examsy-primary tracking-widest">Question {currentQuestion + 1} of 20</span>
                            <h2 className="text-2xl font-black leading-snug">
                                Which data structure uses LIFO principle?
                            </h2>
                        </div>

                        <div className="grid gap-4">
                            {['Queue', 'Stack', 'Linked List', 'Binary Tree'].map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setAnswers({...answers, [currentQuestion]: option})}
                                    className={`w-full p-6 text-left rounded-[24px] border-2 transition-all flex items-center justify-between group ${
                                        answers[currentQuestion] === option
                                            ? 'border-examsy-primary bg-examsy-primary/5'
                                            : 'border-zinc-100 dark:border-zinc-800 hover:border-examsy-primary'
                                    }`}
                                >
                  <span className={`font-bold ${answers[currentQuestion] === option ? 'text-examsy-primary' : 'text-examsy-muted group-hover:text-examsy-text'}`}>
                    {String.fromCharCode(65 + idx)}. {option}
                  </span>
                                    {answers[currentQuestion] === option && <CheckCircle2 className="text-examsy-primary" size={20}/>}
                                </button>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ExamInterface;