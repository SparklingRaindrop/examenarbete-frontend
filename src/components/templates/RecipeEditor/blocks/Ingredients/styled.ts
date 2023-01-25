import styled from 'styled-components';

export const IngredientList = styled.ul`
    padding: 0 3rem;

    display: flex;
    flex-direction: column;

    list-style: none;
`;

export const IngredientListItem = styled.li`
    padding: 0.5rem 0;

    display: flex;
    flex-direction: row;
    gap: 2rem;
    align-items: center;

    & :nth-child(3) {
        margin-left: auto;
    }
`;

export const ItemName = styled.span`
    font-weight: bold;
    text-transform: capitalize;
    font-size: 1.1em;
`;