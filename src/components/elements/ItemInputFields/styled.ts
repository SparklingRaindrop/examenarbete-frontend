import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    
    display: grid;
    grid-template-columns: 1fr 3rem auto max-content;
    grid-template-rows: auto auto;
    align-items: center;
    gap: 2rem 0.5rem;

    :nth-child(1) {
        grid-column: 1 / span 1;
    }
    :nth-child(2) {
        grid-column: 2 / span 1;
    }
    :nth-child(3) {
        grid-column: 3 / span 1;
    }
    :nth-child(4) {
        grid-column: 4 / span 1;
    }
`;

export const Unit = styled.div`
    min-width: 2rem;
    ::after {
        content: '.';
        visibility: hidden;
    }
`;

export const Row = styled.div`
    grid-column: 1 / span 4;
    width: 100%;

    display: flex;
    justify-content: center;
    gap: 1rem;
`;