import React, { useState, useEffect } from 'react';
import { AlertCircle, Loader2, X, Calendar, Clock, Timer } from 'lucide-react';
import { teacherService } from '../../../services/teacherService';
import CustomAlert from '../../common/CustomAlert';
import ConfirmActionModal from '../../common/ConfirmActionModal';
import TeacherExamCard from '../class-detail/TeacherExamCard'; // Adjust path if needed

const ClassworkView = ({ classId }) => {
    const [exams, setExams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState({ show: false, type: '', title: '', message: '' });

    const [examToDelete, setExamToDelete] = useState(null);
    const [examToUpdate, setExamToUpdate] = useState(null);
    const [isActionLoading, setIsActionLoading] = useState(false);

    // 🟢 SPLIT TIMING STATES
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [deadlineDate, setDeadlineDate] = useState('');
    const [deadlineTime, setDeadlineTime] = useState('');
    const [duration, setDuration] = useState('');

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

    // 🟢 PRE-FILL THE MODAL
    const handleOpenUpdateModal = (exam) => {
        setExamToUpdate(exam);
        setDuration(exam.durationMinutes || '');

        const pad = (n) => n.toString().padStart(2, '0');

        if (exam.scheduledStartTime) {
            const start = new Date(exam.scheduledStartTime);
            setStartDate(`${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`);
            setStartTime(`${pad(start.getHours())}:${pad(start.getMinutes())}`);
        } else {
            setStartDate(''); setStartTime('');
        }

        if (exam.deadlineTime) {
            const end = new Date(exam.deadlineTime);
            setDeadlineDate(`${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}`);
            setDeadlineTime(`${pad(end.getHours())}:${pad(end.getMinutes())}`);
        } else {
            setDeadlineDate(''); setDeadlineTime('');
        }
    };

    // 🟢 SUBMIT FULL TIMINGS TO BACKEND (With Safe Formatting)
    const executeUpdateTiming = async () => {
        if (!examToUpdate) return;
        setIsActionLoading(true);

        // Helper to guarantee Spring Boot never chokes on the time format
        const formatSafeDateTime = (dateStr, timeStr) => {
            if (!dateStr || !timeStr) return null;
            // Takes only the first 5 characters (HH:mm) just in case the browser sends seconds
            const cleanTime = timeStr.substring(0, 5);
            return `${dateStr}T${cleanTime}:00`;
        };

        const formattedStart = formatSafeDateTime(startDate, startTime);
        const formattedDeadline = formatSafeDateTime(deadlineDate, deadlineTime);

        const payload = {
            scheduledStartTime: formattedStart,
            deadlineTime: formattedDeadline,
            durationMinutes: Number(duration) || 0
        };

        try {
            await teacherService.updateExamTiming(examToUpdate.id, payload);

            // Instantly update the UI card
            setExams(prev => prev.map(e => e.id === examToUpdate.id ? {
                ...e,
                scheduledStartTime: formattedStart,
                deadlineTime: formattedDeadline,
                durationMinutes: payload.durationMinutes
            } : e));

            setAlert({ show: true, type: 'success', title: 'Updated', message: 'Exam timings successfully updated.' });
            setExamToUpdate(null);
        } catch (error) {
            console.error("API Update Error:", error); // Logs to console so you can trace it!
            setAlert({ show: true, type: 'error', title: 'Error', message: 'Failed to update exam timings.' });
        } finally {
            setIsActionLoading(false);
        }
    };

    if (isLoading) {
        return <div className="p-20 flex justify-center text-examsy-primary"><Loader2 className="animate-spin" size={40}/></div>;
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">

            {alert.show && <CustomAlert type={alert.type} title={alert.title} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />}

            <div className="mb-8">
                <h2 className="text-2xl font-black text-examsy-text">Classwork</h2>
                <p className="text-examsy-muted font-bold text-sm mt-1">Manage assignments and examinations for this class.</p>
            </div>

            {exams.length === 0 ? (
                <div className="bg-examsy-surface rounded-[2.5rem] p-16 text-center border border-dashed border-zinc-200 dark:border-zinc-800">
                    <div className="w-16 h-16 bg-examsy-bg rounded-full flex items-center justify-center mx-auto mb-4 text-examsy-muted"><AlertCircle size={32} /></div>
                    <h3 className="text-xl font-black text-examsy-text mb-2">No Exams Published</h3>
                    <p className="text-examsy-muted font-bold max-w-sm mx-auto">Publish exams from the "Manage Exams" portal to see them appear here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {exams.map(exam => (
                        <TeacherExamCard
                            key={exam.id}
                            exam={exam}
                            onEditDeadline={handleOpenUpdateModal}
                            onDelete={setExamToDelete}
                        />
                    ))}
                </div>
            )}

            <ConfirmActionModal isOpen={!!examToDelete} onClose={() => setExamToDelete(null)} onConfirm={executeDelete} title="Delete Exam" message="Are you sure you want to permanently delete this exam? All student submissions related to it will also be lost." confirmText="Delete Exam" isDanger={true} />

            {/* COMPREHENSIVE TIMINGS MODAL */}
            {examToUpdate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-examsy-surface w-full max-w-lg rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 border border-zinc-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto">

                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-2xl font-black text-examsy-text">Edit Exam Timings</h3>
                            <button onClick={() => setExamToUpdate(null)} className="p-2 bg-zinc-100 dark:bg-zinc-800/50 rounded-full text-examsy-muted hover:text-examsy-text transition-colors">
                                <X size={18}/>
                            </button>
                        </div>
                        <p className="text-sm font-bold text-examsy-muted mb-8">Update schedules for <span className="text-examsy-primary">{examToUpdate.title}</span>.</p>

                        <div className="space-y-6">

                            {/* Open Date */}
                            <div className="bg-examsy-bg/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                                <label className="text-[10px] font-black uppercase tracking-widest text-examsy-muted ml-1 mb-2 block">Scheduled Start Time</label>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1 relative group">
                                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-examsy-surface border border-zinc-200 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm font-bold outline-none focus:border-examsy-primary custom-date-input" />
                                    </div>
                                    <div className="flex-1 relative group">
                                        <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-examsy-surface border border-zinc-200 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm font-bold outline-none focus:border-examsy-primary custom-time-input" />
                                    </div>
                                </div>
                            </div>

                            {/* Deadline Date */}
                            <div className="bg-red-500/5 p-4 rounded-2xl border border-red-500/20">
                                <label className="text-[10px] font-black uppercase tracking-widest text-red-500 ml-1 mb-2 block">Final Deadline</label>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1 relative group">
                                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                        <input type="date" value={deadlineDate} onChange={(e) => setDeadlineDate(e.target.value)} className="w-full bg-examsy-surface border border-zinc-200 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm font-bold outline-none focus:border-red-500 custom-date-input" />
                                    </div>
                                    <div className="flex-1 relative group">
                                        <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                        <input type="time" value={deadlineTime} onChange={(e) => setDeadlineTime(e.target.value)} className="w-full bg-examsy-surface border border-zinc-200 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm font-bold outline-none focus:border-red-500 custom-time-input" />
                                    </div>
                                </div>
                            </div>

                            {/* Duration */}
                            <div className="bg-examsy-bg/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                                <label className="text-[10px] font-black uppercase tracking-widest text-examsy-muted ml-1 mb-2 block">Time Limit (Minutes)</label>
                                <div className="relative group max-w-[50%]">
                                    <Timer size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                    <input type="number" min="0" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 90" className="w-full bg-examsy-surface border border-zinc-200 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm font-bold outline-none focus:border-examsy-primary" />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button onClick={() => setExamToUpdate(null)} className="flex-1 py-3.5 rounded-xl bg-examsy-bg font-bold text-examsy-muted hover:text-examsy-text transition-colors border border-zinc-200 dark:border-zinc-800">Cancel</button>
                            <button onClick={executeUpdateTiming} disabled={isActionLoading} className="flex-1 py-3.5 rounded-xl bg-examsy-primary text-white font-black hover:scale-105 active:scale-95 transition-all flex justify-center items-center gap-2 shadow-lg shadow-examsy-primary/20">
                                {isActionLoading ? <Loader2 size={18} className="animate-spin" /> : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ClassworkView;