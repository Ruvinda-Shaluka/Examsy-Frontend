import React from 'react';
import { BookOpen, Clock, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { STUDENT_DATA } from '../../data/StudentMockData';

const AcademicVault = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-8 animate-fade-in">
            <header>
                <h1 className="text-3xl font-black uppercase tracking-tight text-examsy-text">Academic Vault</h1>
                <p className="text-examsy-muted font-bold">All your assessments and resources in one place.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {STUDENT_DATA.availableExams.map(ex => (
                    <div key={ex.id} className="bg-examsy-surface p-8 rounded-[40px] border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-sm hover:shadow-xl transition-all">
                        <div className="flex justify-between items-start">
                            <div className="px-4 py-1.5 bg-examsy-primary/10 text-examsy-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-examsy-primary/20">
                                {ex.status}
                            </div>
                            <BookOpen size={20} className="text-examsy-muted" />
                        </div>
                        <h3 className="text-xl font-black text-examsy-text">{ex.title}</h3>
                        <div className="flex items-center gap-6 text-examsy-muted text-xs font-black uppercase tracking-widest">
                            <span className="flex items-center gap-2"><Clock size={14}/> {ex.timeLimit}m</span>
                            <span className="flex items-center gap-2"><FileText size={14}/> {ex.questions} Questions</span>
                        </div>
                        <button
                            onClick={() => navigate(`/student/exam/${ex.id}`)}
                            className="w-full py-4 bg-examsy-bg hover:bg-examsy-primary hover:text-white text-examsy-text rounded-2xl font-black transition-all border border-zinc-200 dark:border-zinc-800"
                        >
                            Enter Assessment
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AcademicVault;