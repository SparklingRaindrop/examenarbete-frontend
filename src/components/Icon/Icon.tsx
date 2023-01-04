import { Path, path } from './path';
import { Wrapper } from './styled'

type Props = {
    name: Path;
}

export default function Icon(props: Props) {
    const { name } = props;

    return (
        <Wrapper>
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


