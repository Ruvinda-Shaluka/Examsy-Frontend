import React from 'react';
import TeacherLayout from '../../layouts/TeacherLayout';
import NotificationsView from '../../components/common/NotificationsView';

const TeacherNotificationPage = () => {
    return (
        <TeacherLayout>
            {/* Pass the basePath so the "Back" button knows where to go! */}
            <NotificationsView basePath="/teacher/dashboard" />
        </TeacherLayout>
    );
};

export default TeacherNotificationPage;