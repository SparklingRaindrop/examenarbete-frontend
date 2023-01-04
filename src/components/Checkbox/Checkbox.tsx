import { useState } from 'react';
import { Icon } from '../Icon';
import { Wrapper } from './styled';

type Props = {
    checked: boolean;
    toggle: () => void;
    disabled?: boolean;
}

export default function Checkbox(props: Props) {
    const { checked, disabled, toggle } = props;

    return (
        <Wrapper
            checked={checked}
            onChange={toggle}
            disabled={disabled} />
    );
}