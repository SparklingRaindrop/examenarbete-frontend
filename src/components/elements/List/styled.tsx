import styled from 'styled-components';

export const UnorderedList = styled.ul`
    width: 100%;
    padding: ${({ theme }) => theme.padding.md};
`;

export const StyledListItem = styled.li`
    width: 100%;
    padding: ${({ theme }) => `${theme.padding.sm} ${theme.padding.md}`};
    
    display: flex;
    flex-direction: row;
    align-items: center;
    
    list-style: none;
`;