import styled from 'styled-components';
import { screenSize } from '../../../../../util/mediaQuery';

const Flex = styled.div`
    display: flex;
    gap: 0.5rem;
`;

export const FlexRow = styled(Flex)`
    padding: 0 2rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    text-transform: capitalize;
`;

export const Result = styled(Flex)`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media ${screenSize.md} {
        max-width: 32rem;
    }
`;