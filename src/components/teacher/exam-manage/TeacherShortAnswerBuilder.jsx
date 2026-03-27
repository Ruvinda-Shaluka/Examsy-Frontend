import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Type, Hash, ShieldCheck } from 'lucide-react';
import CustomAlert from '../../common/CustomAlert';

const TeacherShortAnswerBuilder = ({ questions, onChange }) => {
    // 🟢 Added Custom Alert State
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (!questions || questions.length === 0) {
            // 🟢 Initialize with empty modelAnswer
            onChange([{ id: Date.now(), questionText: '', modelAnswer: '', points: 5 }]);
        }
    }, []);

    const safeQuestions = questions || [];

    const updateQuestion = (id, field, value) => {
        onChange(safeQuestions.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    const addQuestion = () => {
        // 🟢 Validation: Check if existing questions are fully filled out
        const hasEmptyFields = safeQuestions.some(q => !q.questionText.trim() || !q.modelAnswer?.trim());

        if (hasEmptyFields) {
            setAlert({
                type: 'error',
                title: 'Incomplete Questions',
                message: 'Please fill out both the Question Text and the Model Answer for all existing questions before adding a new one.',
                onClose: () => setAlert(null)
            });
            return;
        }

        onChange([...safeQuestions, { id: Date.now(), questionText: '', modelAnswer: '', points: 5 }]);
    };

    const removeQuestion = (id) => {
        if (safeQuestions.length > 1) {
            onChange(safeQuestions.filter(q => q.id !== id));
            setAlert(null);
        } else {
            setAlert({
                type: 'error',
                title: 'Minimum Requirements',
                message: 'An exam must have at least one question.',
                onClose: () => setAlert(null)
            });
        }
    };

    return (
        <div className="bg-examsy-surface p-6 md:p-10 rounded-[40px] border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors duration-500 relative">

            {/* 🟢 Render Custom Alert */}
            {alert && <CustomAlert type={alert.type} title={alert.title} message={alert.message} onClose={() => setAlert(null)} />}

            <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-examsy-primary/10 rounded-2xl text-examsy-primary">
                    <Type size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-examsy-text">Short Answer Designer</h2>
                    <p className="text-xs font-bold text-examsy-muted uppercase tracking-widest mt-1">Provide Model Answers for AI Grading</p>
                </div>
            </div>

            <div className="space-y-6">
                {safeQuestions.map((q, idx) => (
                    <div key={q.id} className={`p-6 bg-examsy-bg rounded-3xl border relative group animate-in slide-in-from-bottom-2 transition-all ${(!q.questionText || !q.modelAnswer) ? 'border-red-400/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-zinc-200 dark:border-zinc-800'}`}>

                        {/* 🟢 Visual indicator for missing data */}
                        {(!q.questionText || !q.modelAnswer) && (
                            <div className="absolute -top-3 left-8 px-3 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md">
                                Incomplete
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <label className="text-[10px] font-black uppercase text-examsy-muted tracking-widest ml-1">
                                    Question {idx + 1}
                                </label>
                                <textarea
                                    value={q.questionText || ''}
                                    onChange={(e) => updateQuestion(q.id, 'questionText', e.target.value)}
                                    placeholder="Enter your question here..."
                                    className="w-full bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 font-bold text-examsy-text outline-none focus:border-examsy-primary resize-none h-20 transition-colors"
                                />

                                {/* 🟢 NEW: Model Answer Field */}
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-examsy-primary tracking-widest ml-1 mt-4">
                                    <ShieldCheck size={14} /> AI Model Answer (Expected Key Points)
                                </label>
                                <textarea
                                    value={q.modelAnswer || ''}
                                    onChange={(e) => updateQuestion(q.id, 'modelAnswer', e.target.value)}
                                    placeholder="Write the ideal answer or list the key facts the AI should look for to award points..."
                                    className="w-full bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 font-bold text-emerald-700 dark:text-emerald-400 outline-none focus:border-emerald-500 resize-none h-24 transition-colors"
                                />
                            </div>

                            <div className="w-full md:w-32 space-y-4">
                                <label className="text-[10px] font-black uppercase text-examsy-muted tracking-widest ml-1">
                                    Points
                                </label>
                                <div className="relative">
                                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-examsy-muted" size={14} />
                                    <input
                                        type="number"
                                        value={q.points || 0}
                                        onChange={(e) => updateQuestion(q.id, 'points', Number(e.target.value))}
                                        className="w-full bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 pl-9 pr-3 font-bold text-examsy-text outline-none focus:border-examsy-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => removeQuestion(q.id)}
                            className="absolute -top-3 -right-3 p-2.5 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110 active:scale-90 z-10"
                            title="Delete Question"
                        >
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