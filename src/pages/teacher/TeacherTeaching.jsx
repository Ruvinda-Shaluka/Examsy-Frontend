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
        title: '', // Replaced mock title with empty string to force input
        classes: [],
        mode: '',
        type: '',
        date: '',
        startTime: '',
        endTime:'',
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
        // Step 2 Validation (Checks if title, mode, type, date, and duration exist)
        if (step === 2 && (!examData.title.trim() || !examData.mode || !examData.type || !examData.date || !examData.duration)) {
            return setAlert({type:'error', title:'Incomplete Data', message:'Please fill out the Exam Title and all scheduling details.'});
        }
        setStep(prev => prev + 1);
    };

    // --- HELPER: Combines Date and Time into ISO-8601 for Spring Boot (YYYY-MM-DDTHH:MM:00) ---
    const combineDateTime = (dateStr, timeStr) => {
        if (!dateStr || !timeStr) return null;
        return `${dateStr}T${timeStr}:00`;
    };

    const handlePublish = async () => {
        setIsPublishing(true);
        setAlert(null);

        try {
            let finalPdfUrl = null;

            // 1. Upload PDF to Cloudinary if applicable
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

            // 2. Build the exact Payload for Spring Boot (ExamPublishDTO)
            const payload = {
                classIds: examData.classes,
                title: examData.title,
                examMode: examData.mode.toUpperCase(), // 'REAL-TIME' or 'DEADLINE'
                examType: examData.type.toUpperCase(), // 'MCQ', 'SHORT', or 'PDF'
                durationMinutes: parseInt(examData.duration),

                scheduledStartTime: examData.mode === 'real-time'
                    ? combineDateTime(examData.date, examData.startTime)
                    : null,

                // 🟢 FIXED: Properly grab either the deadlineTime or the endTime!
                deadlineTime: examData.mode === 'deadline'
                    ? combineDateTime(examData.date, examData.deadlineTime)
                    : combineDateTime(examData.date, examData.endTime),

                pdfResourceUrl: finalPdfUrl,
                questions: examData.questions
            };

            // 3. Send to Backend via API Service
            await teacherService.publishExam(payload);

            setAlert({type: 'success', title: 'Success!', message: 'Exam published successfully.'});

            // Wait slightly for the alert to be visible, then redirect
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
                    {/* Step 1: Classes */}
                    {step === 1 && (
                        <TeacherExamClassSelector
                            selected={examData.classes}
                            onChange={(c) => setExamData({...examData, classes: c})}
                        />
                    )}

                    {/* Step 2: Details & Scheduling */}
                    {step === 2 && (
                        <TeacherExamModeSelector
                            data={examData}
                            onChange={(key, val) => setExamData({...examData, [key]: val})}
                        />
                    )}

                    {/* Step 3: Content Builders */}
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