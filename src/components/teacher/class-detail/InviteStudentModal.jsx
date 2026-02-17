import React, { useState, useEffect } from 'react';
import { Copy, Check, Link as LinkIcon, Share2, X, KeyRound, Loader2 } from 'lucide-react';

const InviteStudentModal = ({ classId, isOpen, onClose }) => {
    const [inviteData, setInviteData] = useState({ code: '', url: '' });
    const [copiedCode, setCopiedCode] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);
    const [loading, setLoading] = useState(true);

    // Reset and Fetch existing key when modal opens
    useEffect(() => {
        if (isOpen) {
            fetchExistingInvite();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // Simulate fetching the PERMANENT, UNIQUE key from Backend
    const fetchExistingInvite = () => {
        setLoading(true);

        // Simulate network delay
        setTimeout(() => {
            // logic to generate a deterministic key based on ClassID
            // In a real app, this comes from: database.classes.find(id).inviteCode
            const uniqueSuffix = btoa(`class-${classId}-examsy`).substring(0, 6).toUpperCase();
            const permanentCode = `EX-${classId}-${uniqueSuffix}`;

            setInviteData({
                code: permanentCode,
                url: `https://examsy.com/join?code=${permanentCode}`
            });
            setLoading(false);
        }, 800);
    };

    const copyToClipboard = (text, type) => {
        if (!text) return;
        navigator.clipboard.writeText(text);

        if (type === 'code') {
            setCopiedCode(true);
            setTimeout(() => setCopiedCode(false), 2000);
        } else {
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
        }
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
                                <KeyRound size={20} />
                            </div>
                            <div>
                                <h4 className="font-black text-blue-600 dark:text-blue-400 text-sm">Permanent Class Key</h4>
                                <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1 font-bold leading-relaxed">
                                    This key is unique to this class and cannot be changed. Students can use this code to join.
                                </p>
                            </div>
                        </div>

                        {loading ? (
                            <div className="h-32 flex flex-col items-center justify-center text-examsy-muted gap-3">
                                <Loader2 className="animate-spin" size={24} />
                                <span className="text-xs font-bold uppercase tracking-widest">Retrieving Key...</span>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">

                                {/* 1. The Short Code Display */}
                                <div>
                                    <label className="text-[10px] font-black text-examsy-muted uppercase tracking-widest ml-2 mb-1 block">
                                        Class Code
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 bg-examsy-primary/5 border-2 border-examsy-primary/20 rounded-2xl px-4 py-4 flex items-center justify-center text-center">
                                            <span className="text-2xl font-black text-examsy-primary tracking-widest">
                                                {inviteData.code}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(inviteData.code, 'code')}
                                            className={`w-14 flex items-center justify-center rounded-2xl transition-all shadow-md ${
                                                copiedCode
                                                    ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                                                    : 'bg-examsy-surface border border-zinc-200 dark:border-zinc-800 text-examsy-muted hover:text-examsy-primary hover:border-examsy-primary'
                                            }`}
                                        >
                                            {copiedCode ? <Check size={24} /> : <Copy size={24} />}
                                        </button>
                                    </div>
                                </div>

                                {/* 2. The Full URL Display */}
                                <div>
                                    <label className="text-[10px] font-black text-examsy-muted uppercase tracking-widest ml-2 mb-1 block">
                                        Shareable Link
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3.5 flex items-center overflow-hidden">
                                            <LinkIcon size={16} className="text-examsy-muted mr-3 shrink-0" />
                                            <input
                                                readOnly
                                                value={inviteData.url}
                                                className="bg-transparent border-none w-full text-xs font-bold text-examsy-text focus:ring-0 outline-none truncate"
                                            />
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(inviteData.url, 'link')}
                                            className={`w-12 flex items-center justify-center rounded-2xl transition-all shadow-md ${
                                                copiedLink
                                                    ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                                                    : 'bg-examsy-surface border border-zinc-200 dark:border-zinc-800 text-examsy-muted hover:text-examsy-primary hover:border-examsy-primary'
                                            }`}
                                        >
                                            {copiedLink ? <Check size={20} /> : <Copy size={20} />}
                                        </button>
                                    </div>
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