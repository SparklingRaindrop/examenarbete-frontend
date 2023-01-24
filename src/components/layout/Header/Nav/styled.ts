import styled from 'styled-components';
import { ScreenSize } from '../../../../types/mediaQuery';

export const Wrapper = styled.nav<{ isOpen: boolean }>`
    min-width: 50vw;
    height: 100vh;
    padding: 0.5rem 0;

    background-color: inherit;

    position: absolute;
    top: 100%;
    left: 0;

    transition: transform .2s ease-in;
    ${({ isOpen }) => !isOpen && 'transform: translateX(-100%);'}

    @media ${ScreenSize.MD} {
        min-width: 25vw;
    }
`;

export const Menu = styled.ul`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    list-style: none;
    background-color: inherit;
`;

export const MenuItem = styled.li`
    padding: ${({ theme }) => `${theme.padding.lg} ${theme.padding.md}`};

    text-align: center;
    text-transform: capitalize;
    & a {
        color: ${({ theme }) => theme.palette.black};
    }

    :hover {
        background-color: ${({ theme }) => theme.palette.primary.shade};
    }

    transition: background-color .1s ease-in;
`;