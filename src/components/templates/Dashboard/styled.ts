import styled from 'styled-components';
import { screenSize } from '../../../util/mediaQuery';
import { Text } from '../../elements';

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @media ${screenSize.md} {
        grid-template-columns: repeat(2, 1fr);
    }
`;
export const Box = styled.div`
    padding: ${({ theme }) => theme.padding.lg};

    display: grid;
    place-content: center;

    background-color: ${({ theme }) => theme.palette.secondary.original};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: ${({ theme }) => theme.boxShadow};

    &:hover {
        box-shadow: none;
        transform: translateY(0.25rem);
        cursor: pointer;
    }
`;

export const Bigger = styled.span`
    font-size: 1.2em;
    text-transform: uppercase;
    font-weight: bolder;
`;

export const H2 = styled.h2`
    text-transform: uppercase;
`;

export const Explanation = styled(Text)`
    margin: auto;
    color: ${({ theme }) => theme.palette.secondary.dull};
`;