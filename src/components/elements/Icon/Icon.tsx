import { CSSProperties } from 'react';
import { Path, path } from './path';
import { Svg, Wrapper } from './styled';

type Props = {
    name: Path;
    size?: FontSize;
    title?: string;
} & CustomCSSProperties & CSSProperties;

export default function Icon(props: Props) {
    const { name, size, title } = props;

    return (
        <Wrapper title={title}>
            <Svg size={size}>
                {
                    path[name].map((stroke, index) => (
                        <path
                            key={index}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d={stroke} />
                    ))
                }
            </Svg>
        </Wrapper>
    );
}