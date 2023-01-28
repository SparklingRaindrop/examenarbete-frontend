import styled from 'styled-components';
import { screenSize } from '../../../util/mediaQuery';

export const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    margin-top: 3rem;

    @media ${screenSize.md} {
        max-width: 32rem;
    }
`;