import styled from 'styled-components';
import { StyledListItem, UnorderedList } from '../../../../elements/List/styled';

export const List = styled(UnorderedList)`
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

export const ListItem = styled(StyledListItem)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0;
`;

export const Title = styled.h3`
    margin-right: auto;
    text-transform: capitalize;
`;