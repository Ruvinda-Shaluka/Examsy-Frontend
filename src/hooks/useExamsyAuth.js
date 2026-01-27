import { useGoogleLogin } from '@react-oauth/google';

/**
 * Custom hook to handle Examsy Google Authentication
 * @param {Function} onSuccessCallback - What to do after successful login (e.g., setStep(2))
 */
export const useExamsyAuth = (onSuccessCallback) => {
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log("Examsy Auth Success:", tokenResponse);
            // In the future, you will send tokenResponse.access_token
            // to your Spring Boot backend here.
            if (onSuccessCallback) onSuccessCallback(tokenResponse);
        },
        onError: (error) => {
            console.error("Examsy Auth Failed:", error);
            alert("Google Sign-In failed. Please check your connection.");
        },
    });

    return { login };
};