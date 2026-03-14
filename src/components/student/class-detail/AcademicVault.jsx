import React, { useState, useEffect } from 'react';
import {
    BookOpen,
    Clock,
    FileText,
    ClockFading,
    ClipboardClock,
    GraduationCap,
    Loader2,
    CalendarX,
    CheckCircle2,
    Lock,
    XCircle
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { studentService } from '../../../services/studentService.js';

const AcademicVault = () => {
    const navigate = useNavigate();
    const { classId } = useParams();

    const [vaultData, setVaultData] = useState({ upcomingExams: [], availableExams: [] });
    const [isLoading, setIsLoading] = useState(true);

    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchVaultData = async () => {
            try {
                // 🟢 PASS classId to the service
                const response = await studentService.getVaultExams(classId);
                setVaultData({
                    upcomingExams: response?.upcomingExams || [],
                    availableExams: response?.availableExams || []
                });
            } catch (error) {
                console.error("Failed to load academic vault:", error);
            } finally {
                setIsLoading(false);
            }
        };

        // 🟢 ONLY fetch if classId exists
        if (classId) {
            fetchVaultData();
        }
    }, [classId]);

    const formatDateTime = (isoString) => {
        if (!isoString) return 'TBA';
        const date = new Date(isoString);
        return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-examsy-primary animate-in fade-in">
                <Loader2 className="animate-spin mb-4" size={48} />
                <p className="font-black tracking-widest uppercase text-sm">Decrypting Vault...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 md:space-y-8 animate-fade-in pb-10 px-4 md:px-0">
            <header className="items-center flex flex-col gap-2 text-center bg-examsy-surface p-6 md:p-8 rounded-3xl md:rounded-[40px] border border-zinc-200 dark:border-zinc-800 space-y-4 md:space-y-6 shadow-sm">
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-examsy-text flex flex-row items-center gap-3 md:gap-4">
                    <GraduationCap className="text-examsy-primary w-8 h-8 md:w-10 md:h-10" />
                    Academic Vault
                </h1>
                <p className="text-sm md:text-base text-examsy-muted font-bold">All your assigned assessments and resources in one secure place.</p>
            </header>

            {/* UPCOMING EXAMS SECTION (Real-Time Mode) */}
            <div className="bg-examsy-surface p-6 md:p-8 rounded-3xl md:rounded-[40px] border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-sm transition-all">
                <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-examsy-text flex flex-row items-center gap-3 md:gap-4">
                    <ClockFading className="text-blue-500 w-6 h-6 md:w-8 md:h-8" />
                    Scheduled Exams
                </h1>

                {vaultData.upcomingExams.length === 0 ? (
                    <div className="py-10 md:py-12 flex flex-col items-center justify-center bg-examsy-bg rounded-2xl md:rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center px-4">
                        <CalendarX size={48} className="text-zinc-300 dark:text-zinc-700 mb-4" />
                        <h3 className="text-base md:text-lg font-black text-examsy-text">No Scheduled Exams</h3>
                        <p className="text-xs md:text-sm font-bold text-examsy-muted mt-1">You have no real-time exams coming up.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {vaultData.upcomingExams.map(ex => {
                            const isCompleted = ex.studentStatus === 'SUBMITTED';

                            // 🟢 TIME LOGIC CALCULATIONS
                            const startTime = new Date(ex.scheduledStartTime);
                            const endTime = new Date(startTime.getTime() + ex.durationMinutes * 60000);

                            const isBeforeStart = now < startTime;
                            const isAfterEnd = now > endTime;
                            const isActive = now >= startTime && now <= endTime;

                            // 🟢 DYNAMIC BUTTON STYLING
                            let buttonText = 'Enter Assessment';
                            let buttonDisabled = false;
                            let buttonClass = 'bg-examsy-surface hover:bg-blue-600 hover:text-white text-examsy-text border border-zinc-200 dark:border-zinc-800';

                            if (isCompleted) {
                                buttonText = 'Submitted';
                                buttonDisabled = true;
                                buttonClass = 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-not-allowed';
                            } else if (isBeforeStart) {
                                buttonText = 'Locked (Not Started)';
                                buttonDisabled = true;
                                buttonClass = 'bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400 border border-zinc-200 dark:border-zinc-800 cursor-not-allowed';
                            } else if (isAfterEnd) {
                                buttonText = 'Missed Exam';
                                buttonDisabled = true;
                                buttonClass = 'bg-red-500/10 text-red-500 border border-red-500/20 cursor-not-allowed';
                            }

                            return (
                                <div key={ex.id || ex.examId} className={`p-6 md:p-8 rounded-2xl md:rounded-[32px] border border-zinc-200 dark:border-zinc-800 space-y-5 md:space-y-6 shadow-sm transition-all flex flex-col bg-examsy-bg ${isActive && !isCompleted ? 'hover:border-blue-500/50 shadow-blue-500/10' : ''}`}>
                                    <div className="flex justify-between items-start">
                                        <div className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border ${isCompleted ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : isAfterEnd ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                                            {isCompleted ? 'Completed' : isAfterEnd ? 'Missed' : 'Real-Time'}
                                        </div>
                                        {isCompleted ? <CheckCircle2 size={18} className="text-emerald-500 md:w-5 md:h-5"/>
                                            : isAfterEnd ? <XCircle size={18} className="text-red-500 md:w-5 md:h-5"/>
                                                : isBeforeStart ? <Lock size={18} className="text-zinc-400 md:w-5 md:h-5"/>
                                                    : <BookOpen size={18} className="text-blue-500 animate-pulse md:w-5 md:h-5"/>}
                                    </div>
                                    <h3 className={`text-lg md:text-xl font-black line-clamp-2 flex-1 ${(isCompleted || isAfterEnd) ? 'text-examsy-muted line-through decoration-examsy-muted/50' : 'text-examsy-text'}`}>{ex.title}</h3>
                                    <div className="flex flex-col gap-2 text-examsy-muted text-[10px] md:text-xs font-black tracking-widest">
                                        <span className="flex items-center gap-2"><Clock size={14} className={isActive ? 'text-blue-500' : 'text-examsy-muted'} /> {formatDateTime(ex.scheduledStartTime)}</span>
                                        <span className="flex items-center gap-2"><FileText size={14}/> {ex.durationMinutes} Minutes</span>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/student/exam/${ex.id || ex.examId}`)}
                                        disabled={buttonDisabled}
                                        className={`w-full py-3.5 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-base font-black transition-all shadow-sm flex items-center justify-center gap-2 ${buttonClass}`}
                                    >
                                        {isBeforeStart && <Lock size={16} />}
                                        {buttonText}
                                    </button>
                                </div>
                            )})}
                    </div>
                )}
            </div>

            {/* AVAILABLE DEADLINES SECTION (Deadline Mode) */}
            <div className="bg-examsy-surface p-6 md:p-8 rounded-3xl md:rounded-[40px] border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-sm transition-all">
                <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-examsy-text flex flex-row items-center gap-3 md:gap-4">
                    <ClipboardClock className="text-emerald-500 w-6 h-6 md:w-8 md:h-8" />
                    Flexible Deadlines
                </h1>

                {vaultData.availableExams.length === 0 ? (
                    <div className="py-10 md:py-12 flex flex-col items-center justify-center bg-examsy-bg rounded-2xl md:rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center px-4">
                        <CheckCircle2 size={48} className="text-emerald-500/40 mb-4" />
                        <h3 className="text-base md:text-lg font-black text-examsy-text">All Caught Up!</h3>
                        <p className="text-xs md:text-sm font-bold text-examsy-muted mt-1">You have no pending deadline-based assessments.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {vaultData.availableExams.map(ex => {
                            const isCompleted = ex.studentStatus === 'SUBMITTED';

                            const deadline = new Date(ex.deadlineTime);
                            const isPastDeadline = now > deadline;

                            let buttonText = 'Start Now';
                            let buttonDisabled = false;
                            let buttonClass = 'bg-examsy-surface hover:bg-emerald-600 hover:text-white text-examsy-text border border-zinc-200 dark:border-zinc-800';

                            if (isCompleted) {
                                buttonText = 'Submitted';
                                buttonDisabled = true;
                                buttonClass = 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-not-allowed';
                            } else if (isPastDeadline) {
                                buttonText = 'Missed Deadline';
                                buttonDisabled = true;
                                buttonClass = 'bg-red-500/10 text-red-500 border border-red-500/20 cursor-not-allowed';
                            }

                            return (
                                <div key={ex.id || ex.examId} className={`p-6 md:p-8 rounded-2xl md:rounded-[32px] border border-zinc-200 dark:border-zinc-800 space-y-5 md:space-y-6 shadow-sm transition-all flex flex-col bg-examsy-bg ${!isCompleted && !isPastDeadline ? 'hover:border-emerald-500/50 shadow-emerald-500/10' : ''}`}>
                                    <div className="flex justify-between items-start">
                                        <div className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border ${isCompleted ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : isPastDeadline ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                                            {isCompleted ? 'Completed' : isPastDeadline ? 'Missed' : 'Deadline Mode'}
                                        </div>
                                        {isCompleted ? <CheckCircle2 size={18} className="text-emerald-500 md:w-5 md:h-5"/>
                                            : isPastDeadline ? <XCircle size={18} className="text-red-500 md:w-5 md:h-5"/>
                                                : <BookOpen size={18} className="text-examsy-muted md:w-5 md:h-5"/>}
                                    </div>
                                    <h3 className={`text-lg md:text-xl font-black line-clamp-2 flex-1 ${(isCompleted || isPastDeadline) ? 'text-examsy-muted line-through decoration-examsy-muted/50' : 'text-examsy-text'}`}>{ex.title}</h3>
                                    <div className="flex flex-col gap-2 text-examsy-muted text-[10px] md:text-xs font-black uppercase tracking-widest">
                                        <span className="flex items-center gap-2"><Clock size={14} className={(isCompleted || isPastDeadline) ? 'text-examsy-muted' : 'text-emerald-500'}/> Due: {formatDateTime(ex.deadlineTime)}</span>
                                        <span className="flex items-center gap-2"><FileText size={14}/> {ex.durationMinutes} Min Limit</span>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/student/exam/${ex.id || ex.examId}`)}
                                        disabled={buttonDisabled}
                                        className={`w-full py-3.5 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-base font-black transition-all shadow-sm ${buttonClass}`}
                                    >
                                        {buttonText}
                                    </button>
                                </div>
                            )})}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AcademicVault;