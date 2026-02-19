import React from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminTopBar from '../components/admin/AdminTopBar';

const AdminLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-examsy-bg text-examsy-text transition-colors duration-500 flex">
            {/* Fixed Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col ml-20 md:ml-64 min-h-screen">
                {/* Sticky Top Navbar */}
                <div className="sticky top-0 z-40">
                    <AdminTopBar />
                </div>

                {/* Page Content */}
                <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;