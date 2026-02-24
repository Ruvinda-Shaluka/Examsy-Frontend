import React, { useState } from 'react';
import { X, Send, UserX, AlertTriangle, Clock } from 'lucide-react';

const StudentActionModal = ({ student, isOpen, onClose, onWarn, onTerminate }) => {
    const [warningMessage, setWarningMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    if (!isOpen || !student) return null;

    // Condition to terminate: More than 3 flags OR more than 90 seconds (1.30 min) away
    const canTerminate = student.flags > 3 || student.totalAwaySeconds > 90;

    const handleSendWarning = () => {
        if (!warningMessage.trim()) return;
        setIsSending(true);
        // Simulate API delay
        setTimeout(() => {
            onWarn(student.id, warningMessage);
            setIsSending(false);
            setWarningMessage("");
            onClose();
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={() => !isSending && onClose()}
            />

            <div className="bg-examsy-surface w-full max-w-md rounded-[32px] border border-zinc-200 dark:border-zinc-800 shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 overflow-hidden">
                <div className="p-8 space-y-6">

                    {/* Header */}
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-xl font-black text-examsy-text">Student Action</h3>
                            <p className="text-xs font-bold text-examsy-muted mt-1">Directly manage {student.name}</p>
                        </div>
                        <button onClick={onClose} className="p-2 text-examsy-muted hover:bg-examsy-bg rounded-xl transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Stats Summary */}
                    <div className="flex gap-4 p-4 bg-examsy-bg rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <div className="flex-1 flex flex-col items-center justify-center border-r border-zinc-200 dark:border-zinc-800">
                            <span className="text-xs font-black uppercase tracking-widest text-examsy-muted mb-1 flex items-center gap-1"><AlertTriangle size={12}/> Flags</span>
                            <span className={`text-xl font-black ${student.flags > 3 ? 'text-red-500' : 'text-examsy-text'}`}>{student.flags}</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <span className="text-xs font-black uppercase tracking-widest text-examsy-muted mb-1 flex items-center gap-1"><Clock size={12}/> Away</span>
                            <span className={`text-xl font-black ${student.totalAwaySeconds > 90 ? 'text-red-500' : 'text-examsy-text'}`}>{student.totalAwaySeconds}s</span>
                        </div>
                    </div>

                    {/* Warning Section */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-examsy-muted ml-1">Direct Warning Message</label>
                        <textarea
                            value={warningMessage}
                            onChange={(e) => setWarningMessage(e.target.value)}
                            placeholder="Type a warning to send directly to the student's screen..."
                            className="w-full h-24 bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-sm font-bold text-examsy-text outline-none focus:border-examsy-primary transition-all resize-none"
                        />
                        <button
                            disabled={isSending || !warningMessage.trim()}
                            onClick={handleSendWarning}
                            className="w-full py-3 bg-examsy-primary text-white font-black rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
                        >
                            {isSending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={16} /> Send Warning</>}
                        </button>
                    </div>

                    <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800 my-4" />

                    {/* Termination Section */}
                    <div>
                        {canTerminate ? (
                            <div className="space-y-3">
                                <p className="text-xs font-bold text-red-500 text-center">
                                    Student has exceeded security thresholds and can be terminated.
                                </p>
                                <button
                                    onClick={() => onTerminate(student.id)}
                                    className="w-full py-3 bg-red-500 text-white font-black rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    <UserX size={18} /> Terminate Student Exam
                                </button>
                            </div>
                        ) : (
                            <div className="p-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl text-center border border-zinc-200 dark:border-zinc-800 border-dashed">
                                <p className="text-xs font-bold text-zinc-500">
                                    Termination disabled. Student has not exceeded 3 flags or 1.30m of away time.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentActionModal;