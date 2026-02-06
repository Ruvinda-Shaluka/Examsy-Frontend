import React, { useState } from 'react';
import TeacherLayout from '../../layouts/TeacherLayout';
import { FileText, Sparkles, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const TeacherGrading = () => {
    const [isGrading, setIsGrading] = useState(false);
    const [aiFeedback, setAiFeedback] = useState(null);

    // This mimics the call you will later make to your backend for Gemini API
    const handleAiGrade = () => {
        setIsGrading(true);
        setTimeout(() => {
            setAiFeedback({
                score: 85,
                comments: "The student demonstrates a strong understanding of Newton's Second Law. However, the calculation in step 3 has a minor sign error. Suggest focusing on vector direction in future lessons.",
                confidence: "High"
            });
            setIsGrading(false);
        }, 2500);
    };

    return (
        <TeacherLayout>
            <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-examsy-text">Exam Grading</h1>
                        <p className="text-examsy-muted font-bold">Review and grade student submissions with AI assistance.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Submission List */}
                    <div className="lg:col-span-1 space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-examsy-muted ml-2">Pending Reviews</h3>
                        {[1, 2, 3].map(i => (
                            <button key={i} className={`w-full p-4 rounded-3xl border text-left transition-all ${i === 1 ? 'bg-examsy-primary/5 border-examsy-primary' : 'bg-examsy-surface border-zinc-200 dark:border-zinc-800'}`}>
                                <p className="font-black text-examsy-text">Student Name {i}</p>
                                <p className="text-xs font-bold text-examsy-muted italic">Submitted: 2 hours ago</p>
                            </button>
                        ))}
                    </div>

                    {/* Right: Grading Workspace */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-examsy-surface rounded-[40px] border border-zinc-200 dark:border-zinc-800 p-8 min-h-[500px] flex flex-col">
                            {/* Document Preview Placeholder */}
                            <div className="flex-1 bg-examsy-bg rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 flex flex-col items-center justify-center p-10 text-center mb-6">
                                <FileText size={48} className="text-examsy-muted mb-4" />
                                <p className="text-examsy-text font-black">Submission_Physics_Final.pdf</p>
                                <p className="text-xs font-bold text-examsy-muted mt-1">Student ID: EX-2026-00{1}</p>
                            </div>

                            {/* AI Tools Section */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-black text-examsy-text flex items-center gap-2">
                                        <Sparkles className="text-examsy-primary" size={18} />
                                        Examsy AI Assistant
                                    </h4>
                                    <button
                                        onClick={handleAiGrade}
                                        disabled={isGrading}
                                        className="bg-examsy-primary text-white px-6 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                    >
                                        {isGrading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                                        {isGrading ? 'Analyzing...' : 'Grade with AI'}
                                    </button>
                                </div>

                                {/* AI Result Box */}
                                {aiFeedback && (
                                    <div className="p-6 bg-examsy-primary/5 border border-examsy-primary/20 rounded-3xl animate-in zoom-in-95 duration-300">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-2 text-examsy-primary font-black">
                                                <CheckCircle size={18} />
                                                <span>AI Feedback</span>
                                            </div>
                                            <div className="px-3 py-1 bg-examsy-primary text-white rounded-lg text-xs font-black">
                                                Score: {aiFeedback.score}%
                                            </div>
                                        </div>
                                        <p className="text-sm font-bold text-examsy-text leading-relaxed">
                                            {aiFeedback.comments}
                                        </p>
                                        <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-examsy-muted uppercase tracking-wider">
                                            <AlertCircle size={12} />
                                            Confidence Level: {aiFeedback.confidence}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Final Decision Form */}
                        <div className="bg-examsy-surface rounded-[32px] border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col sm:flex-row gap-4">
                            <input
                                type="number"
                                placeholder="Final Score"
                                className="bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-3 font-black text-examsy-text w-full sm:w-40 outline-none focus:border-examsy-primary"
                            />
                            <button className="flex-1 bg-emerald-600 text-white rounded-2xl font-black py-3 shadow-lg hover:shadow-emerald-600/20 transition-all">
                                Approve & Release Grade
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </TeacherLayout>
    );
};

export default TeacherGrading;