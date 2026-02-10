import React from 'react';
import { Clock, ShieldCheck, Target } from 'lucide-react';
import { STUDENT_DATA } from '../../data/StudentMockData';
import MetricCard from '../../components/student/MetricCard';
import ActiveExamCard from '../../components/student/ActiveExamCard';

const StudentDashboard = ({ onStartExam }) => {
    return (
        <div className="space-y-10 animate-fade-in p-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-examsy-text">
                        Welcome back, <span className="text-examsy-primary">{STUDENT_DATA.name.split(' ')[0]}</span>
                    </h1>
                    <p className="text-examsy-muted font-bold mt-2">
                        You have {STUDENT_DATA.stats.upcoming} exams scheduled for this week.
                    </p>
                </div>
                <MetricCard
                    icon={<Target size={20}/>}
                    value={STUDENT_DATA.stats.gpa}
                    label="Current GPA"
                />
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3 text-examsy-primary">
                        <Clock size={20} /> Active & Upcoming
                    </h2>
                    <div className="grid gap-4">
                        {STUDENT_DATA.upcomingExams.map(exam => (
                            <ActiveExamCard key={exam.id} exam={exam} onStart={() => onStartExam(exam)} />
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-black uppercase tracking-widest text-examsy-muted px-2">Integrity Status</h2>
                    <div className="bg-examsy-surface p-8 rounded-[40px] border border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center space-y-4 shadow-sm transition-all hover:shadow-xl">
                        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center animate-pulse">
                            <ShieldCheck size={40} />
                        </div>
                        <p className="font-black text-lg text-examsy-text">Account Secure</p>
                        <p className="text-sm font-bold text-examsy-muted leading-relaxed">
                            No integrity violations detected in your last 10 assessments.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;