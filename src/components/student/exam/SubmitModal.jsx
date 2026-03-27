import React from 'react';
import { CheckCircle2, Home, Award } from 'lucide-react';

const SubmitModal = ({ isOpen, examTitle, resultData, onDashboard }) => {
    if (!isOpen) return null;

    // Helper to color-code the grades
    const getGradeColor = (grade) => {
        switch (grade) {
            case 'A': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
            case 'B': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
            case 'C': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
            case 'S': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
            case 'F': return 'text-red-500 bg-red-500/10 border-red-500/20';
            default: return 'text-examsy-primary bg-examsy-primary/10 border-examsy-primary/20';
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-examsy-surface w-full max-w-md rounded-[40px] border border-zinc-200 dark:border-zinc-800 p-8 text-center shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                </div>

                <h2 className="text-2xl font-black text-examsy-text mb-2">Submission Successful!</h2>
                <p className="text-examsy-muted font-bold text-sm mb-6">
                    Your answers for <span className="text-examsy-primary">{examTitle}</span> have been securely recorded.
                </p>

                {/* 🟢 REAL-TIME GRADING DISPLAY FOR MCQ & SHORT */}
                {resultData && resultData.status === 'GRADED' && (
                    <div className="flex gap-4 mb-8">
                        {/* Score Block */}
                        <div className="flex-1 bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col items-center">
                            <Award size={24} className="text-examsy-primary mb-2" />
                            <p className="text-[9px] font-black uppercase tracking-widest text-examsy-muted mb-1">Final Score</p>
                            <p className="text-3xl font-black text-examsy-text">
                                {resultData.score} <span className="text-sm text-examsy-muted">/ {resultData.maxScore}</span>
                            </p>
                            <p className="text-xs font-bold text-examsy-primary mt-1">{resultData.percentage}%</p>
                        </div>

                        {/* 🟢 NEW: Grade Block */}
                        <div className={`flex-1 border rounded-3xl p-6 flex flex-col items-center justify-center ${getGradeColor(resultData.grade)}`}>
                            <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-80">Grade</p>
                            <p className="text-6xl font-black leading-none">{resultData.grade}</p>
                        </div>
                    </div>
                )}

                {resultData && resultData.status === 'PENDING_TEACHER_REVIEW' && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-4 mb-8 text-amber-600 font-bold text-sm">
                        Pending Teacher Review for final grading.
                    </div>
                )}

                <button
                    onClick={onDashboard}
                    className="w-full py-4 bg-examsy-primary text-white rounded-2xl font-black shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    <Home size={18} /> Return to Dashboard
                </button>
            </div>
        </div>
    );
};

export default SubmitModal;