import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, ChevronLeft, ChevronRight, AlertTriangle, Clock, EyeOff, Loader2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import useTabSecurity from '../../hooks/useTabSecurity';
import { studentService } from '../../services/studentService';

import MCQView from '../../components/student/exam/MCQView';
import ShortAnswerView from '../../components/student/exam/ShortAnswerView';
import PDFUploadView from '../../components/student/exam/PDFUploadView';
import SubmitModal from '../../components/student/exam/SubmitModal';
import SecurityAlertModal from '../../components/student/exam/SecurityAlertModal';

const ExamInterface = () => {
    const { examId } = useParams();
    const navigate = useNavigate();

    const [exam, setExam] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);

    // answers map looks like: { questionId: selectedOptionId OR text }
    const [answers, setAnswers] = useState({});

    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [resultData, setResultData] = useState(null); // Holds the auto-grade

    // 🟢 SECURITY HOOK (Uses all these variables in the JSX below now!)
    const {
        tabWarnings,
        isTabActive,
        showReturnAlert,
        setShowReturnAlert,
        lastAwayDuration,
        totalAwaySeconds,
        formatDuration
    } = useTabSecurity(examId);

    // FETCH REAL EXAM
    useEffect(() => {
        const loadExam = async () => {
            try {
                const data = await studentService.getExam(examId);
                setExam(data);
                setTimeLeft(data.durationMinutes * 60);
            } catch (error) {
                console.error("Failed to load exam", error);
                alert("Exam not found or already submitted.");
                navigate('/student/dashboard');
            } finally {
                setIsLoading(false);
            }
        };
        loadExam();
    }, [examId, navigate]);

    // TIMER LOGIC
    useEffect(() => {
        if (!exam) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit(); // Auto-submit when time is up!
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [exam]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h > 0 ? h + ':' : ''}${m < 10 && h > 0 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // NAVIGATION HANDLERS
    const handleNext = () => {
        if (currentQuestionIdx < (exam?.questions?.length || 1) - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIdx > 0) {
            setCurrentQuestionIdx(prev => prev - 1);
        }
    };

    const handleSaveAnswer = (val) => {
        const currentQ = exam.questions[currentQuestionIdx];
        setAnswers(prev => ({ ...prev, [currentQ.id]: val }));
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentQuestionIdx, exam]);

    const handleSubmit = async () => {
        try {
            // Format the payload exactly how Spring Boot wants it
            const formattedAnswers = exam.questions?.map(q => ({
                questionId: q.id,
                selectedOptionId: exam.examType === 'MCQ' ? answers[q.id] : null,
                answerText: exam.examType === 'SHORT' ? answers[q.id] : null
            })) || [];

            // Handle PDF upload if applicable
            let uploadedPdfUrl = null;
            if (exam.examType === 'PDF' && answers['pdfFile']) {
                const formData = new FormData();
                formData.append('file', answers['pdfFile']);
                formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

                const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                    method: 'POST', body: formData
                });
                const data = await uploadRes.json();
                uploadedPdfUrl = data.secure_url;
            }

            const payload = {
                pdfSubmissionUrl: uploadedPdfUrl,
                answers: formattedAnswers
            };

            // Send to backend and get the auto-graded result!
            const result = await studentService.submitExam(examId, payload);
            setResultData(result);
            setIsSubmitModalOpen(true);

        } catch (error) {
            console.error("Submission failed", error);
            alert("Failed to submit exam. Please check your connection.");
        }
    };

    if (isLoading) return <div className="fixed inset-0 flex items-center justify-center bg-examsy-bg"><Loader2 className="animate-spin text-examsy-primary" size={48} /></div>;

    const currentQ = exam?.questions?.[currentQuestionIdx];

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
                lastAwayDuration={lastAwayDuration}
                totalAwaySeconds={totalAwaySeconds}
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
                        onClick={handleSubmit}
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

                    <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {exam.questions?.map((q, i) => (
                            <button
                                key={q.id}
                                onClick={() => setCurrentQuestionIdx(i)}
                                className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xs transition-all border-2 shrink-0 mx-auto ${
                                    currentQuestionIdx === i
                                        ? 'bg-examsy-primary text-white border-examsy-primary shadow-lg shadow-purple-500/40 scale-105'
                                        : answers[q.id]
                                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                                            : 'bg-examsy-bg border-zinc-200 dark:border-zinc-800 text-examsy-muted hover:border-examsy-primary/30'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <div className="h-20"></div>
                    </div>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-examsy-bg">
                    <div className="max-w-4xl mx-auto h-full flex flex-col">

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                            <div>
                                <span className="text-[10px] font-black uppercase text-examsy-primary tracking-widest bg-examsy-primary/10 px-4 py-2 rounded-full border border-examsy-primary/20">
                                    {exam.examType?.replace('-', ' ')} Mode
                                </span>
                                <h3 className="mt-4 text-3xl font-black text-examsy-text">Question {currentQuestionIdx + 1}</h3>
                            </div>

                            <div className="flex items-center gap-3 bg-examsy-surface p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentQuestionIdx === 0}
                                    className="p-3 hover:bg-examsy-bg rounded-xl text-examsy-muted hover:text-examsy-text disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800"></div>
                                <button
                                    onClick={handleNext}
                                    disabled={currentQuestionIdx === (exam?.questions?.length || 1) - 1}
                                    className="p-3 hover:bg-examsy-bg rounded-xl text-examsy-muted hover:text-examsy-text disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 animate-in slide-in-from-right-4 duration-300">
                            {exam.examType === 'MCQ' && (
                                <MCQView
                                    question={currentQ}
                                    selectedOptionId={answers[currentQ?.id]}
                                    onSelect={handleSaveAnswer}
                                />
                            )}

                            {exam.examType === 'SHORT' && (
                                <ShortAnswerView
                                    question={currentQ}
                                    value={answers[currentQ?.id]}
                                    onChange={handleSaveAnswer}
                                />
                            )}

                            {exam.examType === 'PDF' && (
                                <PDFUploadView
                                    pdfUrl={exam.pdfResourceUrl}
                                    file={answers['pdfFile']}
                                    onUpload={(file) => setAnswers(prev => ({ ...prev, pdfFile: file }))}
                                />
                            )}
                        </div>

                        <div className="md:hidden flex justify-between mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                            <button onClick={handlePrev} disabled={currentQuestionIdx === 0} className="px-6 py-3 bg-examsy-surface rounded-xl font-bold text-sm disabled:opacity-50">Previous</button>
                            <button onClick={handleNext} disabled={currentQuestionIdx === (exam?.questions?.length || 1) - 1} className="px-6 py-3 bg-examsy-primary text-white rounded-xl font-bold text-sm disabled:opacity-50">Next</button>
                        </div>
                    </div>
                </main>
            </div>

            <SubmitModal
                isOpen={isSubmitModalOpen}
                examTitle={exam.title}
                resultData={resultData}
                onDashboard={() => navigate('/student/dashboard')}
            />
        </div>
    );
};

export default ExamInterface;