import React, { useState } from 'react';
import { Plus, Trash2, Type, Hash } from 'lucide-react';

const TeacherShortAnswerBuilder = () => {
    const [questions, setQuestions] = useState([{ id: 1, text: '', points: 5 }]);

    const addQuestion = () => setQuestions([...questions, { id: Date.now(), text: '', points: 5 }]);

    return (
        <div className="bg-examsy-surface p-6 md:p-10 rounded-[40px] border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors duration-500">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-examsy-primary/10 rounded-2xl text-examsy-primary"><Type size={24} /></div>
                <h2 className="text-2xl font-black text-examsy-text">Short Answer Designer</h2>
            </div>

            <div className="space-y-6">
                {questions.map((q, idx) => (
                    <div key={q.id} className="p-6 bg-examsy-bg rounded-3xl border border-zinc-200 dark:border-zinc-800 relative group animate-fade-in-up">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <label className="text-[10px] font-black uppercase text-examsy-muted tracking-widest ml-1">Question {idx + 1}</label>
                                <textarea
                                    placeholder="Enter your question here..."
                                    className="w-full bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 font-bold text-examsy-text outline-none focus:border-examsy-primary resize-none h-24"
                                />
                            </div>
                            <div className="w-full md:w-32 space-y-4">
                                <label className="text-[10px] font-black uppercase text-examsy-muted tracking-widest ml-1">Points</label>
                                <div className="relative">
                                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-examsy-muted" size={14} />
                                    <input type="number" defaultValue={q.points} className="w-full bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 pl-9 pr-3 font-bold text-examsy-text outline-none" />
                                </div>
                            </div>
                        </div>
                        <button className="absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}

                <button
                    onClick={addQuestion}
                    className="w-full py-6 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-3xl text-examsy-muted font-black flex items-center justify-center gap-3 hover:border-examsy-primary hover:text-examsy-primary hover:bg-examsy-primary/5 transition-all"
                >
                    <Plus size={20} /> Add Next Question
                </button>
            </div>
        </div>
    );
};

export default TeacherShortAnswerBuilder;