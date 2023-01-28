import { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import useTheme from '../../hooks/useTheme';
import { dark, light, padding, palette, theme } from './theme';

type Props = {
    children: ReactNode
}

export function ThemeProvider(props: Props) {
    const { children } = props;
    const { currentTheme, toggleTheme } = useTheme();

    const currentScreenSize = 'sm';
    const currentPalette = currentTheme === 'light' ? light : dark;
    const themeValue = {
        ...theme,
        palette: {
            ...palette,
            ...currentPalette,
        },
        padding: padding[currentScreenSize],
        toggleTheme
    };

    return (
        <StyledThemeProvider theme={themeValue}>
            {children}
        </StyledThemeProvider>
    );
}