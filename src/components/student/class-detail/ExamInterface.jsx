import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, ChevronLeft, ChevronRight, AlertTriangle, Clock, EyeOff, Loader2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import useTabSecurity from '../../../hooks/useTabSecurity.js';
import { studentService } from '../../../services/studentService.js';

import MCQView from '../exam/MCQView.jsx';
import ShortAnswerView from '../exam/ShortAnswerView.jsx';
import PDFUploadView from '../exam/PDFUploadView.jsx';
import SubmitModal from '../exam/SubmitModal.jsx';
import SecurityAlertModal from '../exam/SecurityAlertModal.jsx';
import CustomAlert from '../../common/CustomAlert.jsx';

const ExamInterface = () => {
    const { examId } = useParams();
    const navigate = useNavigate();
    const numericExamId = parseInt(examId, 10);

    const {
        tabWarnings,
        isTabActive,
        showReturnAlert,
        setShowReturnAlert,
        lastAwayDuration,
        totalAwaySeconds,
        formatDuration,
        violationType
    } = useTabSecurity(numericExamId);

    const [exam, setExam] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [resultData, setResultData] = useState(null);
    const [alertData, setAlertData] = useState(null);

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

                // 🟢 NEW: PDF Upload 10-Minute Grace Period Logic
                let baseTimeSeconds = data.durationMinutes ? data.durationMinutes * 60 : 0;
                if (data.examType === 'PDF' && baseTimeSeconds > 0) {
                    baseTimeSeconds += (10 * 60); // Add 600 seconds
                }

                setTimeLeft(baseTimeSeconds);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to load exam", error);
                setAlertData({
                    type: 'error',
                    title: 'Access Denied',
                    message: 'Exam not found or you have already submitted it.'
                });
                setTimeout(() => navigate('/student/dashboard'), 2500);
                setIsLoading(false);
            }
        };
        loadExam();
    }, [numericExamId, navigate]);

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

                // 🟢 FIXED: Changed 'image/upload' to 'auto/upload' to prevent PDF-to-PNG conversion
                const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`, {
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

    // TIMER LOGIC
    useEffect(() => {
        if (!exam || !exam.durationMinutes || exam.durationMinutes <= 0) return;
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    });

    if (isLoading || !exam) {
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
                violationType={violationType}
            />

            <header className="h-20 bg-examsy-surface border-b border-zinc-200 dark:border-zinc-800 px-4 md:px-12 flex items-center justify-between shadow-xl relative z-20">
                <div className="flex items-center gap-3 md:gap-6">
                    <button onClick={() => navigate(-1)} className="p-2 md:p-2.5 bg-examsy-bg rounded-lg md:rounded-xl text-examsy-muted hover:text-red-500 transition-all shrink-0">
                        <ArrowLeft size={20}/>
                    </button>
                    <div className="overflow-hidden flex items-center gap-3">
                        <h2 className="text-base md:text-xl font-black uppercase tracking-tighter leading-none mb-1 truncate max-w-[120px] sm:max-w-xs md:max-w-md">{exam.title}</h2>

                        {/* 🟢 NEW: Visual Grace Period Badge */}
                        {exam.examType === 'PDF' && exam.durationMinutes > 0 && (
                            <span className="hidden md:inline-block px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-black rounded-lg border border-emerald-500/20 uppercase tracking-widest">
                                +10 Min Upload Time
                            </span>
                        )}

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
                    <div className="text-right flex flex-col items-end">
                        <div className="hidden md:flex items-center justify-end gap-2 text-examsy-muted mb-0.5">
                            <Clock size={12} />
                            <p className="text-[10px] font-black uppercase tracking-widest">Time Remaining</p>
                        </div>
                        <div className="flex items-center gap-1.5 md:hidden text-examsy-muted mb-0.5">
                            <Clock size={12} className={timeLeft > 0 && timeLeft < 300 ? 'text-red-500' : ''} />
                        </div>
                        {exam.durationMinutes > 0 ? (
                            <span className={`text-lg md:text-2xl font-black tabular-nums tracking-widest leading-none ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-examsy-text'}`}>
                                {formatTime(timeLeft)}
                            </span>
                        ) : (
                            <span className="text-sm md:text-lg font-black tracking-widest leading-none text-emerald-500">
                                NO LIMIT
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-examsy-primary text-white px-4 md:px-10 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all text-xs md:text-base"
                    >
                        Submit
                    </button>
                </div>
            </header>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                <aside className="w-full md:w-[90px] border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 bg-examsy-surface/20 flex flex-row md:flex-col relative z-10 shrink-0">
                    <div className="hidden md:block p-4 border-b border-zinc-200 dark:border-zinc-800 text-center">
                        <p className="text-[9px] font-black uppercase tracking-widest text-examsy-muted">Index</p>
                    </div>

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

                <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-examsy-bg">
                    <div className="max-w-5xl mx-auto h-full flex flex-col">
                        <div className="flex-1 animate-in slide-in-from-right-4 duration-300 h-full">
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
                    </div>
                </main>
            </div>

            <SubmitModal
                isOpen={isSubmitModalOpen}
                examTitle={exam?.title}
                resultData={resultData}
                onDashboard={() => navigate('/student/dashboard')}
            />
        </div>
    );
};

export default ExamInterface;