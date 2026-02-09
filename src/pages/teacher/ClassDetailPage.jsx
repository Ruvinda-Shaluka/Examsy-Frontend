import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Settings, ChevronLeft } from 'lucide-react';

// Detail View Components
import ClassStream from '../../components/teacher/class-detail/ClassStream';
import ClassPeopleList from '../../components/teacher/class-detail/ClassPeopleList';
import ClassworkView from '../../components/teacher/class-detail/ClassworkView';
import GradesView from '../../components/teacher/class-detail/GradesView';
import StreamCoverView from '../../components/teacher/class-detail/StreamCoverView';
import ClassAppearanceModal from '../../components/teacher/class-detail/ClassAppearanceModal';

// Data Imports
import { MOCK_CLASSES } from '../../data/TeacherMockData';

/**
 * ClassDetailPage
 * The primary container for managing a specific classroom.
 * Handles tab switching, banner customization, and context injection.
 */
const ClassDetailPage = () => {
    const { classId } = useParams();
    const navigate = useNavigate();

    // UI State
    const [activeTab, setActiveTab] = useState('stream');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Context Data: Find the specific class basic info
    const classInfo = MOCK_CLASSES.find(c => c.id === parseInt(classId)) || MOCK_CLASSES[0];

    // Appearance State: Banner customization logic
    const [bannerColor, setBannerColor] = useState(classInfo.bannerColor || 'bg-examsy-primary');
    const [bannerImage, setBannerImage] = useState(null);

    return (
        <div className="min-h-screen bg-examsy-bg text-examsy-text p-4 md:p-8 transition-colors duration-500">

            {/* --- 1. Header Navigation --- */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/teacher/dashboard')}
                    className="p-2 hover:bg-examsy-surface rounded-xl text-examsy-muted transition-colors"
                    title="Back to Dashboard"
                >
                    <ChevronLeft size={24} />
                </button>
                <h2 className="font-black text-xl tracking-tight">Classroom Manager</h2>
            </div>

            {/* --- 2. Tab Navigation Menu --- */}
            <nav className="flex items-center justify-between mb-8 bg-examsy-surface p-4 rounded-3xl border border-zinc-200 dark:border-zinc-800 sticky top-4 z-30 shadow-sm transition-all duration-300">
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

            {/* --- 3. Main Content Container --- */}
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* --- TAB: STREAM --- */}
                {activeTab === 'stream' && (
                    <div className="space-y-8">
                        {/* Dynamic Banner: Only visible in Stream */}
                        <StreamCoverView
                            classInfo={{ ...classInfo, bannerColor }}
                            bannerImage={bannerImage}
                            onCustomize={() => setIsModalOpen(true)}
                        />
                        <ClassStream classId={classId} />
                    </div>
                )}

                {/* --- TAB: CLASSWORK --- */}
                {activeTab === 'classwork' && (
                    <ClassworkView classId={classId} />
                )}

                {/* --- TAB: PEOPLE --- */}
                {activeTab === 'people' && (
                    <ClassPeopleList classId={classId} />
                )}

                {/* --- TAB: GRADES --- */}
                {activeTab === 'grades' && (
                    <GradesView classId={classId} />
                )}

            </div>

            {/* --- 4. Shared Modals --- */}
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