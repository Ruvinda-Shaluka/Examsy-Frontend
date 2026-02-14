import React from 'react';
import { AlertTriangle, Eye, Clock, History } from 'lucide-react';

const SecurityAlertModal = ({
                                isOpen,
                                onClose,
                                lastAwayDuration,
                                totalAwaySeconds,
                                warningCount,
                                formatDuration
                            }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-examsy-surface w-full max-w-sm rounded-[32px] border border-red-500/20 p-6 text-center shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">

                {/* Background Pulse Effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>

                <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <AlertTriangle size={32} />
                </div>

                <h2 className="text-xl font-black text-examsy-text mb-2">Proctoring Alert</h2>
                <p className="text-examsy-muted font-bold text-xs mb-6 leading-relaxed">
                    You navigated away from the exam window. This action has been logged and may affect your final grade.
                </p>

                <div className="bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 mb-6 space-y-3">
                    {/* Last Instance Time */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-examsy-muted font-bold">
                            <Clock size={16} />
                            <span>Last Away:</span>
                        </div>
                        <span className="font-black text-red-400">{formatDuration(lastAwayDuration)}</span>
                    </div>

                    <div className="w-full h-px bg-zinc-200 dark:border-zinc-800"></div>

                    {/* Total Cumulative Time */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-examsy-muted font-bold">
                            <History size={16} />
                            <span>Total Lost:</span>
                        </div>
                        <span className="font-black text-red-600">{formatDuration(totalAwaySeconds)}</span>
                    </div>

                    <div className="w-full h-px bg-zinc-200 dark:border-zinc-800"></div>

                    {/* Total Flags */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-examsy-muted font-bold">
                            <Eye size={16} />
                            <span>Total Flags:</span>
                        </div>
                        <span className="font-black text-examsy-text">{warningCount} Times</span>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full py-3 bg-red-500 text-white rounded-xl font-black text-sm shadow-lg shadow-red-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                    I Understand
                </button>
            </div>
        </div>
    );
};

export default SecurityAlertModal;