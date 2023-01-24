import styled from 'styled-components';
import { UnorderedList } from '../../../../elements/List/styled';

export const Wrapper = styled(UnorderedList)`
    width: 100%;

    padding: ${({ theme }) => `${theme.padding.sm} 0`};
    justify-content: center;
`;

export const LabelButton = styled.button`
    width: 100%;

    padding: ${({ theme }) => `${theme.padding.sm} 0`};

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    font-size: 1.5rem;

    border: none;
    background-color: ${({ theme }) => theme.palette.white};

    :hover {
        cursor: pointer;
    }
`;