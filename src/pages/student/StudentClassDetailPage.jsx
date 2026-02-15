import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    ChevronLeft,
    Layout,
    ClipboardList,
    Users,
    BarChart3
} from 'lucide-react';

// Detail Components
import StreamCoverView from '../../components/teacher/class-detail/StreamCoverView';
import ClassStream from '../../components/teacher/class-detail/ClassStream';
import ClassPeopleList from '../../components/teacher/class-detail/ClassPeopleList';
import StudentGradesView from '../../components/student/class-detail/StudentGradesView';
import AcademicVault from "./AcademicVault.jsx";
import ToggleButton from '../../components/landingPage/ToggleButton';
import ClassAppearanceModal from '../../components/teacher/class-detail/ClassAppearanceModal';

// Data
import { STUDENT_DATA } from '../../data/StudentMockData';

const StudentClassDetailPage = () => {
    const { classId } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); // ✅ Access navigation state

    // --- 1. DERIVED DATA ---
    // Calculate class data directly during render to prevent null errors
    const classInfo = STUDENT_DATA.enrolledClasses.find(c => c.id === classId) || STUDENT_DATA.enrolledClasses[0];

    // --- 2. INITIALIZE STATE ---

    // ✅ Initialize activeTab: Check if 'defaultTab' was passed via router state, otherwise default to 'stream'
    const [activeTab, setActiveTab] = useState(location.state?.defaultTab || 'stream');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bannerColor, setBannerColor] = useState(classInfo?.bannerColor || 'bg-examsy-primary');
    const [bannerImage, setBannerImage] = useState(null);

    // Navbar scroll logic
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // --- 3. EFFECTS ---

    // Sync banner state if user switches classes via URL
    useEffect(() => {
        if (classInfo) {
            setBannerColor(classInfo.bannerColor || 'bg-examsy-primary');
            setBannerImage(null);
        }
    }, [classId]);

    // ✅ Sync activeTab if location state changes (e.g., clicking notification)
    useEffect(() => {
        if (location.state?.defaultTab) {
            setActiveTab(location.state.defaultTab);
        }
    }, [location.state]);

    // Handle Navbar visibility on scroll
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

            {/* --- Header / Breadcrumb --- */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/student/dashboard')}
                    className="p-2 hover:bg-examsy-surface rounded-xl text-examsy-muted transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                <h2 className="font-black text-xl tracking-tight">Classroom Hub</h2>
            </div>

            {/* --- Shared Fixed Navbar --- */}
            <nav className={`
                sticky top-4 z-30 mb-8 transition-all duration-500 ease-in-out
                ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'}
            `}>
                <div className="bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm p-1.5 md:p-3 flex items-center justify-between overflow-hidden">

                    <div className="flex items-center gap-1 md:gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center justify-center gap-2 p-2.5 md:px-6 md:py-2 rounded-2xl transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-examsy-primary text-white shadow-lg shadow-purple-500/20'
                                        : 'hover:bg-examsy-bg text-examsy-muted'
                                }`}
                            >
                                {tab.icon}
                                <span className="hidden md:block font-bold capitalize">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center shrink-0">
                        <div className="scale-[0.55] sm:scale-[0.7] md:scale-100 origin-right mr-1 md:mr-0">
                            <ToggleButton />
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- Tab Content Area --- */}
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === 'stream' && (
                    <div className="space-y-8">
                        <StreamCoverView
                            classInfo={{
                                title: classInfo.title,
                                section: classInfo.section,
                                bannerColor: bannerColor
                            }}
                            bannerImage={bannerImage}
                            onCustomize={() => setIsModalOpen(true)}
                        />
                        <ClassStream classId={classId} />
                    </div>
                )}

                {activeTab === 'classwork' && <AcademicVault/>}

                {activeTab === 'people' && <ClassPeopleList classId={classId} />}

                {activeTab === 'grades' && <StudentGradesView />}
            </div>

            {/* --- Appearance Customization Modal --- */}
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

export default StudentClassDetailPage;