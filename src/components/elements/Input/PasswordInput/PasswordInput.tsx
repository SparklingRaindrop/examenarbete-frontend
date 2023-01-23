import { ChangeEvent, useState } from 'react';
import { IconButton } from '../../Button'
import Input from '../Input'
import { InputGroup, InputRightElement } from '../styled'

type Props = {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput(props: Props) {
    const { value, onChange } = props;
    const [isShown, setIsShown] = useState<boolean>(false);
    return (
        <InputGroup>
            <Input
                id='password'
                value={value}
                type={isShown ? 'text' : 'password'}
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