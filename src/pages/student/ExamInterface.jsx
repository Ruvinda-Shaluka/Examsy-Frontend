import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    ShieldCheck,
    ChevronLeft,
    ChevronRight,
    AlertTriangle,
    Clock,
    EyeOff
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { STUDENT_DATA } from '../../data/StudentMockData';

// Custom Hooks
import useTabSecurity from '../../hooks/useTabSecurity';

// Sub-components
import MCQView from '../../components/student/exam/MCQView';
import ShortAnswerView from '../../components/student/exam/ShortAnswerView';
import PDFUploadView from '../../components/student/exam/PDFUploadView';
import SubmitModal from '../../components/student/exam/SubmitModal';
import SecurityAlertModal from '../../components/student/exam/SecurityAlertModal';

const ExamInterface = () => {
    const { examId } = useParams();
    const navigate = useNavigate();

    // --- 1. DATA & STATE ---
    const exam = STUDENT_DATA.availableExams.find(e => e.id === examId) ||
        STUDENT_DATA.upcomingExams.find(e => e.id === examId) ||
        { title: 'Examsy Assessment', type: 'mcq', timeLimit: 60, questions: 20 };

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState((exam.timeLimit || 60) * 60);
    const [answers, setAnswers] = useState({});
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

    // --- 2. SECURITY HOOK ---
    const {
        tabWarnings,
        isTabActive,
        showReturnAlert,
        setShowReturnAlert,
        lastAwayDuration,
        totalAwaySeconds, // <--- New Variable from Hook
        formatDuration
    } = useTabSecurity();

    // --- 3. TIMER LOGIC ---
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Optional: Auto-submit logic
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h > 0 ? h + ':' : ''}${m < 10 && h > 0 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // --- 4. NAVIGATION HANDLERS ---
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

    const handleSaveAnswer = (val) => {
        setAnswers(prev => ({ ...prev, [currentQuestion]: val }));
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentQuestion]);

    return (
        <div className="fixed inset-0 bg-examsy-bg z-[100] flex flex-col text-examsy-text select-none">

            {/* --- SECURITY OVERLAY (When Tab is Inactive) --- */}
            {!isTabActive && (
                <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center text-center animate-in fade-in duration-200">
                    <EyeOff size={64} className="text-red-500 mb-6 animate-pulse" />
                    <h2 className="text-3xl font-black text-white mb-2">Exam Paused</h2>
                    <p className="text-zinc-400 font-bold max-w-md">
                        Navigate back to this window immediately. Your absence is being recorded by the proctoring system.
                    </p>
                </div>
            )}

            {/* --- SECURITY RETURN ALERT (When Student Comes Back) --- */}
            <SecurityAlertModal
                isOpen={showReturnAlert}
                onClose={() => setShowReturnAlert(false)}
                lastAwayDuration={lastAwayDuration}  // Pass specific instance time
                totalAwaySeconds={totalAwaySeconds}  // Pass total time
                warningCount={tabWarnings}
                formatDuration={formatDuration}
            />

            {/* --- TOP HEADER --- */}
            <header className="h-20 bg-examsy-surface border-b border-zinc-200 dark:border-zinc-800 px-6 md:px-12 flex items-center justify-between shadow-xl relative z-20">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate(-1)} className="p-2.5 bg-examsy-bg rounded-xl text-examsy-muted hover:text-red-500 transition-all">
                        <ArrowLeft size={20}/>
                    </button>
                    <div>
                        <h2 className="text-lg md:text-xl font-black uppercase tracking-tighter leading-none mb-1">{exam.title}</h2>

                        {/* Proctoring Status Badge */}
                        <div className="flex items-center gap-2">
                            {tabWarnings > 0 ? (
                                <div className="flex items-center gap-1 text-red-500 bg-red-500/10 px-2 py-0.5 rounded-md animate-pulse">
                                    <AlertTriangle size={12} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">{tabWarnings} Security Flags</p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-emerald-500">
                                    <ShieldCheck size={12} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Proctoring Active</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 md:gap-10">
                    <div className="text-right hidden md:block">
                        <div className="flex items-center justify-end gap-2 text-examsy-muted mb-0.5">
                            <Clock size={12} />
                            <p className="text-[10px] font-black uppercase tracking-widest">Time Remaining</p>
                        </div>
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

                {/* --- SIDEBAR NAVIGATOR --- */}
                <aside className="w-[90px] border-r border-zinc-100 dark:border-zinc-800 bg-examsy-surface/20 flex flex-col relative z-10">
                    <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 text-center">
                        <p className="text-[9px] font-black uppercase tracking-widest text-examsy-muted">Index</p>
                    </div>

                    {/* Scrollable Area (Scrollbar Hidden) */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {[...Array(exam.questions || 1)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentQuestion(i)}
                                className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xs transition-all border-2 shrink-0 mx-auto ${
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
                        <div className="h-20"></div> {/* Bottom spacer */}
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

                            {/* Top-Right Navigation */}
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
                        <div className="flex-1 animate-in slide-in-from-right-4 duration-300">
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

                        {/* Bottom Navigation (Mobile Backup) */}
                        <div className="md:hidden flex justify-between mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                            <button onClick={handlePrev} disabled={currentQuestion === 0} className="px-6 py-3 bg-examsy-surface rounded-xl font-bold text-sm disabled:opacity-50">Previous</button>
                            <button onClick={handleNext} disabled={currentQuestion === (exam.questions || 1) - 1} className="px-6 py-3 bg-examsy-primary text-white rounded-xl font-bold text-sm disabled:opacity-50">Next</button>
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