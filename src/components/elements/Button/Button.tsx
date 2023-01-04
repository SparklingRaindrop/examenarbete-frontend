import { ReactNode } from 'react';
import { Variant } from '../../../types/styled';
import { Wrapper } from './styled';

type Props = {
    onClick?: () => void;
    label?: string;
    children?: ReactNode;
    variant?: Variant;
}

export default function Button(props: Props) {
    const { onClick, label, children, variant } = props;

    return (
        <Wrapper
            variant={variant}
            onClick={onClick}>
            {label}
            {children}
        </Wrapper>
    );
}