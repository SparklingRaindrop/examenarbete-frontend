import styled from 'styled-components';
import { StyledListItem } from '../List/styled';

export const SuggestionList = styled.ul`
    width: 100%;
    max-height: 30vh;

    display: flex;
    flex-direction: column;

    position: absolute;
    top: 100%;

    overflow-y: scroll;

    list-style: none;
    box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const SuggestionItem = styled(StyledListItem) <{ isSelected?: boolean }>`
    width: 100%;
    padding: ${({ theme }) => `${theme.padding.lg} calc(${theme.padding.lg}*2)`};

    background-color: ${({ theme }) => theme.palette.white};

    border-style: solid;
    border-width: 1px;
    border-color: ${({ theme, isSelected }) => isSelected ? theme.palette.primary.original : theme.palette.black + '80'};

    text-transform: capitalize;
`;

export const Wrapper = styled.div`
    width: 100%;
    position: relative;
`;