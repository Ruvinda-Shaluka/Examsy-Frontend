import React from 'react';
import { ThemeProvider } from './theme/useTheme.jsx';

import AppRoutes from "./routes/Routes.jsx";

function App() {
    return (
        <ThemeProvider>
            <AppRoutes/>
        </ThemeProvider>
    );
}

export default App;