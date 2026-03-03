import React, { Suspense } from 'react';
import { ThemeProvider } from './theme/useTheme.jsx';
import AppRoutes from "./routes/Routes.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";

import GlobalLoader from "./components/common/GlobalLoader.jsx";

function App() {
    return (
        <ThemeProvider>
            <LoadingProvider>

                {/* Wrap AppRoutes in Suspense for seamless page transitions/lazy loading */}
                <Suspense fallback={<GlobalLoader message="Loading Page..." />}>
                    <AppRoutes />
                </Suspense>

            </LoadingProvider>
        </ThemeProvider>
    );
}

export default App;