import { ChangeEvent, CSSProperties, HTMLInputTypeAttribute, KeyboardEvent } from 'react';
import { IsError } from '../../../types/error';
import { Variant } from '../../../types/styled';
import { ErrorMessage, Label, Wrapper, InputField } from './styled';

interface Props {
    value: number | string;
    variant?: Variant;
    autoFocus?: boolean;
    type?: HTMLInputTypeAttribute;
    id?: string;
    isError?: IsError;
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
        textAlign,
        onChange,
        onKeyDown
    } = props;

    return (
        <Wrapper>
            {label && <Label htmlFor={id}>{label}</Label>}
            <InputField
                id={id}
                value={value}
                type={type}
                textAlign={textAlign}
                autoFocus={autoFocus}
                isError={isError?.isError}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={onKeyDown} />
            {isError?.isError &&
                <ErrorMessage>
                    {isError?.error}
                </ErrorMessage>
            }
        </Wrapper>
    );
}