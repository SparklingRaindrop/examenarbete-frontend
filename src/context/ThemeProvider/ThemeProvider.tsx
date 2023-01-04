import { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import useTheme from '../../hooks/useTheme';
import { dark, light, palette, theme } from './theme';

type Props = {
    children: ReactNode
}

export function ThemeProvider(props: Props) {
    const { children } = props;
    const { currentTheme, toggleTheme } = useTheme();

    const currentPalette = currentTheme === 'light' ? light : dark;
    const themeValue = {
        ...theme,
        palette: {
            ...palette,
            ...currentPalette,
        },
        toggleTheme
    };

    return (
        <StyledThemeProvider theme={themeValue}>
            {children}
        </StyledThemeProvider>
    );
}