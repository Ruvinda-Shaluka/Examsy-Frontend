import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import StudentLayout from "../../layouts/StudentLayout.jsx";
import StudentClassCard from '../../components/student/StudentClassCard.jsx';
// Assuming MOCK_CLASSES contains the student's joined classes
import { MOCK_CLASSES } from '../../data/TeacherMockData';

const StudentDashboard = () => {
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

    return (
        <StudentLayout>
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 animate-fade-in">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-examsy-text">My Classrooms</h2>
                    <p className="text-examsy-muted font-bold">Access your enrolled modules and assignments.</p>
                </div>

                {/* Join Class Action */}
                <button
                    onClick={() => setIsJoinModalOpen(true)}
                    className="w-full sm:w-auto bg-examsy-primary text-white px-6 py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-all"
                >
                    <Plus size={20} /> Join Class
                </button>
            </div>

            {/* Classroom Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in">
                {MOCK_CLASSES.map((cls) => (
                    <StudentClassCard
                        key={cls.id}
                        id={cls.id}
                        title={cls.name} // Adjust mapping if your data keys differ
                        section={cls.grade}
                        bannerColor={cls.bannerColor}
                    />
                ))}

                {/* "Join New Class" Visual Placeholder */}
                <button
                    onClick={() => setIsJoinModalOpen(true)}
                    className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[32px] flex flex-col items-center justify-center p-10 group hover:border-examsy-primary transition-all min-h-[250px]"
                >
                    <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-examsy-primary mb-3 transition-colors">
                        <Plus size={24} />
                    </div>
                    <span className="font-bold text-zinc-400 group-hover:text-examsy-primary transition-colors">
                        Join a New Class
                    </span>
                </button>
            </div>
        </StudentLayout>
    );
};

export default StudentDashboard;