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
    CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { studentService } from '../../services/studentService';

const AcademicVault = () => {
    const navigate = useNavigate();

    // State for real data and loading status
    const [vaultData, setVaultData] = useState({ upcomingExams: [], availableExams: [] });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVaultData = async () => {
            try {
                // Fetch real data from your Spring Boot backend
                const response = await studentService.getVaultExams();

                // Add a safety check in case the backend returns null for these arrays
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

        fetchVaultData();
    }, []);

    // Helper function to format Spring Boot ISO dates (e.g., "2026-03-15T10:00:00")
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
            {/* Header (Responsive padding and text sizing) */}
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
                    // EMPTY STATE UI
                    <div className="py-10 md:py-12 flex flex-col items-center justify-center bg-examsy-bg rounded-2xl md:rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center px-4">
                        <CalendarX size={48} className="text-zinc-300 dark:text-zinc-700 mb-4" />
                        <h3 className="text-base md:text-lg font-black text-examsy-text">No Scheduled Exams</h3>
                        <p className="text-xs md:text-sm font-bold text-examsy-muted mt-1">You have no real-time exams coming up.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {vaultData.upcomingExams.map(ex => (
                            <div key={ex.id || ex.examId} className="bg-examsy-bg p-6 md:p-8 rounded-2xl md:rounded-[32px] border border-zinc-200 dark:border-zinc-800 space-y-5 md:space-y-6 shadow-sm hover:border-blue-500/50 transition-all flex flex-col">
                                <div className="flex justify-between items-start">
                                    <div className="px-3 md:px-4 py-1 md:py-1.5 bg-blue-500/10 text-blue-500 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                                        Real-Time
                                    </div>
                                    <BookOpen size={18} className="text-examsy-muted md:w-5 md:h-5"/>
                                </div>
                                <h3 className="text-lg md:text-xl font-black text-examsy-text line-clamp-2 flex-1">{ex.title}</h3>
                                <div className="flex flex-col gap-2 text-examsy-muted text-[10px] md:text-xs font-black tracking-widest">
                                    <span className="flex items-center gap-2"><Clock size={14} className="text-blue-500" /> {formatDateTime(ex.scheduledStartTime)}</span>
                                    <span className="flex items-center gap-2"><FileText size={14}/> {ex.durationMinutes} Minutes</span>
                                </div>
                                {/* 🟢 ROUTING FIX APPLIED HERE */}
                                <button
                                    onClick={() => navigate(`/student/exam/${ex.id || ex.examId}`)}
                                    className="w-full py-3.5 md:py-4 bg-examsy-surface hover:bg-blue-600 hover:text-white text-examsy-text rounded-xl md:rounded-2xl text-sm md:text-base font-black transition-all border border-zinc-200 dark:border-zinc-800 shadow-sm"
                                >
                                    Enter Assessment
                                </button>
                            </div>
                        ))}
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
                    // EMPTY STATE UI
                    <div className="py-10 md:py-12 flex flex-col items-center justify-center bg-examsy-bg rounded-2xl md:rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center px-4">
                        <CheckCircle2 size={48} className="text-emerald-500/40 mb-4" />
                        <h3 className="text-base md:text-lg font-black text-examsy-text">All Caught Up!</h3>
                        <p className="text-xs md:text-sm font-bold text-examsy-muted mt-1">You have no pending deadline-based assessments.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {vaultData.availableExams.map(ex => (
                            <div key={ex.id || ex.examId} className="bg-examsy-bg p-6 md:p-8 rounded-2xl md:rounded-[32px] border border-zinc-200 dark:border-zinc-800 space-y-5 md:space-y-6 shadow-sm hover:border-emerald-500/50 transition-all flex flex-col">
                                <div className="flex justify-between items-start">
                                    <div className="px-3 md:px-4 py-1 md:py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                                        Deadline Mode
                                    </div>
                                    <BookOpen size={18} className="text-examsy-muted md:w-5 md:h-5"/>
                                </div>
                                <h3 className="text-lg md:text-xl font-black text-examsy-text line-clamp-2 flex-1">{ex.title}</h3>
                                <div className="flex flex-col gap-2 text-examsy-muted text-[10px] md:text-xs font-black uppercase tracking-widest">
                                    <span className="flex items-center gap-2"><Clock size={14} className="text-emerald-500"/> Due: {formatDateTime(ex.deadlineTime)}</span>
                                    <span className="flex items-center gap-2"><FileText size={14}/> {ex.durationMinutes} Min Limit</span>
                                </div>
                                {/* 🟢 ROUTING FIX APPLIED HERE */}
                                <button
                                    onClick={() => navigate(`/student/exam/${ex.id || ex.examId}`)}
                                    className="w-full py-3.5 md:py-4 bg-examsy-surface hover:bg-emerald-600 hover:text-white text-examsy-text rounded-xl md:rounded-2xl text-sm md:text-base font-black transition-all border border-zinc-200 dark:border-zinc-800 shadow-sm"
                                >
                                    Start Now
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AcademicVault;