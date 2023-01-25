import styled from 'styled-components';
import { Button } from '../../../../elements';

const Flex = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

export const Wrapper = styled(Flex)`
    padding: 1.5rem 0.5rem;

    flex-direction: column;
    gap: 1rem;

    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color:  ${({ theme }) => theme.palette.primary.light};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export const FlexRow = styled(Flex)`
    flex-direction: row;
    justify-content: space-between;
    gap: 0.25rem;
`;

export const Switcher = styled(FlexRow)`
    justify-content: flex-end;
`;

export const Day = styled.button<{
    isSelected: boolean,
    isToday: boolean
}>`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;

    background-color: ${({ theme, isSelected }) => isSelected ? theme.palette.secondary.original : theme.palette.secondary.light};
    border:  ${({ theme, isToday }) => isToday ? theme.palette.accent.original : 'transparent'} 1px solid;
    border-radius: ${({ theme }) => theme.borderRadius.md};

    color: ${({ theme, isSelected }) => isSelected ?
        theme.palette.white :
        theme.palette.black
    };

    font-size: 0.8rem;
    & span.day {
        font-size: 1.5rem;
        font-weight: bold;
    }
`;

export const Week = styled(Button)`
    padding: 0.5rem 1rem;
`;

export const Month = styled.h3`
    width: 100%;
`;
