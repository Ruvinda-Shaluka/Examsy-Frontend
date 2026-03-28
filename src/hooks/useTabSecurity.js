import { useEffect, useRef, useState } from 'react';
import { studentService } from '../services/studentService';

const useTabSecurity = (examId) => {
    // Refs to track time without causing immediate re-renders
    const awayTimestamp = useRef(null);
    const currentViolationType = useRef(null);

    // State to pass back to the UI
    const [tabWarnings, setTabWarnings] = useState(0);
    const [isTabActive, setIsTabActive] = useState(true);
    const [showReturnAlert, setShowReturnAlert] = useState(false);

    // Stats tracking
    const [lastAwayDuration, setLastAwayDuration] = useState(0);
    const [totalAwaySeconds, setTotalAwaySeconds] = useState(0);

    // Track the specific type of violation for the Modal
    const [violationType, setViolationType] = useState('TAB_SWITCHED');

    useEffect(() => {
        // Don't run if the examId isn't ready
        if (!examId || isNaN(examId)) return;

        const handleViolationStart = (type) => {
            if (!awayTimestamp.current) {
                awayTimestamp.current = Date.now();
                currentViolationType.current = type;
                setIsTabActive(false); // Triggers the full-screen "Paused" UI
            }
        };

        const handleViolationEnd = async () => {
            if (awayTimestamp.current) {
                const durationMs = Date.now() - awayTimestamp.current;
                const durationSeconds = Math.floor(durationMs / 1000);
                const type = currentViolationType.current;

                // Reset timers immediately
                awayTimestamp.current = null;
                currentViolationType.current = null;
                setIsTabActive(true); // Removes the full-screen "Paused" UI

                // Only log if they were gone for at least 1 second
                if (durationSeconds >= 1) {
                    try {
                        // 1. Send data to database
                        const stats = await studentService.logProctoringEvent(examId, type, durationSeconds);

                        // 2. Update local state with the exact totals from the database
                        setLastAwayDuration(durationSeconds);
                        setTotalAwaySeconds(stats.totalAwaySeconds);
                        setTabWarnings(stats.totalFlags);
                        setViolationType(type);

                        // 3. Open the Modal
                        setShowReturnAlert(true);
                    } catch (error) {
                        console.error("Failed to sync proctoring log", error);
                    }
                }
            }
        };

        // EVENT 1: Minimized or Switched Tabs
        const handleVisibility = () => {
            // 🟢 BYPASS HACK: Ignore visibility changes if the OS File Picker is open
            if (window.isUploadingFile) return;

            if (document.visibilityState === 'hidden') handleViolationStart('TAB_SWITCHED');
            else handleViolationEnd();
        };

        // EVENT 2: Clicked on another app (like an IDE on a split screen)
        const handleBlur = () => {
            // 🟢 BYPASS HACK: Ignore window blur if the OS File Picker is open
            if (window.isUploadingFile) return;

            handleViolationStart('WINDOW_LOST_FOCUS');
        };

        const handleFocus = () => {
            // We don't need the bypass here, just end the violation normally if it existed
            handleViolationEnd();
        };

        // EVENT 3: Shrunk the browser to split the screen
        const handleResize = () => {
            // 🟢 BYPASS HACK: Do not trigger resize penalties during a file upload
            if (window.isUploadingFile) return;

            const screenWidth = window.screen.width;
            const windowWidth = window.innerWidth;

            // If window width is less than 75% of screen width, assume split screen
            if (windowWidth < screenWidth * 0.75) {
                handleViolationStart('SPLIT_SCREEN_DETECTED');
            } else {
                handleViolationEnd();
            }
        };

        // Attach listeners
        document.addEventListener('visibilitychange', handleVisibility);
        window.addEventListener('blur', handleBlur);
        window.addEventListener('focus', handleFocus);
        window.addEventListener('resize', handleResize);

        // Run resize check immediately in case they started the exam in a split window
        handleResize();

        // Cleanup
        return () => {
            document.removeEventListener('visibilitychange', handleVisibility);
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('resize', handleResize);
        };
    }, [examId]);

    const formatDuration = (totalSeconds) => {
        if (!totalSeconds) return "0s";
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return m > 0 ? `${m}m ${s}s` : `${s}s`;
    };

    return {
        tabWarnings,
        isTabActive,
        showReturnAlert,
        setShowReturnAlert,
        lastAwayDuration,
        totalAwaySeconds,
        formatDuration,
        violationType
    };
};

export default useTabSecurity;