import styled from 'styled-components';
import { screenSize } from '../../../util/mediaQuery';

export const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;

    @media ${screenSize.md} {
        max-width: 32rem;
    }
`;