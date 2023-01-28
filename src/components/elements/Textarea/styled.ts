import styled from 'styled-components';

export const StyledTextarea = styled.textarea.attrs(() => ({
    autoFocus: true,
}))`
    width: 100%;
    height: 5rem;
    padding: ${({ theme }) => theme.padding.md};
    
    outline: none;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background: ${({ theme }) => theme.palette.white}80;
    border: ${({ theme }) => theme.palette.black}80 solid;

    &:focus {
        border: ${({ theme }) =>
        `${theme.border.bold} ${theme.palette.primary.original}`} solid;
    }

    &::placeholder {
        text-transform: capitalize;
    }

    &:invalid {
        border: ${({ theme }) =>
        `${theme.border.bold} ${theme.palette.accent.original}`} solid;
    }
`;