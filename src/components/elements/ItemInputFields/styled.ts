import styled from 'styled-components';

export const Wrapper = styled.div`
padding: ${({ theme }) => `${theme.padding.lg} 0`};
    width: 100%;
    
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    grid-template-rows: auto auto;
    align-items: center;
    gap: 2rem;
    &:first-child {
        grid-column: 1 / span 1;
    }
    &:nth-child(2) {
        grid-column: 2 / span 1;
    }
`;

export const Unit = styled.div`
    min-width: 1rem;
    ::after {
        content: '.';
        visibility: hidden;
    }
`;

export const Row = styled.div`
    grid-column: 1 / span 2;
    grid-row: 2 / span 1;
    width: 100%;

    display: flex;
    justify-content: center;
    gap: 1rem;
    & > button {
        width: 100%;
    }
`;

export const Name = styled.div`
    text-transform: capitalize;
    font-weight: bold;
    text-align: center;
`;