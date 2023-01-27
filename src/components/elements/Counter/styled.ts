import styled from 'styled-components';
import { IconButtonWrapper } from '../Button/styled';

export const Input = styled.input`
    width: 3em;

    text-align: center;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Button = styled(IconButtonWrapper)`
    min-height: min-content;
    min-width: min-content;
    padding: 0.4em 0.2em;
    
    &:hover {
        background-color: ${({ theme }) => theme.palette.primary.dull};
    }
    &:first-of-type {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    &:last-of-type {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
`;