import React, { useState, useEffect } from 'react';
import { ArrowLeft, Timer, ShieldCheck, CheckCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { STUDENT_DATA } from '../../data/StudentMockData';

// Sub-components
import MCQView from '../../components/student/exam/MCQView';
import ShortAnswerView from '../../components/student/exam/ShortAnswerView';
import PDFUploadView from '../../components/student/exam/PDFUploadView';

const ExamInterface = () => {
    const { examId } = useParams();
    const navigate = useNavigate();

    // Robust exam data fetching: checks all possible lists
    const exam = STUDENT_DATA.availableExams.find(e => e.id === examId) ||
        STUDENT_DATA.upcomingExams.find(e => e.id === examId) ||
        { title: 'Examsy Assessment', type: 'mcq', timeLimit: 60, questions: 1 };

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState((exam.timeLimit || 60) * 60);
    const [answers, setAnswers] = useState({});

    // Simple Countdown Logic
    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(prev => Math.max(0, prev - 1)), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h > 0 ? h + ':' : ''}${m < 10 && h > 0 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleSaveAnswer = (val) => {
        setAnswers(prev => ({ ...prev, [currentQuestion]: val }));
    };

    const handleSubmit = () => {
        if (window.confirm("Are you sure you want to submit your exam?")) {
            navigate('/student/dashboard'); // Or show a success component
        }
    };

    return (
        <div className="fixed inset-0 bg-examsy-bg z-[100] flex flex-col text-examsy-text select-none">
            {/* --- TOP HEADER --- */}
            <header className="h-24 bg-examsy-surface border-b border-zinc-200 dark:border-zinc-800 px-12 flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate(-1)} className="p-3 bg-examsy-bg rounded-2xl text-examsy-muted hover:text-red-500 transition-all">
                        <ArrowLeft size={20}/>
                    </button>
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tighter leading-none mb-1">{exam.title}</h2>
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={12} className="text-red-500 animate-pulse" />
                            <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Proctoring Locked</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-10">
                    <div className="text-right hidden md:block">
                        <p className="text-[10px] font-black text-examsy-muted uppercase tracking-widest">Time Remaining</p>
                        <span className={`text-2xl font-black tabular-nums tracking-widest ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-examsy-text'}`}>
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-examsy-primary text-white px-10 py-3 rounded-2xl font-black shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all"
                    >
                        Submit Final Paper
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* --- CIRCULAR NAVIGATOR SIDEBAR --- */}
                <aside className="w-20 border-r border-zinc-100 dark:border-zinc-800 p-3 space-y-4 overflow-y-auto bg-examsy-surface/20 flex flex-col items-center">
                    {[...Array(exam.questions || 1)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentQuestion(i)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xs transition-all border-2 shrink-0 ${
                                currentQuestion === i
                                    ? 'bg-examsy-primary text-white border-examsy-primary shadow-lg shadow-purple-500/40'
                                    : answers[i]
                                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                                        : 'bg-examsy-bg border-zinc-200 dark:border-zinc-800 text-examsy-muted'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </aside>

                {/* --- CONTENT WORKSPACE --- */}
                <main className="flex-1 p-16 overflow-y-auto bg-examsy-bg">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-10">
                            <span className="text-[10px] font-black uppercase text-examsy-primary tracking-widest bg-examsy-primary/10 px-4 py-2 rounded-full border border-examsy-primary/20">
                                {exam.type?.replace('-', ' ')} Mode • Question {currentQuestion + 1} of {exam.questions}
                            </span>
                        </div>

                        {/* RENDER DYNAMIC VIEW */}
                        {exam.type === 'mcq' && (
                            <MCQView
                                question={exam.questionsData?.[currentQuestion]}
                                selectedAnswer={answers[currentQuestion]}
                                onSelect={handleSaveAnswer}
                            />
                        )}

                        {exam.type === 'short-answer' && (
                            <ShortAnswerView
                                question={exam.questionsData?.[currentQuestion]}
                                value={answers[currentQuestion]}
                                onChange={handleSaveAnswer}
                            />
                        )}

                        {exam.type === 'pdf-submission' && (
                            <PDFUploadView
                                pdfUrl={exam.pdfUrl}
                                file={answers[currentQuestion]}
                                onUpload={handleSaveAnswer}
                            />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ExamInterface;