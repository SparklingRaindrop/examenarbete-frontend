import { ButtonHTMLAttributes } from 'react';
import { Variant } from '../../../types/styled';
import { Wrapper } from './styled';

export interface ButtonProps extends GeneralProps {
    onClick?: () => void;
    onMouseUp?: () => void;
    onMouseDown?: () => void;
    label?: string;
    variant?: Variant;
    disabled?: boolean;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
};

export default function Button(props: ButtonProps) {
    const { onClick, onMouseUp, onMouseDown, label, children, variant, disabled } = props;

    return (
        <Wrapper
            variant={variant}
            onClick={onClick}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            disabled={disabled}
            {...props}>
            {label}
            {children}
        </Wrapper>
    );
}