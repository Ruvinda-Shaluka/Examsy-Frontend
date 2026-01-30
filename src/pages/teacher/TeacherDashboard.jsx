import React from 'react';
import TeacherLayout from '../../layouts/TeacherLayout';
import TeacherClassCard from '../../components/teacher/TeacherClassCard';
import { Plus } from 'lucide-react';

const TeacherDashboard = () => {
    const classes = [
        { id: 1, title: 'Applied Physics', section: 'Grade 11 - B', bannerColor: 'bg-indigo-600' },
        { id: 2, title: 'Database Systems', section: 'CS Dept - Year 2', bannerColor: 'bg-purple-600' },
        { id: 3, title: 'React Masterclass', section: 'Section A', bannerColor: 'bg-emerald-600' },
    ];

    return (
        <TeacherLayout>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-black text-examsy-text">Active Classes</h2>
                    <p className="text-examsy-muted font-bold">Manage your current teaching modules.</p>
                </div>
                <button className="bg-examsy-primary text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-examsy-primary/25 hover:scale-105 transition-transform">
                    <Plus size={20} /> Create Class
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {classes.map((cls) => (
                    <TeacherClassCard key={cls.id} {...cls} />
                ))}

                {/* Empty State / Add Card */}
                <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl flex flex-col items-center justify-center p-10 group cursor-pointer hover:border-examsy-primary transition-colors">
                    <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-examsy-primary mb-3">
                        <Plus size={24} />
                    </div>
                    <span className="font-bold text-zinc-400 group-hover:text-examsy-primary">Add New Class</span>
                </div>
            </div>
        </TeacherLayout>
    );
};

export default TeacherDashboard;