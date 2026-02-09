import React, { useState } from 'react';
import { BarChart3, Users, Trophy, Target, ChevronDown, Search, PieChart as PieIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import { MOCK_EXAMS_RESULTS, MOCK_GRADE_ANALYTICS } from '../../../data/TeacherMockData.js';

// Custom Colors for the Pie Chart to match your UI
const COLORS = {
    'A (85+)': '#10b981', // Emerald
    'B (70-84)': '#3b82f6', // Blue
    'C (55-69)': '#8b5cf6', // Purple
    'D (40-54)': '#f59e0b', // Amber
    'F (<40)': '#ef4444',  // Red
};

const GradesView = () => {
    const [selectedExamId, setSelectedExamId] = useState(MOCK_EXAMS_RESULTS[0].id);
    const analytics = MOCK_GRADE_ANALYTICS[selectedExamId];

    // Format data for Recharts
    const chartData = Object.entries(analytics.distribution).map(([name, value]) => ({
        name,
        value
    }));

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header & Selector */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-black text-examsy-text">Grades & Analytics</h2>
                    <p className="text-examsy-muted font-bold text-sm">Review performance and student benchmarks.</p>
                </div>

                <div className="relative w-full md:w-64">
                    <select
                        value={selectedExamId}
                        onChange={(e) => setSelectedExamId(e.target.value)}
                        className="w-full bg-examsy-surface border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl font-bold text-examsy-text outline-none appearance-none focus:border-examsy-primary transition-all cursor-pointer"
                    >
                        {MOCK_EXAMS_RESULTS.map(ex => (
                            <option key={ex.id} value={ex.id}>{ex.title}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-examsy-muted pointer-events-none" size={18} />
                </div>
            </div>

            {/* --- Analytics Overview Cards --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard icon={<Target />} label="Average Score" value={`${analytics.average}%`} color="text-blue-500" />
                <MetricCard icon={<Trophy />} label="Top Scorer" value={analytics.topScorer} subValue={`${analytics.topScore}%`} color="text-amber-500" />
                <MetricCard icon={<Users />} label="Total Students" value={analytics.totalStudents} color="text-purple-500" />
                <MetricCard icon={<BarChart3 />} label="Pass Rate" value="93%" color="text-emerald-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- Pie Chart Section --- */}
                <div className="lg:col-span-1 bg-examsy-surface p-8 rounded-[40px] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-6 w-full">
                        <PieIcon size={18} className="text-examsy-primary" />
                        <h3 className="text-sm font-black uppercase tracking-widest text-examsy-muted">Grade Share</h3>
                    </div>

                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#18181b',
                                        borderRadius: '16px',
                                        border: '1px solid #27272a',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Custom Legend */}
                    <div className="w-full space-y-2 mt-4">
                        {chartData.map((entry) => (
                            <div key={entry.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[entry.name] }} />
                                    <span className="text-xs font-bold text-examsy-muted">{entry.name}</span>
                                </div>
                                <span className="text-xs font-black text-examsy-text">
                                    {Math.round((entry.value / analytics.totalStudents) * 100)}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Distribution Bar Graph --- */}
                <div className="lg:col-span-2 bg-examsy-surface p-8 rounded-[40px] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <h3 className="text-sm font-black uppercase tracking-widest text-examsy-muted mb-8">Grade Distribution</h3>
                    <div className="flex items-end gap-2 sm:gap-4 h-64">
                        {Object.entries(analytics.distribution).map(([grade, count]) => (
                            <div key={grade} className="flex-1 flex flex-col items-center gap-3 group">
                                <div className="relative w-full bg-examsy-bg rounded-xl flex flex-col justify-end overflow-hidden h-full">
                                    <div
                                        className="transition-all duration-1000 group-hover:opacity-80"
                                        style={{
                                            height: `${(count / analytics.totalStudents) * 100}%`,
                                            backgroundColor: COLORS[grade]
                                        }}
                                    />
                                    <span className="absolute inset-x-0 bottom-2 text-center text-[10px] font-black text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        {count}
                                    </span>
                                </div>
                                <span className="text-[10px] font-black text-examsy-muted uppercase text-center leading-tight whitespace-pre-wrap">{grade}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- Student Results Table (Remaining parts omitted for brevity, same as your original) --- */}
            {/* ... Rest of your Student Table code ... */}
        </div>
    );
};

const MetricCard = ({ icon, label, value, subValue, color }) => (
    <div className="bg-examsy-surface p-6 rounded-[32px] border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-5 group hover:border-examsy-primary transition-all">
        <div className={`p-4 rounded-2xl bg-examsy-bg ${color} group-hover:scale-110 transition-transform`}>
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <div>
            <p className="text-[10px] font-black uppercase text-examsy-muted tracking-widest mb-1">{label}</p>
            <div className="flex items-baseline gap-2">
                <p className="text-xl font-black text-examsy-text">{value}</p>
                {subValue && <span className="text-xs font-bold text-examsy-muted">{subValue}</span>}
            </div>
        </div>
    </div>
);

export default GradesView;