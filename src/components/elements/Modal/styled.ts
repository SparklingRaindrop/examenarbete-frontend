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
    box-shadow: 0rem -0.25rem 0rem #becfc2;

    overflow-y: auto;
    z-index: 150;
`;