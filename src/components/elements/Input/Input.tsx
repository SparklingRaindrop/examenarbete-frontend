import { ChangeEvent, CSSProperties, HTMLInputTypeAttribute } from 'react';
import { Variant } from '../../../types/styled';
import { ErrorMessage, Wrapper } from './styled';

type Props = {
    value: number | string;
    variant?: Variant;
    autoFocus?: boolean;
    type?: HTMLInputTypeAttribute;
    id?: string;
    isError: boolean;
    error?: string;
    required?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function Input(props: Props & CSSProperties) {
    const { value, autoFocus, id, type, isError, required, error, onChange } = props;

    return (
        <div>
            <Wrapper
                id={id}
                value={value}
                type={type}
                autoFocus={autoFocus}
                isError={isError}
                required={required}
                onChange={onChange} />
            {isError &&
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            }
        </div>
    );
}

/* export function SPInput(props: Props & CSSProperties) {
    const { value, variant, autoFocus, id, type, onChange, onBlur } = props;

    return (
        <Wrapper
            id={id}
            value={value}
            variant={variant}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            autoFocus={autoFocus} />
    );
} */