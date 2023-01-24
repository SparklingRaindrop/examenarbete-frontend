import { StringifyOptions } from 'querystring';
import 'styled-components';

export type Variant = 'ghost' | 'secondary';

type ColorVariations = {
    original: string;
    shade: string;
    light: string;
    dull: string;
    disabled: string;
};

interface Palette {
    black: string;
    white: string;
    primary: ColorVariations;
    secondary: ColorVariations;
    accent: ColorVariations;
}

type BorderSize = 'thin' | 'bold';
export interface Border extends Record<BorderSize, string> {
}

export interface Font {
    size: Record<FontSize, string>
}

export type Padding = Record<PaddingVariation, string>

type BorderRadiusVariant = 'sm' | 'md' | 'lg';
export interface BorderRadius extends Record<BorderRadiusVariant, string> {
}

declare module 'styled-components' {
    export interface DefaultTheme {
        border: Border;
        borderRadius: BorderRadius,
        font: Font;
        palette: Palette;
        padding: Padding;
        boxShadow: string;
        toggleTheme: () => void;
    }
}