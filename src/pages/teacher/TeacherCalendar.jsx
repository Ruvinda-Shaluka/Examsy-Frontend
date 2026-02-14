import TeacherLayout from '../../layouts/TeacherLayout';
import CalendarView from "../../components/common/Calendar.jsx";
import {MOCK_EXAMS} from "../../data/TeacherMockData.js";

const TeacherCalendar = () => {

    return (
        <TeacherLayout>
                <CalendarView exams={MOCK_EXAMS} />
        </TeacherLayout>
    );
};

export default TeacherCalendar;