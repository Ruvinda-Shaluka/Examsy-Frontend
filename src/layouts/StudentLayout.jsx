import React from 'react';
import Sidebar from '../components/student/Sidebar';

const StudentLayout = ({ children }) => (
    <div className="flex min-h-screen bg-examsy-bg text-examsy-text transition-colors duration-500">
        <Sidebar />
        <main className="ml-72 flex-1 p-12 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
                {children}
            </div>
        </main>
    </div>
);

export default StudentLayout;