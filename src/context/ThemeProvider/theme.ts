import { DefaultTheme } from 'styled-components';
import { Border, Font, Padding } from '../../types/styled';

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
        sm: '1rem',
        md: '',
        lg: '',
        none: '0',
    },
    sm: {
        sm: '1rem',
        md: '0.8rem',
        lg: '1rem',
        none: '0',
    },
    md: {
        sm: '',
        md: '',
        lg: '',
        none: '0',
    },
    lg: {
        sm: '',
        md: '',
        lg: '',
        none: '0',
    }
};

export const palette = {
    black: '#090D03',
    white: '#F6F7F5',
};

export const light = {
    main: '#ABF731',
    primary: '#6B3EF7',
    secondary: '#DAE022',
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