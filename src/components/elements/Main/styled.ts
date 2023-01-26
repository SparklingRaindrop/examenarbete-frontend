import styled from 'styled-components';
import { screenSize } from '../../../util/mediaQuery';

export const Wrapper = styled.main`
    min-height: calc(100vh - 3.5rem); /* 3.5rem = header height */
    margin: auto;
    padding: ${({ theme }) => theme.padding.md};

    @media ${screenSize.md} {
        max-width: 62.5rem;
    }
`;