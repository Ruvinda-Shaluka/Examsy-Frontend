import StudentLayout from "../../layouts/StudentLayout.jsx";
import StudentClassCard from '../../components/student/StudentClassCard.jsx';
import {STUDENT_DATA} from "../../data/StudentMockData.js";

const StudentDashboard = () => {

    // Example Parent Component (StudentDashboard.jsx)
    const handleUnenroll = (classId) => {
        // Logic to remove class from state/backend
        setEnrolledClasses(prev => prev.filter(c => c.id !== classId));
        // Optional: Show a toast notification
    };

    return (
        <StudentLayout>
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 animate-fade-in">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-examsy-text">My Classrooms</h2>
                    <p className="text-examsy-muted font-bold">Access your enrolled modules and assignments.</p>
                </div>
            </div>

            {/* Classroom Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in">
                {STUDENT_DATA.enrolledClasses.map((cls) => (
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