type Props = {}
import { useState } from 'react';
import { Status } from '../types/statusCode';
import { isPostResponse, post } from '../util/api';

type LoginOption = 'username' | 'email';

export interface Token {
    token: string | null;
}

export type LoginData = {
    password: string;
} & {
        [key in LoginOption as string]: string
    };

export function useAuth() {
    const [token, setToken] = useState<Pick<Token, 'token'>>(null as unknown as Pick<Token, 'token'>);

    async function login(data: LoginData) {
        const response = await post<Token>('/auth/login', data);
        const { status } = response;
        if (isPostResponse(response) && status === Status.Created) {
            const { token } = response.data;
            setToken(token);
        }
        return { status };
    }

    return {
        login,
        token,
    };
}