import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button, IconButton, Input, InputGroup, InputRightElement, Main } from '../components';
import { useAuth } from '../hooks';
import { LoginData } from '../hooks/useAuth';
import { Status } from '../types/statusCode';

type UserInput = {
    identifier: string;
    password: string;
}

type IsError = { isError: Boolean; message: string }

export default function Login() {
    const [userInput, setUserInput] = useState<UserInput>({
        identifier: '',
        password: ''
    });
    const [isShown, setIsShown] = useState<boolean>(false);
    const [isError, setIsError] = useState<IsError>({ isError: false, message: '' });
    const router = useRouter();
    const { login, token } = useAuth();

    useEffect(() => {
        if (token) {
            // TODO: redirect it to dashboard
            router.push('/shoppingList');
        }
        // eslint-disable-next-line
    }, [token]);

    function handleOnChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { value, id } = event.target;
        setUserInput(prev => ({
            ...prev,
            [id]: value,
        }));
    }

    async function handleLogin() {
        const data = { ...userInput } as { [key: string]: string };
        if (userInput.identifier.includes('@')) {
            data.email = userInput.identifier;
            delete data.identifier;
        } else {
            data.username = userInput.identifier;
            delete data.identifier;
        }
        const { status, error } = await login(data as LoginData);
        if (status !== Status.Created) {
            setIsError(({
                message: error ? error : '',
                isError: true,
            }));
        }
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
            <Button
                label='Login'
                onClick={handleLogin}
            />
        </Main>
    );
}