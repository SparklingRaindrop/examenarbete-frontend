import styled from 'styled-components';

export const Wrapper = styled.main`
    min-height: 100vh;
    max-width: 100vw;
    margin-top: 3.5rem; // Header height
    padding: ${({ theme }) => theme.padding.md};

    display: flex;
    flex-direction: column;
    align-items: center;
`;