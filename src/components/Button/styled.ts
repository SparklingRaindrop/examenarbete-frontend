import styled from 'styled-components';

export const Wrapper = styled.button`
    min-width: ${({ theme }) => theme.font.size.standard};
    min-height: ${({ theme }) => theme.font.size.standard};

    display: flex;
    align-items: center;
    justify-content: center;
`;
