import styled from 'styled-components';

export const H3 = styled.h3`
width: 100%;
border-bottom: ${({ theme }) => theme.palette.accent.original} 1px solid;
`;

export const Wrapper = styled.div`
    width: 100%;
    
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;

    &:not(:first-of-type) {
        margin-top: 2rem;
    }
`;