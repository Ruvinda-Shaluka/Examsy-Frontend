import React, { useState, useEffect } from 'react';
import { UserPlus, MoreVertical, ShieldCheck, Mail, UserMinus, Loader2, Check, X } from 'lucide-react';
import { teacherService } from '../../../services/teacherService';
import { studentService } from '../../../services/studentService';
import InviteStudentModal from "./InviteStudentModal.jsx";
import CustomAlert from '../../common/CustomAlert';

const ClassPeopleList = ({ classId, isTeacher = false }) => {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    // Data States
    const [peopleData, setPeopleData] = useState({ teachers: [], students: [] });
    const [pendingRequests, setPendingRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);
    const [alert, setAlert] = useState(null);

    const [activeMenuId, setActiveMenuId] = useState(null);

    // 🟢 NEW: Custom Confirmation Modal State
    const [studentToRemove, setStudentToRemove] = useState(null);
    const [isRemoving, setIsRemoving] = useState(false);

    // Fetch data on load
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isTeacher) {
                    const [people, requests] = await Promise.all([
                        teacherService.getClassPeople(classId),
                        teacherService.getPendingRequests(classId)
                    ]);
                    setPeopleData(people);
                    setPendingRequests(requests);
                } else {
                    const people = await studentService.getClassPeople(classId);
                    setPeopleData(people);
                }
            } catch (error) {
                console.error("Failed to load class people", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (classId) fetchData();
    }, [classId, isTeacher]);

    // Handle Approving a Student
    const handleApprove = async (request) => {
        setProcessingId(request.requestId);
        try {
            await teacherService.approveRequest(request.requestId);

            setPendingRequests(prev => prev.filter(r => r.requestId !== request.requestId));

            const newStudent = {
                id: request.studentId,
                name: request.studentName,
                email: request.studentEmail,
                initial: request.initial,
                role: 'Student'
            };
            setPeopleData(prev => ({ ...prev, students: [...prev.students, newStudent] }));

            setAlert({ type: 'success', title: 'Approved', message: `${request.studentName} has been added to the class.` });
        } catch (error) {
            setAlert({ type: 'error', title: 'Error', message: 'Failed to approve student.' });
        } finally {
            setProcessingId(null);
        }
    };

    // Handle Rejecting a Student
    const handleReject = async (requestId, studentName) => {
        setProcessingId(requestId);
        try {
            await teacherService.rejectRequest(requestId);
            setPendingRequests(prev => prev.filter(r => r.requestId !== requestId));
            setAlert({ type: 'info', title: 'Rejected', message: `${studentName}'s request was declined.` });
        } catch (error) {
            setAlert({ type: 'error', title: 'Error', message: 'Failed to reject student.' });
        } finally {
            setProcessingId(null);
        }
    };

    const handleEmailStudent = (email) => {
        setActiveMenuId(null);
        window.location.href = `mailto:${email}`;
    };

    // 🟢 UPDATED: Only opens the custom confirmation modal now
    const handleRemoveClick = (studentId, studentName) => {
        setActiveMenuId(null);
        setStudentToRemove({ id: studentId, name: studentName });
    };

    // 🟢 NEW: The actual remove execution function
    const confirmRemoveStudent = async () => {
        if (!studentToRemove) return;
        setIsRemoving(true);

        try {
            await teacherService.removeStudent(classId, studentToRemove.id);
            setPeopleData(prev => ({ ...prev, students: prev.students.filter(s => s.id !== studentToRemove.id) }));
            setAlert({ type: 'success', title: 'Removed', message: `${studentToRemove.name} has been removed from the class.` });
        } catch (error) {
            setAlert({ type: 'error', title: 'Error', message: 'Failed to remove student.' });
        } finally {
            setIsRemoving(false);
            setStudentToRemove(null); // Close the modal
        }
    };

    if (isLoading) {
        return <div className="p-20 flex justify-center text-examsy-primary"><Loader2 className="animate-spin" size={40}/></div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {alert && <CustomAlert type={alert.type} title={alert.title} message={alert.message} onClose={() => setAlert(null)} />}

            {/* PENDING REQUESTS SECTION */}
            {isTeacher && pendingRequests.length > 0 && (
                <section className="bg-amber-500/5 rounded-[2.5rem] border border-amber-500/20 overflow-visible shadow-sm relative animate-in fade-in">
                    <div className="p-6 md:p-8 border-b border-amber-500/10 flex justify-between items-center">
                        <h2 className="text-xl font-black text-amber-600 dark:text-amber-500 flex items-center gap-3">
                            Pending Approvals
                            <span className="text-xs bg-amber-500 text-white px-3 py-1 rounded-full font-bold shadow-sm">
                                {pendingRequests.length} Waiting
                            </span>
                        </h2>
                    </div>

                    <div className="p-4 space-y-2">
                        {pendingRequests.map((req) => (
                            <div key={req.requestId} className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-examsy-muted flex items-center justify-center font-black shrink-0">
                                        {req.initial}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-examsy-text">{req.studentName}</p>
                                        <p className="text-xs text-examsy-muted">{req.studentEmail}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleReject(req.requestId, req.studentName)}
                                        disabled={processingId === req.requestId}
                                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors disabled:opacity-50"
                                        title="Reject"
                                    >
                                        <X size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleApprove(req)}
                                        disabled={processingId === req.requestId}
                                        className="px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {processingId === req.requestId ? <Loader2 size={16} className="animate-spin" /> : <><Check size={16} /> Approve</>}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* TEACHERS SECTION */}
            <section className="bg-examsy-surface rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="p-6 md:p-8 border-b border-zinc-100 dark:border-zinc-800">
                    <h2 className="text-2xl font-black text-examsy-primary">Teachers</h2>
                </div>
                <div className="p-4 space-y-3">
                    {peopleData.teachers.map((teacher) => (
                        <div key={teacher.id} className="flex items-center justify-between p-4 bg-examsy-primary/5 rounded-2xl border border-examsy-primary/10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-examsy-primary text-white flex items-center justify-center font-black text-lg overflow-hidden shrink-0">
                                    {teacher.profileImageUrl ? (
                                        <img src={teacher.profileImageUrl} alt={teacher.name} className="w-full h-full object-cover" />
                                    ) : (
                                        teacher.initial
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-examsy-text">{teacher.name}</p>
                                    <p className="text-xs text-examsy-muted font-bold uppercase tracking-wider">{teacher.role}</p>
                                </div>
                            </div>
                            <ShieldCheck className="text-examsy-primary shrink-0" size={20} />
                        </div>
                    ))}
                </div>
            </section>

            {/* STUDENTS SECTION */}
            <section className="bg-examsy-surface rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 overflow-visible shadow-sm relative">
                <div className="p-6 md:p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                    <h2 className="text-2xl font-black text-examsy-primary flex items-center gap-3">
                        Students
                        <span className="text-sm bg-examsy-bg px-3 py-1 rounded-full text-examsy-muted font-bold">
                            {peopleData.students.length}
                        </span>
                    </h2>

                    {isTeacher && (
                        <button
                            onClick={() => setIsInviteModalOpen(true)}
                            className="p-2 bg-examsy-primary/10 text-examsy-primary rounded-xl hover:bg-examsy-primary hover:text-white transition-all">
                            <UserPlus size={20} />
                        </button>
                    )}
                </div>

                <div className="p-4 space-y-2">
                    {peopleData.students.length > 0 ? (
                        peopleData.students.map((student) => (
                            <div key={student.id} className="flex items-center justify-between p-4 hover:bg-examsy-bg rounded-2xl group transition-all border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 relative">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-examsy-muted flex items-center justify-center font-black overflow-hidden group-hover:bg-examsy-primary group-hover:text-white transition-all shrink-0">
                                        {student.profileImageUrl ? (
                                            <img src={student.profileImageUrl} alt={student.name} className="w-full h-full object-cover" />
                                        ) : (
                                            student.initial
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-examsy-text">{student.name}</p>
                                    </div>
                                </div>

                                {/* ONLY TEACHERS SEE THE 3-DOT MENU */}
                                {isTeacher && (
                                    <div className="relative">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveMenuId(activeMenuId === student.id ? null : student.id);
                                            }}
                                            className="p-2 text-examsy-muted opacity-0 group-hover:opacity-100 transition-opacity hover:text-examsy-text hover:bg-examsy-surface rounded-lg focus:opacity-100"
                                        >
                                            <MoreVertical size={18} />
                                        </button>

                                        {/* DROPDOWN MENU */}
                                        {activeMenuId === student.id && (
                                            <>
                                                <div className="fixed inset-0 z-40" onClick={() => setActiveMenuId(null)}></div>

                                                <div className="absolute right-0 top-10 w-48 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                                                    <button
                                                        onClick={() => handleEmailStudent(student.email)}
                                                        className="w-full text-left px-4 py-3 text-sm font-bold text-examsy-text hover:bg-examsy-bg transition-colors flex items-center gap-3"
                                                    >
                                                        <Mail size={16} className="text-examsy-muted" /> Email student
                                                    </button>
                                                    <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1 mx-2"></div>
                                                    <button
                                                        // 🟢 UPDATED: Triggers the new custom modal
                                                        onClick={() => handleRemoveClick(student.id, student.name)}
                                                        className="w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-3"
                                                    >
                                                        <UserMinus size={16} /> Remove
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-examsy-muted font-bold text-sm opacity-60">
                            No students enrolled yet.
                        </div>
                    )}
                </div>
            </section>

            <InviteStudentModal
                classId={classId}
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
            />

            {/* 🟢 NEW: Custom Confirmation Modal */}
            {studentToRemove && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-examsy-surface w-full max-w-sm rounded-[32px] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <UserMinus size={32} />
                        </div>
                        <h3 className="text-xl font-black text-examsy-text text-center mb-2">Remove Student?</h3>
                        <p className="text-sm font-bold text-examsy-muted text-center mb-8">
                            Are you sure you want to remove <span className="text-examsy-text">{studentToRemove.name}</span> from this class? They will lose access to all class materials immediately.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setStudentToRemove(null)}
                                disabled={isRemoving}
                                className="flex-1 py-3.5 rounded-2xl font-bold text-examsy-muted bg-examsy-bg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmRemoveStudent}
                                disabled={isRemoving}
                                className="flex-1 py-3.5 rounded-2xl font-black text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all active:scale-95 flex justify-center items-center disabled:opacity-50"
                            >
                                {isRemoving ? <Loader2 size={18} className="animate-spin" /> : 'Yes, Remove'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassPeopleList;