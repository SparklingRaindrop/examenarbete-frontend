import { ReactNode } from 'react';
import { Wrapper } from './styled';

type Props = {
    onClick?: () => void;
    label?: string;
    children?: ReactNode;
}

export default function Button(props: Props) {
    const { onClick, label, children } = props;

    return (
        <Wrapper
            onClick={onClick}>
            {label}
            {children}
        </Wrapper>
    );
}