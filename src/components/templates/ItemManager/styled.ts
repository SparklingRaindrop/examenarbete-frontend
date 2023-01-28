import styled from 'styled-components';
import { screenSize } from '../../../util/mediaQuery';

export const ItemList = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media ${screenSize.md} {
        max-width: 32rem;
    }
`;