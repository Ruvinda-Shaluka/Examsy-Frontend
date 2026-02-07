import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeacherLayout from '../../../layouts/TeacherLayout.jsx';
import { MOCK_LIVE_STUDENTS } from '../../../data/TeacherMockData.js';
import { Search, ChevronLeft, CheckCircle2, ShieldAlert, Sparkles, MessageSquare, Send, Megaphone, X } from 'lucide-react';

const TeacherLiveMonitor = () => {
    const { examId } = useParams();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    // Broadcast Modal State
    const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
    const [broadcastMessage, setBroadcastMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    // Memoize the filtered list to prevent unnecessary expensive re-renders
    const filteredStudents = useMemo(() => {
        return MOCK_LIVE_STUDENTS.filter(s =>
            s.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const handleSendBroadcast = () => {
        if (!broadcastMessage.trim()) return;
        setIsSending(true);

        // Simulate API call
        setTimeout(() => {
            setIsSending(false);
            setIsBroadcastOpen(false);
            setBroadcastMessage("");
        }, 1500);
    };

    return (
        <TeacherLayout>
            {/* SCROLLBAR & STABILITY LOGIC:
                1. hide-scrollbar: Removes the visual bar.
                2. scrollbar-gutter: stable: Reserves the space so the page doesn't jump
                   left/right when the results list becomes shorter than the screen.
            */}
            <style>
                {`
                    .hide-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .hide-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                        scrollbar-gutter: stable !important;
                    }
                    /* Force the table to respect fixed widths even if content is small */
                    .fixed-monitor-table {
                        table-layout: fixed !important;
                        width: 1100px !important; /* Fixed total width to prevent any compression */
                    }
                `}
            </style>

            <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-fade-in relative hide-scrollbar">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-2">
                        <button
                            onClick={() => navigate('/teacher/ongoing')}
                            className="flex items-center gap-2 text-examsy-muted font-black text-xs uppercase tracking-widest hover:text-examsy-primary transition-colors"
                        >
                            <ChevronLeft size={16} /> Back to Ongoing Exams
                        </button>
                        <h1 className="text-3xl font-black text-examsy-text">
                            Live Monitor: <span className="text-examsy-primary">Physics Mid-Term</span>
                        </h1>
                    </div>

                    <button
                        onClick={() => setIsBroadcastOpen(true)}
                        className="bg-examsy-primary text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        <Megaphone size={18} />
                        Broadcast to Class
                    </button>
                </div>

                {/* Table Container */}
                <div className="bg-examsy-surface rounded-[40px] border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-examsy-primary/10 text-examsy-primary rounded-xl">
                                <Sparkles size={20} className="animate-pulse" />
                            </div>
                            <h2 className="text-xl font-black text-examsy-text uppercase tracking-tight">AI Proctoring Stream</h2>
                        </div>

                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted" size={18} />
                            <input
                                type="text"
                                placeholder="Search student..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-examsy-text outline-none focus:border-examsy-primary"
                            />
                        </div>
                    </div>

                    {/* Standard HTML Table with Fixed Layout for absolute zero-shift */}
                    <div className="overflow-x-auto hide-scrollbar">
                        <table className="fixed-monitor-table text-left">
                            <colgroup>
                                <col style={{ width: '320px' }} /> {/* Student */}
                                <col style={{ width: '120px' }} /> {/* Status */}
                                <col style={{ width: '250px' }} /> {/* AI Integrity */}
                                <col style={{ width: '200px' }} /> {/* Progress */}
                                <col style={{ width: '210px' }} /> {/* Actions */}
                            </colgroup>

                            <thead className="bg-examsy-bg/50">
                            <tr className="text-[10px] font-black uppercase text-examsy-muted tracking-widest">
                                <th className="px-8 py-4">Student</th>
                                <th className="px-8 py-4 text-center">Status</th>
                                <th className="px-8 py-4">AI Integrity Check</th>
                                <th className="px-8 py-4">Progress</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr
                                        key={student.id}
                                        className={`transition-colors duration-200 ${student.flagged ? 'bg-red-500/[0.03]' : 'hover:bg-examsy-bg/30'}`}
                                    >
                                        {/* Student Info */}
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4 overflow-hidden">
                                                <div className="w-10 h-10 rounded-xl bg-examsy-primary text-white flex-shrink-0 flex items-center justify-center font-black">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <span className="font-black text-examsy-text truncate">
                                                        {student.name}
                                                    </span>
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${student.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'}`} />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-examsy-text">{student.status}</span>
                                            </div>
                                        </td>

                                        {/* Integrity Badge */}
                                        <td className="px-8 py-6">
                                            {student.flagged ? (
                                                <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-4 py-2 rounded-xl border border-red-500/20 inline-flex max-w-full overflow-hidden">
                                                    <ShieldAlert size={14} className="flex-shrink-0" />
                                                    <span className="text-[10px] font-black uppercase tracking-wider truncate">
                                                            Suspicious ({student.flags}x)
                                                        </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-emerald-500 px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 inline-flex">
                                                    <CheckCircle2 size={14} className="flex-shrink-0" />
                                                    <span className="text-[10px] font-black uppercase tracking-wider">Secure</span>
                                                </div>
                                            )}
                                        </td>

                                        {/* Progress */}
                                        <td className="px-8 py-6">
                                            <div className="w-full h-1.5 bg-examsy-bg rounded-full overflow-hidden border border-zinc-100 dark:border-zinc-800">
                                                <div
                                                    className={`h-full transition-all duration-700 ${student.flagged ? 'bg-red-500' : 'bg-examsy-primary'}`}
                                                    style={{ width: `${student.progress}%` }}
                                                />
                                            </div>
                                        </td>

                                        {/* Action Buttons */}
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2.5 bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-xl text-examsy-muted hover:text-examsy-primary transition-all">
                                                    <MessageSquare size={16} />
                                                </button>
                                                <button className="px-4 py-2.5 bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-examsy-text hover:bg-examsy-primary hover:text-white transition-all whitespace-nowrap">
                                                    View Screen
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-20 text-center">
                                        <p className="text-examsy-muted font-black">No students match your search.</p>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Broadcast Modal Overlay */}
                {isBroadcastOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                            onClick={() => !isSending && setIsBroadcastOpen(false)}
                        />
                        <div className="bg-examsy-surface w-full max-w-lg rounded-[40px] border border-zinc-200 dark:border-zinc-800 shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 overflow-hidden">
                            <div className="p-8 space-y-6">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-examsy-primary/10 text-examsy-primary rounded-xl">
                                            <Megaphone size={20} />
                                        </div>
                                        <h3 className="text-xl font-black text-examsy-text">Broadcast Notice</h3>
                                    </div>
                                    <button
                                        onClick={() => setIsBroadcastOpen(false)}
                                        className="p-2 text-examsy-muted hover:bg-examsy-bg rounded-xl transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-sm font-bold text-examsy-muted">
                                        This message will be sent to every student currently participating in this exam.
                                    </p>
                                    <textarea
                                        value={broadcastMessage}
                                        onChange={(e) => setBroadcastMessage(e.target.value)}
                                        placeholder="e.g. Please check question 12, there is a typo in the second option."
                                        className="w-full h-40 bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-[24px] p-6 text-examsy-text font-bold outline-none focus:border-examsy-primary transition-all resize-none"
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        disabled={isSending}
                                        onClick={() => setIsBroadcastOpen(false)}
                                        className="flex-1 py-4 bg-examsy-bg text-examsy-text font-black rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={isSending || !broadcastMessage.trim()}
                                        onClick={handleSendBroadcast}
                                        className="flex-[2] py-4 bg-examsy-primary text-white font-black rounded-2xl shadow-lg shadow-examsy-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
                                    >
                                        {isSending ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                Send to Class
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </TeacherLayout>
    );
};

export default TeacherLiveMonitor;