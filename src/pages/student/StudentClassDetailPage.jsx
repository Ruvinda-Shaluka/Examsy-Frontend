import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import StreamCoverView from '../../components/teacher/class-detail/StreamCoverView';
import ClassStream from '../../components/teacher/class-detail/ClassStream';
import ClassPeopleList from '../../components/teacher/class-detail/ClassPeopleList';
import StudentGradesView from '../../components/student/class-detail/StudentGradesView';
import { STUDENT_DATA } from '../../data/StudentMockData';

const StudentClassDetailPage = () => {
    const { classId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('stream');

    // Safety check: Find class in enrolled data
    const classInfo = STUDENT_DATA.enrolledClasses.find(c => c.id === classId) || STUDENT_DATA.enrolledClasses[0];

    return (
        <div className="min-h-screen bg-examsy-bg text-examsy-text p-4 md:p-8 transition-colors duration-500">
            {/* Header / Breadcrumb */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/student/dashboard')}
                    className="p-2 hover:bg-examsy-surface rounded-xl text-examsy-muted transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                <h2 className="font-black text-xl tracking-tight">Classroom Hub</h2>
            </div>

            {/* Tab Nav */}
            <nav className="flex items-center justify-between mb-8 bg-examsy-surface p-2 rounded-3xl border border-zinc-200 dark:border-zinc-800 sticky top-4 z-30 shadow-lg">
                <div className="flex gap-2">
                    {['stream', 'classwork', 'people', 'grades'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2.5 rounded-2xl text-sm font-bold capitalize transition-all ${
                                activeTab === tab
                                    ? 'bg-examsy-primary text-white shadow-lg'
                                    : 'text-examsy-muted hover:bg-examsy-bg'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Tab Content */}
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === 'stream' && (
                    <div className="space-y-8">
                        <StreamCoverView
                            classInfo={{ title: classInfo.title, section: classInfo.section, bannerColor: classInfo.bannerColor }}
                        />
                        <ClassStream classId={classId} />
                    </div>
                )}

                {activeTab === 'classwork' && (
                    <div className="p-20 text-center bg-examsy-surface rounded-[3rem] border border-dashed border-zinc-200 dark:border-zinc-800">
                        <div className="max-w-xs mx-auto space-y-4">
                            <p className="text-2xl font-black text-examsy-text opacity-40 uppercase tracking-tighter">Academic Vault</p>
                            <p className="text-examsy-muted font-bold text-sm leading-relaxed">No assignments or exams have been posted by your teacher yet.</p>
                        </div>
                    </div>
                )}

                {activeTab === 'people' && <ClassPeopleList classId={classId} />}

                {activeTab === 'grades' && <StudentGradesView />}
            </div>
        </div>
    );
};

export default StudentClassDetailPage;