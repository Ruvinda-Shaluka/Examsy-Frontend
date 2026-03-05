import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import ReportActionCard from '../../components/admin/ReportActionCard';
import ReplyStudentModal from '../../components/admin/ReplyStudentModal'; // Make sure this path is correct!
import { ShieldAlert, Filter, AlertTriangle, AlertOctagon, Info } from 'lucide-react';
import { adminService } from '../../services/adminService';
import CustomAlert from '../../components/common/CustomAlert';

const AdminPortalPage = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterSeverity, setFilterSeverity] = useState('all');
    const [alert, setAlert] = useState(null);

    // State for the Reply Modal
    const [replyModalConfig, setReplyModalConfig] = useState({
        isOpen: false,
        reportId: null,
        studentName: ''
    });

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            const data = await adminService.getReports();
            setReports(data);
        } catch (error) {
            console.error("Failed to load reports", error);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Action Handlers ---

    const handleWarnTeacher = async (reportId, teacherName) => {
        if (window.confirm(`Are you sure you want to send an official warning to ${teacherName}?`)) {
            try {
                await adminService.warnTeacher(reportId);
                // A warning resolves the report, so remove it from the active list
                setReports(prev => prev.filter(r => r.id !== reportId));
                setAlert({ type: 'success', title: 'Warning Sent', message: `An official warning email was sent to ${teacherName}.`, onClose: () => setAlert(null) });
            } catch (err) {
                setAlert({ type: 'error', title: 'Error', message: 'Failed to send warning.', onClose: () => setAlert(null) });
            }
        }
    };

    // Opens the sleek Modal instead of a window.prompt
    const openReplyModal = (reportId, studentName) => {
        setReplyModalConfig({
            isOpen: true,
            reportId: reportId,
            studentName: studentName
        });
    };

    // Actually submits the data when the Modal's "Send Reply" button is clicked
    const executeReplyStudent = async (message) => {
        try {
            await adminService.replyToStudent(replyModalConfig.reportId, message);
            setAlert({
                type: 'success',
                title: 'Reply Sent',
                message: `Your message was sent to ${replyModalConfig.studentName}.`,
                onClose: () => setAlert(null)
            });
        } catch (err) {
            setAlert({ type: 'error', title: 'Error', message: 'Failed to send reply.', onClose: () => setAlert(null) });
        }
    };

    const handleTerminateClass = async (reportId, className) => {
        if (window.confirm(`DANGER ZONE: Are you sure you want to TERMINATE the class "${className}"? This will email the teacher and notify the student.`)) {
            try {
                await adminService.terminateClass(reportId);
                setReports(prev => prev.filter(r => r.id !== reportId));
                setAlert({ type: 'success', title: 'Class Terminated', message: 'The class was deleted and notifications were sent.', onClose: () => setAlert(null) });
            } catch (err) {
                setAlert({ type: 'error', title: 'Error', message: 'Failed to terminate class.', onClose: () => setAlert(null) });
            }
        }
    };

    const handleTerminateTeacher = async (reportId, teacherName) => {
        if (window.confirm(`DANGER ZONE: Are you sure you want to TERMINATE the account for ${teacherName}? This action is irreversible.`)) {
            try {
                await adminService.terminateTeacher(reportId);
                setReports(prev => prev.filter(r => r.teacherName !== teacherName));
                setAlert({ type: 'success', title: 'Teacher Terminated', message: 'The account was deleted and an email was sent.', onClose: () => setAlert(null) });
            } catch (err) {
                setAlert({ type: 'error', title: 'Error', message: 'Failed to terminate teacher.', onClose: () => setAlert(null) });
            }
        }
    };

    const handleDismissReport = async (reportId) => {
        try {
            await adminService.dismissReport(reportId);
            setReports(prev => prev.filter(r => r.id !== reportId));
        } catch (err) {
            setAlert({ type: 'error', title: 'Error', message: 'Failed to dismiss report.', onClose: () => setAlert(null) });
        }
    };

    // --- Filter Logic ---

    const filteredReports = filterSeverity === 'all'
        ? reports
        : reports.filter(r => r.priorityLevel === filterSeverity.toUpperCase());

    const filters = [
        { id: 'all', label: 'All Reports', icon: Filter, color: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400' },
        { id: 'critical', label: 'Critical', icon: AlertOctagon, color: 'bg-red-500/10 text-red-600 border-red-500/20' },
        { id: 'high', label: 'High Risk', icon: AlertTriangle, color: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
        { id: 'medium', label: 'Medium', icon: Info, color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
        { id: 'low', label: 'Low Risk', icon: Info, color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    ];

    if (isLoading) return <AdminLayout><div className="p-10 text-center font-bold">Loading reports...</div></AdminLayout>;

    return (
        <AdminLayout>
            {/* Mount the Reply Modal */}
            <ReplyStudentModal
                isOpen={replyModalConfig.isOpen}
                studentName={replyModalConfig.studentName}
                onClose={() => setReplyModalConfig({ ...replyModalConfig, isOpen: false })}
                onSubmit={executeReplyStudent}
            />

            {alert && <CustomAlert type={alert.type} title={alert.title} message={alert.message} onClose={alert.onClose} />}

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                        <ShieldAlert size={32} className="text-red-500" />
                        Reports Console
                    </h1>
                    <p className="text-examsy-muted font-bold mt-2">Review and take action on reported violations.</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8 animate-in fade-in slide-in-from-bottom-2">
                {filters.map(f => (
                    <button
                        key={f.id}
                        onClick={() => setFilterSeverity(f.id)}
                        className={`px-4 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 border transition-all duration-300
                            ${filterSeverity === f.id
                            ? `${f.color} ring-2 ring-offset-2 ring-examsy-primary ring-offset-examsy-bg border-transparent scale-105 shadow-md`
                            : 'bg-examsy-surface border-zinc-200 dark:border-zinc-800 text-examsy-muted hover:border-examsy-primary/50 hover:text-examsy-text'
                        }`}
                    >
                        <f.icon size={16} />
                        {f.label}
                        <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-md ${filterSeverity === f.id ? 'bg-white/50' : 'bg-zinc-200 dark:bg-zinc-800'}`}>
                            {f.id === 'all' ? reports.length : reports.filter(r => r.priorityLevel === f.id.toUpperCase()).length}
                        </span>
                    </button>
                ))}
            </div>

            <div className="space-y-6">
                {filteredReports.length > 0 ? (
                    filteredReports.map(report => (
                        <ReportActionCard
                            key={report.id}
                            report={report}
                            onWarnTeacher={() => handleWarnTeacher(report.id, report.teacherName)}
                            onReplyStudent={() => openReplyModal(report.id, report.reporterName)}
                            onTerminateClass={() => handleTerminateClass(report.id, report.className)}
                            onTerminateTeacher={() => handleTerminateTeacher(report.id, report.teacherName)}
                            onDismiss={() => handleDismissReport(report.id)}
                        />
                    ))
                ) : (
                    <div className="py-20 text-center bg-examsy-surface rounded-[2rem] border border-zinc-200 dark:border-zinc-800 border-dashed">
                        <ShieldAlert size={48} className="mx-auto text-examsy-muted mb-4 opacity-30" />
                        <h3 className="text-xl font-black text-examsy-text">No reports found</h3>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminPortalPage;