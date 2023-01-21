import styled from 'styled-components';

export const Wrapper = styled.li`
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &:not(:last-of-type) {
        margin-bottom: 1rem;
    }
`;

export const Group = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

export const ItemName = styled.div`
    text-transform: capitalize;
`;