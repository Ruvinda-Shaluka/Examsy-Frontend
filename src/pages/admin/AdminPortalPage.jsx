import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import ReportActionCard from '../../components/admin/ReportActionCard';
import { MOCK_REPORTS } from '../../data/AdminMockData';
import { ShieldAlert, Filter } from 'lucide-react';

const AdminPortalPage = () => {
    const [reports, setReports] = useState(MOCK_REPORTS);

    // --- Action Handlers (Mock Implementations) ---

    const handleTerminateClass = (classId) => {
        if (window.confirm(`DANGER ZONE: Are you sure you want to TERMINATE Class ID: ${classId}? This action cannot be undone.`)) {
            alert(`Class ${classId} has been terminated and removed from the platform.`);
            // In real app: API call to delete class, then update state
            setReports(prev => prev.filter(r => r.classId !== classId));
        }
    };

    const handleTerminateTeacher = (teacherName) => {
        if (window.confirm(`DANGER ZONE: Are you sure you want to TERMINATE the account for ${teacherName}? They will lose all access.`)) {
            alert(`Teacher account for ${teacherName} has been terminated.`);
            // In real app: API call to ban user
            setReports(prev => prev.filter(r => r.teacherName !== teacherName));
        }
    };

    const handleDismissReport = (reportId) => {
        // In real app: API call to update report status to 'resolved' or 'dismissed'
        setReports(prev => prev.filter(r => r.id !== reportId));
        alert(`Report ${reportId} dismissed.`);
    };


    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                        <ShieldAlert size={32} className="text-red-500" />
                        Reports Console
                    </h1>
                    <p className="text-examsy-muted font-bold mt-2">Review and take action on reported violations.</p>
                </div>

                <div className="flex gap-3">
                     <span className="px-4 py-2 bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-xl font-bold text-sm flex items-center gap-2 text-examsy-muted">
                        <Filter size={16} />
                        <span className="text-examsy-text">{reports.length}</span> Pending
                     </span>
                </div>
            </div>

            {/* Reports Grid */}
            <div className="space-y-6">
                {reports.length > 0 ? (
                    reports.map(report => (
                        <ReportActionCard
                            key={report.id}
                            report={report}
                            onTerminateClass={handleTerminateClass}
                            onTerminateTeacher={handleTerminateTeacher}
                            onDismiss={handleDismissReport}
                        />
                    ))
                ) : (
                    <div className="p-12 text-center bg-examsy-surface rounded-[2rem] border border-zinc-200 dark:border-zinc-800">
                        <ShieldAlert size={48} className="mx-auto text-examsy-muted mb-4 opacity-50" />
                        <h3 className="text-xl font-black text-examsy-text">All Clear!</h3>
                        <p className="text-examsy-muted font-bold mt-2">There are no pending reports to review at this time.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminPortalPage;