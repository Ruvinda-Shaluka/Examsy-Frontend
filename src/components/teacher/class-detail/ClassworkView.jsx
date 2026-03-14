import React, { useState, useEffect } from 'react';
import { ListChecks, FileUp, Type, AlertCircle, Clock, Calendar, Edit2, Trash2, Loader2, X } from 'lucide-react';
import { teacherService } from '../../../services/teacherService';
import CustomAlert from '../../common/CustomAlert';
import ConfirmActionModal from '../../common/ConfirmActionModal';

const ClassworkView = ({ classId }) => {
    const [exams, setExams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState({ show: false, type: '', title: '', message: '' });

    // Modal States
    const [examToDelete, setExamToDelete] = useState(null);
    const [examToUpdate, setExamToUpdate] = useState(null);
    const [newDeadline, setNewDeadline] = useState('');
    const [isActionLoading, setIsActionLoading] = useState(false);

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

    // --- Delete Logic ---
    const executeDelete = async () => {
        if (!examToDelete) return;
        try {
            await teacherService.deleteExam(examToDelete);
            setExams(prev => prev.filter(e => e.id !== examToDelete));
            setAlert({ show: true, type: 'success', title: 'Deleted', message: 'Exam successfully removed.' });
        } catch (error) {
            setAlert({ show: true, type: 'error', title: 'Error', message: 'Failed to delete exam.' });
        } finally {
            setExamToDelete(null);
        }
    };

    // --- Update Deadline Logic ---
    const executeUpdateDeadline = async () => {
        if (!examToUpdate || !newDeadline) return;
        setIsActionLoading(true);
        try {
            await teacherService.updateExamDeadline(examToUpdate.id, newDeadline);
            setExams(prev => prev.map(e => e.id === examToUpdate.id ? { ...e, deadlineTime: newDeadline } : e));
            setAlert({ show: true, type: 'success', title: 'Updated', message: 'Deadline successfully updated.' });
            setExamToUpdate(null);
            setNewDeadline('');
        } catch (error) {
            setAlert({ show: true, type: 'error', title: 'Error', message: 'Failed to update deadline.' });
        } finally {
            setIsActionLoading(false);
        }
    };

    if (isLoading) {
        return <div className="p-20 flex justify-center text-examsy-primary"><Loader2 className="animate-spin" size={40}/></div>;
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">

            {/* Custom Alert */}
            {alert.show && (
                <CustomAlert type={alert.type} title={alert.title} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />
            )}

            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-black text-examsy-text">Classwork</h2>
                <p className="text-examsy-muted font-bold text-sm mt-1">Manage assignments and examinations for this class.</p>
            </div>

            {/* Empty State */}
            {exams.length === 0 ? (
                <div className="bg-examsy-surface rounded-[2.5rem] p-16 text-center border border-dashed border-zinc-200 dark:border-zinc-800">
                    <div className="w-16 h-16 bg-examsy-bg rounded-full flex items-center justify-center mx-auto mb-4 text-examsy-muted">
                        <AlertCircle size={32} />
                    </div>
                    <h3 className="text-xl font-black text-examsy-text mb-2">No Exams Published</h3>
                    <p className="text-examsy-muted font-bold max-w-sm mx-auto">Publish exams from the "Manage Exams" portal to see them appear here.</p>
                </div>
            ) : (
                /* Beautiful Card List matching the screenshot */
                <div className="space-y-4">
                    {exams.map(exam => (
                        <div key={exam.id} className="bg-[#1A1A1E] dark:bg-[#121214] p-5 rounded-3xl border border-zinc-200/5 dark:border-zinc-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-xl transition-all group">

                            <div className="flex items-center gap-4">
                                {/* Icon Box */}
                                <div className="w-14 h-14 bg-[#0A0A0C] dark:bg-[#08080A] rounded-2xl flex items-center justify-center text-examsy-primary shadow-inner shrink-0">
                                    {exam.examType === 'MCQ' ? <ListChecks size={24} /> : exam.examType === 'PDF' ? <FileUp size={24} /> : <Type size={24} />}
                                </div>

                                {/* Info */}
                                <div>
                                    <h3 className="text-lg font-black text-white">{exam.title}</h3>
                                    <div className="flex items-center gap-4 mt-1.5 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5"><Clock size={14} /> {exam.durationMinutes} MIN</span>
                                        {exam.deadlineTime && (
                                            <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(exam.deadlineTime).toLocaleDateString()}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Actions (Visible on hover in desktop, always visible on mobile) */}
                            <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => setExamToUpdate(exam)}
                                    className="p-3 bg-zinc-800/50 hover:bg-examsy-primary/20 text-zinc-300 hover:text-examsy-primary rounded-xl transition-all"
                                    title="Change Deadline"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => setExamToDelete(exam.id)}
                                    className="p-3 bg-zinc-800/50 hover:bg-red-500/20 text-zinc-300 hover:text-red-500 rounded-xl transition-all"
                                    title="Delete Exam"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* --- Modals --- */}

            {/* 1. Delete Confirmation Modal */}
            <ConfirmActionModal
                isOpen={!!examToDelete}
                onClose={() => setExamToDelete(null)}
                onConfirm={executeDelete}
                title="Delete Exam"
                message="Are you sure you want to permanently delete this exam? All student submissions related to it will also be lost."
                confirmText="Delete Exam"
                isDanger={true}
            />

            {/* 2. Update Deadline Modal */}
            {examToUpdate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-examsy-surface w-full max-w-sm rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 border border-zinc-200 dark:border-zinc-800">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black">Edit Deadline</h3>
                            <button onClick={() => setExamToUpdate(null)} className="text-examsy-muted hover:text-examsy-text"><X size={20}/></button>
                        </div>

                        <p className="text-sm font-bold text-examsy-muted mb-4">Set a new deadline for <span className="text-examsy-text">{examToUpdate.title}</span>.</p>

                        <input
                            type="datetime-local"
                            value={newDeadline}
                            onChange={(e) => setNewDeadline(e.target.value)}
                            className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 text-examsy-text font-bold outline-none focus:border-examsy-primary mb-8"
                        />

                        <div className="flex gap-3">
                            <button onClick={() => setExamToUpdate(null)} className="flex-1 py-3.5 rounded-xl bg-examsy-bg font-bold text-examsy-muted hover:text-examsy-text transition-colors">Cancel</button>
                            <button
                                onClick={executeUpdateDeadline}
                                disabled={!newDeadline || isActionLoading}
                                className="flex-1 py-3.5 rounded-xl bg-examsy-primary text-white font-black hover:bg-examsy-primary/90 transition-colors flex justify-center items-center disabled:opacity-50"
                            >
                                {isActionLoading ? <Loader2 size={18} className="animate-spin" /> : 'Update'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ClassworkView;