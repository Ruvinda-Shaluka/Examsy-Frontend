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

// 2. FIXED: For TeacherCalendar and CalendarGrid
export const MOCK_EXAMS = [
    { date: '02/02/2026',title: 'Physics Mid-Term', time: '10:00 AM' },
    { date: '02/02/2026', title: 'SQL Quiz', time: '02:00 PM' },
    { date: '02/02/2026', title: 'Lab Assessment', time: '09:00 AM' }
];

// 3. For TeacherDashboard (Home)
export const MOCK_CLASSES = [
    { id: 1, title: 'Applied Physics', section: 'Grade 11 - B', bannerColor: 'bg-indigo-600' },
    { id: 2, title: 'Database Systems', section: 'CS Dept - Year 2', bannerColor: 'bg-purple-600' },
    { id: 3, title: 'React Masterclass', section: 'Section A', bannerColor: 'bg-emerald-600' },
    { id: 4, title: 'Python Masterclass', section: 'Section 4', bannerColor: 'bg-emerald-600' },
];

// 4. For TeacherOngoing
export const MOCK_ONGOING_EXAMS = {
    realTime: [
        { id: 'rt1', title: 'Mid-Term Physics', class: 'Grade 11 - B', activeStudents: 28, totalStudents: 30, submissions: 12, date: '2026-02-19' },
        { id: 'rt2', title: 'React Quiz', class: 'Advanced Web Dev', activeStudents: 15, totalStudents: 18, submissions: 5, date: '2026-02-26' },
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

// 6. New: Detailed Class Information for Stream and People List
export const MOCK_CLASS_DETAILS = {
    "1": { // Use strings for keys to match URL params easily
        code: "phys-11b-2026",
        announcements: [
            { id: 'a1', author: 'Dr. Jane Smith', date: 'Oct 24', content: 'Welcome to the Physics Mid-Term prep stream.', comments: 2 },
        ],
        students: [
            { id: 's1', name: 'Alex Rivera', email: 'alex@examsy.edu', initial: 'A' },
        ]
    },
    "2": {
        code: "db-cs-2026",
        announcements: [{id: 'a2', author: 'Dr. Jane Smith', date: 'Oct 20', content: 'Database Systems class will cover SQL basics this week.', comments: 5 }],
        students: [
            {id: 's2', name: 'Maria Garcia', email: 'maria@examsy.edu', initial: 'M'}
        ]
    },
    "3": {
        code: "rt-cs-2026",
        announcements: [{id: 'a3', author: 'Dr. Jane Smith', date: 'Oct 27', content: 'React classes will cover hooks in react.', comments: 5 }],
        students: [
            {id: 's2', name: 'P.P Yasas', email: 'yasas@examsy.edu', initial: 'P.P'}
        ]
    }
};

export const MOCK_EXAMS_RESULTS = [
    { id: 'ex1', title: 'Physics Mid-Term', date: '2026-01-15' },
    { id: 'ex2', title: 'Optics Quiz', date: '2026-02-01' }
];

export const MOCK_GRADE_ANALYTICS = {
    'ex1': {
        average: 72.5,
        topScorer: "Alex Rivera",
        topScore: 98,
        totalStudents: 45,
        distribution: {
            'A (85+)': 12,
            'B (70-84)': 18,
            'C (55-69)': 8,
            'D (40-54)': 4,
            'F (<40)': 3
        },
        studentList: [
            { id: 's1', name: "Alex Rivera", score: 98, status: "Pass", grade: "A" },
            { id: 's2', name: "Sarah Chen", score: 84, status: "Pass", grade: "B" },
            { id: 's3', name: "Jordan Smith", score: 62, status: "Pass", grade: "C" },
            { id: 's4', name: "Emily Davis", score: 35, status: "Fail", grade: "F" },
        ]
    }
};