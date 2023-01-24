import { DefaultTheme } from 'styled-components';
import { Border, BorderRadius, Font, Padding } from '../../types/styled';

const border: Border = {
    thin: '1px',
    bold: '0.2rem',
};

const borderRadius: BorderRadius = {
    sm: '0.1rem',
    md: '0.3rem',
    lg: '0.6rem'
};

const font: Font = {
    size: {
        sm: '0.8rem',
        standard: '1rem',
        lg: '2rem',
    }
};

export const padding: Record<MediaQuery, Padding> = {
    sm: {
        sm: '0.4rem',
        md: '0.6rem',
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
    black: '#1F2E21',
    white: '#f9faf9',
};

export const light = {
    primary: {
        original: '#89e219',
        shade: '#79C916',
        light: '#A589F9',
        dull: '#CCC5E0',
        disabled: ''
    },
    secondary: {
        original: '#DAE022',
        shade: '#A8AD1A',
        light: '#E1E667',
        dull: '#E9EACE',
        disabled: ''
    },
    accent: {
        original: '#F72576',
        shade: '#C41D5D',
        light: '#F970A4',
        dull: '#EFD3DE',
        disabled: ''
    },
};

export const dark = {
    primary: {
        original: '#6B3EF7',
        shade: '#5631C4',
        light: '#A589F9',
        dull: '#CCC5E0',
        disabled: ''
    },
    secondary: {
        original: '#DAE022',
        shade: '#A8AD1A',
        light: '#E1E667',
        dull: '#E9EACE',
        disabled: ''
    },
    accent: {
        original: '#F72576',
        shade: '#C41D5D',
        light: '#F970A4',
        dull: '#EFD3DE',
        disabled: ''
    },
};

const boxShadow = '0rem 0.25rem 0rem #becfc2';

export const theme: Omit<DefaultTheme, 'palette' | 'toggleTheme' | 'padding'> = {
    border,
    font,
    borderRadius,
    boxShadow,
};