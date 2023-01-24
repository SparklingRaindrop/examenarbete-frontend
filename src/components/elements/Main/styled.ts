import styled from 'styled-components';

export const Wrapper = styled.main`
    min-height: 100vh;
    max-width: 100vw;
    margin: 2rem 0;
    padding: ${({ theme }) => theme.padding.md};

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
`;