import { render } from 'solid-js/web';
import './index.css';
import { Router } from '@solidjs/router';
import App from './app';
import { createEffect } from 'solid-js';
import { themeChange } from 'theme-change'
import { AppProvider } from "./contexts/appContext"


createEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
})

render(
    () => (
        <Router>
            <AppProvider>
                <App />
            </AppProvider>
        </Router>
    ),
    document.getElementById('root') as HTMLElement,
);