import React, { useState } from 'react';
import { X, Link as LinkIcon } from 'lucide-react';

const StudentJoinClassModal = ({ isOpen, onClose, onJoin }) => {
    const [inviteLink, setInviteLink] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inviteLink.trim()) return;

        setIsSubmitting(true);
        try {
            // Send the raw link directly to the dashboard's handler
            await onJoin({ inviteLink: inviteLink.trim() });
            setInviteLink(''); // Clear on success
        } finally {
            // We do NOT close the modal here in a finally block,
            // the dashboard handles closing it only on success!
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setInviteLink('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-examsy-surface w-full max-w-md rounded-[32px] border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                    <h2 className="text-xl font-black text-examsy-text">Join Class</h2>
                    <button onClick={handleClose} className="p-2 hover:bg-examsy-bg rounded-xl text-examsy-muted transition-colors"><X size={20}/></button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-examsy-muted tracking-[0.2em] ml-1">Invite Link *</label>
                        <div className="relative group">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-examsy-primary transition-colors" size={18} />
                            <input
                                type="text" // Changed from URL to Text so it doesn't block partial pastes
                                required
                                value={inviteLink}
                                onChange={(e) => setInviteLink(e.target.value)}
                                className="w-full pl-12 pr-4 bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3.5 outline-none focus:border-examsy-primary text-examsy-text font-bold text-sm transition-all"
                                placeholder="https://examsy.com/join/5/ABCDEFG"
                            />
                        </div>
                        <p className="text-xs text-examsy-muted mt-2 ml-1">Ask your instructor for the exact class invite link, then enter it here.</p>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !inviteLink}
                        className="w-full bg-examsy-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-examsy-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
                    >
                        {isSubmitting ? 'Verifying...' : 'Join Class'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentJoinClassModal;