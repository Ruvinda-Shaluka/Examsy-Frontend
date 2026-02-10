import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    Layout,
    ClipboardList,
    Users,
    BarChart3
} from 'lucide-react';

import ClassStream from '../../components/teacher/class-detail/ClassStream';
import ClassPeopleList from '../../components/teacher/class-detail/ClassPeopleList';
import ClassworkView from '../../components/teacher/class-detail/ClassworkView';
import GradesView from '../../components/teacher/class-detail/GradesView';
import StreamCoverView from '../../components/teacher/class-detail/StreamCoverView';
import ClassAppearanceModal from '../../components/teacher/class-detail/ClassAppearanceModal';
import ToggleButton from '../../components/landingPage/ToggleButton';

import { MOCK_CLASSES } from '../../data/TeacherMockData';

const ClassDetailPage = () => {
    const { classId } = useParams();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('stream');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Navbar scroll logic
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const classInfo = MOCK_CLASSES.find(c => c.id === parseInt(classId)) || MOCK_CLASSES[0];
    const [bannerColor, setBannerColor] = useState(classInfo.bannerColor || 'bg-examsy-primary');
    const [bannerImage, setBannerImage] = useState(null);

    useEffect(() => {
        const controlNavbar = () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
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

            {/* --- Header --- */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/teacher/dashboard')}
                    className="p-2 hover:bg-examsy-surface rounded-xl text-examsy-muted transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                <h2 className="font-black text-xl tracking-tight">Classroom Manager</h2>
            </div>

            {/* --- FIXED NAVBAR --- */}
            <nav className={`
                sticky top-4 z-30 mb-8 transition-all duration-500 ease-in-out
                ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'}
            `}>
                <div className="bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm p-1.5 md:p-3 flex items-center justify-between overflow-hidden">

                    {/* Left Side: Tabs */}
                    <div className="flex items-center gap-1 md:gap-1">
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

                    {/* Right Side: Toggle Button (Firmly Inside) */}
                    <div className="flex items-center shrink-0">
                        {/* We use a negative margin if necessary, but scaling at 0.6
                           usually solves the 'odd' look by keeping it proportional to the icons.
                        */}
                        <div className="scale-[0.55] sm:scale-[0.7] md:scale-100 ">
                            <ToggleButton />
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- Content Area --- */}
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