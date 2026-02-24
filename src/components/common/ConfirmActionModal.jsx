import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmActionModal = ({
                                isOpen,
                                onClose,
                                onConfirm,
                                title,
                                message,
                                confirmText = "Confirm",
                                cancelText = "Cancel",
                                isDanger = false // If true, makes the confirm button red
                            }) => {
    if (!isOpen) return null;

    // Handle confirm click
    const handleConfirm = (e) => {
        e.stopPropagation(); // Prevent bubbling up
        onConfirm();
        onClose();
    };

    // Handle cancel click
    const handleCancel = (e) => {
        e.stopPropagation();
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={handleCancel} // Clicking background closes it
        >
            <div
                className="bg-examsy-surface w-full max-w-sm rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <div className="p-8 text-center relative">

                    {/* Close Button (Top Right) */}
                    <button
                        onClick={handleCancel}
                        className="absolute top-6 right-6 p-2 text-examsy-muted hover:text-examsy-text hover:bg-examsy-bg rounded-xl transition-all"
                    >
                        <X size={18} />
                    </button>

                    {/* Icon */}
                    <div className={`mx-auto w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-6 border-4 border-examsy-surface shadow-inner ${
                        isDanger ? 'bg-red-500/10 text-red-500' : 'bg-examsy-primary/10 text-examsy-primary'
                    }`}>
                        <AlertTriangle size={36} strokeWidth={2.5} />
                    </div>

                    {/* Text */}
                    <div className="space-y-2 mb-8">
                        <h3 className="text-xl font-black text-examsy-text tracking-tight">{title}</h3>
                        <p className="text-sm font-bold text-examsy-muted leading-relaxed">
                            {message}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleCancel}
                            className="flex-1 py-4 bg-examsy-bg text-examsy-text font-black rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all border border-zinc-200 dark:border-zinc-800"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={handleConfirm}
                            className={`flex-1 py-4 font-black rounded-2xl text-white shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 ${
                                isDanger ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-examsy-primary hover:bg-examsy-primary/90 shadow-purple-500/20'
                            }`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmActionModal;