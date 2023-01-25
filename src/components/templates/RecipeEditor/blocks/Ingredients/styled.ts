import styled from 'styled-components';

export const IngredientList = styled.ul`
    padding: 0 2rem;

    display: flex;
    flex-direction: column;

    list-style: none;
`;

export const IngredientListItem = styled.li`
    padding: 0.5rem 0;

    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    align-items: center;
`;

export const ItemName = styled.span`
    font-weight: bold;
    text-transform: capitalize;
    font-size: 1.1em;
`;

export const Amount = styled.span`
    margin-left: auto;
`;