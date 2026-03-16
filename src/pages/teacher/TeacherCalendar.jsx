import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherLayout from '../../layouts/TeacherLayout';
import CalendarView from "../../components/common/Calendar.jsx";
import { teacherService } from "../../services/teacherService";

const TeacherCalendar = () => {
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const data = await teacherService.getCalendarExams();
                setExams(data);
            } catch (error) {
                console.error("Failed to load exams", error);
            }
        };
        fetchExams();
    }, []);

    // 🟢 Navigate to Teacher Class Detail with state to open Classwork tab
    const handleExamClick = (classId) => {
        navigate(`/teacher/class/${classId}`, { state: { defaultTab: 'classwork' } });
    };

    return (
        <TeacherLayout>
            <CalendarView exams={exams} onExamClick={handleExamClick} />
        </TeacherLayout>
    );
};

export default TeacherCalendar;