import { StringifyOptions } from 'querystring';
import 'styled-components';

export type Variant = 'ghost' | 'secondary';

type ColorVariations = {
    original: string;
    shade: string;
    light: string;
    dull: string;
};

interface Palette {
    black: string;
    white: string;
    primary: ColorVariations;
    secondary: ColorVariations;
    Accent: ColorVariations;
    disabled: string;
    main: string;
}

type BorderSize = 'thin' | 'bold';
export interface Border {
    size: Record<BorderSize, string>;
}

export interface Font {
    size: Record<FontSize, string>
}

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