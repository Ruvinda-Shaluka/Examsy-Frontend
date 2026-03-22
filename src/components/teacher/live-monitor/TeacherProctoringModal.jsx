import React from 'react';
import { X, ShieldAlert, Clock, AlertTriangle, Maximize, EyeOff } from 'lucide-react';

const TeacherProctoringModal = ({ isOpen, student, onClose }) => {
    if (!isOpen || !student) return null;

    const formatTime = (seconds) => {
        if (!seconds) return "0s";
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return m > 0 ? `${m}m ${s}s` : `${s}s`;
    };

    const getEventDetails = (type) => {
        switch (type) {
            case 'TAB_SWITCHED': return { label: 'Switched Tabs', icon: <EyeOff size={16} /> };
            case 'WINDOW_LOST_FOCUS': return { label: 'Clicked Outside Exam', icon: <AlertTriangle size={16} /> };
            case 'SPLIT_SCREEN_DETECTED': return { label: 'Split Screen Detected', icon: <Maximize size={16} /> };
            default: return { label: 'Unknown Violation', icon: <ShieldAlert size={16} /> };
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-examsy-surface w-full max-w-lg rounded-[40px] border border-zinc-200 dark:border-zinc-800 shadow-2xl relative animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[80vh]">

                <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center shrink-0">
                    <div>
                        <h3 className="text-xl font-black text-examsy-text">Integrity Report</h3>
                        <p className="text-sm font-bold text-examsy-primary mt-1">{student.name}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-examsy-muted hover:bg-examsy-bg rounded-xl transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 flex-1 overflow-y-auto bg-examsy-bg/50 space-y-6">
                    {/* Summary Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-examsy-muted mb-1">Total Flags</p>
                            <p className="text-2xl font-black text-red-500">{student.flags}</p>
                        </div>
                        <div className="bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-examsy-muted mb-1">Time Lost</p>
                            <p className="text-2xl font-black text-examsy-text">{formatTime(student.totalAwaySeconds)}</p>
                        </div>
                    </div>

                    {/* Detailed Log History */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-examsy-muted mb-4 flex items-center gap-2">
                            <Clock size={14}/> Incident Timeline
                        </h4>

                        <div className="space-y-3">
                            {(!student.proctoringHistory || student.proctoringHistory.length === 0) ? (
                                <p className="text-sm font-bold text-emerald-500 bg-emerald-500/10 p-4 rounded-xl text-center">
                                    No suspicious activity recorded.
                                </p>
                            ) : (
                                student.proctoringHistory.map((log, idx) => {
                                    const { label, icon } = getEventDetails(log.eventType);
                                    return (
                                        <div key={idx} className="bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="text-red-500 bg-red-500/10 p-2 rounded-lg">
                                                    {icon}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-examsy-text">{label}</p>
                                                    <p className="text-[10px] font-bold text-examsy-muted mt-0.5">
                                                        {new Date(log.recordedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs font-black bg-red-500/10 text-red-500 px-3 py-1 rounded-full">
                                                    {formatTime(log.durationSeconds)}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherProctoringModal;