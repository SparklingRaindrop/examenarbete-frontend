import styled from 'styled-components';

export const UnorderedList = styled.ul<Pick<CustomCSSProperties, 'py' | 'px'>>`
    width: 100%;
    padding: ${({ theme, px, py }) => `${py || theme.padding.md} ${px || theme.padding.md}`};
`;

export const StyledListItem = styled.li<Pick<CustomCSSProperties, 'gap'>>`
    width: 100%;
    padding: ${({ theme }) => `${theme.padding.sm} ${theme.padding.md}`};
    
    list-style: none;
`;