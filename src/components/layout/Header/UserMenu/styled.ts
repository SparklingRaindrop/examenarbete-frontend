import styled from 'styled-components';
import { FlexColumn } from '../../../elements/Flex';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding: ${({ theme }) => theme.padding.lg};

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: grid;
    place-content: center;

    background-color: ${({ theme }) => theme.palette.white}80;
    backdrop-filter: blur(10px);
`;

export const Wrapper = styled(FlexColumn)`
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

export const CloseButtonContainer = styled.div`
    justify-self: center;

    position: relative;
    bottom: -100%;
`;