import styled from 'styled-components';

export const Wrapper = styled.input.attrs(() => ({
    type: 'checkbox'
}))`
    -webkit-appearance: none;
    appearance: none;
    width: ${({ theme }) => theme.font.size.standard};
    height: ${({ theme }) => theme.font.size.standard};
    border-radius: 0.15em;
    margin-right: 0.5em;
    border: 0.15em solid ${({ theme }) => theme.palette.primary};
    outline: none;
    cursor: pointer;

    &:checked {
        background-color: ${({ theme }) => theme.palette.primary};
        position: relative;
    }

    &:checked::before {
        content:'\\2713';
        color: ${({ theme }) => theme.palette.white};
        position: absolute;
        right: 1px;
        top: -5px;
    }

    &:disabled {
        border-color: ${({ theme }) => theme.palette.disabled};
        background-color: ${({ theme }) => theme.palette.disabled};
    }

    &:focus {
        box-shadow: 0 0 20px ${({ theme }) => theme.palette.primary};
    }
`;