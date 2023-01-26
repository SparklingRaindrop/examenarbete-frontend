import styled from 'styled-components';

export const Box = styled.div`
    padding: ${({ theme }) => theme.padding.lg};

    background-color: ${({ theme }) => theme.palette.secondary.original};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
`;