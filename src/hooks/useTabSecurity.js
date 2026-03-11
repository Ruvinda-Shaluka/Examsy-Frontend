import { useState, useEffect, useRef } from 'react';
import { studentService } from '../services/studentService'; // Assumes you add a logViolation method here

const useTabSecurity = (examId) => {
    const [tabWarnings, setTabWarnings] = useState(0);
    const [isTabActive, setIsTabActive] = useState(true);
    const [showReturnAlert, setShowReturnAlert] = useState(false);

    const [lastAwayDuration, setLastAwayDuration] = useState(0);
    const [totalAwaySeconds, setTotalAwaySeconds] = useState(0);

    // Use refs to track timestamps without triggering re-renders
    const leaveTimeRef = useRef(null);

    useEffect(() => {
        const handleVisibilityChange = async () => {
            if (document.hidden) {
                // STUDENT LEFT THE TAB!
                setIsTabActive(false);
                leaveTimeRef.current = Date.now();

            } else {
                // STUDENT RETURNED!
                setIsTabActive(true);

                if (leaveTimeRef.current) {
                    const returnTime = Date.now();
                    const secondsAway = Math.floor((returnTime - leaveTimeRef.current) / 1000);

                    if (secondsAway > 0) {
                        setTabWarnings(prev => prev + 1);
                        setLastAwayDuration(secondsAway);
                        setTotalAwaySeconds(prev => prev + secondsAway);
                        setShowReturnAlert(true);

                        // 🟢 PING THE BACKEND SILENTLY TO LOG THE CHEATING
                        try {
                            await studentService.logSecurityViolation({
                                examId: examId,
                                eventType: 'TAB_SWITCHED',
                                durationSeconds: secondsAway
                            });
                        } catch (error) {
                            console.error("Failed to log proctoring event", error);
                        }
                    }
                    leaveTimeRef.current = null;
                }
            }
        };

        // Attach browser event listener
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [examId]);

    const formatDuration = (seconds) => {
        if (seconds < 60) return `${seconds} Secs`;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    return {
        tabWarnings,
        isTabActive,
        showReturnAlert,
        setShowReturnAlert,
        lastAwayDuration,
        totalAwaySeconds,
        formatDuration
    };
};

export default useTabSecurity;