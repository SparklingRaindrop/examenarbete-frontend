import axios from 'axios';
import Cookie from 'js-cookie';
import { Status } from '../types/statusCode';
import { APIResponse } from '../util/api';

export interface Token {
    accessToken: string;
    refreshToken: string;
    expires: string;
}

export type LoginData = { password: string; } & Partial<Pick<User, 'username' | 'email'>>

export function useLogin(): {
    login: (data: LoginData) => Promise<APIResponse>;
} {
    async function login(data: LoginData): Promise<APIResponse> {
        try {
            const response = await axios.post<Token>(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, data, {
                headers: {
                    Accept: 'application/json',
                },
            });

            if (response && response.data && response.status === Status.Created) {
                const { accessToken, expires } = response.data;
                Cookie.set('access_token', accessToken, { expires: new Date(expires) });
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

    return { login };
}