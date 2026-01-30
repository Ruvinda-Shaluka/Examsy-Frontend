import React, { useState } from 'react';
import TeacherSidebar from '../components/teacher/TeacherSidebar';
import TeacherNavbar from '../components/teacher/TeacherNavbar';

const TeacherLayout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-examsy-bg transition-colors duration-300 flex">
            {/* Retractable Sidebar */}
            <TeacherSidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(!isSidebarOpen)} />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Fixed Navbar */}
                <TeacherNavbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

                {/* Scrollable Content Area */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10 animate-fade-in">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TeacherLayout;