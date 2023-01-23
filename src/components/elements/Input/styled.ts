import styled from 'styled-components';

export const InputField = styled.input.attrs(({ type }) => ({
    type: type || 'text',
})) <{ isError?: boolean }>`
    width: 100%;
    padding: ${({ theme }) => theme.padding.md};
    
    outline: none;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background: ${({ theme }) => theme.palette.white}80;
    border: ${({ theme, isError }) =>
        `${theme.border.bold} ${isError ? theme.palette.accent.original : theme.palette.black + '80'}`} solid;
    
    &::placeholder {
        text-transform: capitalize;
    }

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
    justify-content: center;
    align-items: center;

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

export const Label = styled.label`
    width: 100%;
`;

export const Wrapper = styled.div`
    width: 100%;
`;