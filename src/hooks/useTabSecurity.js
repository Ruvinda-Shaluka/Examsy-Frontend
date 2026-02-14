import { useState, useEffect, useRef } from 'react';

const useTabSecurity = () => {
    const [tabWarnings, setTabWarnings] = useState(0);
    const [isTabActive, setIsTabActive] = useState(true);

    // Alert States
    const [showReturnAlert, setShowReturnAlert] = useState(false);
    const [lastAwayDuration, setLastAwayDuration] = useState(0); // Duration of the *latest* incident
    const [totalAwaySeconds, setTotalAwaySeconds] = useState(0); // Cumulative total time away

    // Ref to store the timestamp when they left
    const awayStartTimeRef = useRef(null);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // --- Student LEFT the tab ---
                setIsTabActive(false);
                awayStartTimeRef.current = Date.now();
                setTabWarnings(prev => prev + 1);
            } else {
                // --- Student RETURNED to the tab ---
                setIsTabActive(true);

                if (awayStartTimeRef.current) {
                    const timeAwayMs = Date.now() - awayStartTimeRef.current;
                    const timeAwaySec = Math.floor(timeAwayMs / 1000);

                    // Update latest duration
                    setLastAwayDuration(timeAwaySec);

                    // Update cumulative total
                    setTotalAwaySeconds(prev => prev + timeAwaySec);

                    // Trigger the alert modal
                    setShowReturnAlert(true);

                    // Reset ref
                    awayStartTimeRef.current = null;
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Block right-click context menu for extra security
        const handleContextMenu = (e) => e.preventDefault();
        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    // Helper to format seconds into readable text (e.g., "1m 5s")
    const formatDuration = (seconds) => {
        if (!seconds) return "0s";
        if (seconds < 60) return `${seconds}s`;
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}m ${s}s`;
    };

    return {
        tabWarnings,
        isTabActive,
        showReturnAlert,
        setShowReturnAlert,
        lastAwayDuration,     // Time away for the specific incident
        totalAwaySeconds,     // Total time away for the whole exam
        formatDuration
    };
};

export default useTabSecurity;