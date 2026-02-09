import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Settings, ChevronLeft } from 'lucide-react';

// Detail Components
import ClassStream from '../../components/teacher/class-detail/ClassStream';
import ClassPeopleList from '../../components/teacher/class-detail/ClassPeopleList';
import ClassworkView from '../../components/teacher/class-detail/ClassworkView';
import StreamCoverView from '../../components/teacher/class-detail/StreamCoverView';
import ClassAppearanceModal from '../../components/teacher/class-detail/ClassAppearanceModal';

// Data
import { MOCK_CLASSES } from '../../data/TeacherMockData';

const ClassDetailPage = () => {
    const { classId } = useParams();
    const navigate = useNavigate();

    // Tab State
    const [activeTab, setActiveTab] = useState('stream');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Initial data fetch based on URL param
    const classInfo = MOCK_CLASSES.find(c => c.id === parseInt(classId)) || MOCK_CLASSES[0];

    // Banner Customization State
    const [bannerColor, setBannerColor] = useState(classInfo.bannerColor || 'bg-examsy-primary');
    const [bannerImage, setBannerImage] = useState(null);

    return (
        <div className="min-h-screen bg-examsy-bg text-examsy-text p-4 md:p-8 transition-colors duration-500">

            {/* --- Top Navigation Bar --- */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/teacher/dashboard')}
                    className="p-2 hover:bg-examsy-surface rounded-xl text-examsy-muted transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                <h2 className="font-black text-xl tracking-tight">Classroom Manager</h2>
            </div>

            {/* --- Sticky Tab Navigation --- */}
            <nav className="flex items-center justify-between mb-8 bg-examsy-surface p-4 rounded-3xl border border-zinc-200 dark:border-zinc-800 sticky top-4 z-30 shadow-sm">
                <div className="flex gap-2">
                    {['stream', 'classwork', 'people', 'grades'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-2xl text-sm font-bold capitalize transition-all ${
                                activeTab === tab
                                    ? 'bg-examsy-primary text-white shadow-lg shadow-indigo-500/20'
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

            {/* --- Main Content Area --- */}
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* 1. STREAM TAB */}
                {activeTab === 'stream' && (
                    <div className="space-y-8">
                        <StreamCoverView
                            classInfo={{ ...classInfo, bannerColor }}
                            bannerImage={bannerImage}
                            onCustomize={() => setIsModalOpen(true)}
                        />
                        <ClassStream classId={classId} />
                    </div>
                )}

                {/* 2. CLASSWORK TAB (New Module) */}
                {activeTab === 'classwork' && (
                    <ClassworkView classId={classId} />
                )}

                {/* 3. PEOPLE TAB */}
                {activeTab === 'people' && (
                    <ClassPeopleList classId={classId} />
                )}

                {/* 4. GRADES TAB (Placeholder) */}
                {activeTab === 'grades' && (
                    <div className="bg-examsy-surface rounded-[2.5rem] p-20 text-center border border-dashed border-zinc-200 dark:border-zinc-800">
                        <div className="text-examsy-muted space-y-2">
                            <p className="font-black text-2xl uppercase tracking-tighter">Performance Tracking</p>
                            <p className="font-bold opacity-60">Grades and analytics module coming soon.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* --- Customization Modal --- */}
            <ClassAppearanceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentColor={bannerColor}
                onColorSelect={setBannerColor}
                onImageSelect={setBannerImage}
            />
        </div>
    );
};

export default ClassDetailPage;