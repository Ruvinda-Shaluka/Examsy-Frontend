import React from 'react';

const ReportTypeChart = ({ data }) => {
    // Find the max value to normalize bar heights
    // Check to prevent division by zero if data is empty
    const maxCount = Math.max(...data.map(d => d.count)) || 1;

    return (
        <div className="bg-examsy-surface p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm h-full flex flex-col">
            <div className="mb-8">
                <h3 className="text-xl font-black text-examsy-text">Report Distribution</h3>
                <p className="text-sm font-bold text-examsy-muted">Breakdown of reported violations by category.</p>
            </div>

            {/* Chart Container - Flex grow ensures it fills available space */}
            <div className="flex-1 flex items-end justify-between gap-4 w-full min-h-[200px]">
                {data.map((item) => {
                    // Calculate height percentage relative to the max value
                    // Ensure a minimum height (e.g., 2%) so even 0 values have a tiny sliver or 1 value is visible
                    const heightPct = (item.count / maxCount) * 100;

                    return (
                        <div key={item.type} className="flex flex-col items-center gap-3 flex-1 group cursor-pointer h-full justify-end">

                            {/* Tooltip (Hover) */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-2 bg-zinc-800 text-white text-[10px] font-bold px-2 py-1 rounded-lg mb-1 absolute bottom-[calc(var(--h)+2rem)] z-10 pointer-events-none whitespace-nowrap">
                                {item.count} Reports
                            </div>

                            {/* The Bar */}
                            {/* ✅ FIXED: Applied backgroundColor via inline style */}
                            <div
                                style={{
                                    height: `${heightPct}%`,
                                    backgroundColor: item.color,
                                    '--h': `${heightPct}%` // CSS var for tooltip positioning
                                }}
                                className="w-full max-w-[60px] rounded-2xl relative transition-all duration-500 hover:scale-105 hover:opacity-80"
                            ></div>

                            {/* Label */}
                            <span className="text-[10px] font-bold text-examsy-muted uppercase tracking-wider text-center h-8 leading-tight flex items-center justify-center">
                                {item.type}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ReportTypeChart;