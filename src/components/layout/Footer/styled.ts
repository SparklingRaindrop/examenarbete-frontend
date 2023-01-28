import styled from 'styled-components';

export const Wrapper = styled.footer`
    width: 100%;
    height: 3.5rem;
    padding: ${({ theme }) => theme.padding.sm};

    background-color: ${({ theme }) => theme.palette.primary.original};
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 0.7rem;
    box-shadow: 0rem -0.25rem 0rem #becfc2;
`;
