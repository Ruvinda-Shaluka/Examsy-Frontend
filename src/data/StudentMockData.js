export const STUDENT_DATA = {
    name: "Alex Rivera",
    id: "STU-99281",
    major: "Computer Science",
    avatar: "A",
    stats: { gpa: "3.8", examsTaken: 24, upcoming: 3 },
    // Original Exam Data
    upcomingExams: [
        { id: 'e1', title: 'Data Structures', class: 'CS201', date: 'Today', time: '2:00 PM', duration: '90m' },
        { id: 'e2', title: 'Calculus II', class: 'MATH102', date: 'Tomorrow', time: '10:00 AM', duration: '120m' }
    ],
    availableExams: [
        { id: 'ex1', title: 'Intro to AI', class: 'CS301', status: 'Available', questions: 30, timeLimit: 60 },
        { id: 'ex2', title: 'Network Security', class: 'CS402', status: 'Available', questions: 25, timeLimit: 45 },
    ],
    // Marks history for the Progress Line Graph
    examHistory: [
        { exam: 'Quiz 1', score: 65, date: '2025-09-10' },
        { exam: 'Mid-term', score: 72, date: '2025-10-05' },
        { exam: 'Lab Final', score: 85, date: '2025-11-15' },
        { exam: 'Semester End', score: 78, date: '2025-12-20' },
        { exam: 'Physics 101', score: 92, date: '2026-01-15' },
        { exam: 'Calculus', score: 88, date: '2026-02-10' },
    ],
    calendar: [
        { day: 14, title: 'AI Quiz', color: 'bg-examsy-primary' },
        { day: 18, title: 'NetSec Final', color: 'bg-amber-500' }
    ],
    enrolledClasses: [
        { id: "1", title: "Applied Physics", section: "Grade 11 - B", bannerColor: "bg-indigo-600", teacher: "Dr. Jane Smith" },
        { id: "2", title: "Computer Science", section: "Year 3", bannerColor: "bg-purple-600", teacher: "Prof. Alan Turing" },
        { id: "3", title: "Pure Mathematics", section: "Standard Level", bannerColor: "bg-emerald-600", teacher: "Sarah Jenkins" },
    ]
};