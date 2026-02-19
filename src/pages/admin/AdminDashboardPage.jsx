import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import StatCard from '../../components/admin/dashboard/StatCard';
import ReportTypeChart from '../../components/admin/dashboard/ReportTypeChart';
import { ADMIN_STATS, REPORT_CHART_DATA } from '../../data/AdminMockData.js';
import { Activity, LayoutDashboard } from 'lucide-react';

const AdminDashboardPage = () => {
    return (
        <AdminLayout>
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* 1. Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                            <LayoutDashboard size={32} className="text-examsy-primary" />
                            System Overview
                        </h1>
                        <p className="text-examsy-muted font-bold mt-2">Real-time metrics and platform health status.</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-xl font-bold text-sm border border-emerald-500/20">
                        <Activity size={16} className="animate-pulse" />
                        <span>System Operational</span>
                    </div>
                </div>

                {/* 2. Stats Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ADMIN_STATS.map((stat) => (
                        <StatCard key={stat.id} {...stat} />
                    ))}
                </section>

                {/* 3. Charts & Activity Section */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Chart (Takes up 2 columns) */}
                    <div className="lg:col-span-2">
                        <ReportTypeChart data={REPORT_CHART_DATA} />
                    </div>

                    {/* Quick Actions / Side Panel (Takes up 1 column) */}
                    <div className="bg-examsy-surface p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-black text-examsy-text mb-2">Quick Actions</h3>
                            <p className="text-sm font-bold text-examsy-muted mb-6">Common administrative tasks.</p>

                            <div className="space-y-3">
                                <button className="w-full text-left p-4 rounded-2xl bg-examsy-bg hover:bg-examsy-primary/5 border border-zinc-200 dark:border-zinc-800 hover:border-examsy-primary/30 transition-all font-bold text-sm text-examsy-text">
                                    Generate User Report
                                </button>
                                <button className="w-full text-left p-4 rounded-2xl bg-examsy-bg hover:bg-examsy-primary/5 border border-zinc-200 dark:border-zinc-800 hover:border-examsy-primary/30 transition-all font-bold text-sm text-examsy-text">
                                    Manage System Roles
                                </button>
                                <button className="w-full text-left p-4 rounded-2xl bg-examsy-bg hover:bg-examsy-primary/5 border border-zinc-200 dark:border-zinc-800 hover:border-examsy-primary/30 transition-all font-bold text-sm text-examsy-text">
                                    View Audit Logs
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                            <p className="text-xs font-black uppercase text-examsy-muted tracking-widest mb-2">Latest Alert</p>
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold leading-relaxed">
                                High server load detected in region US-East-1 at 09:42 AM.
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboardPage;