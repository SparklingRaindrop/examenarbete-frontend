import styled from 'styled-components';
import { screenSize } from '../../../util/mediaQuery';
import { Container as StyledContainer } from '../../elements';

export const Container = styled(StyledContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
`;