import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../theme/themes';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const systemScheme = useColorScheme();
    const [override, setOverride] = useState(null); // null = follow system

    const isDark = override !== null ? override === 'dark' : systemScheme === 'dark';
    const theme = isDark ? darkTheme : lightTheme;

    const toggleTheme = () => setOverride(isDark ? 'light' : 'dark');
    const setAuto = () => setOverride(null);

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setAuto, override }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);