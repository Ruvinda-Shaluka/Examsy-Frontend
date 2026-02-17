import React, {useState} from 'react';
import { UserPlus, MoreVertical, ShieldCheck } from 'lucide-react';
import { MOCK_CLASS_DETAILS } from '../../../data/TeacherMockData';
import InviteStudentModal from "./InviteStudentModal.jsx";

const ClassPeopleList = ({ classId = "1", isTeacher = false }) => {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    // Retrieve data based on classId
    const data = MOCK_CLASS_DETAILS[String(classId)];

    if (!data) return (
        <div className="p-12 text-center flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-examsy-muted">
                <ShieldCheck size={24} />
            </div>
            <p className="text-examsy-muted font-bold">No member data available for this class.</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* --- DYNAMIC TEACHERS SECTION --- */}
            <section className="bg-examsy-surface rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xl">
                <div className="p-8 border-b border-zinc-100 dark:border-zinc-800">
                    <h2 className="text-2xl font-black text-examsy-primary">Teachers</h2>
                </div>
                <div className="p-4 space-y-3">
                    {/* Check if teachers exist, otherwise show fallback */}
                    {data.teachers && data.teachers.length > 0 ? (
                        data.teachers.map((teacher) => (
                            <div key={teacher.id} className="flex items-center justify-between p-4 bg-examsy-primary/5 rounded-2xl border border-examsy-primary/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-examsy-primary text-white flex items-center justify-center font-black text-lg">
                                        {teacher.initial}
                                    </div>
                                    <div>
                                        <p className="font-bold text-examsy-text">{teacher.name}</p>
                                        <p className="text-xs text-examsy-muted font-bold uppercase tracking-wider">{teacher.role || 'Faculty'}</p>
                                    </div>
                                </div>
                                <ShieldCheck className="text-examsy-primary" size={20} />
                            </div>
                        ))
                    ) : (
                        <p className="p-4 text-sm text-examsy-muted font-bold">No teachers assigned yet.</p>
                    )}
                </div>
            </section>

            {/* --- DYNAMIC STUDENTS SECTION --- */}
            <section className="bg-examsy-surface rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xl">
                <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                    <h2 className="text-2xl font-black text-examsy-primary flex items-center gap-3">
                        Students
                        <span className="text-sm bg-examsy-bg px-3 py-1 rounded-full text-examsy-muted font-bold">
                            {data.students?.length || 0}
                        </span>
                    </h2>

                    {/* Only show "Invite" button if user is a Teacher */}
                    {isTeacher && (
                        <button
                            onClick={() => setIsInviteModalOpen(!isInviteModalOpen)}
                            className="p-2 bg-examsy-primary/10 text-examsy-primary rounded-xl hover:bg-examsy-primary hover:text-white transition-all">
                            <UserPlus size={20} />
                        </button>
                    )}
                </div>
                <div className="p-4 space-y-2">
                    {data.students && data.students.length > 0 ? (
                        data.students.map((student) => (
                            <div key={student.id} className="flex items-center justify-between p-4 hover:bg-examsy-bg rounded-2xl group transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-examsy-muted flex items-center justify-center font-black group-hover:bg-examsy-primary group-hover:text-white transition-all">
                                        {student.initial}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-examsy-text">{student.name}</p>
                                        <p className="text-xs text-examsy-muted">{student.email}</p>
                                    </div>
                                </div>

                                {isTeacher && (
                                    <button className="p-2 text-examsy-muted opacity-0 group-hover:opacity-100 transition-opacity hover:text-examsy-text hover:bg-examsy-surface rounded-lg">
                                        <MoreVertical size={18} />
                                    </button>
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

            {/* 5. Render Modal Component */}
            <InviteStudentModal
                classId={classId}
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
            />
        </div>
    );
};

export default ClassPeopleList;