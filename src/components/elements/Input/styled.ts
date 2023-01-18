import styled from 'styled-components';
import { Variant } from '../../../types/styled';

export const Wrapper = styled.input.attrs(({ type }) => ({
    type: type || 'text',
})) <{ isError?: boolean }>`
    padding: ${({ theme }) => theme.padding.md};
    
    outline: none;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background: ${({ theme }) => theme.palette.white}80;
    border: ${({ theme, isError }) =>
        `${theme.border.bold} ${isError ? theme.palette.accent.original : theme.palette.black + '80'}`} solid;

    &:focus {
        border: ${({ theme }) =>
        `${theme.border.bold} ${theme.palette.primary.original}`} solid;
    }

    &:focus {
        border: ${({ theme }) =>
        `${theme.border.bold} ${theme.palette.primary.original}`} solid;
    }

    &:invalid {
        border: ${({ theme }) =>
        `${theme.border.bold} ${theme.palette.accent.original}`} solid;
    }
`;

export const InputGroup = styled.div`
    display:flex;
    flex-direction:row;

    border:1px solid ${({ theme }) => theme.palette.primary};

    & > input {
        flex-grow:2;
        border:none;
    }

    input:focus {
        outline: none;
    }

    &:focus-within { 
        outline: 1px solid ${({ theme }) => theme.palette.primary};
    }
`;

export const InputRightElement = styled.div`
    padding: 2px;
`;

export const ErrorMessage = styled.div`
    color: ${({ theme }) => theme.palette.accent.original};
    font-size: ${({ theme }) => theme.font.size.sm};
    padding: 0.5em 0 ${({ theme }) => theme.padding.sm};
`;