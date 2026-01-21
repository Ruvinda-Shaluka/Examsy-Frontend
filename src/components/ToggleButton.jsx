import React, { useState, useEffect } from 'react';
import './ToggleButton.css';
import { useTheme } from '../hooks/useTheme.jsx';

const ToggleButton = () => {
    const { theme, toggleTheme } = useTheme();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleToggle = () => {
        toggleTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="exms-toggle-wrapper">
            <div className="exms-time-display">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
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