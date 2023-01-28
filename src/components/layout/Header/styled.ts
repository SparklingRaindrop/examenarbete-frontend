import styled from 'styled-components';

export const Wrapper = styled.header`
    max-width: 100vw;
    height: 3.5rem;
    padding: ${({ theme }) => `0 ${theme.padding.md}`};

    position: sticky;
    top: 0;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.palette.primary.original};
    z-index: 150;
`;

export const RightAlignBox = styled.span`
    margin-left: auto;
`;