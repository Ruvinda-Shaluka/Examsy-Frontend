import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import ReportActionCard from '../../components/admin/ReportActionCard';
import { MOCK_REPORTS } from '../../data/AdminMockData';
import { ShieldAlert, Filter, AlertTriangle, AlertOctagon, Info } from 'lucide-react';

const AdminPortalPage = () => {
    // 1. State for Data and Filter
    const [reports, setReports] = useState(MOCK_REPORTS);
    const [filterSeverity, setFilterSeverity] = useState('all'); // Options: 'all', 'low', 'medium', 'high', 'critical'

    // --- Action Handlers (Mock Implementations) ---
    const handleTerminateClass = (classId) => {
        if (window.confirm(`DANGER ZONE: Are you sure you want to TERMINATE Class ID: ${classId}?`)) {
            setReports(prev => prev.filter(r => r.classId !== classId));
        }
    };

    const handleTerminateTeacher = (teacherName) => {
        if (window.confirm(`DANGER ZONE: Are you sure you want to TERMINATE the account for ${teacherName}?`)) {
            setReports(prev => prev.filter(r => r.teacherName !== teacherName));
        }
    };

    const handleDismissReport = (reportId) => {
        setReports(prev => prev.filter(r => r.id !== reportId));
    };

    // --- 2. Filter Logic ---
    const filteredReports = filterSeverity === 'all'
        ? reports
        : reports.filter(r => r.severity === filterSeverity);

    // Filter Buttons Config
    const filters = [
        { id: 'all', label: 'All Reports', icon: Filter, color: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400' },
        { id: 'critical', label: 'Critical', icon: AlertOctagon, color: 'bg-red-500/10 text-red-600 border-red-500/20' },
        { id: 'high', label: 'High Risk', icon: AlertTriangle, color: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
        { id: 'medium', label: 'Medium', icon: Info, color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
        { id: 'low', label: 'Low Risk', icon: Info, color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    ];

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                        <ShieldAlert size={32} className="text-red-500" />
                        Reports Console
                    </h1>
                    <p className="text-examsy-muted font-bold mt-2">Review and take action on reported violations.</p>
                </div>
            </div>

            {/* --- 3. Filter Bar --- */}
            <div className="flex flex-wrap gap-3 mb-8 animate-in fade-in slide-in-from-bottom-2">
                {filters.map(f => (
                    <button
                        key={f.id}
                        onClick={() => setFilterSeverity(f.id)}
                        className={`
                            px-4 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 border transition-all duration-300
                            ${filterSeverity === f.id
                            ? `${f.color} ring-2 ring-offset-2 ring-examsy-primary ring-offset-examsy-bg border-transparent scale-105 shadow-md`
                            : 'bg-examsy-surface border-zinc-200 dark:border-zinc-800 text-examsy-muted hover:border-examsy-primary/50 hover:text-examsy-text'
                        }
                        `}
                    >
                        <f.icon size={16} />
                        {f.label}
                        {/* Count Badge */}
                        <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-md ${filterSeverity === f.id ? 'bg-white/50' : 'bg-zinc-200 dark:bg-zinc-800'}`}>
                            {f.id === 'all' ? reports.length : reports.filter(r => r.severity === f.id).length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Reports Grid */}
            <div className="space-y-6">
                {filteredReports.length > 0 ? (
                    filteredReports.map(report => (
                        <ReportActionCard
                            key={report.id}
                            report={report}
                            onTerminateClass={handleTerminateClass}
                            onTerminateTeacher={handleTerminateTeacher}
                            onDismiss={handleDismissReport}
                        />
                    ))
                ) : (
                    <div className="py-20 text-center bg-examsy-surface rounded-[2rem] border border-zinc-200 dark:border-zinc-800 border-dashed">
                        <ShieldAlert size={48} className="mx-auto text-examsy-muted mb-4 opacity-30" />
                        <h3 className="text-xl font-black text-examsy-text">No {filterSeverity !== 'all' ? filterSeverity : ''} reports found</h3>
                        <p className="text-examsy-muted font-bold mt-2">
                            {filterSeverity === 'all'
                                ? "Great job! The platform is clean."
                                : `There are no active reports with "${filterSeverity}" severity.`}
                        </p>
                        {filterSeverity !== 'all' && (
                            <button
                                onClick={() => setFilterSeverity('all')}
                                className="mt-6 px-6 py-2 bg-examsy-bg hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-xl font-bold text-sm transition-colors text-examsy-text"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminPortalPage;