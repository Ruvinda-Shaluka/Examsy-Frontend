export const STUDENT_DATA = {
    name: "Alex Rivera",
    id: "STU-99281",
    major: "Computer Science",
    avatar: "A",
    stats: { gpa: "3.8", examsTaken: 24, upcoming: 3 },
    upcomingExams: [
        { id: 'e1', title: 'Data Structures', class: 'CS201', date: 'Today', time: '2:00 PM', duration: '90', type: 'mcq', questions: 20 },
        { id: 'e2', title: 'Calculus II', class: 'MATH102', date: 'Tomorrow', time: '10:00 AM', duration: '120', type: 'short-answer', questions: 5 }
    ],
    availableExams: [
        {
            id: 'ex1',
            title: 'Intro to AI',
            type: 'mcq',
            questions: 20,
            timeLimit: 60,
            questionsData: [
                { id: 1, text: "Which data structure uses LIFO principle?", options: ["Queue", "Stack", "Linked List", "Binary Tree"] },
                // ... add more questions here
            ]
        },
        {
            id: 'ex2',
            title: 'Network Security',
            type: 'short-answer',
            questions: 5,
            timeLimit: 45,
            questionsData: [
                { id: 1, text: "Explain the difference between Symmetric and Asymmetric encryption." },
                { id: 2, text: "What is a Man-in-the-Middle (MitM) attack?" }
            ]
        },
        {
            id: 'ex3',
            title: 'Advanced Physics',
            type: 'pdf-submission',
            questions: 1,
            timeLimit: 180,
            pdfUrl: "/exams/physics-paper.pdf"
        },
    ],
    enrolledClasses: [
        { id: "1", title: "Applied Physics", section: "Grade 11 - B", bannerColor: "bg-indigo-600", teacher: "Dr. Jane Smith" },
        { id: "2", title: "Computer Science", section: "Year 3", bannerColor: "bg-purple-600", teacher: "Prof. Alan Turing" }
    ],
    examHistory: [
        { exam: 'Quiz 1', score: 65, date: '2025-09-10' },
        { exam: 'Mid-term', score: 72, date: '2025-10-05' }
    ]
};