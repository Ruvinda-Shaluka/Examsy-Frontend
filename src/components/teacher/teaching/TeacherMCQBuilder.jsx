import React, { useState } from 'react';
import { Plus, Trash2, ListChecks, CheckCircle2, XCircle } from 'lucide-react';

const TeacherMCQBuilder = () => {
    // State now tracks question text, multiple options, and the correct answer index
    const [questions, setQuestions] = useState([
        { id: 1, text: '', options: ['', '', '', ''], correctAnswer: null }
    ]);

    const addQuestion = () => {
        setQuestions([...questions, { id: Date.now(), text: '', options: ['', '', '', ''], correctAnswer: null }]);
    };

    const removeQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const addOption = (qIdx) => {
        const newQuestions = [...questions];
        newQuestions[qIdx].options.push('');
        setQuestions(newQuestions);
    };

    const removeOption = (qIdx, oIdx) => {
        const newQuestions = [...questions];
        if (newQuestions[qIdx].options.length > 2) {
            newQuestions[qIdx].options.splice(oIdx, 1);
            // Reset correct answer if the deleted option was the correct one
            if (newQuestions[qIdx].correctAnswer === oIdx) newQuestions[qIdx].correctAnswer = null;
            setQuestions(newQuestions);
        }
    };

    const setCorrectAnswer = (qIdx, oIdx) => {
        const newQuestions = [...questions];
        newQuestions[qIdx].correctAnswer = oIdx;
        setQuestions(newQuestions);
    };

    return (
        <div className="space-y-6">
            <div className="bg-examsy-surface p-6 md:p-10 rounded-[40px] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-examsy-primary/10 rounded-2xl text-examsy-primary">
                            <ListChecks size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-examsy-text">MCQ Designer</h2>
                            <p className="text-examsy-muted font-bold text-xs uppercase tracking-widest">Mark correct answers for auto-grading</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    {questions.map((q, qIdx) => (
                        <div key={q.id} className="p-6 md:p-8 bg-examsy-bg rounded-[32px] border border-zinc-200 dark:border-zinc-800 relative group animate-in slide-in-from-bottom-2">
                            {/* Remove Question Button */}
                            <button
                                onClick={() => removeQuestion(q.id)}
                                className="absolute -top-3 -right-3 p-2.5 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110"
                            >
                                <Trash2 size={16} />
                            </button>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-examsy-muted tracking-[0.2em] ml-1">Question {qIdx + 1}</label>
                                    <input
                                        placeholder="What is the laws of thermodynamics?"
                                        className="w-full bg-transparent text-xl font-black text-examsy-text outline-none border-b-2 border-zinc-200 dark:border-zinc-800 focus:border-examsy-primary py-2 transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {q.options.map((opt, oIdx) => (
                                        <div key={oIdx} className="flex items-center gap-3 group/option">
                                            {/* Correct Answer Toggle */}
                                            <button
                                                onClick={() => setCorrectAnswer(qIdx, oIdx)}
                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                                                    q.correctAnswer === oIdx
                                                        ? 'border-examsy-primary bg-examsy-primary text-white'
                                                        : 'border-zinc-400 hover:border-examsy-primary'
                                                }`}
                                            >
                                                {q.correctAnswer === oIdx && <CheckCircle2 size={14} />}
                                            </button>

                                            <div className="flex-1 relative">
                                                <input
                                                    placeholder={`Option ${oIdx + 1}`}
                                                    className={`w-full bg-examsy-surface border rounded-2xl px-4 py-3 text-sm font-bold text-examsy-text outline-none transition-all ${
                                                        q.correctAnswer === oIdx ? 'border-examsy-primary ring-2 ring-examsy-primary/10' : 'border-zinc-200 dark:border-zinc-800'
                                                    }`}
                                                />
                                                {/* Remove Option Button */}
                                                {q.options.length > 2 && (
                                                    <button
                                                        onClick={() => removeOption(qIdx, oIdx)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-examsy-muted hover:text-red-500 opacity-0 group-hover/option:opacity-100 transition-all"
                                                    >
                                                        <XCircle size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add Option Button */}
                                    <button
                                        onClick={() => addOption(qIdx)}
                                        className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-examsy-muted font-bold hover:border-examsy-primary hover:text-examsy-primary transition-all group/add"
                                    >
                                        <div className="w-6 h-6 rounded-full border-2 border-dashed border-zinc-400 group-hover/add:border-examsy-primary flex items-center justify-center">
                                            <Plus size={12} />
                                        </div>
                                        <span className="text-xs">Add Option</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={addQuestion}
                    className="mt-12 w-full py-5 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-[32px] text-examsy-muted font-black flex items-center justify-center gap-3 hover:border-examsy-primary hover:text-examsy-primary hover:bg-examsy-primary/5 transition-all"
                >
                    <Plus size={20} /> Add Another Question
                </button>
            </div>
        </div>
    );
};

export default TeacherMCQBuilder;