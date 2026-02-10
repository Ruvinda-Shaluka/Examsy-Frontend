import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/student/Sidebar';

const StudentLayout = () => (
    <div className="flex min-h-screen bg-examsy-bg text-examsy-text transition-colors duration-500">
        <Sidebar />
        <main className="ml-72 flex-1 p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        {/* top area left intentionally minimal - page titles live in pages */}
                    </div>
                    <div className="flex items-center gap-4">
                        <input placeholder="Search exams or classes..." className="bg-examsy-surface/60 px-4 py-2 rounded-2xl text-sm outline-none border border-zinc-200 dark:border-zinc-800" />
                        <button className="px-3 py-2 bg-examsy-surface rounded-2xl border border-zinc-200 dark:border-zinc-800">Notifications</button>
                    </div>
                </div>

                <Outlet />
            </div>
        </main>
    </div>
);

export default StudentLayout;