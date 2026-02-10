export const STUDENT_DATA = {
    name: "Alex Rivera",
    id: "STU-99281",
    major: "Computer Science",
    avatar: "A",
    stats: { gpa: "3.8", examsTaken: 24, upcoming: 3 },
    upcomingExams: [
        { id: 'e1', title: 'Data Structures', class: 'CS201', date: 'Today', time: '2:00 PM', duration: '90m' },
        { id: 'e2', title: 'Calculus II', class: 'MATH102', date: 'Tomorrow', time: '10:00 AM', duration: '120m' }
    ],
    availableExams: [
        { id: 'ex1', title: 'Intro to AI', class: 'CS301', status: 'Available', questions: 30, timeLimit: 60 },
        { id: 'ex2', title: 'Network Security', class: 'CS402', status: 'Available', questions: 25, timeLimit: 45 },
    ],
    calendar: [
        { day: 14, title: 'AI Quiz', color: 'bg-examsy-primary' },
        { day: 18, title: 'NetSec Final', color: 'bg-amber-500' }
    ]
};