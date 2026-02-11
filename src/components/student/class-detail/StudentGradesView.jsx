import React from 'react';
import { Target, Trophy, TrendingUp, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { STUDENT_DATA } from '../../../data/StudentMockData';

const StudentGradesView = () => {
    const data = STUDENT_DATA.examHistory;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* LEFT: Metrics Stack */}
                <div className="lg:col-span-4 space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-examsy-muted ml-2 mb-2">Personal Analytics</h3>
                    <MetricCard icon={<Target />} label="Cumulative GPA" value={STUDENT_DATA.stats.gpa} color="text-indigo-500" />
                    <MetricCard icon={<Trophy />} label="Best Performance" value="98%" subValue="Physics Mid-term" color="text-amber-500" />
                    <MetricCard icon={<TrendingUp />} label="Improvement" value="+12%" subValue="vs Semester 1" color="text-emerald-500" />
                    <MetricCard icon={<Activity />} label="Class Rank" value="#04" subValue="Out of 45" color="text-purple-500" />
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

                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
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
                                        tick={{fill: '#71717a', fontSize: 12, fontWeight: 'bold'}}
                                        dy={10}
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
        {subValue && <span className="text-[10px] font-black text-examsy-muted uppercase opacity-60 tracking-tighter">{subValue}</span>}
    </div>
);

export default StudentGradesView;