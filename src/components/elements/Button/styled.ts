import styled from 'styled-components';
import { theme } from '../../../context/ThemeProvider/theme';
import { Variant } from '../../../types/styled';

interface ButtonProps {
    variant?: Variant;
}

export const Wrapper = styled.button<ButtonProps>`
    padding: 1rem 1.5rem;

    font-size: 1rem;
    color: ${({ variant, theme }) => {
        switch (variant) {
            case 'ghost':
                return theme.palette.secondary.shade;
                break;
            case 'secondary':
                return theme.palette.black;
                break;
            default:
                return theme.palette.white;
                break;
        }
    }};
    text-transform: capitalize;

    
    display: flex;
    align-items: center;
    justify-content: center;
    
    background-color: ${({ variant, theme }) => {
        switch (variant) {
            case 'ghost':
                return 'transparent';
                break;
            case 'secondary':
                return theme.palette.white;
                break;
            default:
                return theme.palette.primary.original;
                break;
        }
    }};

    border-radius: 2em;
    border: ${({ variant, theme }) => variant === 'secondary' ? theme.palette.secondary.original : 'transparent'} 2px solid;
    ${({ variant, theme }) => !variant && (
        `
        box-shadow: -4px -4px 8px 0px #ffffff80;
        box-shadow: 4px 4px 8px 0px ${theme.palette.primary.dull}80;
        `
    )};

    &:hover {
        cursor: pointer;
            background-color: ${({ variant, theme }) => {
        switch (variant) {
            case 'ghost':
                return 'transparent';
                break;
            case 'secondary':
                return `${theme.palette.secondary.light}20`;
                break;
            default:
                return theme.palette.primary.shade;
                break;
        }
    }};
    }

    &:active {
        background-color: ${({ variant, theme }) => {
        switch (variant) {
            case 'ghost':
                return 'transparent';
                break;
            case 'secondary':
                return theme.palette.secondary.light;
                break;
            default:
                return theme.palette.primary.light;
                break;
        }
    }};
    }

    &:disabled {
        background-color: rgba(79, 66, 120, 0.44);
        color:  rgba(244, 247, 240, 0.59);
    }

`;

export const IconButtonWrapper = styled(Wrapper)`
    min-width: 1.5rem;
    min-height: 1.5rem;
`;