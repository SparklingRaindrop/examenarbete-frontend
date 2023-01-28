import styled from 'styled-components';

interface IconProps {
    size?: FontSize;
}

export const Wrapper = styled.div`
    display: grid;
    place-content: center;
`;

export const Svg = styled.svg.attrs<IconProps>(() => ({
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    strokeWidth: '1.5',
    stroke: 'currentColor',
})) <IconProps>`
    width: ${({ theme, size }) => size ? theme.font.size[size] : '1.5rem'};
    height: inherit;
`;