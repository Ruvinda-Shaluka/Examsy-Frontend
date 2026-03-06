import React from 'react';
import StudentLayout from '../../layouts/StudentLayout';
import NotificationsView from '../../components/common/NotificationsView';

const StudentNotificationPage = () => {
    return (
        <StudentLayout>
            {/* Pass the basePath so the "Back" button knows where to go! */}
            <NotificationsView basePath="/student/dashboard" />
        </StudentLayout>
    );
};

export default StudentNotificationPage;