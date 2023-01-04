import { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from './theme';

type Props = {
    children: ReactNode
}

export function ThemeProvider(props: Props) {
    const { children } = props;

    return (
        <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    );
}