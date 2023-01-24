import styled from 'styled-components';
import { StyledListItem } from '../../../../elements/List/styled';

export const TextContent = styled.div<{ isChecked: boolean; }>`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & > label {
        overflow: hidden;

        word-break: break-all;
        text-transform: capitalize;
        white-space: pre-line;
        min-width: min-content;
        text-decoration: ${({ isChecked }) => isChecked ? 'line-through' : 'none'};
    }

    & > div.count {
        font-size: 1rem;
        color: ${({ theme, isChecked }) => theme.palette.black + (isChecked ? '80' : '')};
    }
`;