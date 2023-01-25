import styled from 'styled-components';
import { screenSize } from '../../../../../../util/mediaQuery';

export const Wrapper = styled.div`
    width: 70vw;
    margin: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;

    @media ${screenSize.md} {
        width: 100%;
    }
`;