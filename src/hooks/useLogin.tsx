import axios, { HttpStatusCode } from 'axios';
import Cookies from 'js-cookie';
import { ChangeEvent, useState } from 'react';
import { Status } from '../types/statusCode';
import { APIResponse } from '../util/api';

export interface Token {
    accessToken: string;
    refreshToken: string;
    expires: string;
}

type UserInput = {
    identifier: string;
    password: string;
}

type IsError = { isError: Boolean; message: string }

export type LoginData = { password: string; } & Partial<Pick<User, 'username' | 'email'>>

export function useLogin() {
    const [userInput, setUserInput] = useState<UserInput>({
        identifier: '',
        password: ''
    });
    const [loginState, setLoginState] = useState<IsError>({ isError: false, message: '' });

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
            setLoginState(({
                message: error ? error : '',
                isError: true,
            }));
        }
        return { status };
    }

    async function handleLogin(data: LoginData): Promise<APIResponse> {
        try {
            const response = await axios.post<Token>(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, data, {
                headers: {
                    Accept: 'application/json',
                },
            });

            if (response && response.data && response.status === Status.Created) {
                const { accessToken, refreshToken, expires } = response.data;
                const user = { ...data } as Partial<User>;
                delete user.password;

                Cookies.set('access_token', accessToken, { expires: new Date(expires) });
                Cookies.set('user', JSON.stringify(user));
                Cookies.set('refresh_token', refreshToken, {
                    secure: true,
                    expires: 1
                });
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
        loginState,
        handleOnChange,
        login
    };
}