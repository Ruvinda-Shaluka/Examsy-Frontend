import React, { useState } from 'react';
import TeacherLayout from '../../layouts/TeacherLayout';
import TeacherClassCard from '../../components/teacher/class-detail/TeacherClassCard.jsx';
import TeacherCreateClassModal from '../../components/teacher/TeacherCreateClassModal';
import { Plus } from 'lucide-react';
import {MOCK_CLASSES, MOCK_EXAMS} from '../../data/TeacherMockData';

const TeacherDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <TeacherLayout>
            <TeacherCreateClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-examsy-text">Active Classes</h2>
                    <p className="text-examsy-muted font-bold">Manage your current teaching modules.</p>
                </div>
                {/* Fixed: Triggering modal */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto bg-examsy-primary text-white px-6 py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-all"
                >
                    <Plus size={20} /> Create Class
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {MOCK_CLASSES.map((cls) => (
                    // Using cls.id as a unique key for React tracking
                    <TeacherClassCard key={cls.id} {...cls} />
                ))}

                {/* Fixed: Triggering modal from Add Card */}
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