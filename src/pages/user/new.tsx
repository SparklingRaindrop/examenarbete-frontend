import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { Button, Input } from '../../components';
import { Status } from '../../types/statusCode';
import { post } from '../../util/api';

type Props = {}
type UserInput = {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

type IsError = {
    email: boolean;
    username: boolean;
    password: boolean;
    confirmPassword: boolean;
}

const initialUserInput = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
};

const initialIsError = {
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
};

export default function CreateNewAccountPage({ }: Props) {
    const [userInput, setUserInput] = useState<UserInput>(initialUserInput);
    const [isError, setIsError] = useState<IsError>(initialIsError);
    const router = useRouter();

    async function handleOnSubmit(event: FormEvent) {
        event.preventDefault();
        const response = await post('/auth/user', {
            email: userInput.email,
            username: userInput.username,
            password: userInput.password,
        });
        if (response.status === Status.Created) {
            alert('Created!');
            setUserInput(initialUserInput);
        } else {
            alert('Something went wrong!');
        }
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <Input
                id='email'
                label='email'
                value={userInput.email}
                isError={isError.email}
                onChange={(event) => setUserInput(prev => ({
                    ...prev,
                    email: event.target.value,
                }))} />
            <Input
                id='username'
                label='username'
                value={userInput.username}
                isError={isError.username}
                onChange={(event) => setUserInput(prev => ({
                    ...prev,
                    username: event.target.value,
                }))} />
            <Input
                id='password'
                label='password'
                type='password'
                value={userInput.password}
                isError={isError.password}
                onChange={(event) => setUserInput(prev => ({
                    ...prev,
                    password: event.target.value,
                }))} />
            <Input
                id='password-confirmation'
                label='Confirm password'
                type='password'
                value={userInput.confirmPassword}
                isError={isError.confirmPassword}
                onChange={(event) => setUserInput(prev => ({
                    ...prev,
                    confirmPassword: event.target.value,
                }))} />
            <Button
                label='Create'
                type='submit' />
        </form>
    )
}