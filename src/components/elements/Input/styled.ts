import styled from 'styled-components';
import { Variant } from '../../../types/styled';

type InputVariant = { variant?: Variant };

export const Wrapper = styled.input.attrs(({ type }) => ({
    type: type || 'text',
})) <InputVariant>`
    background: ${({ variant }) => variant === 'ghost' && 'transparent'};
    border: ${({ variant }) => variant === 'ghost' && 'none'};
`;