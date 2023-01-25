import styled from 'styled-components';
import { screenSize } from '../../../util/mediaQuery';

export const Wrapper = styled.div`
    width: 100%;
    margin: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

    @media ${screenSize.md} {
        width: 100%;
    }
`;

export const Heading = styled.h3`
    text-transform: capitalize;
`;