import 'styled-components';

interface Palette {
    black: string;
    white: string;
    primary: string;
    secondary: string;
    disabled: string;
}

type BorderSize = 'thin' | 'bold';
export interface Border {
    size: Record<BorderSize, string>;
}

type FontSize = 'small' | 'standard' | 'large';
export interface Font {
    size: Record<FontSize, string>
}

declare module 'styled-components' {
    export interface DefaultTheme {
        border: Border;
        font: Font;
        palette: Palette;
        toggleTheme: () => void;
    }
}