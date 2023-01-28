import styled from 'styled-components';

export const Wrapper = styled.li`
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Name = styled.div`
    width: 10rem;

    font-size: 1.2em;
    display: inline-block;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: normal;
    line-break: strict;
    hyphens: none;
    -webkit-hyphens: none;
    -moz-hyphens: none;

    text-transform: capitalize;
    font-weight: bold;
`;

export const Unit = styled.div`
    font-size: 1rem;
`;

export const Buttons = styled.div`
    display: flex;
    flex-direction: row;
`;