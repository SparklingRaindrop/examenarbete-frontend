import { ChangeEvent } from 'react';
import { Label, Wrapper } from './styled';

type Props = {
    checked: boolean;
    toggle: (event: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    label?: string;
    crossOffOnChecked?: boolean;
}

export default function Checkbox(props: Props) {
    const { checked, disabled, label, crossOffOnChecked, toggle } = props;

    return (
        <>
            <Wrapper
                checked={checked}
                onChange={(event) => toggle(event)}
                disabled={disabled} />
            {
                label &&
                <Label crossOffOnChecked={crossOffOnChecked && !checked}>
                    {label}
                </Label>
            }
        </>
    );
}