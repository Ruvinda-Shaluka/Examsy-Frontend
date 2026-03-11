import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, ChevronLeft, ChevronRight, AlertTriangle, Clock, EyeOff, Loader2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import useTabSecurity from '../../hooks/useTabSecurity';
import { studentService } from '../../services/studentService'; // Assuming you added the api calls here!

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
    const [resultData, setResultData] = useState(null); // Holds the auto-grade!

    const { tabWarnings, isTabActive, showReturnAlert, setShowReturnAlert, lastAwayDuration, totalAwaySeconds, formatDuration } = useTabSecurity(examId);

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

    // TIMER
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

    const handleSaveAnswer = (val) => {
        const currentQ = exam.questions[currentQuestionIdx];
        setAnswers(prev => ({ ...prev, [currentQ.id]: val }));
    };

    const handleSubmit = async () => {
        try {
            // Format the payload exactly how Spring Boot wants it
            const formattedAnswers = exam.questions.map(q => ({
                questionId: q.id,
                selectedOptionId: exam.examType === 'MCQ' ? answers[q.id] : null,
                answerText: exam.examType === 'SHORT' ? answers[q.id] : null
            }));

            // Handle PDF upload if applicable (using Cloudinary strategy like before)
            let uploadedPdfUrl = null;
            if (exam.examType === 'PDF' && answers['pdfFile']) {
                // ... cloudinary logic ...
                uploadedPdfUrl = 'https://cloudinary.com/...';
            }

            const payload = {
                pdfSubmissionUrl: uploadedPdfUrl,
                answers: formattedAnswers
            };

            // 🟢 Send to backend and get the auto-graded result!
            const result = await studentService.submitExam(examId, payload);
            setResultData(result);
            setIsSubmitModalOpen(true);

        } catch (error) {
            console.error("Submission failed", error);
            alert("Failed to submit exam. Please check your connection.");
        }
    };

    if (isLoading) return <div className="fixed inset-0 flex items-center justify-center bg-examsy-bg"><Loader2 className="animate-spin text-examsy-primary" size={48} /></div>;

    const currentQ = exam.questions?.[currentQuestionIdx];

    return (
        <div className="fixed inset-0 bg-examsy-bg z-[100] flex flex-col text-examsy-text select-none">
            {/* ... Security Modals remain identical ... */}

            <header className="h-20 bg-examsy-surface border-b border-zinc-200 dark:border-zinc-800 px-6 md:px-12 flex items-center justify-between shadow-xl relative z-20">
                {/* ... Header remains mostly identical, just map exam.title ... */}
                <button onClick={handleSubmit} className="bg-examsy-primary text-white px-6 md:px-10 py-3 rounded-2xl font-black shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all">
                    Submit Final Paper
                </button>
            </header>

            <div className="flex-1 flex overflow-hidden">
                <aside className="w-[90px] border-r border-zinc-100 dark:border-zinc-800 bg-examsy-surface/20 flex flex-col relative z-10">
                    <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {exam.questions?.map((q, i) => (
                            <button
                                key={q.id}
                                onClick={() => setCurrentQuestionIdx(i)}
                                className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xs transition-all border-2 shrink-0 mx-auto ${
                                    currentQuestionIdx === i ? 'bg-examsy-primary text-white border-examsy-primary scale-105'
                                        : answers[q.id] ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                                            : 'bg-examsy-bg border-zinc-200 dark:border-zinc-800 text-examsy-muted'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </aside>

                <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-examsy-bg">
                    <div className="max-w-4xl mx-auto h-full flex flex-col">

                        <div className="flex-1 animate-in slide-in-from-right-4 duration-300 mt-10">
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
                        </div>
                    </div>
                </main>
            </div>

            <SubmitModal
                isOpen={isSubmitModalOpen}
                examTitle={exam.title}
                resultData={resultData} // 🟢 Passes the score to the modal!
                onDashboard={() => navigate('/student/dashboard')}
            />
        </div>
    );
};

export default ExamInterface;