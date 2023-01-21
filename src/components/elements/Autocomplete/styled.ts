import styled from 'styled-components';

export const SuggestionList = styled.ul`
    width: 100%;

    display: flex;
    flex-direction: column;

    position: absolute;
    top: 100%;

    list-style: none;
`;

export const SuggestionItem = styled.li<{ isSelected?: boolean }>`
    width: 100%;
    border-style: solid;
    border-width: 1px;
    border-color: ${({ isSelected }) => isSelected ? 'tomato' : 'black'};
`;

export const Wrapper = styled.div`
    width: 100%;
    position: relative;
`;