import React from 'react';
import { UserPlus, MoreVertical, Mail, ShieldCheck } from 'lucide-react';
import { MOCK_CLASS_DETAILS } from '../../../data/TeacherMockData';

const ClassPeopleList = ({ classId = "1" }) => {
    const data = MOCK_CLASS_DETAILS[String(classId)];

    if (!data) return <div className="p-8 text-center text-examsy-muted">No member data available.</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Teachers Section */}
            <section className="bg-examsy-surface rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xl">
                <div className="p-8 border-b border-zinc-100 dark:border-zinc-800">
                    <h2 className="text-2xl font-black text-examsy-primary">Teachers</h2>
                </div>
                <div className="p-4">
                    <div className="flex items-center justify-between p-4 bg-examsy-primary/5 rounded-2xl border border-examsy-primary/10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-examsy-primary text-white flex items-center justify-center font-black">JS</div>
                            <div>
                                <p className="font-bold text-examsy-text">Dr. Jane Smith</p>
                                <p className="text-xs text-examsy-muted">Lead Faculty</p>
                            </div>
                        </div>
                        <ShieldCheck className="text-examsy-primary" size={20} />
                    </div>
                </div>
            </section>

            {/* Students Section */}
            <section className="bg-examsy-surface rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xl">
                <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                    <h2 className="text-2xl font-black text-examsy-primary flex items-center gap-3">
                        Students
                        <span className="text-sm bg-examsy-bg px-3 py-1 rounded-full text-examsy-muted font-bold">
                            {data.students?.length || 0}
                        </span>
                    </h2>
                    <button className="p-2 bg-examsy-primary/10 text-examsy-primary rounded-xl hover:bg-examsy-primary hover:text-white transition-all">
                        <UserPlus size={20} />
                    </button>
                </div>
                <div className="p-4">
                    {data.students?.map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-4 hover:bg-examsy-bg rounded-2xl group transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-black group-hover:bg-examsy-primary group-hover:text-white transition-all">
                                    {student.initial}
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-examsy-text">{student.name}</p>
                                    <p className="text-xs text-examsy-muted">{student.email}</p>
                                </div>
                            </div>
                            <button className="p-2 text-examsy-muted opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ClassPeopleList;