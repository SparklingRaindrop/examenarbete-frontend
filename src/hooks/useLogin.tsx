import Cookie from 'js-cookie';
import { Status } from '../types/statusCode';
import { APIResponse, isPostResponse, post } from '../util/api';

type LoginOption = 'username' | 'email';

export interface Token {
    token: string | null;
}

export type LoginData = {
    password: string;
} & {
        [key in LoginOption as string]: string
    };

export function useLogin(): {
    login: (data: LoginData) => Promise<APIResponse>;
} {
    async function login(data: LoginData): Promise<APIResponse> {
        const response = await post<Token>('/auth/login', data);
        const { status, error } = response;
        if (isPostResponse(response) && status === Status.Created) {
            const { token } = response.data;
            Cookie.set('token', JSON.stringify(token));
        }
        return { status, error };
    }

    return { login };
}