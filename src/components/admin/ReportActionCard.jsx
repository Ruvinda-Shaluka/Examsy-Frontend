import React from 'react';
import { AlertTriangle, Ban, UserX, CheckCircle, ShieldAlert } from 'lucide-react';

const ReportActionCard = ({ report, onTerminateClass, onTerminateTeacher, onDismiss }) => {

    // 1. Safely handle the priority level, defaulting to 'low' if missing
    const priority = report.priorityLevel?.toLowerCase() || 'low';

    // 2. Updated severity colors to match the database values
    const severityColors = {
        critical: 'bg-red-500/10 text-red-500 border-red-500/20',
        high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
        medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        low: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    };

    // 3. Neatly format the Spring Boot LocalDateTime string
    const formattedDate = report.reportedAt
        ? new Date(report.reportedAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        })
        : 'Unknown Date';

    return (
        <div className="bg-examsy-surface rounded-[2rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
            {/* Header with Severity & Type */}
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-start bg-zinc-50/50 dark:bg-zinc-900/20">
                <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${severityColors[priority] || severityColors.low}`}>
                        <ShieldAlert size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            {/* 🟢 THE FIX: Safely replace underscores (e.g., HATE_SPEECH -> HATE SPEECH) */}
                            <h3 className="font-black text-lg uppercase tracking-tight">
                                {report.category?.replace(/_/g, ' ') || 'UNKNOWN CATEGORY'}
                            </h3>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${severityColors[priority] || severityColors.low}`}>
                                {priority} Priority
                            </span>
                        </div>
                        <p className="text-xs font-bold text-examsy-muted">Report ID: {report.id} • {formattedDate}</p>
                    </div>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Report Details */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-examsy-bg p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <p className="text-sm font-bold text-examsy-text leading-relaxed">"{report.description}"</p>
                        {/* Mapped to reporterName from DTO */}
                        <p className="text-xs font-bold text-examsy-muted mt-3 text-right">— Reported by {report.reporterName}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="bg-examsy-bg px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
                            <span className="text-xs font-black uppercase text-examsy-muted tracking-wider">Target Class:</span>
                            <span className="font-bold text-examsy-primary">{report.className}</span>
                        </div>
                        <div className="bg-examsy-bg px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
                            <span className="text-xs font-black uppercase text-examsy-muted tracking-wider">Instructor:</span>
                            <span className="font-bold text-examsy-text">{report.teacherName}</span>
                        </div>
                    </div>
                </div>

                {/* Action Console */}
                <div className="flex flex-col gap-3 justify-center p-4 bg-red-500/5 rounded-2xl border border-red-500/10">
                    <h4 className="text-xs font-black uppercase text-red-500 tracking-widest mb-2 text-center flex items-center justify-center gap-2">
                        <AlertTriangle size={14} /> Administrative Actions
                    </h4>

                    {/* Notice how clean the onClick is now since the parent passes the arguments down! */}
                    <button
                        onClick={onTerminateClass}
                        className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 active:scale-95"
                    >
                        <Ban size={18} /> Terminate Class
                    </button>

                    <button
                        onClick={onTerminateTeacher}
                        className="w-full py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-white dark:bg-zinc-700 dark:hover:bg-zinc-600 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                        <UserX size={18} /> Terminate Teacher Account
                    </button>

                    <div className="h-px bg-red-200 dark:bg-red-900/30 my-1"></div>

                    <button
                        onClick={onDismiss}
                        className="w-full py-3 px-4 bg-examsy-bg border-2 border-zinc-200 dark:border-zinc-800 text-examsy-muted hover:text-examsy-text hover:border-examsy-muted rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                        <CheckCircle size={18} /> Dismiss Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportActionCard;