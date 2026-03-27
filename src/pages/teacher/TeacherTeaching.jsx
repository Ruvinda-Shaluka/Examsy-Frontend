import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherLayout from '../../layouts/TeacherLayout';
import TeacherExamClassSelector from '../../components/teacher/exam-manage/TeacherExamClassSelector';
import TeacherExamModeSelector from '../../components/teacher/exam-manage/TeacherExamModeSelector';
import TeacherMCQBuilder from '../../components/teacher/exam-manage/TeacherMCQBuilder';
import TeacherShortAnswerBuilder from '../../components/teacher/exam-manage/TeacherShortAnswerBuilder';
import TeacherPDFUploader from '../../components/teacher/exam-manage/TeacherPDFUploader';
import CustomAlert from '../../components/common/CustomAlert';
import { teacherService } from '../../services/teacherService';
import { ChevronRight, ChevronLeft, Send, Loader2 } from 'lucide-react';

const TeacherTeaching = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isPublishing, setIsPublishing] = useState(false);
    const [alert, setAlert] = useState(null);

    // MASTER STATE
    const [examData, setExamData] = useState({
        title: '',
        classes: [],
        mode: '',
        type: '',
        date: '',
        startTime: '',
        endTime: '',
        deadlineTime: '',
        duration: '',
        questions: [],
        pdfFile: null
    });

    const nextStep = () => {
        // Step 1 Validation
        if (step === 1 && examData.classes.length === 0) {
            return setAlert({type:'error', title:'Error', message:'Please select at least one class to assign the exam.'});
        }

        // Smart Step 2 Validation
        if (step === 2) {
            if (!examData.title.trim() || !examData.mode || !examData.type || !examData.date) {
                return setAlert({type:'error', title:'Incomplete Data', message:'Please fill out the Exam Title and select basic formats.'});
            }
            if (examData.mode === 'real-time' && (!examData.startTime || !examData.endTime)) {
                return setAlert({type:'error', title:'Incomplete Data', message:'Please specify both Start Time and Submission Cut-off.'});
            }
            if (examData.mode === 'deadline' && (!examData.deadlineTime || !examData.duration)) {
                return setAlert({type:'error', title:'Incomplete Data', message:'Please specify Deadline Time and Duration.'});
            }
        }

        setAlert(null); // Clear alerts if validation passes
        setStep(prev => prev + 1);
    };

    const combineDateTime = (dateStr, timeStr) => {
        if (!dateStr || !timeStr) return null;
        return `${dateStr}T${timeStr}:00`;
    };

    const handlePublish = async () => {
        // 🟢 FINAL STEP VALIDATION: Block publishing if MCQ data is incomplete
        if (examData.type === 'mcq') {
            if (!examData.questions || examData.questions.length === 0) {
                return setAlert({type: 'error', title: 'Empty Exam', message: 'You must add at least one question before publishing.'});
            }

            // Check for missing correct answers
            const hasIncompleteQuestions = examData.questions.some(q => q.correctOptionIndex === null);
            if (hasIncompleteQuestions) {
                return setAlert({
                    type: 'error',
                    title: 'Incomplete Exam',
                    message: 'All multiple choice questions must have a correct answer selected before publishing.'
                });
            }

            // Check for empty question text
            const hasEmptyText = examData.questions.some(q => !q.questionText || q.questionText.trim() === '');
            if (hasEmptyText) {
                return setAlert({
                    type: 'error',
                    title: 'Missing Question Text',
                    message: 'Please ensure all questions have their text written before publishing.'
                });
            }
        }

        // 🟢 FINAL STEP VALIDATION: Check Short Answer
        if (examData.type === 'short') {
            if (!examData.questions || examData.questions.length === 0) {
                return setAlert({type: 'error', title: 'Empty Exam', message: 'You must add at least one question before publishing.'});
            }

            // Check for empty text or missing model answers
            const hasIncompleteShortQuestions = examData.questions.some(q =>
                !q.questionText || q.questionText.trim() === '' ||
                !q.modelAnswer || q.modelAnswer.trim() === ''
            );

            if (hasIncompleteShortQuestions) {
                return setAlert({
                    type: 'error',
                    title: 'Missing Model Answers',
                    message: 'All short answer questions must have a Question Text and an AI Model Answer before publishing.'
                });
            }
        }

        // 🟢 FINAL STEP VALIDATION: Check PDF
        if (examData.type === 'pdf' && !examData.pdfFile) {
            return setAlert({type: 'error', title: 'Missing File', message: 'Please upload a PDF document before publishing.'});
        }

        setIsPublishing(true);
        setAlert(null);

        try {
            // Auto-calculate duration for Real-Time exams
            let finalDuration = parseInt(examData.duration);

            if (examData.mode === 'real-time') {
                const start = new Date(`1970-01-01T${examData.startTime}:00`);
                const end = new Date(`1970-01-01T${examData.endTime}:00`);
                finalDuration = Math.round((end - start) / 60000); // Converts milliseconds difference to minutes

                if (finalDuration <= 0) {
                    setIsPublishing(false);
                    return setAlert({type: 'error', title: 'Invalid Schedule', message: 'The submission cut-off must be later than the start time!'});
                }
            }

            let finalPdfUrl = null;

            if (examData.type === 'pdf' && examData.pdfFile) {
                const formData = new FormData();
                formData.append('file', examData.pdfFile);
                formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

                const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                    method: 'POST', body: formData
                });
                const data = await uploadRes.json();
                finalPdfUrl = data.secure_url;
            }

            const payload = {
                classIds: examData.classes,
                title: examData.title,
                examMode: examData.mode.toUpperCase(),
                examType: examData.type.toUpperCase(),
                durationMinutes: finalDuration,
                scheduledStartTime: examData.mode === 'real-time' ? combineDateTime(examData.date, examData.startTime) : null,
                deadlineTime: examData.mode === 'deadline' ? combineDateTime(examData.date, examData.deadlineTime) : combineDateTime(examData.date, examData.endTime),
                pdfResourceUrl: finalPdfUrl,
                questions: examData.questions
            };

            await teacherService.publishExam(payload);

            setAlert({type: 'success', title: 'Success!', message: 'Exam published successfully.'});
            setTimeout(() => navigate('/teacher/dashboard'), 2000);

        } catch (error) {
            console.error("Publish Error:", error);
            setAlert({type: 'error', title: 'Failed to Publish', message: 'An error occurred while publishing the exam. Please try again.'});
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <TeacherLayout>
            <div className="max-w-5xl mx-auto pb-20">
                {alert && <CustomAlert type={alert.type} title={alert.title} message={alert.message} onClose={() => setAlert(null)} />}

                <div className="flex justify-between items-center mb-10 bg-examsy-surface p-6 rounded-[32px] border border-zinc-200 dark:border-zinc-800">
                    <div>
                        <h1 className="text-2xl font-black text-examsy-text">Create New Exam</h1>
                        <p className="text-examsy-muted font-bold text-sm">Step {step} of 3</p>
                    </div>
                    <div className="flex gap-3">
                        {step > 1 && (
                            <button onClick={() => setStep(prev=>prev-1)} className="p-3 bg-examsy-bg text-examsy-text rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                                <ChevronLeft size={20} />
                            </button>
                        )}
                        {step < 3 ? (
                            <button onClick={nextStep} className="bg-examsy-primary text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
                                Next Step <ChevronRight size={20} />
                            </button>
                        ) : (
                            <button onClick={handlePublish} disabled={isPublishing} className="bg-emerald-600 disabled:opacity-50 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
                                {isPublishing ? <Loader2 className="animate-spin" size={20} /> : <><Send size={20} /> Publish Exam</>}
                            </button>
                        )}
                    </div>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {step === 1 && (
                        <TeacherExamClassSelector
                            selected={examData.classes}
                            onChange={(c) => setExamData({...examData, classes: c})}
                        />
                    )}

                    {step === 2 && (
                        <TeacherExamModeSelector
                            data={examData}
                            onChange={(key, val) => setExamData({...examData, [key]: val})}
                        />
                    )}

                    {step === 3 && (
                        <>
                            {examData.type === 'mcq' && (
                                <TeacherMCQBuilder questions={examData.questions} onChange={(q) => setExamData({...examData, questions: q})} />
                            )}
                            {examData.type === 'short' && (
                                <TeacherShortAnswerBuilder questions={examData.questions} onChange={(q) => setExamData({...examData, questions: q})} />
                            )}
                            {examData.type === 'pdf' && (
                                <TeacherPDFUploader file={examData.pdfFile} onChange={(f) => setExamData({...examData, pdfFile: f})} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </TeacherLayout>
    );
};

export default TeacherTeaching;