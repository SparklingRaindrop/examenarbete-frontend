import { ReactNode } from 'react';
import { Variant } from '../../../types/styled';
import { Wrapper } from './styled';

type Props = {
    onClick?: () => void;
    label?: string;
    variant?: Variant;
    disabled?: boolean;
} & GeneralProps;

export default function Button(props: Props) {
    const { onClick, label, children, variant, disabled } = props;

    return (
        <Wrapper
            variant={variant}
            onClick={onClick}
            disabled={disabled}>
            {label}
            {children}
        </Wrapper>
    );
}