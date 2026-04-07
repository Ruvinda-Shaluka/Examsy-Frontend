export const appCache = {
    studentProfile: { data: null, timestamp: 0, expiryMs: 5 * 60 * 1000 }, // 5 mins
    studentClasses: { data: null, timestamp: 0, expiryMs: 2 * 60 * 1000 }, // 2 mins
    studentAnalytics: { data: null, timestamp: 0, expiryMs: 5 * 60 * 1000 },

    teacherProfile: { data: null, timestamp: 0, expiryMs: 5 * 60 * 1000 },
    teacherClasses: { data: null, timestamp: 0, expiryMs: 2 * 60 * 1000 },

    adminProfile: { data: null, timestamp: 0, expiryMs: 5 * 60 * 1000 },
    adminMetrics: { data: null, timestamp: 0, expiryMs: 2 * 60 * 1000 },
};

// Helper function to check if cache is valid
export const getCachedData = (cacheKey) => {
    const item = appCache[cacheKey];
    if (item && item.data && (Date.now() - item.timestamp < item.expiryMs)) {
        return item.data;
    }
    return null;
};

// Helper function to save to cache
export const setCachedData = (cacheKey, data) => {
    if (appCache[cacheKey]) {
        appCache[cacheKey].data = data;
        appCache[cacheKey].timestamp = Date.now();
    }
};

export const clearAllCaches = () => {
    Object.keys(appCache).forEach(key => {
        appCache[key].data = null;
        appCache[key].timestamp = 0;
    });
};