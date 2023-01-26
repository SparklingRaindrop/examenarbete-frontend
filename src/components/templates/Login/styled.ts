import styled from 'styled-components';
import { screenSize } from '../../../util/mediaQuery';
import { FlexColumn } from '../../elements/Flex';

export const Wrapper = styled(FlexColumn)`
    margin: auto;
    justify-content: center;
`;

export const Text = styled.p`
    text-align: center;
`;

export const Div = styled(FlexColumn) <{ isHidden?: boolean }>`
    padding: ${({ theme }) => `${theme.padding.lg} 0`};

    justify-content: center;
    align-items: center;

    visibility: ${({ isHidden }) => isHidden ? 'hidden' : 'visible'};
    ${({ isHidden, theme }) => typeof isHidden !== 'undefined' && `color: ${theme.palette.accent.original}`};
`;

export const Container = styled.div`
    width: 100%;
    margin: auto;
    height: calc(100vh - 3.5rem);
    padding: 0 2rem;

    display: grid;
    place-content: center;
    transform: translateY(-3.5rem);

    @media ${screenSize.md} {
        max-width: 20rem;
    }
`; 