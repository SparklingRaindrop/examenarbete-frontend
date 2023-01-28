import styled from 'styled-components';

export const Wrapper = styled.div<{ zIndex?: number }>`
    position: sticky;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: ${({ theme }) => theme.palette.black}80;
    backdrop-filter: blur(10px);

    z-index: ${({ zIndex }) => zIndex || 100};
`;