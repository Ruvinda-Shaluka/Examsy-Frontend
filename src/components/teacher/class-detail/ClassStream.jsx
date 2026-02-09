import React from 'react';
import { Send, MessageSquare, MoreVertical, AlertCircle } from 'lucide-react';
import { MOCK_CLASS_DETAILS } from '../../../data/TeacherMockData';

const ClassStream = ({ classId = "1" }) => {
    // 1. Convert classId to string to match MOCK_CLASS_DETAILS keys
    const data = MOCK_CLASS_DETAILS[String(classId)];

    // 2. Safety Check: If data is missing, show a friendly message instead of crashing
    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-examsy-surface rounded-3xl border border-dashed border-zinc-800">
                <AlertCircle className="text-examsy-muted mb-4" size={48} />
                <p className="text-examsy-muted font-bold">Class stream data not found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar: Class Code */}
            <div className="lg:col-span-1">
                <div className="bg-examsy-surface p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <p className="text-xs font-black uppercase tracking-wider text-examsy-muted mb-3">Class Code</p>
                    <div className="bg-examsy-bg p-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 text-center">
                        <span className="font-mono font-bold text-examsy-primary text-xl">{data.code}</span>
                    </div>
                </div>
            </div>

            {/* Main Stream */}
            <div className="lg:col-span-3 space-y-6">
                <div className="bg-examsy-surface p-4 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-examsy-primary flex items-center justify-center text-white font-black text-sm">JS</div>
                    <input
                        placeholder="Announce something to your class..."
                        className="bg-transparent flex-1 outline-none text-examsy-text font-medium"
                    />
                    <button className="bg-examsy-primary text-white p-3 rounded-2xl hover:scale-105 transition-all">
                        <Send size={18} />
                    </button>
                </div>

                {data.announcements?.map((post) => (
                    <div key={post.id} className="bg-examsy-surface rounded-3xl border border-zinc-100 dark:border-zinc-800 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-examsy-bg flex items-center justify-center font-bold text-examsy-primary">JS</div>
                                <div>
                                    <h4 className="font-bold text-sm">{post.author}</h4>
                                    <p className="text-xs text-examsy-muted">{post.date}</p>
                                </div>
                            </div>
                            <button className="text-examsy-muted"><MoreVertical size={18} /></button>
                        </div>
                        <p className="text-examsy-text leading-relaxed">{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassStream;