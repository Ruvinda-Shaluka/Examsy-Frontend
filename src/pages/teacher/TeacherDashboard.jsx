import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherLayout from '../../layouts/TeacherLayout';
import TeacherClassCard from '../../components/teacher/class-detail/TeacherClassCard.jsx';
import TeacherCreateClassModal from '../../components/teacher/TeacherCreateClassModal';
import CustomAlert from '../../components/common/CustomAlert.jsx';
import { Plus } from 'lucide-react';
import { teacherService } from '../../services/teacherService.js';

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [alert, setAlert] = useState(null);
    const [teacherProfile, setTeacherProfile] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);

    const [activeClasses, setActiveClasses] = useState([]);
    const [isLoadingClasses, setIsLoadingClasses] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const [profileData, classesData] = await Promise.all([
                    teacherService.getProfile(),
                    teacherService.getClasses()
                ]);

                setTeacherProfile(profileData);
                setActiveClasses(classesData);

                if (!profileData.professionalBio || !profileData.officeLocation) {
                    setAlert({
                        type: 'info',
                        title: 'Incomplete Profile',
                        message: 'Welcome! Please complete your professional profile in Settings to unlock all features.',
                        onClose: () => {
                            setAlert(null);
                            navigate('/teacher/settings');
                        }
                    });
                }
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setIsLoadingProfile(false);
                setIsLoadingClasses(false);
            }
        };

        loadDashboardData();
    }, [navigate]);

    const handleDeleteClass = async (classId) => {
        const previousClasses = [...activeClasses];
        setActiveClasses(prev => prev.filter(c => c.id !== classId));

        try {
            await teacherService.deleteClass(classId);
            setAlert({ type: 'success', title: 'Class Deleted', message: 'The class has been permanently deleted.', onClose: () => setAlert(null) });
        } catch (error) {
            console.error("Failed to delete class", error);
            setActiveClasses(previousClasses);
            setAlert({ type: 'error', title: 'Error', message: 'Failed to delete class. Please try again.', onClose: () => setAlert(null) });
        }
    };

    const handleCreateClass = async (classData) => {
        try {
            const newClass = await teacherService.createClass(classData);

            setActiveClasses(prev => [newClass, ...prev]);

            setIsModalOpen(false);

            setAlert({
                type: 'success',
                title: 'Class Created!',
                message: `"${newClass.title}" has been created successfully.`,
                onClose: () => setAlert(null)
            });
        } catch (error) {
            console.error("Failed to create class", error);
            setAlert({
                type: 'error',
                title: 'Creation Failed',
                message: error.response?.data?.message || 'Could not create the class. Check your inputs.',
                onClose: () => setAlert(null)
            });
        }
    };

    return (
        <TeacherLayout>
            <TeacherCreateClassModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateClass}
            />

            {alert && (
                <CustomAlert type={alert.type} title={alert.title} message={alert.message} onClose={alert.onClose} />
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-examsy-text">
                        {isLoadingProfile ? 'Active Classes' : `Welcome back, ${teacherProfile?.fullName || 'Instructor'}! 👋`}
                    </h2>
                    <p className="text-examsy-muted font-bold">Manage your current teaching modules.</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto bg-examsy-primary text-white px-6 py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-all"
                >
                    <Plus size={20} /> Create Class
                </button>
            </div>

            {isLoadingClasses ? (
                <div className="text-center text-examsy-muted font-bold py-10">Loading your classes...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {activeClasses.map((cls) => (
                        <TeacherClassCard
                            key={cls.id}
                            {...cls}
                            onDelete={handleDeleteClass}
                        />
                    ))}

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[32px] flex flex-col items-center justify-center p-10 group hover:border-examsy-primary transition-all min-h-[200px]"
                    >
                        <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-examsy-primary mb-3">
                            <Plus size={24} />
                        </div>
                        <span className="font-bold text-zinc-400 group-hover:text-examsy-primary">Add New Class</span>
                    </button>
                </div>
            )}
        </TeacherLayout>
    );
};

export default TeacherDashboard;