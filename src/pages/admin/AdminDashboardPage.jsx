import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 🟢 Added useNavigate
import AdminLayout from '../../layouts/AdminLayout';
import StatCard from '../../components/admin/dashboard/StatCard';
import ReportTypeChart from '../../components/admin/dashboard/ReportTypeChart';
import { adminService } from '../../services/adminService';
import { Activity, LayoutDashboard, GraduationCap, Building2, AlertOctagon, Users } from 'lucide-react';

const AdminDashboardPage = () => {
    const navigate = useNavigate(); // 🟢 Initialize navigation
    const [isLoading, setIsLoading] = useState(true);
    const [metrics, setMetrics] = useState(null);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const data = await adminService.getDashboardMetrics();
                setMetrics(data);

                // Map backend categories to colors for the UI
                const colorMap = {
                    'SPAM': '#3B82F6', // Blue
                    'HARMFUL CONTENT': '#EF4444', // Red
                    'PERSONAL INFO': '#F97316', // Orange
                    'COPYRIGHT': '#EAB308', // Yellow
                    'OTHER': '#8B5CF6' // Purple
                };

                // Only process chart data if reportDistribution exists
                if (data && data.reportDistribution) {
                    const formattedChartData = data.reportDistribution.map(item => ({
                        type: item.type.toUpperCase(),
                        count: item.count,
                        color: colorMap[item.type.toUpperCase()] || '#8B5CF6' // Default purple
                    }));
                    setChartData(formattedChartData);
                }

            } catch (error) {
                console.error("Failed to load dashboard metrics", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    // 1. Show loading spinner while fetching
    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-full min-h-[400px]">
                    <div className="w-10 h-10 border-4 border-examsy-primary/20 border-t-examsy-primary rounded-full animate-spin"></div>
                </div>
            </AdminLayout>
        );
    }

    // 2. SAFETY NET: If loading finished but we have no data, show an error state
    if (!metrics) {
        return (
            <AdminLayout>
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                    <AlertOctagon size={48} className="text-red-500 mb-4" />
                    <h2 className="text-xl font-black text-examsy-text">Failed to Load Dashboard</h2>
                    <p className="text-sm font-bold text-examsy-muted">There was a problem communicating with the server.</p>
                </div>
            </AdminLayout>
        );
    }

    // 3. Render the actual dashboard
    return (
        <AdminLayout>
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                            <LayoutDashboard size={32} className="text-examsy-primary" />
                            System Overview
                        </h1>
                        <p className="text-examsy-muted font-bold mt-2">Real-time metrics and platform health status.</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl font-bold text-sm border border-emerald-500/20 shadow-sm">
                        <Activity size={16} className="animate-pulse" />
                        <span>System Operational</span>
                    </div>
                </div>

                {/* Main Split Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                    {/* LEFT SIDE: 2x2 Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-fit">
                        <StatCard
                            label="Total Students"
                            value={metrics.totalStudents.toLocaleString()}
                            change="+Active"
                            icon={GraduationCap}
                            color="bg-emerald-500"
                        />
                        <StatCard
                            label="Active Teachers"
                            value={metrics.activeTeachers.toLocaleString()}
                            change="+Active"
                            icon={Building2}
                            color="bg-blue-500"
                        />
                        <StatCard
                            label="Pending Reports"
                            value={metrics.pendingReports.toLocaleString()}
                            change="Action Needed"
                            icon={AlertOctagon}
                            color="bg-red-500"
                            onClick={() => navigate('/admin/reports')} // 🟢 Added redirect here!
                        />
                        <StatCard
                            label="Total Users"
                            value={metrics.totalUsers.toLocaleString()}
                            change="+Total"
                            icon={Users}
                            color="bg-purple-500"
                        />
                    </div>

                    {/* RIGHT SIDE: Bar Chart */}
                    <div className="h-full min-h-[350px]">
                        {chartData.length > 0 ? (
                            <ReportTypeChart data={chartData} />
                        ) : (
                            <div className="bg-examsy-surface p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm h-full flex flex-col items-center justify-center text-center">
                                <h3 className="text-xl font-black text-examsy-text mb-2">Report Distribution</h3>
                                <p className="text-sm font-bold text-examsy-muted">No reports generated yet.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboardPage;