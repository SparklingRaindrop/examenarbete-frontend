import styled from 'styled-components';

export const Form = styled.form`
    max-width: 20rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const Box = styled.div`
    text-align: center;
    color: ${({ theme }) => theme.palette.accent.original}
`;