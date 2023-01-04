import 'styled-components';

export type MediaQuery = 'xs' | 'sm' | 'md' | 'lg';

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

type FontSize = 'sm' | 'standard' | 'lg';
export interface Font {
    size: Record<FontSize, string>
}

type PaddingVariation = 'sm' | 'md' | 'lg';
export type Padding = Record<PaddingVariation, string>

declare module 'styled-components' {
    export interface DefaultTheme {
        border: Border;
        font: Font;
        palette: Palette;
        padding: Padding;
        toggleTheme: () => void;
    }
}