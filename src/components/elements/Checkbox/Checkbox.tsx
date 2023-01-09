import { ChangeEvent } from 'react';
import { Label, Wrapper } from './styled';

type Props = {
    checked: boolean;
    disabled?: boolean;
    label?: string;
    crossOffOnChecked?: boolean;
    toggle?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox(props: Props) {
    const { checked, disabled, label, crossOffOnChecked, toggle } = props;

    return (
        <>
            <Wrapper
                checked={checked}
                onChange={(event) => {
                    if (!toggle) {
                        throw new Error('Function is undefined');
                    }
                    toggle(event);
                }}
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