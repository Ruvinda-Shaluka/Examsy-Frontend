import React, { useState, useEffect } from 'react';
import { Plus, ListChecks, Type, FileUp, ChevronDown, Send, X, AlertCircle, Clock, Calendar, Edit2, Trash2, Loader2 } from 'lucide-react';

import TeacherMCQBuilder from '../exam-manage/TeacherMCQBuilder';
import TeacherShortAnswerBuilder from '../exam-manage/TeacherShortAnswerBuilder';
import TeacherPDFUploader from '../exam-manage/TeacherPDFUploader';
import { teacherService } from '../../../services/teacherService';

const ClassworkView = ({ classId }) => {
    const [exams, setExams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Builder States
    const [isCreating, setIsCreating] = useState(false);
    const [examType, setExamType] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    // 🟢 FIX: State to hold the data from the builders!
    const [examQuestions, setExamQuestions] = useState([]);
    const [pdfFile, setPdfFile] = useState(null);

    const examOptions = [
        { id: 'MCQ', title: 'Multiple Choice', icon: ListChecks, desc: 'Auto-graded quiz' },
        { id: 'SHORT', title: 'Short Answer', icon: Type, desc: 'Manual review builder' },
        { id: 'PDF', title: 'PDF Upload', icon: FileUp, desc: 'Traditional paper upload' },
    ];

    // 🟢 Fetch Exams on Load
    useEffect(() => {
        const loadExams = async () => {
            try {
                const data = await teacherService.getClassExams(classId);
                setExams(data || []);
            } catch (error) {
                console.error("Failed to load exams", error);
            } finally {
                setIsLoading(false);
            }
        };
        if (classId) loadExams();
    }, [classId]);

    const handleSelectType = (type) => {
        setExamType(type);
        setExamQuestions([]); // Reset states
        setPdfFile(null);
        setIsCreating(true);
        setShowDropdown(false);
    };

    const handleCancel = () => {
        setIsCreating(false);
        setExamType(null);
    };

    // 🟢 Delete Logic
    const handleDelete = async (examId) => {
        if (!window.confirm("Are you sure you want to delete this exam?")) return;
        try {
            await teacherService.deleteExam(examId);
            setExams(prev => prev.filter(e => e.id !== examId));
        } catch (error) {
            alert("Failed to delete exam.");
        }
    };

    const handlePublish = async () => {
        // (You will add your ExamPublishDTO builder logic here to map title, duration, and examQuestions before saving!)
        console.log("Data to send:", examQuestions);
        alert(`Exam mapped! Ready to send to API.`);
        setIsCreating(false);
    };

    if (isLoading) {
        return <div className="p-20 text-center text-examsy-muted"><Loader2 className="animate-spin mx-auto" /></div>;
    }

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
                            <Plus size={20} /> Create
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
                                Creating Exam
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={handlePublish} className="bg-examsy-primary text-white px-8 py-3 rounded-xl font-black flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all">
                                <Send size={18} /> Publish Now
                            </button>
                        </div>
                    </div>

                    {/* 🟢 FIX: PASSING onChange PREVENTS THE CRASH */}
                    <div className="animate-in slide-in-from-bottom-4 duration-500">
                        {examType === 'MCQ' && <TeacherMCQBuilder questions={examQuestions} onChange={setExamQuestions} />}
                        {examType === 'SHORT' && <TeacherShortAnswerBuilder questions={examQuestions} onChange={setExamQuestions} />}
                        {examType === 'PDF' && <TeacherPDFUploader file={pdfFile} onChange={setPdfFile} />}
                    </div>
                </div>
            ) : (
                /* --- LIST VIEW --- */
                <div className="space-y-4">
                    {exams.length === 0 ? (
                        <div className="bg-examsy-surface rounded-[40px] p-20 text-center border border-dashed border-zinc-200 dark:border-zinc-800 transition-all">
                            <div className="p-6 bg-examsy-bg rounded-full w-fit mx-auto mb-6 text-examsy-muted"><AlertCircle size={40} /></div>
                            <h3 className="text-xl font-black text-examsy-text mb-2">No Exams Yet</h3>
                            <p className="text-examsy-muted font-bold max-w-xs mx-auto">Click the "Create" button to start building your first examination.</p>
                        </div>
                    ) : (
                        exams.map(exam => (
                            <div key={exam.id} className="bg-examsy-surface p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg transition-all group">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-examsy-bg rounded-2xl flex items-center justify-center text-examsy-primary shadow-inner">
                                        {exam.examType === 'MCQ' ? <ListChecks size={24} /> : exam.examType === 'PDF' ? <FileUp size={24} /> : <Type size={24} />}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-examsy-text">{exam.title || 'Untitled Exam'}</h3>
                                        <div className="flex items-center gap-4 mt-2 text-xs font-bold text-examsy-muted uppercase tracking-widest">
                                            <span className="flex items-center gap-1"><Clock size={14} /> {exam.durationMinutes || 0} MIN</span>
                                            {exam.deadlineTime && <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(exam.deadlineTime).toLocaleDateString()}</span>}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-3 bg-examsy-bg text-examsy-text rounded-xl hover:bg-examsy-primary/10 hover:text-examsy-primary transition-all">
                                        <Edit2 size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(exam.id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default ClassworkView;