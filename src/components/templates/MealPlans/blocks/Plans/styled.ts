import styled from 'styled-components';

const Flex = styled.div`
    width: 100%;
    
    display: flex;
    align-items: center;
`;

export const H3 = styled.h3`
    width: 100%;
    border-bottom: ${({ theme }) => theme.palette.accent.original} 1px solid;
`;

export const Wrapper = styled(Flex)`
    flex-direction: column;
    gap: 2rem;
`;

export const Meal = styled(Flex)`
    padding: 1rem;

    flex-direction: column;
    gap: 1rem;

    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background-color: ${({ theme }) => theme.palette.primary.light};
`;

export const MealName = styled(Flex)`
    flex-direction: row;
    justify-content: space-between;
    text-transform: capitalize;
`;