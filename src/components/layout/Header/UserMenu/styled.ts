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

    overflow: overlay;

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

export const Div = styled(FlexColumn)`
    padding: ${({ theme }) => `${theme.padding.lg} 0`};

    justify-content: center;
    align-items: center;
`;