import React, { useState, useEffect } from 'react';
import { Target, Trophy, TrendingUp, Activity, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { studentService } from '../../../services/studentService.js';

const StudentGradesView = () => {
    const [analytics, setAnalytics] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const data = await studentService.getStudentAnalytics();
                setAnalytics(data);
            } catch (error) {
                console.error("Failed to load student analytics:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (isLoading || !analytics) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-examsy-primary animate-in fade-in">
                <Loader2 className="animate-spin mb-4" size={48} />
                <p className="font-black tracking-widest uppercase text-sm">Compiling Analytics...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* LEFT: Metrics Stack */}
                <div className="lg:col-span-4 space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-examsy-muted ml-2 mb-2">Personal Analytics</h3>
                    <MetricCard icon={<Target />} label="Cumulative GPA" value={analytics.gpa} color="text-indigo-500" />
                    <MetricCard icon={<Trophy />} label="Best Performance" value={analytics.bestScore} subValue={analytics.bestExam} color="text-amber-500" />
                    <MetricCard icon={<TrendingUp />} label="Lowest Performance" value={analytics.lowestScore} subValue={analytics.lowestExam} color="text-emerald-500" />
                    <MetricCard icon={<Activity />} label="Exam History" value={analytics.rankText} subValue={analytics.rankSubText} color="text-purple-500" />
                </div>

                {/* RIGHT: Progress Chart */}
                <div className="lg:col-span-8 sticky top-24">
                    <div className="bg-examsy-surface p-10 rounded-[40px] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-examsy-primary/10 rounded-2xl text-examsy-primary">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-examsy-text">Academic Growth</h3>
                                <p className="text-xs font-bold text-examsy-muted uppercase tracking-wider">Historical score progression</p>
                            </div>
                        </div>

                        {analytics.chartData.length === 0 ? (
                            <div className="h-[400px] w-full flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl text-examsy-muted">
                                <TrendingUp size={48} className="mb-4 opacity-20" />
                                <p className="font-black text-lg">No Chart Data</p>
                                <p className="text-sm font-bold mt-1">Complete exams to build your growth chart.</p>
                            </div>
                        ) : (
                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={analytics.chartData}>
                                        <defs>
                                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                                        <XAxis
                                            dataKey="exam"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{fill: '#71717a', fontSize: 10, fontWeight: 'bold'}}
                                            dy={10}
                                            // Hide long labels on small screens by setting an interval or formatter if needed
                                            tickFormatter={(val) => val.length > 15 ? val.substring(0, 15) + '...' : val}
                                        />
                                        <YAxis
                                            domain={[0, 100]}
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{fill: '#71717a', fontSize: 12, fontWeight: 'bold'}}
                                        />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#18181b', borderRadius: '20px', border: '1px solid #27272a', padding: '12px' }}
                                            itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="score"
                                            stroke="#a855f7"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorScore)"
                                            animationDuration={1500}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ icon, label, value, subValue, color }) => (
    <div className="bg-examsy-surface p-6 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between group hover:border-examsy-primary transition-all duration-300">
        <div className="flex items-center gap-5">
            <div className={`p-3.5 rounded-2xl bg-examsy-bg ${color} group-hover:scale-110 transition-transform duration-300`}>
                {React.cloneElement(icon, { size: 20 })}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase text-examsy-muted tracking-widest mb-0.5">{label}</p>
                <h4 className="text-xl font-black text-examsy-text leading-none">{value}</h4>
            </div>
        </div>
        {subValue && <span className="text-[10px] font-black text-examsy-muted uppercase opacity-60 tracking-tighter max-w-[80px] text-right truncate">{subValue}</span>}
    </div>
);

export default StudentGradesView;