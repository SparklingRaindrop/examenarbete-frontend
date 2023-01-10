import styled from 'styled-components';
import { Variant } from '../../../types/styled';

type InputVariant = { variant?: Variant };

export const Wrapper = styled.input.attrs(({ type }) => ({
    type: type || 'text',
})) <InputVariant>`
    background: ${({ variant }) => variant === 'ghost' && 'transparent'};
    border: ${({ variant }) => variant === 'ghost' && 'none'};
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