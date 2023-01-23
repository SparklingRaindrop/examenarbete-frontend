import { eventNames } from 'process';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { IconButton } from '../../Button';
import Input from '../Input';
import { InputGroup, InputRightElement } from '../styled';

type Props = {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
}

export default function PasswordInput(props: Props) {
    const { value, onChange, handleSubmit } = props;
    const [isShown, setIsShown] = useState<boolean>(false);

    function handleOnKeyDown(event: KeyboardEvent<Element>): void {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    return (
        <InputGroup>
            <Input
                id='password'
                placeholder='password'
                value={value}
                type={isShown ? 'text' : 'password'}
                onKeyDown={handleOnKeyDown}
                onChange={onChange} />
            <InputRightElement>
                <IconButton
                    name='show'
                    variant='ghost'
                    onMouseDown={() => setIsShown(true)}
                    onMouseUp={() => setIsShown(false)} />
            </InputRightElement>
        </InputGroup>
    )
}