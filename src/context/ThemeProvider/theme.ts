import { DefaultTheme } from 'styled-components';

const border = {
    size: {
        thin: '1px',
        bold: '5px',
    }
};

const font = {
    size: {
        small: '1rem',
        medium: '1.5rem',
        large: '2rem',
    }
};

const palette = {
    common: {
        black: '#222831',
        white: '#ffffff'
    },
    primary: {
        main: '#726a95',
        contrastText: '#ffffff'
    },
    secondary: {
        main: '#709fb0',
        contrastText: '#ffffff'
    }
};

export const theme: DefaultTheme = {
    border,
    font,
    borderRadius: '4px',
    palette,
};