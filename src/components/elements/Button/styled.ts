import styled from 'styled-components';
import { Variant } from '../../../types/styled';

interface ButtonProps {
    variant?: Variant;
}

export const Wrapper = styled.button<ButtonProps>`
    min-width: 1.5rem;
    min-height: 1.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ variant, theme }) => {
        switch (variant) {
            case 'ghost':
                return 'transparent';
                break;

            default:
                return theme.palette.primary;
                break;
        }
    }};
    border-color: ${({ variant, theme }) => {
        switch (variant) {
            case 'ghost':
                return 'transparent';
                break;

            default:
                return theme.palette.primary;
                break;
        }
    }};

    &:hover {
        cursor: pointer;
    }
`;
