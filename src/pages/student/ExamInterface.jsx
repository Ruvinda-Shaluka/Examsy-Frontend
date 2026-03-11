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
import CustomAlert from '../../components/common/CustomAlert'; // 🟢 Custom Alert Imported

const ExamInterface = () => {
    const { examId } = useParams();
    const navigate = useNavigate();

    const numericExamId = parseInt(examId, 10);

    const [exam, setExam] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [resultData, setResultData] = useState(null);

    // 🟢 Alert State Restored
    const [alertData, setAlertData] = useState(null);

    const {
        tabWarnings,
        isTabActive,
        showReturnAlert,
        setShowReturnAlert,
        lastAwayDuration,
        totalAwaySeconds,
        formatDuration
    } = useTabSecurity(numericExamId);

    // FETCH REAL EXAM
    useEffect(() => {
        if (isNaN(numericExamId)) {
            setAlertData({ type: 'error', title: 'Invalid Link', message: 'This exam link is corrupted.' });
            setTimeout(() => navigate('/student/dashboard'), 2500);
            return;
        }

        const loadExam = async () => {
            try {
                const data = await studentService.getExam(numericExamId);
                setExam(data);
                setTimeLeft(data.durationMinutes * 60);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to load exam", error);
                // 🟢 Triggers Custom Alert instead of browser default
                setAlertData({
                    type: 'error',
                    title: 'Access Denied',
                    message: 'Exam not found or you have already submitted it.'
                });
                setTimeout(() => navigate('/student/dashboard'), 2500);
            }
        };
        loadExam();
    }, [numericExamId, navigate]);

    // TIMER LOGIC
    useEffect(() => {
        if (!exam) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
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
            const formattedAnswers = exam.questions?.map(q => ({
                questionId: q.id,
                selectedOptionId: exam.examType === 'MCQ' ? answers[q.id] : null,
                answerText: exam.examType === 'SHORT' ? answers[q.id] : null
            })) || [];

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

            const result = await studentService.submitExam(numericExamId, payload);
            setResultData(result);
            setIsSubmitModalOpen(true);

        } catch (error) {
            console.error("Submission failed", error);
            setAlertData({ type: 'error', title: 'Submission Failed', message: 'Please check your connection and try again.' });
            setTimeout(() => setAlertData(null), 3000);
        }
    };

    // 🟢 RENDER ALERT DURING LOADING STATE
    if (isLoading) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-examsy-bg z-[100]">
                {alertData && (
                    <div className="absolute top-10 w-full max-w-lg px-4 animate-in slide-in-from-top-4">
                        <CustomAlert type={alertData.type} title={alertData.title} message={alertData.message} onClose={() => setAlertData(null)} />
                    </div>
                )}
                {!alertData && <Loader2 className="animate-spin text-examsy-primary mb-4" size={48} />}
            </div>
        );
    }

    const currentQ = exam?.questions?.[currentQuestionIdx];

    return (
        <div className="fixed inset-0 bg-examsy-bg z-[100] flex flex-col text-examsy-text select-none">

            {/* 🟢 FLOATING ALERT IN MAIN UI */}
            {alertData && (
                <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-[300] animate-in slide-in-from-top-4">
                    <CustomAlert type={alertData.type} title={alertData.title} message={alertData.message} onClose={() => setAlertData(null)} />
                </div>
            )}

            {!isTabActive && (
                <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-200">
                    <EyeOff size={64} className="text-red-500 mb-6 animate-pulse" />
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Exam Paused</h2>
                    <p className="text-sm md:text-base text-zinc-400 font-bold max-w-md">
                        Navigate back to this window immediately. Your absence is being recorded by the proctoring system.
                    </p>
                </div>
            )}

            <SecurityAlertModal
                isOpen={showReturnAlert}
                onClose={() => setShowReturnAlert(false)}
                lastAwayDuration={lastAwayDuration}
                totalAwaySeconds={totalAwaySeconds}
                warningCount={tabWarnings}
                formatDuration={formatDuration}
            />

            {/* --- RESPONSIVE HEADER --- */}
            <header className="h-20 bg-examsy-surface border-b border-zinc-200 dark:border-zinc-800 px-4 md:px-12 flex items-center justify-between shadow-xl relative z-20">
                <div className="flex items-center gap-3 md:gap-6">
                    <button onClick={() => navigate(-1)} className="p-2 md:p-2.5 bg-examsy-bg rounded-lg md:rounded-xl text-examsy-muted hover:text-red-500 transition-all shrink-0">
                        <ArrowLeft size={20}/>
                    </button>
                    <div className="overflow-hidden">
                        <h2 className="text-base md:text-xl font-black uppercase tracking-tighter leading-none mb-1 truncate max-w-[120px] sm:max-w-xs md:max-w-md">{exam.title}</h2>
                        <div className="flex items-center gap-2">
                            {tabWarnings > 0 ? (
                                <div className="flex items-center gap-1 text-red-500 bg-red-500/10 px-1.5 md:px-2 py-0.5 rounded-md animate-pulse">
                                    <AlertTriangle size={10} md:size={12} />
                                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">{tabWarnings} Flags</p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 md:gap-2 text-emerald-500">
                                    <ShieldCheck size={10} md:size={12} />
                                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Secure</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 md:gap-10 shrink-0">
                    {/* 🟢 RESPONSIVE TIMER: Visible on mobile, hides text */}
                    <div className="text-right flex flex-col items-end">
                        <div className="hidden md:flex items-center justify-end gap-2 text-examsy-muted mb-0.5">
                            <Clock size={12} />
                            <p className="text-[10px] font-black uppercase tracking-widest">Time Remaining</p>
                        </div>
                        <div className="flex items-center gap-1.5 md:hidden text-examsy-muted mb-0.5">
                            <Clock size={12} className={timeLeft < 300 ? 'text-red-500' : ''} />
                        </div>
                        <span className={`text-lg md:text-2xl font-black tabular-nums tracking-widest leading-none ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-examsy-text'}`}>
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-examsy-primary text-white px-4 md:px-10 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all text-xs md:text-base"
                    >
                        Submit
                    </button>
                </div>
            </header>

            {/* 🟢 RESPONSIVE LAYOUT: Column on Mobile, Row on Desktop */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

                {/* --- RESPONSIVE SIDEBAR/TOP NAV --- */}
                <aside className="w-full md:w-[90px] border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 bg-examsy-surface/20 flex flex-row md:flex-col relative z-10 shrink-0">
                    <div className="hidden md:block p-4 border-b border-zinc-200 dark:border-zinc-800 text-center">
                        <p className="text-[9px] font-black uppercase tracking-widest text-examsy-muted">Index</p>
                    </div>

                    {/* Horizontal scroll on mobile, vertical on desktop */}
                    <div className="flex-1 flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto p-3 gap-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {exam.questions?.map((q, i) => (
                            <button
                                key={q.id}
                                onClick={() => setCurrentQuestionIdx(i)}
                                className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center font-black text-xs md:text-sm transition-all border-2 shrink-0 md:mx-auto ${
                                    currentQuestionIdx === i
                                        ? 'bg-examsy-primary text-white border-examsy-primary shadow-lg shadow-purple-500/40 md:scale-105'
                                        : answers[q.id]
                                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                                            : 'bg-examsy-bg border-zinc-200 dark:border-zinc-800 text-examsy-muted hover:border-examsy-primary/30'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <div className="hidden md:block h-20 shrink-0"></div>
                        <div className="md:hidden w-4 shrink-0"></div>
                    </div>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <main className="flex-1 p-4 md:p-12 overflow-y-auto bg-examsy-bg">
                    <div className="max-w-4xl mx-auto h-full flex flex-col">

                        <div className="flex flex-row justify-between items-center gap-4 mb-6 md:mb-10">
                            <div>
                                <span className="text-[9px] md:text-[10px] font-black uppercase text-examsy-primary tracking-widest bg-examsy-primary/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-examsy-primary/20">
                                    {exam.examType?.replace('-', ' ')} Mode
                                </span>
                                <h3 className="mt-3 md:mt-4 text-2xl md:text-3xl font-black text-examsy-text">Question {currentQuestionIdx + 1}</h3>
                            </div>

                            <div className="hidden md:flex items-center gap-3 bg-examsy-surface p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
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

                        {/* 🟢 BOTTOM NAVIGATION FOR MOBILE */}
                        <div className="md:hidden flex justify-between mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 pb-4">
                            <button onClick={handlePrev} disabled={currentQuestionIdx === 0} className="px-6 py-3.5 bg-examsy-surface rounded-xl font-bold text-sm disabled:opacity-50 border border-zinc-200 dark:border-zinc-800 shadow-sm">Previous</button>
                            <button onClick={handleNext} disabled={currentQuestionIdx === (exam?.questions?.length || 1) - 1} className="px-8 py-3.5 bg-examsy-primary text-white rounded-xl font-black text-sm disabled:opacity-50 shadow-lg shadow-purple-500/20">Next</button>
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