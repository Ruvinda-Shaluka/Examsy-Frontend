import React, { useState, useEffect } from 'react';
import TeacherLayout from '../../../layouts/TeacherLayout.jsx';
import TeacherOngoingExamCard from '../../../components/teacher/ongoing-exams/TeacherOngoingExamCard.jsx';
import { Activity, Clock, ChevronDown, Filter, Loader2 } from 'lucide-react';
import { teacherService } from '../../../services/teacherService'; // 🟢 Import the service

const TeacherOngoing = () => {
    const [viewType, setViewType] = useState('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // 🟢 New Real Data States
    const [ongoingExams, setOngoingExams] = useState({ realTime: [], deadline: [] });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const data = await teacherService.getOngoingExams();
                setOngoingExams(data);
            } catch (error) {
                console.error("Failed to load ongoing exams", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchExams();
    }, []);

    const filterOptions = [
        { id: 'all', label: 'All Ongoing Exams', icon: Filter },
        { id: 'real-time', label: 'Real-Time Sessions', icon: Activity },
        { id: 'deadline', label: 'Deadline Based', icon: Clock }
    ];

    const currentOption = filterOptions.find(opt => opt.id === viewType);

    if (isLoading) {
        return (
            <TeacherLayout>
                <div className="flex flex-col items-center justify-center py-32 text-examsy-primary">
                    <Loader2 className="animate-spin mb-4" size={40} />
                    <p className="font-bold tracking-widest text-sm uppercase">Loading Sessions...</p>
                </div>
            </TeacherLayout>
        );
    }

    return (
        <TeacherLayout>
            <div className="max-w-7xl mx-auto space-y-10 pb-20 animate-fade-in transition-colors duration-500">
                {/* Header Section with Dropdown Selection */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-examsy-text uppercase tracking-tight">Ongoing Exams</h1>
                        <p className="text-examsy-muted font-bold mt-1">Track active sessions and manage pending submission windows.</p>
                    </div>

                    <div className="relative w-full md:w-72">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-3.5 flex items-center justify-between text-examsy-text font-black text-sm shadow-sm transition-all hover:border-examsy-primary"
                        >
                            <div className="flex items-center gap-3">
                                <currentOption.icon size={18} className="text-examsy-primary" />
                                {currentOption.label}
                            </div>
                            <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-3 bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-[24px] overflow-hidden shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                                {filterOptions.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => {
                                            setViewType(opt.id);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full px-6 py-4 flex items-center gap-4 text-sm font-bold transition-colors ${
                                            viewType === opt.id
                                                ? 'bg-examsy-primary/10 text-examsy-primary'
                                                : 'text-examsy-muted hover:bg-examsy-bg hover:text-examsy-text'
                                        }`}
                                    >
                                        <opt.icon size={18} />
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Logic */}
                <div className="space-y-12">
                    {/* Section 1: Real-Time Sessions */}
                    {(viewType === 'all' || viewType === 'real-time') && (
                        <section className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-3 ml-2">
                                <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
                                    <Activity size={20} />
                                </div>
                                <h2 className="text-xl font-black text-examsy-text uppercase tracking-widest">Real-Time Sessions</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {ongoingExams.realTime.map(exam => (
                                    <TeacherOngoingExamCard key={exam.id} exam={exam} type="real-time" />
                                ))}
                            </div>
                            {ongoingExams.realTime.length === 0 && (
                                <p className="text-center py-10 text-examsy-muted font-bold italic">No live exams at this moment.</p>
                            )}
                        </section>
                    )}

                    {/* Section 2: Deadline Based Sessions */}
                    {(viewType === 'all' || viewType === 'deadline') && (
                        <section className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
                            <div className="flex items-center gap-3 ml-2">
                                <div className="p-2 bg-examsy-primary/10 text-examsy-primary rounded-lg">
                                    <Clock size={20} />
                                </div>
                                <h2 className="text-xl font-black text-examsy-text uppercase tracking-widest">Deadline Based</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {ongoingExams.deadline.map(exam => (
                                    <TeacherOngoingExamCard key={exam.id} exam={exam} type="deadline" />
                                ))}
                            </div>
                            {ongoingExams.deadline.length === 0 && (
                                <p className="text-center py-10 text-examsy-muted font-bold italic">No pending deadlines at this moment.</p>
                            )}
                        </section>
                    )}
                </div>
            </div>
        </TeacherLayout>
    );
};

export default TeacherOngoing;