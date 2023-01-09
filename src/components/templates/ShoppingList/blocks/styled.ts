import styled from 'styled-components';
import { ListItem } from '../../../elements';

export const Wrapper = styled(ListItem)`
    max-width: 100%;
    padding: ${({ theme }) => theme.padding.sm};

    display: grid;

    grid-template-columns: min-content 1fr min-content min-content;
    align-items: center;
    gap: 0.2rem;

    & > input:first-child {
        grid-column: 1 / span 1;
    }
    
    & > label {
        grid-column: 2 / span 1;
        min-width: min-content;
        overflow: hidden;
        word-break: break-all;
        white-space: pre-line;
    }

    & > div {
        grid-column: 3 / span 1;
    }

    & > button {
        grid-column: 4 / span 1;
    }
`;