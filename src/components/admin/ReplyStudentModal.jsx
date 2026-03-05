import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

const ReplyStudentModal = ({ isOpen, onClose, studentName, onSubmit }) => {
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSubmitting(true);
        try {
            await onSubmit(message);
            setMessage(''); // Clear form on success
            onClose();      // Close modal
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-zinc-950 w-full max-w-lg rounded-[2.5rem] border border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-white relative">

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-full transition-all"
                >
                    <X size={24} />
                </button>

                <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                            <MessageSquare size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black">Reply to Student</h2>
                            <p className="text-zinc-400 text-base font-bold mt-1">
                                Sending an update to <span className="text-white">{studentName}</span>
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-zinc-500 tracking-widest ml-1">Your Message</label>
                        <textarea
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-base font-bold focus:border-blue-500 outline-none h-32 resize-none transition-all"
                            placeholder="Type your official response to the student..."
                        />
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3.5 text-zinc-400 font-black text-base hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!message.trim() || isSubmitting}
                            className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-3.5 rounded-2xl text-base font-black transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Reply'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReplyStudentModal;