import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { Button, IconButton, Input, InputGroup, InputRightElement, Main } from '../components';
import { useLogin } from '../hooks';
import { LoginData } from '../hooks/useLogin';
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
    const [loginState, setLoginState] = useState<IsError>({ isError: false, message: '' });
    const { login } = useLogin();
    const router = useRouter();

    function handleOnChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { value, id } = event.target;
        if (loginState.isError) {
            setLoginState({ isError: false, message: '' });
        }
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
            setLoginState(({
                message: error ? error : '',
                isError: true,
            }));
        }
        router.push('/user');
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
            <div>{loginState.isError && loginState.message}</div>
            <Button
                label='Login'
                onClick={handleLogin}
            />
        </Main>
    );
}