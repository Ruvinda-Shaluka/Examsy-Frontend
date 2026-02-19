// 1. Changed 'Spam' to 'MailWarning'
import { ShieldAlert, MailWarning, UserX, Ban } from 'lucide-react';

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