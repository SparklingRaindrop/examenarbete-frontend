import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1rem;

    & > div {
        font-weight: bold;
    }

    & > div:nth-child(3n+2) {
        width: 100%;
    }

    & > div:nth-child(3n+3) {
        font-weight: normal;
    }
`;