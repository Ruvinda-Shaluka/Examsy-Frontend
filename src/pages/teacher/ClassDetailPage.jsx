import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    Layout,
    ClipboardList,
    Users,
    BarChart3
} from 'lucide-react';

// Detail View Components
import ClassStream from '../../components/teacher/class-detail/ClassStream';
import ClassPeopleList from '../../components/teacher/class-detail/ClassPeopleList';
import ClassworkView from '../../components/teacher/class-detail/ClassworkView';
import GradesView from '../../components/teacher/class-detail/GradesView';
import StreamCoverView from '../../components/teacher/class-detail/StreamCoverView';
import ClassAppearanceModal from '../../components/teacher/class-detail/ClassAppearanceModal';
import ToggleButton from '../../components/landingPage/ToggleButton';

// Data Imports
import { MOCK_CLASSES } from '../../data/TeacherMockData';

const ClassDetailPage = () => {
    const { classId } = useParams();
    const navigate = useNavigate();

    // UI States
    const [activeTab, setActiveTab] = useState('stream');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Navbar scroll logic
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    /** * ✅ STEP 1: Derived Data
     * We find the class data directly from the mock data during render.
     * This ensures classInfo is NEVER null.
     */
    const classInfo = MOCK_CLASSES.find(c => c.id === parseInt(classId)) || MOCK_CLASSES[0];

    /**
     * ✅ STEP 2: Initial State Bootstrapping
     * We initialize these states with the data we just found.
     * This avoids the "cascading render" error because the state is
     * correct from the very first frame.
     */
    const [bannerColor, setBannerColor] = useState(classInfo?.bannerColor || 'bg-examsy-primary');
    const [bannerImage, setBannerImage] = useState(classInfo?.bannerImage || null);

    /**
     * ✅ STEP 3: Context Syncing
     * This effect only runs if the user navigates between different class IDs.
     * It resets the local customization states to match the new classroom's defaults.
     */
    useEffect(() => {
        if (classInfo) {
            setBannerColor(classInfo.bannerColor || 'bg-examsy-primary');
            setBannerImage(classInfo.bannerImage || null);
        }
    }, [classId]);

    // Effect: Handle Navbar visibility on scroll
    useEffect(() => {
        const controlNavbar = () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                setIsVisible(false); // Hide when scrolling down
            } else {
                setIsVisible(true); // Show when scrolling up
            }
            setLastScrollY(window.scrollY);
        };
        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    const tabs = [
        { id: 'stream', label: 'Stream', icon: <Layout size={20} /> },
        { id: 'classwork', label: 'Classwork', icon: <ClipboardList size={20} /> },
        { id: 'people', label: 'People', icon: <Users size={20} /> },
        { id: 'grades', label: 'Grades', icon: <BarChart3 size={20} /> }
    ];

    return (
        <div className="min-h-screen bg-examsy-bg text-examsy-text p-4 md:p-8 transition-colors duration-500">

            {/* --- 1. Top Header --- */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/teacher/dashboard')}
                    className="p-2 hover:bg-examsy-surface rounded-xl text-examsy-muted transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                <h2 className="font-black text-xl tracking-tight">Classroom Manager</h2>
            </div>

            {/* --- 2. Integrated Sticky Navbar --- */}
            <nav className={`
                sticky top-4 z-30 mb-8 transition-all duration-500 ease-in-out
                ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'}
            `}>
                <div className="bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm p-1.5 md:p-3 flex items-center justify-between overflow-hidden">

                    {/* Left Side: Tabs */}
                    <div className="flex items-center gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center justify-center gap-2 p-2.5 md:px-6 md:py-2 rounded-2xl transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-examsy-primary text-white shadow-lg'
                                        : 'hover:bg-examsy-bg text-examsy-muted'
                                }`}
                            >
                                {tab.icon}
                                <span className="hidden md:block font-bold capitalize">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Right Side: Theme Toggle */}
                    <div className="flex items-center shrink-0">
                        <div className="scale-[0.55] sm:scale-[0.7] md:scale-100 origin-right mr-1 md:mr-0">
                            <ToggleButton />
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- 3. Content Area --- */}
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
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

                {activeTab === 'classwork' && <ClassworkView classId={classId} />}
                {activeTab === 'people' && <ClassPeopleList classId={classId} />}
                {activeTab === 'grades' && <GradesView classId={classId} />}
            </div>

            {/* --- 4. Customization Modal --- */}
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