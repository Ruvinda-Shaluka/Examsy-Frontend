// src/data/TeacherMockData.js

// 1. For Sidebar, Navbar, and Settings
export const MOCK_TEACHER = {
    name: "Dr. Jane Smith",
    email: "smith@examsy.edu",
    specialization: "Quantum Physics",
    avatar: "J",
    role: "Faculty Head",
    profileImage: null,
    bio: "Dedicated faculty head with 10+ years in Physics research.",
    location: "Science Block A, Room 402"
};

// 2. FIXED: For TeacherCalendar and TeacherCalendarGrid
export const MOCK_EXAMS = [
    { day: 14, title: 'Physics Mid-Term', time: '10:00 AM' },
    { day: 22, title: 'SQL Quiz', time: '02:00 PM' },
    { day: 5, title: 'Lab Assessment', time: '09:00 AM' }
];

// 3. For TeacherDashboard (Home)
export const MOCK_CLASSES = [
    { id: 1, title: 'Applied Physics', section: 'Grade 11 - B', bannerColor: 'bg-indigo-600' },
    { id: 2, title: 'Database Systems', section: 'CS Dept - Year 2', bannerColor: 'bg-purple-600' },
    { id: 3, title: 'React Masterclass', section: 'Section A', bannerColor: 'bg-emerald-600' },
];

// 4. For TeacherOngoing
export const MOCK_ONGOING_EXAMS = {
    realTime: [
        { id: 'rt1', title: 'Mid-Term Physics', class: 'Grade 11 - B', activeStudents: 28, totalStudents: 30, submissions: 12 },
        { id: 'rt2', title: 'React Quiz', class: 'Advanced Web Dev', activeStudents: 15, totalStudents: 18, submissions: 5 }
    ],
    deadline: [
        { id: 'dl1', title: 'Database Normalization', class: 'CS Dept - Year 2', deadline: '2026-02-15', submissions: 12, totalStudents: 45 }
    ]
};

// 5. For TeacherLiveMonitor
export const MOCK_LIVE_STUDENTS = [
    { id: 's1', name: 'Alex Johnson', status: 'active', flagged: true, flags: 3, progress: 65, action: 'Answering MCQ 08' },
    { id: 's2', name: 'Maria Garcia', status: 'active', flagged: false, flags: 0, progress: 40, action: 'Typing Short Answer' },
    { id: 's3', name: 'Liam Smith', status: 'submitted', flagged: false, flags: 0, progress: 100, action: 'Finished' },
    { id: 's4', name: 'Chloe Chen', status: 'active', flagged: true, flags: 1, progress: 20, action: 'Viewing PDF' },
];