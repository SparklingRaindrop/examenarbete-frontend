import styled from 'styled-components';
import { screenSize } from '../../../util/mediaQuery';

export const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    @media ${screenSize.sm} {
        max-width: 32rem;
    }
`;