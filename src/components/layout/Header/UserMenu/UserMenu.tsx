import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useLogin } from '../../../../hooks';
import useUserContext from '../../../../hooks/useUserContext';
import { Status } from '../../../../types/statusCode';
import { Button, Input, PasswordInput } from '../../../elements';
import { Wrapper } from './styled';

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
        <Wrapper>
            <Input
                value={userInput.identifier}
                id='identifier'
                onChange={handleOnChange} />
            <PasswordInput
                value={userInput.password}
                onChange={handleOnChange} />
            {
                isLoggedIn ? (
                    <Button
                        label='LoginOut'
                        onClick={handleOnLogOut} />
                ) : (
                    <Button
                        label='Login'
                        onClick={handleOnLogin} />
                )
            }
            <div>
                <p>Don&#39;t have an account?</p>
                <Link href='/user/new'>Create account</Link>
            </div>
        </Wrapper>
    )
}