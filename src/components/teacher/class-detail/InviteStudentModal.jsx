import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, Link as LinkIcon, Share2, X } from 'lucide-react';

const InviteStudentModal = ({ classId, isOpen, onClose }) => {
    const [inviteLink, setInviteLink] = useState('');
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setInviteLink('');
            setLoading(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // Simulate API Call for Demo purposes
    const generateLink = () => {
        setLoading(true);
        // Simulate network delay
        setTimeout(() => {
            const mockToken = Math.random().toString(36).substring(7);
            setInviteLink(`https://examsy.com/join/${classId}/${mockToken}`);
            setLoading(false);
        }, 1500);
    };

    const copyToClipboard = () => {
        if (!inviteLink) return;
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Modal Container */}
            <div className="bg-examsy-surface w-full max-w-md rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative">

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
                        <button
                            onClick={onClose}
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
                                <LinkIcon size={20} />
                            </div>
                            <div>
                                <h4 className="font-black text-blue-600 dark:text-blue-400 text-sm">Secure Invite Link</h4>
                                <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1 font-bold leading-relaxed">
                                    Generated links expire in 48 hours. Share this URL directly with your students.
                                </p>
                            </div>
                        </div>

                        {/* Action Area */}
                        {!inviteLink ? (
                            <button
                                onClick={generateLink}
                                disabled={loading}
                                className="w-full py-4 bg-examsy-primary text-white rounded-2xl font-black transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 shadow-lg shadow-purple-500/20"
                            >
                                {loading ? (
                                    <>
                                        <RefreshCw className="animate-spin" size={20} /> Generating...
                                    </>
                                ) : (
                                    <>Generate Unique Link</>
                                )}
                            </button>
                        ) : (
                            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                                <label className="text-[10px] font-black text-examsy-muted uppercase tracking-widest ml-2">
                                    Active Link
                                </label>
                                <div className="flex gap-2">
                                    <div className="flex-1 bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3.5 flex items-center">
                                        <input
                                            readOnly
                                            value={inviteLink}
                                            className="bg-transparent border-none w-full text-sm font-bold text-examsy-text focus:ring-0 outline-none"
                                        />
                                    </div>
                                    <button
                                        onClick={copyToClipboard}
                                        className={`p-3.5 rounded-2xl transition-all shadow-md ${
                                            copied
                                                ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                                                : 'bg-examsy-surface border border-zinc-200 dark:border-zinc-800 text-examsy-muted hover:text-examsy-primary hover:border-examsy-primary'
                                        }`}
                                    >
                                        {copied ? <Check size={20} /> : <Copy size={20} />}
                                    </button>
                                </div>
                                <div className="text-center pt-2">
                                    <button
                                        onClick={generateLink}
                                        className="text-xs font-bold text-examsy-muted hover:text-examsy-primary flex items-center justify-center gap-1 mx-auto transition-colors"
                                    >
                                        <RefreshCw size={12} /> Regenerate Link
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InviteStudentModal;