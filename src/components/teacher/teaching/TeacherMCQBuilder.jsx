import React, { useState } from 'react';
import { Plus, Trash2, ListChecks } from 'lucide-react';

const TeacherMCQBuilder = () => {
    const [questions, setQuestions] = useState([{ id: 1, text: '', options: ['', ''] }]);

    const addQuestion = () => {
        setQuestions([...questions, { id: Date.now(), text: '', options: ['', ''] }]);
    };

    return (
        <div className="space-y-6">
            <div className="bg-examsy-surface p-8 rounded-[40px] border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-4 mb-8">
                    <ListChecks className="text-examsy-primary" size={28} />
                    <h2 className="text-2xl font-black text-examsy-text">MCQ Form Designer</h2>
                </div>

                <div className="space-y-8">
                    {questions.map((q, idx) => (
                        <div key={q.id} className="p-6 bg-examsy-bg rounded-3xl border border-zinc-200 dark:border-zinc-800 relative group animate-in zoom-in-95">
                            <button className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={18} />
                            </button>
                            <input
                                placeholder={`Question ${idx + 1}`}
                                className="w-full bg-transparent text-lg font-black text-examsy-text outline-none border-b-2 border-zinc-200 dark:border-zinc-800 focus:border-examsy-primary mb-6 py-2"
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {q.options.map((opt, oIdx) => (
                                    <div key={oIdx} className="flex items-center gap-3">
                                        <div className="w-4 h-4 rounded-full border-2 border-zinc-400" />
                                        <input
                                            placeholder={`Option ${oIdx + 1}`}
                                            className="flex-1 bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm font-bold text-examsy-text"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={addQuestion}
                    className="mt-8 w-full py-4 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-3xl text-examsy-muted font-black flex items-center justify-center gap-2 hover:border-examsy-primary hover:text-examsy-primary transition-all"
                >
                    <Plus size={20} /> Add Another Question
                </button>
            </div>
        </div>
    );
};

export default TeacherMCQBuilder;