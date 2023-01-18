import styled from 'styled-components';

const Flex = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

export const Wrapper = styled(Flex)`
    flex-direction: column;
    gap: 1rem;
`;

export const FlexRow = styled(Flex)`
    flex-direction: row;
    justify-content: space-between;
    gap: 0.25rem;
`;

export const Switcher = styled(FlexRow)`
    justify-content: flex-end;
`;

export const Day = styled.button<{ selected: boolean }>`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;

    background-color: ${({ theme, selected }) => selected ? theme.palette.secondary.original : theme.palette.white};
    border:  ${({ theme }) => theme.palette.secondary.original} 1px solid;
`;

export const Week = styled.button`
`;
