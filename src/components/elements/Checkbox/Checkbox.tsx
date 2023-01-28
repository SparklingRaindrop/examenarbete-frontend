import { ChangeEvent } from 'react';
import { Flex, Label, Wrapper } from './styled';

type Props = {
    checked: boolean;
    disabled?: boolean;
    label?: string;
    crossOffOnChecked?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox(props: Props) {
    const { checked, disabled, label, crossOffOnChecked, onChange } = props;

    return (
        <Flex>
            <Wrapper
                checked={checked}
                onChange={onChange}
                disabled={disabled} />
            {
                label &&
                <Label
                    isCrossedOff={crossOffOnChecked && checked}>
                    {label}
                </Label>
            }
        </Flex>
    );
}