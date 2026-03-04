import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from "../../layouts/StudentLayout.jsx";
import StudentClassCard from '../../components/student/StudentClassCard.jsx';
import CustomAlert from '../../components/common/CustomAlert.jsx';
import { studentService } from '../../services/studentService.js';
import { STUDENT_DATA } from "../../data/StudentMockData.js"; // Keeping mock classes for now

const StudentDashboard = () => {
    const navigate = useNavigate();

    // 1. Alert & Profile State
    const [alert, setAlert] = useState(null);
    const [studentProfile, setStudentProfile] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);

    // 2. Class State (This fixes your handleUnenroll function!)
    const [enrolledClasses, setEnrolledClasses] = useState(STUDENT_DATA.enrolledClasses);

    // 3. The Progressive Profiling Hook
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Grab the real data from Spring Boot
                const data = await studentService.getProfile();
                setStudentProfile(data);

                // Check if they need to complete their profile
                if (!data.major || !data.academicBio) {
                    setAlert({
                        type: 'info',
                        title: 'Incomplete Profile',
                        message: 'Welcome! Please complete your academic profile in Settings to unlock all features.',
                        onClose: () => {
                            setAlert(null);
                            // Teleport them to settings when they close the alert
                            navigate('/student/settings');
                        }
                    });
                }
            } catch (error) {
                console.error("Failed to fetch student profile", error);
            } finally {
                setIsLoadingProfile(false);
            }
        };

        fetchProfile();
    }, [navigate]); // Empty dependency array ensures this runs only once on mount

    const handleUnenroll = (classId) => {
        // Logic to remove class from state
        setEnrolledClasses(prev => prev.filter(c => c.id !== classId));
    };

    return (
        <StudentLayout>

            {/* Render the Alert securely at the top of the layout */}
            {alert && (
                <CustomAlert
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                    onClose={alert.onClose}
                />
            )}

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 animate-fade-in">
                <div>
                    {/* Dynamically greet the student by their first name once loaded! */}
                    <h2 className="text-2xl md:text-3xl font-black text-examsy-text">
                        {isLoadingProfile ? 'My Classrooms' : `Welcome back, ${studentProfile?.fullName?.split(' ')[0] || 'Student'}! 👋`}
                    </h2>
                    <p className="text-examsy-muted font-bold">Access your enrolled modules and assignments.</p>
                </div>
            </div>

            {/* Classroom Grid */}
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
        </StudentLayout>
    );
};

export default StudentDashboard;