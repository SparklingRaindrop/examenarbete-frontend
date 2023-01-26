import styled from 'styled-components';

const Flex = styled.div`
    width: 100%;
    
    display: flex;
    align-items: center;
`;

export const H3 = styled.h3`
    width: 100%;
    padding: 3rem 0 0.5rem;
    border-bottom: ${({ theme }) => `${theme.palette.accent.original} ${theme.border.bold}`} solid;
    font-size: 1.2em;
`;

export const Wrapper = styled(Flex)`
    padding-bottom: calc(0.5rem + 0.25rem);
    flex-direction: column;
    gap: 2rem;

    :first-of-type > ${H3} {
        padding: 0 0 0.5rem;
    }
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

export const Text = styled.p`
    padding: 3rem;
    text-align: center;
`;