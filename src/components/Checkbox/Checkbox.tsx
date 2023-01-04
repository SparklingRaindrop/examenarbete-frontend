import { useState } from 'react';
import { Icon } from '../Icon';
import { Label, Wrapper } from './styled';

type Props = {
    checked: boolean;
    toggle: () => void;
    disabled?: boolean;
    label?: string;
}

export default function Checkbox(props: Props) {
    const { checked, disabled, label, toggle } = props;

    return (
        <>
            <Wrapper
                checked={checked}
                onChange={toggle}
                disabled={disabled} />
            {label && <Label>{label}</Label>}
        </>
    );
}