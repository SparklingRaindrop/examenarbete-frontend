import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    padding: 1.5rem;

    position: fixed;
    bottom: 0;
    top: 30%;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    background-color: ${({ theme }) => theme.palette.white};
    border-top-left-radius: ${({ theme }) => theme.borderRadius.lg};
    border-top-right-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    text-transform: capitalize;
`;

export const Result = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
`;