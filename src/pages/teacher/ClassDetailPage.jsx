import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Settings, ChevronLeft } from 'lucide-react';
import ClassStream from '../../components/teacher/class-detail/ClassStream';
import ClassPeopleList from '../../components/teacher/class-detail/ClassPeopleList';
import ClassAppearanceModal from '../../components/teacher/class-detail/ClassAppearanceModal';
import StreamCoverView from '../../components/teacher/class-detail/StreamCoverView'; // New Import
import { MOCK_CLASSES } from '../../data/TeacherMockData';

const ClassDetailPage = () => {
    const { classId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('stream');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const classInfo = MOCK_CLASSES.find(c => c.id === parseInt(classId)) || MOCK_CLASSES[0];

    return (
        <div className="min-h-screen bg-examsy-bg text-examsy-text p-4 md:p-8">
            {/* --- Navigation & Breadcrumbs --- */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/teacher/dashboard')}
                    className="p-2 hover:bg-examsy-surface rounded-xl text-examsy-muted transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                <h2 className="font-black text-xl">Classroom Manager</h2>
            </div>

            {/* --- Main Tab Navigation --- */}
            <nav className="flex items-center justify-between mb-8 bg-examsy-surface p-4 rounded-3xl border border-zinc-200 dark:border-zinc-800 sticky top-4 z-30 shadow-sm">
                <div className="flex gap-2">
                    {['stream', 'classwork', 'people', 'grades'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-2xl text-sm font-bold capitalize transition-all ${
                                activeTab === tab
                                    ? 'bg-examsy-primary text-white shadow-lg shadow-indigo-500/30'
                                    : 'hover:bg-examsy-bg text-examsy-muted'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <button className="p-2 hover:bg-examsy-bg rounded-full text-examsy-muted transition-colors">
                    <Settings size={20}/>
                </button>
            </nav>

            {/* --- Content Area Section --- */}
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* 1. STREAM SECTION: Includes the extracted Banner component */}
                {activeTab === 'stream' && (
                    <>
                        <StreamCoverView
                            classInfo={classInfo}
                            onCustomize={() => setIsModalOpen(true)}
                        />
                        <ClassStream classId={classId} />
                    </>
                )}

                {/* 2. PEOPLE SECTION */}
                {activeTab === 'people' && <ClassPeopleList classId={classId} />}

                {/* 3. OTHER SECTIONS (Classwork & Grades) */}
                {(activeTab === 'classwork' || activeTab === 'grades') && (
                    <div className="bg-examsy-surface rounded-[2.5rem] p-20 text-center border border-dashed border-zinc-200 dark:border-zinc-800">
                        <p className="text-examsy-muted font-bold text-xl capitalize">
                            {activeTab} module coming soon
                        </p>
                    </div>
                )}
            </div>

            {/* --- Modals --- */}
            <ClassAppearanceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default ClassDetailPage;