import styled from 'styled-components';

export const UnorderedList = styled.ul`
    width: 100%;

    padding: ${({ theme }) => `${theme.padding.sm} 0`};
    justify-content: center;

    list-style: none;
`;

export const StyledListItem = styled.li`
    width: 100%;
    padding: ${({ theme }) => `${theme.padding.sm} 0`};

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    font-size: 1rem;
`;