import React, { useState } from 'react';
import { Plus, ListChecks, Type, FileUp, ChevronDown, Send, X, AlertCircle } from 'lucide-react';
// Import your existing components
import TeacherMCQBuilder from '../exam-manage/TeacherMCQBuilder';
import TeacherShortAnswerBuilder from '../exam-manage/TeacherShortAnswerBuilder';
import TeacherPDFUploader from '../exam-manage/TeacherPDFUploader';

const ClassworkView = ({ classId }) => {
    const [isCreating, setIsCreating] = useState(false);
    const [examType, setExamType] = useState(null); // 'mcq', 'short', or 'pdf'
    const [showDropdown, setShowDropdown] = useState(false);

    const examOptions = [
        { id: 'mcq', title: 'Multiple Choice', icon: ListChecks, desc: 'Auto-graded quiz' },
        { id: 'short', title: 'Short Answer', icon: Type, desc: 'Manual review builder' },
        { id: 'pdf', title: 'PDF Upload', icon: FileUp, desc: 'Traditional paper upload' },
    ];

    const handleSelectType = (type) => {
        setExamType(type);
        setIsCreating(true);
        setShowDropdown(false);
    };

    const handleCancel = () => {
        setIsCreating(false);
        setExamType(null);
    };

    const handlePublish = () => {
        // Here you would integrate your backend logic
        alert(`Exam Published for Class ${classId}!`);
        setIsCreating(false);
        setExamType(null);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* --- HEADER SECTION --- */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black text-examsy-text">Classwork</h2>
                    <p className="text-examsy-muted font-bold text-sm">Manage assignments and examinations for this class.</p>
                </div>

                {!isCreating && (
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="bg-examsy-primary text-white px-6 py-4 rounded-2xl font-black flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-examsy-primary/20"
                        >
                            <Plus size={20} />
                            Create
                            <ChevronDown size={18} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showDropdown && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                                <div className="absolute right-0 mt-3 w-72 bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-[32px] shadow-2xl z-20 overflow-hidden p-2 animate-in zoom-in-95 duration-200">
                                    {examOptions.map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => handleSelectType(opt.id)}
                                            className="w-full flex items-center gap-4 p-4 hover:bg-examsy-bg rounded-2xl transition-all text-left group"
                                        >
                                            <div className="p-3 bg-examsy-primary/10 text-examsy-primary rounded-xl group-hover:bg-examsy-primary group-hover:text-white transition-all">
                                                <opt.icon size={20} />
                                            </div>
                                            <div>
                                                <p className="font-black text-examsy-text text-sm">{opt.title}</p>
                                                <p className="text-[10px] font-bold text-examsy-muted uppercase tracking-wider">{opt.desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* --- BUILDER VIEW --- */}
            {isCreating ? (
                <div className="space-y-6">
                    <div className="flex items-center justify-between bg-examsy-surface p-4 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-4">
                            <button onClick={handleCancel} className="p-2 hover:bg-examsy-bg rounded-xl text-examsy-muted"><X size={20} /></button>
                            <span className="text-xs font-black uppercase tracking-widest text-examsy-muted">
                                Creating {examType.replace('-', ' ')} Exam
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleCancel}
                                className="px-6 py-3 rounded-xl font-black text-examsy-muted hover:bg-examsy-bg transition-all"
                            >
                                Save Draft
                            </button>
                            <button
                                onClick={handlePublish}
                                className="bg-examsy-primary text-white px-8 py-3 rounded-xl font-black flex items-center gap-2 hover:shadow-lg hover:shadow-examsy-primary/20 transition-all"
                            >
                                <Send size={18} />
                                Publish Now
                            </button>
                        </div>
                    </div>

                    {/* Render existing builders based on type */}
                    <div className="animate-in slide-in-from-bottom-4 duration-500">
                        {examType === 'mcq' && <TeacherMCQBuilder />}
                        {examType === 'short' && <TeacherShortAnswerBuilder />}
                        {examType === 'pdf' && <TeacherPDFUploader />}
                    </div>
                </div>
            ) : (
                /* --- EMPTY STATE / LIST VIEW --- */
                <div className="bg-examsy-surface rounded-[40px] p-20 text-center border border-dashed border-zinc-200 dark:border-zinc-800 transition-all">
                    <div className="p-6 bg-examsy-bg rounded-full w-fit mx-auto mb-6 text-examsy-muted">
                        <AlertCircle size={40} />
                    </div>
                    <h3 className="text-xl font-black text-examsy-text mb-2">No Exams Yet</h3>
                    <p className="text-examsy-muted font-bold max-w-xs mx-auto">Click the "Create" button to start building your first examination for Applied Physics.</p>
                </div>
            )}
        </div>
    );
};

export default ClassworkView;