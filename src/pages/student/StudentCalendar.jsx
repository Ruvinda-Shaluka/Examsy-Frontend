import React from 'react';
import {STUDENT_DATA} from '../../data/StudentMockData';
import StudentLayout from "../../layouts/StudentLayout.jsx";
import CalendarView from "../../components/common/Calendar.jsx";

const StudentCalendar = () => {

    // Combine both exam lists into one array for the calendar
    const allStudentExams = [
        ...STUDENT_DATA.upcomingExams,
        ...STUDENT_DATA.availableExams
    ];

    return (
        <StudentLayout>
            <CalendarView exams={allStudentExams}/>
        </StudentLayout>
    );

}


export default StudentCalendar;