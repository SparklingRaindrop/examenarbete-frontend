import styled from 'styled-components';

const Flex = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
`;

export const Wrapper = styled(Flex)`
    flex-direction: column;
`;

export const Meal = styled(Wrapper)`
    gap: 1rem;
`;

export const MealName = styled(Flex)`
    justify-content: space-between;
    gap: 0.25rem;
    text-transform: capitalize;
`;

export const Plan = styled(Flex)`
    padding: ${({ theme }) => theme.padding.sm};

    background-color: ${({ theme }) => theme.palette.primary.dull};
    border: ${({ theme }) => theme.palette.primary.light} 1px solid;
`;
