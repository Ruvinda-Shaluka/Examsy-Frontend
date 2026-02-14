import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { STUDENT_DATA } from '../../data/StudentMockData';

// Sub-components
import MCQView from '../../components/student/exam/MCQView';
import ShortAnswerView from '../../components/student/exam/ShortAnswerView';
import PDFUploadView from '../../components/student/exam/PDFUploadView';
import SubmitModal from '../../components/student/exam/SubmitModal';

const ExamInterface = () => {
    const { examId } = useParams();
    const navigate = useNavigate();

    // 1. Data Fetching
    const exam = STUDENT_DATA.availableExams.find(e => e.id === examId) ||
        STUDENT_DATA.upcomingExams.find(e => e.id === examId) ||
        { title: 'Examsy Assessment', type: 'mcq', timeLimit: 60, questions: 20 };

    // 2. State Management
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState((exam.timeLimit || 60) * 60);
    const [answers, setAnswers] = useState({});
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [tabWarnings, setTabWarnings] = useState(0);

    // 3. Proctoring: Tab Switching Detection
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setTabWarnings(prev => {
                    const newCount = prev + 1;
                    alert(`⚠️ WARNING: Tab switching is monitored!\n\nYou have left the exam environment ${newCount} time(s). This incident has been logged.`);
                    return newCount;
                });
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    // 4. Timer Logic
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

    // Navigation Handlers
    const handleNext = () => {
        if (currentQuestion < (exam.questions || 1) - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    return (
        <div className="fixed inset-0 bg-examsy-bg z-[100] flex flex-col text-examsy-text select-none">

            {/* --- TOP HEADER --- */}
            <header className="h-20 bg-examsy-surface border-b border-zinc-200 dark:border-zinc-800 px-6 md:px-12 flex items-center justify-between shadow-xl relative z-20">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate(-1)} className="p-2.5 bg-examsy-bg rounded-xl text-examsy-muted hover:text-red-500 transition-all">
                        <ArrowLeft size={20}/>
                    </button>
                    <div>
                        <h2 className="text-lg md:text-xl font-black uppercase tracking-tighter leading-none mb-1">{exam.title}</h2>
                        <div className="flex items-center gap-2">
                            {tabWarnings > 0 ? (
                                <div className="flex items-center gap-1 text-amber-500 animate-pulse">
                                    <AlertTriangle size={12} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">{tabWarnings} Warnings</p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-emerald-500">
                                    <ShieldCheck size={12} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Secure Browser Active</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 md:gap-10">
                    <div className="text-right hidden md:block">
                        <p className="text-[10px] font-black text-examsy-muted uppercase tracking-widest">Time Remaining</p>
                        <span className={`text-2xl font-black tabular-nums tracking-widest ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-examsy-text'}`}>
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsSubmitModalOpen(true)}
                        className="bg-examsy-primary text-white px-6 md:px-10 py-3 rounded-2xl font-black shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all text-sm md:text-base"
                    >
                        Submit Final Paper
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">

                {/* --- SIDEBAR NAVIGATOR (Fixed Scrollbar) --- */}
                <aside className="w-[88px] border-r border-zinc-100 dark:border-zinc-800 bg-examsy-surface/20 flex flex-col relative z-10">
                    <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 text-center">
                        <p className="text-[9px] font-black uppercase tracking-widest text-examsy-muted">Index</p>
                    </div>

                    {/* Scrollable Area with hidden scrollbar */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {[...Array(exam.questions || 1)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentQuestion(i)}
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xs transition-all border-2 shrink-0 mx-auto ${
                                    currentQuestion === i
                                        ? 'bg-examsy-primary text-white border-examsy-primary shadow-lg shadow-purple-500/40 scale-105'
                                        : answers[i]
                                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                                            : 'bg-examsy-bg border-zinc-200 dark:border-zinc-800 text-examsy-muted hover:border-examsy-primary/30'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <div className="h-10"></div> {/* Bottom spacer */}
                    </div>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-examsy-bg">
                    <div className="max-w-4xl mx-auto h-full flex flex-col">

                        {/* Question Header & Nav Buttons */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                            <div>
                                <span className="text-[10px] font-black uppercase text-examsy-primary tracking-widest bg-examsy-primary/10 px-4 py-2 rounded-full border border-examsy-primary/20">
                                    {exam.type?.replace('-', ' ')} Mode
                                </span>
                                <h3 className="mt-4 text-3xl font-black text-examsy-text">Question {currentQuestion + 1}</h3>
                            </div>

                            {/* New Top-Right Navigation */}
                            <div className="flex items-center gap-3 bg-examsy-surface p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentQuestion === 0}
                                    className="p-3 hover:bg-examsy-bg rounded-xl text-examsy-muted hover:text-examsy-text disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800"></div>
                                <button
                                    onClick={handleNext}
                                    disabled={currentQuestion === (exam.questions || 1) - 1}
                                    className="p-3 hover:bg-examsy-bg rounded-xl text-examsy-muted hover:text-examsy-text disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Question Content Area */}
                        <div className="flex-1">
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
                    </div>
                </main>
            </div>

            {/* Submission Modal */}
            <SubmitModal
                isOpen={isSubmitModalOpen}
                examTitle={exam.title}
                onDownload={() => alert("Downloading receipt...")}
                onDashboard={() => navigate('/student/dashboard')}
            />
        </div>
    );
};

export default ExamInterface;