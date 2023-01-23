import styled from 'styled-components';
import { ScreenSize } from '../../../../types/mediaQuery';

export const Wrapper = styled.menu`
    max-width: 50vw;
    padding: ${({ theme }) => theme.padding.lg};
    overflow-x: auto;

    display: flex;
    flex-direction: column;

    list-style: none;

    background-color: ${({ theme }) => theme.palette.main}80;
    backdrop-filter: blur(10px);

    position: absolute;
    top: 100%;
    right: 0;
`;