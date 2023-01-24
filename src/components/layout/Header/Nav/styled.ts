import styled from 'styled-components';
import { ScreenSize } from '../../../../types/mediaQuery';

export const Wrapper = styled.nav<{ isOpen: boolean }>`
    min-width: 50vw;
    height: 100vh;

    background-color: inherit;

    position: absolute;
    top: 100%;
    left: 0;

    transition: transform .2s ease-in;
    ${({ isOpen }) => isOpen && 'transform: translateX(-100%);'}

    @media ${ScreenSize.MD} {
        min-width: 25vw;
    }
`;

export const Menu = styled.ul`
    width: 100%;

    display: flex;
    flex-direction: column;

    list-style: none;
    background-color: inherit;
`;

export const MenuItem = styled.li`
    padding: ${({ theme }) => `${theme.padding.lg} ${theme.padding.md}`};
`;