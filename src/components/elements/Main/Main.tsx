import { ReactNode } from 'react';
import { Wrapper } from './styled';

type Props = GeneralProps;

export default function Main(props: Props) {
    const { children } = props;
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}