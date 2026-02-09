import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Settings, Image as ImageIcon, ChevronLeft } from 'lucide-react';
import ClassStream from '../../components/teacher/class-detail/ClassStream';
import ClassPeopleList from '../../components/teacher/class-detail/ClassPeopleList';
import ClassAppearanceModal from '../../components/teacher/class-detail/ClassAppearanceModal';
import { MOCK_CLASSES } from '../../data/TeacherMockData';

const ClassDetailPage = () => {
    const { classId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('stream');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Find the specific class basic info from MOCK_CLASSES using the ID from the URL
    const classInfo = MOCK_CLASSES.find(c => c.id === parseInt(classId)) || MOCK_CLASSES[1];

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

            {/* --- Dynamic Class Banner --- */}
            <div className={`relative h-64 w-full ${classInfo.bannerColor || 'bg-examsy-primary'} rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl group transition-colors duration-500`}>
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-2xl" />

                <div className="absolute inset-0 p-10 flex flex-col justify-end relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight">
                        {classInfo.title}
                    </h1>
                    <p className="text-white/80 text-lg font-bold">
                        {classInfo.section}
                    </p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-bold transition-all border border-white/20 z-20"
                >
                    <ImageIcon size={18} /> Customize
                </button>
            </div>

            {/* --- Content Area Section --- */}
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Pass the dynamic classId down to components to fetch correct detail data */}
                {activeTab === 'stream' && <ClassStream classId={classId} />}

                {activeTab === 'people' && <ClassPeopleList classId={classId} />}

                {/* Fallback for tabs not yet implemented */}
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