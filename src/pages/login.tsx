import { useRouter } from 'next/router';
import { Button, Input, PasswordInput, Main } from '../components';
import { useLogin } from '../hooks';
import { Status } from '../types/statusCode';

export default function Login() {
    const {
        userInput,
        isError,
        handleOnChange,
        login
    } = useLogin();
    const router = useRouter();

    async function handleOnClick() {
        const { status } = await login();
        if (status === Status.Created) {
            router.push('/user');
        }
    }

    return (
        <Main>
            <Input
                value={userInput.identifier}
                id='identifier'
                onChange={handleOnChange} />
            <PasswordInput
                value={userInput.password}
                onChange={handleOnChange}
                handleSubmit={handleOnClick}
            />
            <div>{isError.isError && isError.error}</div>
            <Button
                label='Login'
                onClick={handleOnClick}
            />
        </Main>
    );
}