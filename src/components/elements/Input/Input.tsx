import { ChangeEvent, CSSProperties, HTMLInputTypeAttribute, KeyboardEvent } from 'react';
import { Variant } from '../../../types/styled';
import { ErrorMessage, Label, Wrapper } from './styled';

interface Props {
    value: number | string;
    variant?: Variant;
    autoFocus?: boolean;
    type?: HTMLInputTypeAttribute;
    id?: string;
    isError?: boolean;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    label?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
}

export default function Input(props: Props & CSSProperties) {
    const {
        value,
        autoFocus,
        id,
        type,
        isError,
        required,
        error,
        disabled,
        label,
        placeholder,
        onChange,
        onKeyDown
    } = props;

    return (
        <div>
            {label && <Label htmlFor={id}>{label}</Label>}
            <Wrapper
                id={id}
                value={value}
                type={type}
                autoFocus={autoFocus}
                isError={isError}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={onKeyDown} />
            {isError &&
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            }
        </div>
    );
}