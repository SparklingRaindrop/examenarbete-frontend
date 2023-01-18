import styled from 'styled-components';

export const H3 = styled.h3`
    width: 100%;
    border-bottom: ${({ theme }) => theme.palette.accent.original} 1px solid;
`;

export const Wrapper = styled.div`
    width: 100%;
    
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
`;

export const Meal = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    gap: 1rem;
`;

export const MealName = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
    justify-content: space-between;
    gap: 0.25rem;
    text-transform: capitalize;
`;