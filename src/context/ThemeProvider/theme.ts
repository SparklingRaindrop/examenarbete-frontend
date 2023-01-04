import { DefaultTheme } from 'styled-components';
import { Border, Font, Palette } from '../../types/styled';

const border: Border = {
    size: {
        thin: '1px',
        bold: '5px',
    }
};

const font: Font = {
    size: {
        small: '0.8rem',
        standard: '1rem',
        large: '2rem',
    }
};

export const palette = {
    black: '#222831',
    white: '#ffffff',
};

export const light = {
    primary: 'tomato',
    secondary: '#ffffff',
    disabled: ''
};

export const dark = {
    primary: '#709fb0',
    secondary: '#ffffff',
    disabled: ''
};

export const theme: Omit<DefaultTheme, 'palette' | 'toggleTheme'> = {
    border,
    font,
};