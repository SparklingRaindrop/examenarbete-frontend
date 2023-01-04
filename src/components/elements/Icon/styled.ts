import styled from 'styled-components';
import { FontSize } from '../../../types/styled';

interface IconProps {
    size?: FontSize;
}

export const Wrapper = styled.svg.attrs<IconProps>(() => ({
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    strokeWidth: '1.5',
    stroke: 'currentColor',
})) <IconProps>`
    width: ${({ theme, size }) => size ? theme.font.size[size] : '1rem'};
    height: inherit;
`;