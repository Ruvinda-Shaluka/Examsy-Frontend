import React, { useEffect, useState } from 'react';
import { useLoading } from '../context/LoadingContext'; // ✅ 1. Import Hook

const AnyPage = () => {
    // ✅ 2. Destructure the functions
    const { showLoader, hideLoader } = useLoading();
    const [data, setData] = useState(null);

    // Example 1: Loading data when page mounts
    useEffect(() => {
        const fetchResources = async () => {
            showLoader("Fetching your classroom data..."); // Turn loader ON

            try {
                // Simulate an API call
                const response = await fetch('/api/my-data');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch data");
            } finally {
                hideLoader(); // Turn loader OFF (Always do this in finally block)
            }
        };

        fetchResources();
    }, []); // Only run once on mount

    // Example 2: Loading when clicking a button (like saving settings)
    const handleSaveSettings = async () => {
        showLoader("Saving your preferences..."); // Turn loader ON

        try {
            // Simulate saving data to database
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert("Saved successfully!");
        } finally {
            hideLoader(); // Turn loader OFF
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-black">My Page</h1>
            <button
                onClick={handleSaveSettings}
                className="mt-4 px-6 py-3 bg-examsy-primary text-white rounded-xl font-bold"
            >
                Save Settings
            </button>
        </div>
    );
};

export default AnyPage;