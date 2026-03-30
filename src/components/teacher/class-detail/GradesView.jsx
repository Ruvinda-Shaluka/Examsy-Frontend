import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    BarChart3, Users, Trophy, Target, ChevronDown,
    PieChart as PieIcon, TrendingDown, Activity,
    Award, ShieldAlert, Loader2
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { teacherService } from '../../../services/teacherService';

const COLORS = {
    'A (85+)': '#10b981',
    'B (70-84)': '#3b82f6',
    'C (55-69)': '#8b5cf6',
    'S (40-54)': '#f59e0b',
    'F (<40)': '#ef4444',
};

const GradesView = () => {
    const { classId } = useParams();
    const [exams, setExams] = useState([]);
    const [selectedExamId, setSelectedExamId] = useState("");
    const [analytics, setAnalytics] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // 1. Fetch the list of exams for this class to populate the dropdown
    useEffect(() => {
        const fetchExams = async () => {
            try {
                const examList = await teacherService.getClassExams(classId);
                setExams(examList);
                if (examList.length > 0) {
                    setSelectedExamId(examList[0].id.toString());
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Failed to fetch class exams", error);
                setIsLoading(false);
            }
        };
        if (classId) fetchExams();
    }, [classId]);

    // 2. Fetch the specific analytics whenever the selected exam changes
    useEffect(() => {
        const fetchAnalytics = async () => {
            if (!selectedExamId) return;
            setIsLoading(true);
            try {
                const data = await teacherService.getExamAnalytics(selectedExamId);
                setAnalytics(data);
            } catch (error) {
                console.error("Failed to fetch analytics", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAnalytics();
    }, [selectedExamId]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-examsy-primary animate-in fade-in">
                <Loader2 className="animate-spin mb-4" size={48} />
                <p className="font-black tracking-widest uppercase text-sm">Crunching Analytics...</p>
            </div>
        );
    }

    if (exams.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-examsy-muted">
                <BarChart3 size={48} className="mb-4 opacity-20" />
                <p className="font-black text-xl">No Exams Available</p>
                <p className="text-sm font-bold mt-1">Publish an exam to this class to view analytics.</p>
            </div>
        );
    }

    if (!analytics) return null;

    const chartData = Object.entries(analytics.gradeDistribution).map(([name, value]) => ({
        name,
        value
    }));

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Area */}
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
                        {exams.map(ex => (
                            <option key={ex.id} value={ex.id}>{ex.title}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-examsy-muted pointer-events-none" size={18} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT SIDE: Vertical Stack of Metric Cards */}
                <div className="lg:col-span-4 space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-examsy-muted ml-2 mb-2">Performance Metrics</h3>

                    <MetricCard icon={<Target />} label="Average Score" value={`${analytics.averageScore}%`} color="text-blue-500" />
                    <MetricCard icon={<Trophy />} label="Top Scorer" value={analytics.topScorerName} subValue={`${analytics.topScore}%`} color="text-amber-500" />
                    <MetricCard icon={<TrendingDown />} label="Lowest Score" value={`${analytics.lowestScore}%`} subValue="Needs Review" color="text-red-500" />
                    <MetricCard icon={<Award />} label="Median Score" value={`${analytics.medianScore}%`} color="text-indigo-500" />
                    <MetricCard icon={<Users />} label="Total Students" value={analytics.totalStudents} color="text-purple-500" />
                    <MetricCard icon={<Activity />} label="Participation" value={`${analytics.participationRate}%`} color="text-emerald-500" />
                    <MetricCard icon={<ShieldAlert />} label="At Risk" value={`${analytics.atRiskCount} Students`} subValue="Score < 40" color="text-rose-500" />
                </div>

                {/* RIGHT SIDE: Large Analytics Component */}
                <div className="lg:col-span-8 sticky top-24">
                    <div className="bg-examsy-surface p-10 rounded-[40px] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                        <div className="flex items-center justify-between w-full mb-10">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-examsy-primary/10 rounded-2xl text-examsy-primary">
                                    <PieIcon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-examsy-text">Grade Share</h3>
                                    <p className="text-xs font-bold text-examsy-muted uppercase tracking-wider">Overall distribution</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-black text-examsy-primary">{analytics.passRate}%</span>
                                <p className="text-[10px] font-black text-examsy-muted uppercase tracking-widest">Pass Rate</p>
                            </div>
                        </div>

                        {/* Large Recharts Responsive Container */}
                        <div className="h-[400px] w-full relative">
                            {chartData.every(d => d.value === 0) ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-examsy-muted">
                                    <PieIcon size={48} className="mb-4 opacity-20" />
                                    <p className="font-black">No Graded Submissions Yet</p>
                                </div>
                            ) : (
                                <>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={chartData}
                                                innerRadius={110}
                                                outerRadius={150}
                                                paddingAngle={8}
                                                dataKey="value"
                                                stroke="none"
                                                animationBegin={200}
                                            >
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#18181b',
                                                    borderRadius: '24px',
                                                    border: '1px solid #27272a',
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    padding: '12px 20px'
                                                }}
                                                itemStyle={{ color: "white" }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>

                                    {/* Center Labels */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-4xl font-black text-examsy-text">{analytics.averageScore}%</span>
                                        <span className="text-xs font-black text-examsy-muted uppercase tracking-[0.2em]">Class AVG</span>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Extended Legend Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full mt-10 p-6 bg-examsy-bg/50 rounded-[32px] border border-zinc-100 dark:border-zinc-800/50">
                            {chartData.map((entry) => (
                                <div key={entry.name} className="flex items-center justify-between p-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[entry.name] }} />
                                        <span className="text-sm font-bold text-examsy-muted">{entry.name}</span>
                                    </div>
                                    <span className="text-sm font-black text-examsy-text">
                                        {entry.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const MetricCard = ({ icon, label, value, subValue, color }) => (
    <div className="bg-examsy-surface p-5 rounded-[28px] border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between group hover:border-examsy-primary hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-5">
            <div className={`p-3.5 rounded-2xl bg-examsy-bg ${color} group-hover:scale-110 transition-transform duration-300`}>
                {React.cloneElement(icon, { size: 20 })}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase text-examsy-muted tracking-widest mb-0.5">{label}</p>
                <h4 className="text-lg font-black text-examsy-text leading-none">{value}</h4>
            </div>
        </div>
        {subValue && (
            <div className="text-right">
                <span className="text-[10px] font-black text-examsy-muted uppercase tracking-tighter opacity-60">
                    {subValue}
                </span>
            </div>
        )}
    </div>
);

export default GradesView;