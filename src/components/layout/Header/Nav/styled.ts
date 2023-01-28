import styled from 'styled-components';
import { screenSize } from '../../../../util/mediaQuery';

export const Wrapper = styled.nav<{ isOpen: boolean }>`
    min-width: 50vw;
    height: 100vh;
    padding: 0.5rem 0;

    background-color: inherit;

    position: absolute;
    top: 100%;
    transform: translateX(-110%);
    left: 0;

    transition: transform .2s ease-in;
    ${({ isOpen }) => isOpen && 'transform: translateX(0%);'}
    ${({ isOpen }) => isOpen && 'box-shadow: 0.25rem 0rem 0rem #becfc2;'}

    @media ${screenSize.md} {
        min-width: 25vw;
    }
`;

export const Menu = styled.menu`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    list-style: none;
    background-color: inherit;
`;

export const MenuItem = styled.li<{ isCurrent: boolean }>`
    padding: ${({ theme }) => `${theme.padding.lg} ${theme.padding.md}`};

    text-align: center;
    text-transform: capitalize;

    /* isCurrent Stylings */
    background-color: ${({ theme, isCurrent }) => isCurrent ? theme.palette.white : 'inherit'};
    border-top-left-radius: ${({ theme, isCurrent }) => isCurrent ? theme.borderRadius.lg : 'none'};
    border-bottom-left-radius: ${({ theme, isCurrent }) => isCurrent ? theme.borderRadius.lg : 'none'};
    ${({ isCurrent }) => isCurrent && 'transform: translateX(calc(0.25rem + 5%));'}
    ${({ isCurrent }) => isCurrent && 'width: 95%;'}

    & a {
        color: ${({ theme }) => theme.palette.black};
    }

    :hover {
        background-color: ${({ theme }) => theme.palette.primary.shade};
        cursor: pointer;
    }

    transition: all .1s ease-in;
`;