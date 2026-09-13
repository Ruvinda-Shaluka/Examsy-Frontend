import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, Clock, AlertTriangle, Maximize, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';

const TeacherProctoringModal = ({ isOpen, student, onClose }) => {
    if (!isOpen || !student) return null;

    const [page, setPage] = useState(1);
    const pageSize = 5;
    const history = Array.isArray(student.proctoringHistory) ? student.proctoringHistory : [];
    const totalPages = Math.max(1, Math.ceil(history.length / pageSize));
    const paginatedLogs = history.slice((page - 1) * pageSize, page * pageSize);

    useEffect(() => {
        setPage(1);
    }, [student]);

    const formatTime = (seconds) => {
        if (!seconds) return "0s";
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return m > 0 ? `${m}m ${s}s` : `${s}s`;
    };

    const getEventDetails = (type) => {
        const raw = (type || '').trim();
        const normalized = raw.toUpperCase();

        switch (normalized) {
            case 'TAB_SWITCH':
            case 'TAB_SWITCHED':
            case 'TAB_CHANGE':
                return { label: 'Switched Tabs', icon: <EyeOff size={16} /> };
            case 'FULLSCREEN_EXIT':
            case 'FULLSCREEN_EXITED':
            case 'FULL_SCREEN_EXIT':
                return { label: 'Exited Fullscreen', icon: <Maximize size={16} /> };
            case 'WINDOW_LOST_FOCUS':
            case 'WINDOW_BLUR':
            case 'LOST_FOCUS':
            case 'FOCUS_LOST':
                return { label: 'Clicked Outside Exam', icon: <AlertTriangle size={16} /> };
            case 'SPLIT_SCREEN_DETECTED':
            case 'SPLIT_SCREEN':
                return { label: 'Split Screen Detected', icon: <Maximize size={16} /> };
            default:
                if (!raw) {
                    return { label: 'Suspicious Activity', icon: <ShieldAlert size={16} /> };
                }
                // Convert SNAKE_CASE to clean Title Case (e.g. AUDIO_DETECTED -> "Audio Detected")
                const formatted = raw
                    .replace(/_/g, ' ')
                    .toLowerCase()
                    .replace(/\b\w/g, (char) => char.toUpperCase());
                return { label: formatted, icon: <ShieldAlert size={16} /> };
        }
    };

    const totalFlags = Math.max(student.flags ?? student.suspiciousEvents ?? 0, history.length);
    const totalTimeLost = student.totalAwaySeconds ?? student.timeAwaySeconds ?? (history.reduce((acc, curr) => acc + (curr.durationSeconds || 0), 0) || 0);

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-examsy-surface w-full max-w-lg rounded-[40px] border border-zinc-200 dark:border-zinc-800 shadow-2xl relative animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[85vh]">

                <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center shrink-0">
                    <div>
                        <h3 className="text-xl font-black text-examsy-text">Integrity Report</h3>
                        <p className="text-sm font-bold text-examsy-primary mt-1">{student.name || student.studentName || student.studentUsername || "Student"}</p>
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
                            <p className="text-2xl font-black text-red-500">{totalFlags}</p>
                        </div>
                        <div className="bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-examsy-muted mb-1">Time Lost</p>
                            <p className="text-2xl font-black text-examsy-text">{formatTime(totalTimeLost)}</p>
                        </div>
                    </div>

                    {/* Detailed Log History */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-xs font-black uppercase tracking-widest text-examsy-muted flex items-center gap-2">
                                <Clock size={14}/> Incident Timeline ({history.length})
                            </h4>
                            {totalPages > 1 && (
                                <span className="text-[11px] font-bold text-examsy-muted">
                                    Page {page} of {totalPages}
                                </span>
                            )}
                        </div>

                        <div className="space-y-3">
                            {history.length === 0 ? (
                                <p className="text-sm font-bold text-emerald-500 bg-emerald-500/10 p-4 rounded-xl text-center">
                                    No suspicious activity recorded.
                                </p>
                            ) : (
                                paginatedLogs.map((log, idx) => {
                                    const eventType = log?.eventType || log?.event_type || log?.violationType || log?.type;
                                    const { label, icon } = getEventDetails(eventType);
                                    const recordedTime = log?.recordedAt
                                        ? (!isNaN(new Date(log.recordedAt).getTime())
                                            ? new Date(log.recordedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})
                                            : String(log.recordedAt))
                                        : 'Recent';
                                    return (
                                        <div key={idx} className="bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="text-red-500 bg-red-500/10 p-2 rounded-lg">
                                                    {icon}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-examsy-text">{label}</p>
                                                    <p className="text-[10px] font-bold text-examsy-muted mt-0.5">
                                                        {recordedTime}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs font-black bg-red-500/10 text-red-500 px-3 py-1 rounded-full">
                                                    {formatTime(log?.durationSeconds ?? 0)}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Modal Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-4 pt-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-examsy-muted hover:text-examsy-text hover:bg-examsy-surface transition-all disabled:opacity-30 disabled:pointer-events-none"
                                >
                                    <ChevronLeft size={14} />
                                </button>
                                <span className="text-xs font-black text-examsy-text px-2">
                                    {page} / {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-examsy-muted hover:text-examsy-text hover:bg-examsy-surface transition-all disabled:opacity-30 disabled:pointer-events-none"
                                >
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherProctoringModal;