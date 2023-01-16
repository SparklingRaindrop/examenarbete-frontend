import styled from 'styled-components';
import { StyledListItem } from '../../elements/List/styled';

export const Wrapper = styled.header`
    width: 100vw;
    height: 3.5rem;
    padding: ${({ theme }) => theme.padding.sm};
    background-color: ${({ theme }) => theme.palette.main};

    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: row;
    align-items: center;

    & > div {
        margin: 0 auto;
        font-size: 2rem;
    }
`;

export const Nav = styled.nav`
    min-width: 50vw;

    position: absolute;
    top: 3.5rem;
    bottom: 0;
    left: 0;

    z-index: 100;

    & > ul {
        list-style: none;
    }
`;

export const NavItem = styled(StyledListItem)`
    background-color: ${({ theme }) => theme.palette.main};
    
    &:not(:first-child) {
        border-top: 1px solid ${({ theme }) => theme.palette.white};
    }
`;