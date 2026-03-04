import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherLayout from '../../layouts/TeacherLayout';
import TeacherClassCard from '../../components/teacher/class-detail/TeacherClassCard.jsx';
import TeacherCreateClassModal from '../../components/teacher/TeacherCreateClassModal';
import CustomAlert from '../../components/common/CustomAlert.jsx';
import { Plus } from 'lucide-react';
import { teacherService } from '../../services/teacherService.js';
import { MOCK_CLASSES } from '../../data/TeacherMockData'; // Keeping mock classes for now

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 1. Alert & Profile State
    const [alert, setAlert] = useState(null);
    const [teacherProfile, setTeacherProfile] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);

    // 2. The Progressive Profiling Hook
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Grab the real data from Spring Boot
                const data = await teacherService.getProfile();
                setTeacherProfile(data);

                // Check if they need to complete their profile (e.g., missing bio or office location)
                if (!data.professionalBio || !data.officeLocation) {
                    setAlert({
                        type: 'info',
                        title: 'Incomplete Profile',
                        message: 'Welcome! Please complete your professional profile in Settings to unlock all features.',
                        onClose: () => {
                            setAlert(null);
                            // Teleport them to settings when they close the alert
                            navigate('/teacher/settings');
                        }
                    });
                }
            } catch (error) {
                console.error("Failed to fetch teacher profile", error);
            } finally {
                setIsLoadingProfile(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    return (
        <TeacherLayout>
            <TeacherCreateClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Render the Alert securely at the top of the layout */}
            {alert && (
                <CustomAlert
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                    onClose={alert.onClose}
                />
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                <div>
                    {/* Dynamically greet the teacher by their first name once loaded! */}
                    <h2 className="text-2xl md:text-3xl font-black text-examsy-text">
                        {isLoadingProfile ? 'Active Classes' : `Welcome back, ${teacherProfile?.fullName?.split(' ')[0] || 'Instructor'}! 👋`}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {MOCK_CLASSES.map((cls) => (
                    <TeacherClassCard key={cls.id} {...cls} />
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
        </TeacherLayout>
    );
};

export default TeacherDashboard;