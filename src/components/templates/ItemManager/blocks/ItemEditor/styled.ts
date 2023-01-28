import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    padding: 1rem 0;

    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
`;

export const Box = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
`;

export const UnitSelector = styled.select`
    width: 30%;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    border: ${({ theme }) => theme.palette.black}80 solid;
    outline: none;

    &:focus {
        border: ${({ theme }) =>
        `${theme.border.bold} ${theme.palette.primary.original}`} solid;
    }
`;

export const Option = styled.option`
    background: ${({ theme }) => theme.palette.white}80;
    width: 100%;

    :checked {
        background: ${({ theme }) => theme.palette.primary.light};
    }
`;

export const Name = styled.div`
    margin-right: auto;
    font-weight: bold;
    text-transform: capitalize;
    font-size: 1.2em;
`;