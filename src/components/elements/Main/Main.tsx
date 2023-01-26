import { Wrapper } from './styled';
import { Heebo } from '@next/font/google';
const heebo = Heebo({
    variable: '--text-font',
});

type Props = GeneralProps;

export default function Main(props: Props) {
    const { children } = props;
    return (
        <Wrapper className={heebo.variable}>
            {children}
        </Wrapper>
    );
}