import React from 'react';
import { ThemeProvider } from './hooks/useTheme.jsx';

import AppRoutes from "./routes/Routes.jsx";

function App() {
    return (
        <ThemeProvider>
            <AppRoutes/>
        </ThemeProvider>
    );
}

export default App;