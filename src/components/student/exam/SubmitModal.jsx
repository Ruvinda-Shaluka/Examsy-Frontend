import React from 'react';
import { CheckCircle2, Download, Home, Award } from 'lucide-react';

const SubmitModal = ({ isOpen, examTitle, resultData, onDashboard }) => {
    if (!isOpen) return null;

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

                {/* REAL-TIME GRADING DISPLAY */}
                {resultData && resultData.status === 'GRADED' && (
                    <div className="bg-examsy-primary/10 border border-examsy-primary/20 rounded-3xl p-6 mb-8 flex flex-col items-center">
                        <Award size={32} className="text-examsy-primary mb-2" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-examsy-primary mb-1">Instant Auto-Grade</p>
                        <p className="text-4xl font-black text-examsy-text">
                            {resultData.score} <span className="text-lg text-examsy-muted">/ {resultData.maxScore}</span>
                        </p>
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