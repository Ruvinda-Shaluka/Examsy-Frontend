import React, { useState } from 'react';
import { Share2, X, KeyRound, Mail, Loader2, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { teacherService } from '../../../services/teacherService';

const InviteStudentModal = ({ classId, isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(null);

    // 🟢 NEW: State to trigger the slow fade-out animation
    const [isClosing, setIsClosing] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback(null);
        if (!email.trim()) return;

        setIsSubmitting(true);
        try {
            await teacherService.inviteStudent(classId, email.trim());

            setFeedback({ type: 'success', message: `Invitation sent securely to ${email}!` });

            // 🟢 NEW: Slowed down the auto-close timer to 4 seconds (4000ms)
            setTimeout(() => {
                handleClose();
            }, 4000);

        } catch (error) {
            setFeedback({
                type: 'error',
                message: error.response?.data?.message || 'Failed to send invitation. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // 🟢 NEW: The Smooth Close Function
    const handleClose = () => {
        setIsClosing(true); // 1. Start the fade-out CSS animation

        // 2. Wait 400ms for the animation to finish, THEN actually close it
        setTimeout(() => {
            setEmail('');
            setFeedback(null);
            setIsClosing(false); // Reset for the next time it opens
            onClose(); // Tell the parent component to destroy the modal
        }, 400);
    };

    return (
        // 🟢 NEW: Dynamically swap the background animation classes based on `isClosing`
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm ${
            isClosing ? 'animate-out fade-out duration-500' : 'animate-in fade-in duration-300'
        }`}>
            {/* 🟢 NEW: Dynamically swap the modal body animation classes */}
            <div className={`bg-examsy-surface w-full max-w-md rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden relative ${
                isClosing ? 'animate-out zoom-out-95 duration-500' : 'animate-in zoom-in-95 duration-300'
            }`}>

                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-examsy-primary/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />

                <div className="p-8 relative z-10">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-examsy-bg rounded-2xl text-examsy-primary border border-zinc-100 dark:border-zinc-800 shadow-sm">
                                <Share2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-examsy-text">Invite Students</h3>
                                <p className="text-xs text-examsy-muted font-bold">Class ID: {classId}</p>
                            </div>
                        </div>
                        {/* 🟢 Uses the new smooth handleClose */}
                        <button
                            onClick={handleClose}
                            className="p-2 text-examsy-muted hover:text-examsy-text hover:bg-examsy-bg rounded-xl transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        {/* Info Card */}
                        <div className="bg-blue-500/5 border border-blue-500/10 p-5 rounded-3xl flex gap-4 items-start">
                            <div className="bg-blue-500/10 p-2.5 rounded-2xl text-blue-500 shrink-0">
                                <KeyRound size={20} />
                            </div>
                            <div>
                                <h4 className="font-black text-blue-600 dark:text-blue-400 text-sm">Secure Email Invite</h4>
                                <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1 font-bold leading-relaxed">
                                    The system will automatically attach the rotating class code to a secure link and email it directly to the student.
                                </p>
                            </div>
                        </div>

                        {/* Feedback Messages */}
                        {feedback?.type === 'success' && (
                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-start gap-3 animate-in fade-in">
                                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                                <p className="text-sm font-bold text-emerald-500 leading-tight">{feedback.message}</p>
                            </div>
                        )}

                        {feedback?.type === 'error' && (
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-start gap-3 animate-in fade-in">
                                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                                <p className="text-sm font-bold text-red-500 leading-tight">{feedback.message}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                            <div>
                                <label className="text-[10px] font-black text-examsy-muted uppercase tracking-widest ml-2 mb-1 block">
                                    Student Email Address
                                </label>
                                <div className="relative group">
                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-examsy-primary transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="student@example.com"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if(feedback) setFeedback(null);
                                        }}
                                        className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-700 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold outline-none focus:border-examsy-primary transition-all text-examsy-text"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || !email}
                                className="w-full py-3.5 rounded-2xl bg-examsy-primary text-white font-black hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-2 shadow-lg shadow-examsy-primary/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
                            >
                                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <><Send size={18}/> Send Invitation</>}
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default InviteStudentModal;