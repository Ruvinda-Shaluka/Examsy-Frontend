import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeacherLayout from '../../../layouts/TeacherLayout.jsx';
import { MOCK_LIVE_STUDENTS } from '../../../data/TeacherMockData.js';
import { Search, ChevronLeft, CheckCircle2, ShieldAlert, Sparkles, MessageSquare } from 'lucide-react';

const TeacherLiveMonitor = () => {
    const { examId } = useNavigate();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredStudents = MOCK_LIVE_STUDENTS.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <TeacherLayout>
            <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-2">
                        <button
                            onClick={() => navigate('/teacher/ongoing-exams')}
                            className="flex items-center gap-2 text-examsy-muted font-black text-xs uppercase tracking-widest hover:text-examsy-primary transition-colors"
                        >
                            <ChevronLeft size={16} /> Back to Ongoing Exams
                        </button>
                        <h1 className="text-3xl font-black text-examsy-text">Live Monitor: <span className="text-examsy-primary">Physics Mid-Term</span></h1>
                    </div>
                </div>

                <div className="bg-examsy-surface rounded-[40px] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm transition-colors duration-500">
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
                                placeholder="Filter students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-examsy-text outline-none focus:border-examsy-primary transition-all"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-examsy-bg/50">
                            <tr>
                                <th className="p-6 text-[10px] font-black uppercase text-examsy-muted tracking-widest">Student</th>
                                <th className="p-6 text-[10px] font-black uppercase text-examsy-muted tracking-widest text-center">Live Status</th>
                                <th className="p-6 text-[10px] font-black uppercase text-examsy-muted tracking-widest">AI Integrity Check</th>
                                <th className="p-6 text-[10px] font-black uppercase text-examsy-muted tracking-widest">Progress</th>
                                <th className="p-6 text-[10px] font-black uppercase text-examsy-muted tracking-widest text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className={`transition-colors ${student.flagged ? 'bg-red-500/[0.03]' : 'hover:bg-examsy-bg/30'}`}>
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-examsy-primary text-white flex items-center justify-center font-black">
                                                {student.name.charAt(0)}
                                            </div>
                                            <span className="font-black text-examsy-text whitespace-nowrap">{student.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${student.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'}`} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-examsy-text">{student.status}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        {student.flagged ? (
                                            <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-4 py-2 rounded-xl w-fit border border-red-500/20">
                                                <ShieldAlert size={16} />
                                                <span className="text-[10px] font-black uppercase tracking-wider whitespace-nowrap">Suspicious Activity ({student.flags}x)</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-emerald-500 px-4 py-2 bg-emerald-500/10 rounded-xl w-fit border border-emerald-500/20">
                                                <CheckCircle2 size={16} />
                                                <span className="text-[10px] font-black uppercase tracking-wider">Verified Secure</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-6">
                                        <div className="w-24 h-2 bg-examsy-bg rounded-full overflow-hidden border border-zinc-100 dark:border-zinc-800">
                                            <div
                                                className={`h-full transition-all duration-1000 ${student.flagged ? 'bg-red-500' : 'bg-examsy-primary'}`}
                                                style={{ width: `${student.progress}%` }}
                                            />
                                        </div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2.5 bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-xl text-examsy-muted hover:text-examsy-primary hover:border-examsy-primary transition-all">
                                                <MessageSquare size={16} />
                                            </button>
                                            <button className="px-4 py-2.5 bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-examsy-text hover:bg-examsy-primary hover:text-white transition-all">
                                                View Screen
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </TeacherLayout>
    );
};

export default TeacherLiveMonitor;