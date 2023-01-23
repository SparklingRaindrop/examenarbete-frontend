import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useLogin } from '../../../../hooks';
import useUserContext from '../../../../hooks/useUserContext';
import { Status } from '../../../../types/statusCode';
import { Button, Input, PasswordInput } from '../../../elements';
import { Container, Div, Text, Wrapper } from './styled';

type Props = {
    isOpen: boolean;
}
export default function UserMenu(props: Props) {
    const { isOpen } = props;
    const {
        userInput,
        isError,
        logout,
        handleOnChange,
        login
    } = useLogin();
    const router = useRouter();
    const { isLoggedIn } = useUserContext();

    async function handleOnLogin() {
        const { status } = await login();
        if (status === Status.Created) {
            router.push('/user');
        }
    }

    async function handleOnLogOut() {
        const { status } = await logout();
        if (status === Status.Succuss) {
            router.push('/');
        }
    }

    if (!isOpen) return null;
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
                            <Input
                                value={userInput.identifier}
                                id='identifier'
                                onChange={handleOnChange} />
                            <PasswordInput
                                value={userInput.password}
                                handleSubmit={handleOnLogin}
                                onChange={handleOnChange} />
                            <Button
                                label='Login'
                                onClick={handleOnLogin} /></>
                    )
                }
                <Div>
                    <Text>Don&#39;t have an account?</Text>
                    <Button
                        variant='ghost'
                        label='Create account'
                        onClick={() => router.push('/user/new')}>
                    </Button>
                </Div>
            </Wrapper>
        </Container>
    )
}