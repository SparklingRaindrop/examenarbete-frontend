import { useRouter } from 'next/router';

import { useLogin } from '../../../../hooks';
import useUserContext from '../../../../hooks/useUserContext';
import { Status } from '../../../../types/statusCode';

import { Button, IconButton, Input, PasswordInput } from '../../../elements';
import { CloseButtonContainer, Container, Div, Text, Wrapper } from './styled';

type Props = {
    isOpen: boolean;
    onClose: () => void;
}
export default function UserMenu(props: Props) {
    const { isOpen, onClose } = props;
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
            onClose();
        }
    }

    async function handleOnLogOut() {
        const { status } = await logout();
        if (status === Status.Succuss) {
            router.push('/');
            onClose();
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
                                placeholder='email or username'
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
            <CloseButtonContainer>
                <IconButton
                    name='xMark'
                    onClick={onClose} />
            </CloseButtonContainer>
        </Container>
    )
}