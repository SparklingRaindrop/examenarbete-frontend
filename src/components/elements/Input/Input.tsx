import { ChangeEvent, CSSProperties } from 'react';
import { Variant } from '../../../types/styled';
import { Wrapper } from './styled';

type Props = {
    value: number | string;
    variant?: Variant;
    autoFocus?: boolean;
    id?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: () => void;
}

export default function Input(props: Props & CSSProperties) {
    const { value, variant, autoFocus, id, onChange, onBlur } = props;

    return (
        <Wrapper
            id={id}
            value={value}
            variant={variant}
            onChange={onChange}
            onBlur={onBlur}
            autoFocus={autoFocus} />
    );
}