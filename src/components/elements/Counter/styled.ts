import styled from 'styled-components';

export const Input = styled.input`
    width: ${({ theme }) => `calc(${theme.font.size.standard}*1.5)`};
    text-align: center; 
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;