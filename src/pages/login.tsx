import { ChangeEvent, useState } from 'react';
import { Button, IconButton, Input, InputGroup, InputRightElement, Main } from '../components';

type UserInput = {
    identifier: string;
    password: string;
}

export default function Login() {
    const [userInput, setUserInput] = useState<UserInput>({
        identifier: '',
        password: ''
    });
    const [isShown, setIsShown] = useState<boolean>(false);

    function handleOnChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { value, id } = event.target;
        setUserInput(prev => ({
            ...prev,
            [id]: value,
        }));
    }

    return (
        <Main>
            <Input
                value={userInput.identifier}
                id='identifier'
                onChange={handleOnChange} />
            <InputGroup>
                <Input
                    id='password'
                    value={userInput.password}
                    type={isShown ? 'text' : 'password'}
                    onChange={handleOnChange} />
                <InputRightElement>
                    <IconButton
                        name='show'
                        variant='ghost'
                        onMouseDown={() => setIsShown(true)}
                        onMouseUp={() => setIsShown(false)} />
                </InputRightElement>
            </InputGroup>
            <Button label='Login' />
        </Main>
    );
}