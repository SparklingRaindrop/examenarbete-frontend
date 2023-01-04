import { DefaultTheme } from 'styled-components';
import { Border, Font, MediaQuery, Padding, Palette } from '../../types/styled';

const border: Border = {
    size: {
        thin: '1px',
        bold: '5px',
    }
};

const font: Font = {
    size: {
        sm: '0.8rem',
        standard: '1rem',
        lg: '2rem',
    }
};

export const padding: Record<MediaQuery, Padding> = {
    xs: {
        sm: '',
        md: '',
        lg: '',
    },
    sm: {
        sm: '0.5rem',
        md: '0.8rem',
        lg: '1rem',
    },
    md: {
        sm: '',
        md: '',
        lg: '',
    },
    lg: {
        sm: '',
        md: '',
        lg: '',
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

export const theme: Omit<DefaultTheme, 'palette' | 'toggleTheme' | 'padding'> = {
    border,
    font,
};