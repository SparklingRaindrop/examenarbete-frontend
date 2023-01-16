import styled from 'styled-components';

export const Wrapper = styled.footer`
    width: 100vw;
    height: 3.5rem;
    padding: ${({ theme }) => theme.padding.sm};
    background-color: ${({ theme }) => theme.palette.main};
`;
