import { cloneElement, ReactElement } from 'react';
import { Button } from '../Button';

type Props = {
    isEditing: boolean;
    onOpen: () => void;
    label?: string;
    inputElement: ReactElement;
}

export default function InputTogglingButton(props: Props) {
    const { isEditing, label, inputElement, onOpen } = props;

    if (!isEditing) {
        return (
            <Button
                onClick={onOpen}
                label={label || 'add item'} />
        );
    } else {
        return cloneElement(inputElement);
    }

}