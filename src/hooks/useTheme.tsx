import { useState } from 'react';

export default function useTheme() {
    const [currentTheme, setCurrentTheme] = useState<string>('light');

    function toggleTheme() {
        setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
    }
    return {
        currentTheme,
        toggleTheme,
    };
}