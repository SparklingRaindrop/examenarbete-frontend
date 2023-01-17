import styled from 'styled-components';

export const UnorderedList = styled.ul<Pick<CustomCSSProperties, 'py' | 'px'>>`
    width: 100%;
    padding: ${({ px, py }) => `${py || 0} ${px || 0}`};
`;

export const StyledListItem = styled.li`
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;

    list-style: none;
`;