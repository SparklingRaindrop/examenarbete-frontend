import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    
    display: grid;
    grid-template-columns: 1fr auto auto auto;
    grid-template-rows: auto auto;
    align-items: end;

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
`;