import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLogin, useUserContext } from '../../../hooks';
import { Status } from '../../../types/statusCode';
import { Button, Input, PasswordInput } from '../../elements';
import { Div, Text, Wrapper, Container } from './styled';

export default function Login() {
    const {
        userInput,
        isError,
        logout,
        handleOnChange,
        login
    } = useLogin();
    const router = useRouter();
    const { isLoggedIn, setLoginStatus } = useUserContext();

    useEffect(() => {
        const token = Cookies.get('accessToken');
        if (!token) {
            setLoginStatus(false);
        }
        // eslint-disable-next-line
    }, []);

    async function handleOnLogin(): Promise<void> {
        const { status } = await login();
        if (status === Status.Created) {
            setLoginStatus(true);
            router.push('/user');
        }
    }

    async function handleOnLogOut(): Promise<void> {
        const { status } = await logout();
        if (status === Status.Succuss) {
            setLoginStatus(false);
            router.push('/');
        }
    }

    return (
        <Container>
            <Wrapper>
                {
                    isLoggedIn ? (
                        <Button
                            label='LoginOut'
                            onClick={handleOnLogOut} />
                    ) : (
                        <>
                            <Div isHidden={!isError.isError}>
                                Incorrect username/email or password
                            </Div>
                            <Input
                                value={userInput.identifier}
                                placeholder='email or username'
                                id='identifier'
                                onChange={handleOnChange} />
                            <PasswordInput
                                value={userInput.password}
                                handleSubmit={handleOnLogin}
                                onChange={handleOnChange} />
                            <Button
                                label='Login'
                                onClick={handleOnLogin} />
                            <Div>
                                <Text>Don&#39;t have an account?</Text>
                                <Button
                                    variant='ghost'
                                    label='Create account'
                                    onClick={() => router.push('/user/new')}>
                                </Button>
                            </Div>
                        </>

                    )
                }

            </Wrapper>
        </Container>
    )
}