import styled from 'styled-components';
import { ScreenSize } from '../../../types/mediaQuery';

export const Container = styled.div`
    width: 100%;
    
    @media ${ScreenSize.MD} {
        max-width: 32rem;
    }
`;