import styled from 'styled-components';

export const Wrapper = styled.span`
    position: relative;
`;

export const Menu = styled.div`
    width: max-content;

    position: absolute;
    top: 100%;
    right: 0;
    
    display: flex;
    flex-direction: column;

    overflow: hidden;

    border: 1px solid ${({ theme }) => theme.palette.primary.dull};
    background-color: ${({ theme }) => theme.palette.white};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    box-shadow: ${({ theme }) => theme.boxShadow};

    transition: all 0.2s ease-in;
    
    z-index: 100;
`;

export const MenuItem = styled.button`
    padding: ${({ theme }) => `${theme.padding.lg} calc(${theme.padding.lg}*2)`};

    text-align: center;
    text-transform: capitalize;

    background-color: ${({ theme }) => theme.palette.white};

    border: none;
    &:not(:last-child) {
        border-bottom: 1px solid ${({ theme }) => theme.palette.primary.dull};
    }

    :disabled {
        color: ${({ theme }) => theme.palette.grey};
        background-color: ${({ theme }) => theme.palette.grey}32;
    }

    :not(:disabled):hover {
        background-color: ${({ theme }) => theme.palette.primary.light};
        cursor: pointer;
    }

    transition: background-color .2s ease-in;
`;