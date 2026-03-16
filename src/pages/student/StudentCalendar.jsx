import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from "../../layouts/StudentLayout.jsx";
import CalendarView from "../../components/common/Calendar.jsx";
import { studentService } from "../../services/studentService";

const StudentCalendar = () => {
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const data = await studentService.getCalendarExams();
                setExams(data);
            } catch (error) {
                console.error("Failed to load exams", error);
            }
        };
        fetchExams();
    }, []);

    // 🟢 Navigate to Student Class Detail with state to open Classwork tab
    const handleExamClick = (classId) => {
        navigate(`/student/class/${classId}`, { state: { defaultTab: 'classwork' } });
    };

    return (
        <StudentLayout>
            <CalendarView exams={exams} onExamClick={handleExamClick} />
        </StudentLayout>
    );
}

export default StudentCalendar;