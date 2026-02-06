import React, { useState } from 'react';
import TeacherLayout from '../../layouts/TeacherLayout';
import TeacherExamClassSelector from '../../components/teacher/teaching/TeacherExamClassSelector';
import TeacherExamModeSelector from '../../components/teacher/teaching/TeacherExamModeSelector';
import TeacherMCQBuilder from '../../components/teacher/teaching/TeacherMCQBuilder';
import TeacherShortAnswerBuilder from '../../components/teacher/teaching/TeacherShortAnswerBuilder';
import TeacherPDFUploader from '../../components/teacher/teaching/TeacherPDFUploader';

import { ChevronRight, ChevronLeft, Send } from 'lucide-react';

const TeacherTeaching = () => {
    const [step, setStep] = useState(1);
    const [examData, setExamData] = useState({
        classes: [],
        mode: '',
        type: '',
        content: {}
    });

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <TeacherLayout>
            <div className="max-w-5xl mx-auto pb-20">
                {/* Progress Header */}
                <div className="flex justify-between items-center mb-10 bg-examsy-surface p-6 rounded-[32px] border border-zinc-200 dark:border-zinc-800">
                    <div>
                        <h1 className="text-2xl font-black text-examsy-text">Create New Exam</h1>
                        <p className="text-examsy-muted font-bold text-sm">Step {step} of 3</p>
                    </div>
                    <div className="flex gap-3">
                        {step > 1 && (
                            <button onClick={prevStep} className="p-3 bg-examsy-bg text-examsy-text rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                                <ChevronLeft size={20} />
                            </button>
                        )}
                        {step < 3 ? (
                            <button
                                onClick={nextStep}
                                // Optional: Disable 'Next' if current step data isn't filled
                                className="bg-examsy-primary text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-transform"
                            >
                                Next Step <ChevronRight size={20} />
                            </button>
                        ) : (
                            <button className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-transform">
                                Publish Exam <Send size={20} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Step Views */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Step 1: Select Classes */}
                    {step === 1 && (
                        <TeacherExamClassSelector
                            selected={examData.classes}
                            onChange={(classes) => setExamData({...examData, classes})}
                        />
                    )}

                    {/* Step 2: Select Mode and Type */}
                    {step === 2 && (
                        <TeacherExamModeSelector
                            data={examData}
                            onChange={(mode, type) => setExamData({...examData, mode, type})}
                        />
                    )}

                    {/* Step 3: Content Builder (Dynamic based on Type) */}
                    {step === 3 && (
                        <>
                            {examData.type === 'mcq' && <TeacherMCQBuilder />}
                            {examData.type === 'short' && <TeacherShortAnswerBuilder />}
                            {examData.type === 'pdf' && <TeacherPDFUploader />}
                        </>
                    )}
                </div>
            </div>
        </TeacherLayout>
    );
};

export default TeacherTeaching;