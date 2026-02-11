import React, {useState} from 'react';
import StudentSidebar from '../components/student/StudentSidebar.jsx';
import StudentNavbar from "../components/student/StudentNavbar.jsx";

const StudentLayout = ({children}) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    return (<div className="min-h-screen bg-examsy-bg transition-colors duration-300 flex">
            <StudentSidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(!isSidebarOpen)}/>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Fixed Navbar */}
                <StudentNavbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}/>

                {/* Scrollable Content Area */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10 animate-fade-in">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

        </div>);
};

export default StudentLayout;