import styled from 'styled-components';
import { screenSize } from '../../../util/mediaQuery';

export const Container = styled.div`
    width: 100%;
    
    @media ${screenSize.md} {
        max-width: 32rem;
    }
`;