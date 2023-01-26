import axios, { HttpStatusCode } from 'axios';
import Cookies from 'js-cookie';
import { ChangeEvent, useState } from 'react';
import { IsError } from '../types/error';
import { Status } from '../types/statusCode';
import { APIResponse } from '../util/api';
import { setToken, Token } from '../util/token';

type UserInput = {
    identifier: string;
    password: string;
}

export type LoginData = { password: string; } & Partial<Pick<User, 'username' | 'email'>>

export function useLogin() {
    const [userInput, setUserInput] = useState<UserInput>({
        identifier: '',
        password: ''
    });
    const [isError, setIsError] = useState<IsError>({ isError: false, error: '' });

    function handleOnChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { value, id } = event.target;
        if (isError.isError) {
            setIsError({ isError: false, error: '' });
        }
        setUserInput(prev => ({
            ...prev,
            [id]: value,
        }));
    }

    async function login(): Promise<{ status: Status }> {
        const data = { ...userInput } as { [key: string]: string };
        if (userInput.identifier.includes('@')) {
            data.email = userInput.identifier;
            delete data.identifier;
        } else {
            data.username = userInput.identifier;
            delete data.identifier;
        }
        const { status, error } = await handleLogin(data as LoginData);
        if (status !== Status.Created) {
            setIsError(({
                error: error ? error : '',
                isError: true,
            }));
        }
        return { status };
    }

    async function handleLogin(loginData: LoginData): Promise<APIResponse> {
        try {
            const response = await axios.post<Token>(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, loginData, {
                headers: {
                    Accept: 'application/json',
                },
            });

            if (response && response.data && response.status === Status.Created) {
                setToken(response.data);
                const user = { ...loginData } as Partial<User>;
                delete user.password;
                Cookies.set('user', JSON.stringify(user));
            }
            return {
                status: response.status
            };
        } catch (error: unknown) {
            console.error(error);
        };
        return {
            status: Status.BadRequest,
        };
    }

    async function logout() {
        try {
            const response = await axios.post<Token>(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`);

            if (response && response.status === Status.Succuss) {
                Cookies.remove('accessToken');
                Cookies.remove('user');
                Cookies.remove('refresh_token');
            }
            return {
                status: response.status
            };
        } catch (error: unknown) {
            console.error(error);
        };
        return {
            status: Status.BadRequest,
        };
    }

    return {
        userInput,
        isError,
        login,
        logout,
        handleOnChange,
    };
}