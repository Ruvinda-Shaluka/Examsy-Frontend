import React, { useState, useEffect } from 'react';
import './ToggleButton.css';
import { useTheme } from '../hooks/useTheme.jsx';
import { Clock as ClockIcon } from 'lucide-react';

const ToggleButton = () => {
    const { theme, toggleTheme } = useTheme();
    // Time state moved here with seconds and 1s interval
    const [time, setTime] = useState(new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }));

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleToggle = () => {
        toggleTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="exms-toggle-wrapper flex items-center gap-3">
            {/* Clock display with increased font weight and icon */}
            <div className="flex items-center gap-2 px-3 py-1 bg-examsy-bg rounded-full border border-zinc-200 dark:border-zinc-800">
                <ClockIcon size={14} className="text-examsy-primary" />
                <div className="exms-time-display font-mono font-bold text-examsy-text whitespace-nowrap">
                    {time}
                </div>
            </div>

            <label htmlFor="exms-theme-switch" className="exms-switch">
                <input
                    id="exms-theme-switch"
                    type="checkbox"
                    onChange={handleToggle}
                    checked={theme === 'dark'}
                />
                <span className="exms-slider"></span>
                <span className="exms-decoration"></span>
            </label>
        </div>
    );
};

export default ToggleButton;