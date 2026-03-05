import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from "../../layouts/StudentLayout.jsx";
import StudentClassCard from '../../components/student/StudentClassCard.jsx';
import CustomAlert from '../../components/common/CustomAlert.jsx';
import { studentService } from '../../services/studentService.js';

const StudentDashboard = () => {
    const navigate = useNavigate();

    // State Management
    const [alert, setAlert] = useState(null);
    const [studentProfile, setStudentProfile] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);

    // Real Class State
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const [isLoadingClasses, setIsLoadingClasses] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                // Fetch profile and classes simultaneously for better performance
                const [profileData, classesData] = await Promise.all([
                    studentService.getProfile(),
                    studentService.getEnrolledClasses()
                ]);

                setStudentProfile(profileData);
                setEnrolledClasses(classesData);

                // Progressive Profiling Check
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

    // Handle Real Database Unenrollment
    const handleUnenroll = async (classId) => {
        // Optimistically remove it from UI instantly
        const previousClasses = [...enrolledClasses];
        setEnrolledClasses(prev => prev.filter(c => c.id !== classId));

        try {
            // Tell the database to delete the enrollment
            await studentService.unenrollClass(classId);
            setAlert({
                type: 'success',
                title: 'Unenrolled',
                message: 'You have successfully unenrolled from the class.',
                onClose: () => setAlert(null)
            });
        } catch (error) {
            console.error("Unenroll failed", error);
            // If the database fails, revert the UI back to how it was
            setEnrolledClasses(previousClasses);
            setAlert({
                type: 'error',
                title: 'Error',
                message: 'Failed to unenroll. Please try again.',
                onClose: () => setAlert(null)
            });
        }
    };

    return (
        <StudentLayout>
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
            </div>

            {/* Classroom Grid */}
            {isLoadingClasses ? (
                <div className="text-center text-examsy-muted font-bold py-10">Loading your classes...</div>
            ) : enrolledClasses.length === 0 ? (
                <div className="text-center text-examsy-muted font-bold py-10">You are not enrolled in any classes yet.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in">
                    {enrolledClasses.map((cls) => (
                        <StudentClassCard
                            key={cls.id}
                            id={cls.id}
                            title={cls.title}
                            section={cls.section}
                            bannerColor={cls.bannerColor}
                            teacher={cls.teacher}
                            onUnenroll={handleUnenroll}
                        />
                    ))}
                </div>
            )}
        </StudentLayout>
    );
};

export default StudentDashboard;