import React from 'react';
import { AlertTriangle, Eye, Clock, History, Maximize } from 'lucide-react';

const SecurityAlertModal = ({
                                isOpen,
                                onClose,
                                lastAwayDuration,
                                totalAwaySeconds,
                                warningCount,
                                formatDuration,
                                violationType // 🟢 NEW: Pass the type of violation to show specific messages
                            }) => {
    if (!isOpen) return null;

    // 🟢 Dynamic messaging based on the exact cheating method detected
    const getAlertDetails = () => {
        switch (violationType) {
            case 'TAB_SWITCHED':
                return {
                    title: "Tab Switch Detected",
                    message: "You switched to another browser tab. This action has been logged and may affect your final grade."
                };
            case 'WINDOW_LOST_FOCUS':
                return {
                    title: "Window Focus Lost",
                    message: "You clicked outside the exam window or opened another application. This action has been logged."
                };
            case 'SPLIT_SCREEN_DETECTED':
                return {
                    title: "Split Screen Detected",
                    message: "Your browser window is too narrow, indicating a split-screen setup. Please maximize the exam window immediately."
                };
            default:
                return {
                    title: "Proctoring Alert",
                    message: "You navigated away from the exam window. This action has been logged and may affect your final grade."
                };
        }
    };

    const { title, message } = getAlertDetails();
    const isSplitScreen = violationType === 'SPLIT_SCREEN_DETECTED';

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-examsy-surface w-full max-w-sm rounded-[32px] border border-red-500/20 p-6 text-center shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">

                {/* Background Pulse Effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>

                <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    {isSplitScreen ? <Maximize size={32} /> : <AlertTriangle size={32} />}
                </div>

                <h2 className="text-xl font-black text-examsy-text mb-2">{title}</h2>
                <p className="text-examsy-muted font-bold text-xs mb-6 leading-relaxed">
                    {message}
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