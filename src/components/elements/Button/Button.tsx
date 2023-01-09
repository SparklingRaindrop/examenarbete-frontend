import { ReactNode } from 'react';
import { Variant } from '../../../types/styled';
import { Wrapper } from './styled';

export interface ButtonProps extends GeneralProps {
    onClick?: () => void;
    label?: string;
    variant?: Variant;
    disabled?: boolean;
};

export default function Button(props: ButtonProps) {
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