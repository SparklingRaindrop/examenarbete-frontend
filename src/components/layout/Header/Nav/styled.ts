import styled from 'styled-components';

export const Wrapper = styled.nav`
    min-width: 50vw;
    overflow-x: auto;

    display: flex;
    flex-direction: column;

    list-style: none;

    background-color: ${({ theme }) => theme.palette.main}80;
    backdrop-filter: blur(10px);

    position: absolute;
    top: 100%;
    left: 0;
`;
