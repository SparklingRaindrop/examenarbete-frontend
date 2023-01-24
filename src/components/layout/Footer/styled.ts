import styled from 'styled-components';

export const Wrapper = styled.footer`
    max-width: 100%;
    height: 3.5rem;
    padding: ${({ theme }) => theme.padding.sm};
    background-color: ${({ theme }) => theme.palette.primary.original};
`;
