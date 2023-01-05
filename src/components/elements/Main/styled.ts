import styled from 'styled-components';

export const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${({ theme }) => theme.padding.md};
    min-height: 100vh;
`;