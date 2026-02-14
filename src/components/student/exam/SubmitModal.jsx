import React from 'react';
import { CheckCircle2, Download, Home, FileText } from 'lucide-react';

const SubmitModal = ({ isOpen, examTitle, onDownload, onDashboard }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-examsy-surface w-full max-w-md rounded-[40px] border border-zinc-200 dark:border-zinc-800 p-8 text-center shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                </div>

                <h2 className="text-2xl font-black text-examsy-text mb-2">Submission Successful!</h2>
                <p className="text-examsy-muted font-bold text-sm mb-8">
                    Your answers for <span className="text-examsy-primary">{examTitle}</span> have been securely recorded.
                </p>

                <div className="bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-examsy-surface rounded-xl text-examsy-primary">
                            <FileText size={20} />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] font-black uppercase tracking-widest text-examsy-muted">Confirmation ID</p>
                            <p className="font-mono font-bold text-examsy-text">#EXM-{Math.floor(Math.random() * 10000)}</p>
                        </div>
                    </div>
                    <button
                        onClick={onDownload}
                        className="w-full py-3 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-examsy-primary hover:bg-examsy-surface rounded-xl transition-all"
                    >
                        <Download size={14} /> Download Receipt
                    </button>
                </div>

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