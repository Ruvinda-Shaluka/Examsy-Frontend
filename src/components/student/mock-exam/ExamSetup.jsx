import React from 'react';
import { BrainCircuit, ListOrdered, Sparkles } from 'lucide-react';

const ExamSetup = ({ config, setConfig, onStart }) => (
    <div className="bg-examsy-surface p-8 rounded-[32px] border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
        <div className="text-center">
            <h1 className="text-2xl font-black text-examsy-text uppercase tracking-tight">Mock Exam Builder</h1>
            <p className="text-examsy-muted font-bold text-sm mt-1">Configure your personalized AI assessment.</p>
        </div>

        <div className="space-y-5">
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-examsy-muted ml-3">Topic</label>
                <div className="relative">
                    <BrainCircuit className="absolute left-5 top-1/2 -translate-y-1/2 text-examsy-primary" size={18} />
                    <input
                        type="text"
                        placeholder="e.g. Linear Algebra, Organic Chemistry..."
                        value={config.topic}
                        onChange={(e) => setConfig({...config, topic: e.target.value})}
                        className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-14 pr-6 font-bold text-examsy-text outline-none focus:border-examsy-primary transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-examsy-muted ml-3">Difficulty Level</label>
                    <select
                        value={config.difficulty}
                        onChange={(e) => setConfig({...config, difficulty: e.target.value})}
                        className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 px-5 font-bold text-examsy-text outline-none focus:border-examsy-primary appearance-none"
                    >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-examsy-muted ml-3">Question Count</label>
                    <div className="relative">
                        <ListOrdered className="absolute left-5 top-1/2 -translate-y-1/2 text-examsy-primary" size={18} />
                        <input
                            type="number" min="1" max="20"
                            value={config.count}
                            onChange={(e) => setConfig({...config, count: parseInt(e.target.value)})}
                            className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-14 pr-6 font-bold text-examsy-text outline-none focus:border-examsy-primary"
                        />
                    </div>
                </div>
            </div>
        </div>

        <button
            onClick={onStart}
            className="w-full py-4 bg-examsy-primary text-white rounded-2xl font-black shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all mt-4"
        >
            <Sparkles size={18} /> Generate Practice Exam
        </button>
    </div>
);

export default ExamSetup;