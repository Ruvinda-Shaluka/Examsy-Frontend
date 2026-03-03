import React, { createContext, useState, useContext } from 'react';
import GlobalLoader from '../components/common/GlobalLoader';

// 1. Create the Context
const LoadingContext = createContext();

// 2. Create the Provider Component
export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Loading Examsy...");

    // Function to show loader with optional custom message
    const showLoader = (message = "Loading Examsy...") => {
        setLoadingMessage(message);
        setIsLoading(true);
    };

    // Function to hide loader
    const hideLoader = () => {
        setIsLoading(false);
        // Reset message after a slight delay to avoid text flashing while fading out
        setTimeout(() => setLoadingMessage("Loading Examsy..."), 300);
    };

    return (
        <LoadingContext.Provider value={{ isLoading, showLoader, hideLoader }}>
            {children}

            {/* The loader is rendered globally here, on top of everything else */}
            {isLoading && <GlobalLoader message={loadingMessage} />}
        </LoadingContext.Provider>
    );
};

// 3. Create a Custom Hook for easy access
export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};