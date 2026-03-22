import React, { useEffect, useState } from 'react';
import { Plus, Trash2, ListChecks, CheckCircle2, XCircle } from 'lucide-react';
import CustomAlert from '../../common/CustomAlert.jsx'; // Make sure this path matches your project structure

const TeacherMCQBuilder = ({ questions, onChange }) => {
    // 🟢 NEW: Local state for handling validation alerts
    const [alert, setAlert] = useState(null);

    // Auto-initialize the first empty question if the parent passes an empty array
    useEffect(() => {
        if (!questions || questions.length === 0) {
            onChange([{ id: Date.now(), questionText: '', points: 1, options: ['', '', '', ''], correctOptionIndex: null }]);
        }
    }, []);

    const safeQuestions = questions || [];

    const updateQuestionText = (qIdx, text) => {
        const newQuestions = [...safeQuestions];
        newQuestions[qIdx].questionText = text;
        onChange(newQuestions);
    };

    const addQuestion = () => {
        // 🟢 NEW: Validation check before adding a new question
        const incompleteIndex = safeQuestions.findIndex(q => q.correctOptionIndex === null);

        if (incompleteIndex !== -1) {
            setAlert({
                type: 'error',
                title: 'Action Blocked',
                message: `Please select the correct answer for Question ${incompleteIndex + 1} before adding a new one.`,
                onClose: () => setAlert(null)
            });
            return; // Stop execution, don't add the new question
        }

        // Check if question text is empty (Optional but recommended UX)
        const emptyTextIndex = safeQuestions.findIndex(q => q.questionText.trim() === '');
        if (emptyTextIndex !== -1) {
            setAlert({
                type: 'error',
                title: 'Missing Information',
                message: `Please write the question text for Question ${emptyTextIndex + 1} before moving on.`,
                onClose: () => setAlert(null)
            });
            return;
        }

        // If everything is valid, add the new question
        onChange([...safeQuestions, { id: Date.now(), questionText: '', points: 1, options: ['', '', '', ''], correctOptionIndex: null }]);
    };

    const removeQuestion = (id) => {
        if (safeQuestions.length > 1) {
            onChange(safeQuestions.filter(q => q.id !== id));
            setAlert(null); // Clear any lingering alerts
        } else {
            setAlert({
                type: 'error',
                title: 'Action Blocked',
                message: 'You must have at least one question in your exam.',
                onClose: () => setAlert(null)
            });
        }
    };

    const updateOption = (qIdx, oIdx, value) => {
        const newQuestions = [...safeQuestions];
        newQuestions[qIdx].options[oIdx] = value;
        onChange(newQuestions);
    };

    const addOption = (qIdx) => {
        const newQuestions = [...safeQuestions];
        newQuestions[qIdx].options.push('');
        onChange(newQuestions);
    };

    const removeOption = (qIdx, oIdx) => {
        const newQuestions = [...safeQuestions];
        if (newQuestions[qIdx].options.length > 2) {
            newQuestions[qIdx].options.splice(oIdx, 1);
            // Re-adjust correct index if necessary
            if (newQuestions[qIdx].correctOptionIndex === oIdx) {
                newQuestions[qIdx].correctOptionIndex = null;
            } else if (newQuestions[qIdx].correctOptionIndex > oIdx) {
                newQuestions[qIdx].correctOptionIndex -= 1;
            }
            onChange(newQuestions);
        } else {
            setAlert({
                type: 'error',
                title: 'Minimum Options',
                message: 'A multiple choice question must have at least 2 options.',
                onClose: () => setAlert(null)
            });
        }
    };

    const setCorrectAnswer = (qIdx, oIdx) => {
        const newQuestions = [...safeQuestions];
        newQuestions[qIdx].correctOptionIndex = oIdx;
        onChange(newQuestions);
        setAlert(null); // Clear alert once they select an answer
    };

    return (
        <div className="space-y-6 relative">
            {/* 🟢 NEW: Render the alert if it exists */}
            {alert && (
                <CustomAlert
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                    onClose={alert.onClose}
                />
            )}

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
                    {safeQuestions.map((q, qIdx) => (
                        <div key={q.id || qIdx} className={`p-6 md:p-8 bg-examsy-bg rounded-[32px] border relative group animate-in slide-in-from-bottom-2 transition-all ${q.correctOptionIndex === null ? 'border-red-400/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-zinc-200 dark:border-zinc-800'}`}>

                            {/* 🟢 Visual indicator for missing answer */}
                            {q.correctOptionIndex === null && (
                                <div className="absolute -top-3 left-8 px-3 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md">
                                    Needs Correct Answer
                                </div>
                            )}

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
                                        value={q.questionText || ''}
                                        onChange={(e) => updateQuestionText(qIdx, e.target.value)}
                                        placeholder="What are the laws of thermodynamics?"
                                        className="w-full bg-transparent text-xl font-black text-examsy-text outline-none border-b-2 border-zinc-200 dark:border-zinc-800 focus:border-examsy-primary py-2 transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {q.options.map((opt, oIdx) => (
                                        <div key={oIdx} className="flex items-center gap-3 group/option">
                                            <button
                                                onClick={() => setCorrectAnswer(qIdx, oIdx)}
                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                                                    q.correctOptionIndex === oIdx
                                                        ? 'border-examsy-primary bg-examsy-primary text-white'
                                                        : 'border-zinc-400 hover:border-examsy-primary'
                                                }`}
                                            >
                                                {q.correctOptionIndex === oIdx && <CheckCircle2 size={14} />}
                                            </button>

                                            <div className="flex-1 relative">
                                                <input
                                                    value={opt || ''}
                                                    onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                                                    placeholder={`Option ${oIdx + 1}`}
                                                    className={`w-full bg-examsy-surface border rounded-2xl px-4 py-3 text-sm font-bold text-examsy-text outline-none transition-all ${
                                                        q.correctOptionIndex === oIdx ? 'border-examsy-primary ring-2 ring-examsy-primary/10' : 'border-zinc-200 dark:border-zinc-800'
                                                    }`}
                                                />
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