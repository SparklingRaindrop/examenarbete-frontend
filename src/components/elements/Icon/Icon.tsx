import { CSSProperties } from 'react';
import { FontSize } from '../../../types/styled';
import { Path, path } from './path';
import { Wrapper } from './styled'

type Props = {
    name: Path;
    size?: FontSize;
} & CustomCSSProperties & CSSProperties;

export default function Icon(props: Props) {
    const { name, size } = props;

    return (
        <Wrapper size={size}>
            {
                path[name].map((stroke, index) => (
                    <path
                        key={index}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d={stroke} />
                ))
            }
        </Wrapper>
    );
}


