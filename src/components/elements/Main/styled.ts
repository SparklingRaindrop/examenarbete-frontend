import styled from 'styled-components';
import { screenSize } from '../../../util/mediaQuery';

export const Wrapper = styled.main`
    min-height: 100vh;
    margin: 2rem auto;
    padding: ${({ theme }) => theme.padding.md};

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    @media ${screenSize.md} {
        max-width: 62.5rem;
    }
`;