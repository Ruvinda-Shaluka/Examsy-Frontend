import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from "../../layouts/StudentLayout.jsx";
import StudentClassCard from '../../components/student/StudentClassCard.jsx';
import StudentJoinClassModal from '../../components/student/StudentJoinClassModal.jsx';
import CustomAlert from '../../components/common/CustomAlert.jsx';
import { Plus } from 'lucide-react';
import { studentService } from '../../services/studentService.js';

const StudentDashboard = () => {
    const navigate = useNavigate();

    const [alert, setAlert] = useState(null);
    const [studentProfile, setStudentProfile] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);

    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const [isLoadingClasses, setIsLoadingClasses] = useState(true);

    // Modal State
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const [profileData, classesData] = await Promise.all([
                    studentService.getProfile(),
                    studentService.getEnrolledClasses()
                ]);

                setStudentProfile(profileData);
                setEnrolledClasses(classesData);

                if (!profileData.major || !profileData.academicBio) {
                    setAlert({
                        type: 'info',
                        title: 'Incomplete Profile',
                        message: 'Welcome! Please complete your academic profile in Settings to unlock all features.',
                        onClose: () => {
                            setAlert(null);
                            navigate('/student/settings');
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

    const handleUnenroll = async (classId) => {
        const previousClasses = [...enrolledClasses];
        setEnrolledClasses(prev => prev.filter(c => c.id !== classId));

        try {
            await studentService.unenrollClass(classId);
            setAlert({ type: 'success', title: 'Unenrolled', message: 'You have successfully unenrolled from the class.', onClose: () => setAlert(null) });
        } catch (error) {
            console.error("Unenroll failed", error);
            setEnrolledClasses(previousClasses);
            setAlert({ type: 'error', title: 'Error', message: 'Failed to unenroll. Please try again.', onClose: () => setAlert(null) });
        }
    };

    // 🟢 UPDATED: Handle Join Class
    const handleJoinClass = async (joinData) => {
        try {
            // Sends { inviteLink: "..." } to the backend API service
            const responseMessage = await studentService.joinClass(joinData);

            // 🟢 We REMOVED the setEnrolledClasses line here. The card won't show until approved!

            // Only close the modal on success
            setIsJoinModalOpen(false);

            setAlert({
                type: 'success',
                title: 'Request Sent!',
                // 🟢 Display the message from the backend
                message: typeof responseMessage === 'string' ? responseMessage : 'Your request to join has been sent to the instructor.',
                onClose: () => setAlert(null)
            });
        } catch (error) {
            console.error("Join class failed", error);
            setAlert({
                type: 'error',
                title: 'Request Failed',
                message: error.response?.data?.message || 'Invalid link or request already pending.',
                onClose: () => setAlert(null)
            });
            throw error;
        }
    };

    return (
        <StudentLayout>
            {/* Render Modal */}
            <StudentJoinClassModal
                isOpen={isJoinModalOpen}
                onClose={() => setIsJoinModalOpen(false)}
                onJoin={handleJoinClass}
            />

            {alert && (
                <CustomAlert type={alert.type} title={alert.title} message={alert.message} onClose={alert.onClose} />
            )}

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 animate-fade-in">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-examsy-text">
                        {isLoadingProfile ? 'My Classrooms' : `Welcome back, ${studentProfile?.fullName?.split(' ')[0] || 'Student'}! 👋`}
                    </h2>
                    <p className="text-examsy-muted font-bold">Access your enrolled modules and assignments.</p>
                </div>

                {/* Join Class Button */}
                <button
                    onClick={() => setIsJoinModalOpen(true)}
                    className="w-full sm:w-auto bg-examsy-primary text-white px-6 py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-all"
                >
                    <Plus size={20} /> Join Class
                </button>
            </div>

            {/* Classroom Grid */}
            {isLoadingClasses ? (
                <div className="text-center text-examsy-muted font-bold py-10">Loading your classes...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in">
                    {enrolledClasses.map((cls) => (
                        <StudentClassCard
                            key={cls.id}
                            id={cls.id}
                            title={cls.title}
                            section={cls.section}
                            themeColorHex={cls.themeColorHex}
                            bannerImageUrl={cls.bannerImageUrl}
                            teacher={cls.teacher}
                            onUnenroll={handleUnenroll}
                        />
                    ))}

                    {/* Empty State Add Card */}
                    <button
                        onClick={() => setIsJoinModalOpen(true)}
                        className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[32px] flex flex-col items-center justify-center p-10 group hover:border-examsy-primary transition-all min-h-[200px]"
                    >
                        <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-examsy-primary mb-3">
                            <Plus size={24} />
                        </div>
                        <span className="font-bold text-zinc-400 group-hover:text-examsy-primary">Join a New Class</span>
                    </button>
                </div>
            )}
        </StudentLayout>
    );
};

export default StudentDashboard;