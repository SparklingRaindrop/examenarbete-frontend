import styled from 'styled-components';

const Flex = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
`;

export const Wrapper = styled(Flex)`
    flex-direction: column;
    padding-left: 2rem;
`;

export const Plan = styled(Flex)`
    padding-left: ${({ theme }) => theme.padding.md};

    justify-content: space-between;

    background-color: ${({ theme }) => theme.palette.white};
    border: ${({ theme }) => theme.palette.primary.light} 1px solid;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    box-shadow: ${({ theme }) => theme.boxShadow};

    text-transform: capitalize;
`;

export const Heading = styled.h4`
    font-weight: bold;
`;
