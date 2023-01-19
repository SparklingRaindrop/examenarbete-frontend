import styled from 'styled-components';
import { StyledListItem } from '../../../../elements/List/styled';

export const Wrapper = styled(StyledListItem)`
    max-width: 100%;
    padding: ${({ theme }) => `${theme.padding.sm} 0`};

    gap: 1rem;
    justify-content: center;

    font-size: 1.5rem;
`;