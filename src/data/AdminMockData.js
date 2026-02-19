// 1. Changed 'Spam' to 'MailWarning'
import { ShieldAlert, MailWarning, UserX, Users, School, GraduationCap, Ban } from 'lucide-react';

export const ADMIN_PROFILE = {
    id: 'ADM-001',
    name: 'Sarah Connor',
    role: 'System Administrator',
    avatar: 'S'
};

export const MOCK_REPORTS = [
    {
        id: 'rep-101',
        type: 'harmful',
        severity: 'high',
        icon: ShieldAlert,
        classId: '1',
        className: 'Applied Physics',
        teacherName: 'Dr. Jane Smith',
        reportedBy: 'Alex Rivera',
        date: '2026-02-18',
        description: 'The teacher used offensive language during the live session lecture regarding quantum mechanics.',
        status: 'pending'
    },
    {
        id: 'rep-102',
        type: 'spam',
        severity: 'medium',
        icon: MailWarning, // ✅ Fixed: Using MailWarning instead of Spam
        classId: '2',
        className: 'Computer Science - Year 3',
        teacherName: 'Prof. Alan Turing',
        reportedBy: 'Maria Garcia',
        date: '2026-02-17',
        description: 'The class stream is being flooded with irrelevant external links and advertisements by a bot account.',
        status: 'pending'
    },
    {
        id: 'rep-103',
        type: 'personal',
        severity: 'critical',
        icon: UserX,
        classId: '1',
        className: 'Applied Physics',
        teacherName: 'Dr. Jane Smith',
        reportedBy: 'Liam Smith',
        date: '2026-02-15',
        description: 'Teacher accidentally shared a spreadsheet containing student PII (personally identifiable information) in the class materials tab.',
        status: 'investigating'
    }
];

export const ADMIN_STATS = [
    { id: 1, label: 'Total Students', value: '2,845', change: '+12%', icon: GraduationCap, color: 'bg-emerald-500' },
    { id: 2, label: 'Active Teachers', value: '142', change: '+5%', icon: School, color: 'bg-blue-500' },
    { id: 3, label: 'Pending Reports', value: '18', change: '-2%', icon: ShieldAlert, color: 'bg-red-500' },
    { id: 4, label: 'Total Users', value: '3,402', change: '+8%', icon: Users, color: 'bg-purple-500' },
];

// ✅ UPDATED: Used Hex Codes for chart bars to prevent Tailwind purging
export const REPORT_CHART_DATA = [
    { type: 'Spam', count: 45, color: '#3B82F6' }, // Blue
    { type: 'Harmful Content', count: 28, color: '#EF4444' }, // Red
    { type: 'Personal Info', count: 15, color: '#F97316' }, // Orange
    { type: 'Copyright', count: 12, color: '#EAB308' }, // Yellow
    { type: 'Other', count: 8, color: '#71717A' }, // Zinc
];