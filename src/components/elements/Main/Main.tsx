import { ReactNode } from 'react';
import { Wrapper } from './styled';

type Props = {
    children: ReactNode;
}

export default function Main(props: Props) {
    const { children } = props;
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}