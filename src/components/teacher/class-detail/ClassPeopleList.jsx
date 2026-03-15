import React, { useState, useEffect } from 'react';
import { UserPlus, MoreVertical, ShieldCheck, Mail, UserMinus, Loader2 } from 'lucide-react';
import { teacherService } from '../../../services/teacherService';
import { studentService } from '../../../services/studentService';
import InviteStudentModal from "./InviteStudentModal.jsx";
import CustomAlert from '../../common/CustomAlert';

const ClassPeopleList = ({ classId, isTeacher = false }) => {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    // Data States
    const [peopleData, setPeopleData] = useState({ teachers: [], students: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState(null);

    // Track which student's dropdown menu is currently open
    const [activeMenuId, setActiveMenuId] = useState(null);

    // Fetch data on load
    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const data = isTeacher
                    ? await teacherService.getClassPeople(classId)
                    : await studentService.getClassPeople(classId);

                setPeopleData(data);
            } catch (error) {
                console.error("Failed to load class people", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (classId) fetchPeople();
    }, [classId, isTeacher]);

    // Handle Email
    const handleEmailStudent = (email) => {
        setActiveMenuId(null);
        window.location.href = `mailto:${email}`;
    };

    // Handle Remove Student
    const handleRemoveStudent = async (studentId, studentName) => {
        setActiveMenuId(null);

        if (!window.confirm(`Are you sure you want to remove ${studentName} from this class?`)) {
            return;
        }

        try {
            await teacherService.removeStudent(classId, studentId);

            // Instantly remove from UI
            setPeopleData(prev => ({
                ...prev,
                students: prev.students.filter(s => s.id !== studentId)
            }));

            setAlert({ type: 'success', title: 'Removed', message: `${studentName} has been removed from the class.` });
        } catch (error) {
            setAlert({ type: 'error', title: 'Error', message: 'Failed to remove student. Please try again.' });
        }
    };

    if (isLoading) {
        return <div className="p-20 flex justify-center text-examsy-primary"><Loader2 className="animate-spin" size={40}/></div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">

            {alert && (
                <CustomAlert type={alert.type} title={alert.title} message={alert.message} onClose={() => setAlert(null)} />
            )}

            {/* --- TEACHERS SECTION --- */}
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

            {/* --- STUDENTS SECTION --- */}
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
                                                        onClick={() => handleRemoveStudent(student.id, student.name)}
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
        </div>
    );
};

export default ClassPeopleList;