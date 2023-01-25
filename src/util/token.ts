import axios from 'axios';
import Cookies from 'js-cookie';
import { Status } from '../types/statusCode';
import { fetch } from './api';

export interface Token {
    accessToken: string;
    refreshToken: string;
    expires: string;
}

export async function refreshAccessToken(): Promise<Token['accessToken']> {
    const response = await fetch.post<Token>(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`);
    const { data } = response;
    if (response.status === Status.Created) {
        setToken(data);
    }
    return data.accessToken;
}

export function setToken(data: Token): void {
    const { accessToken, expires } = data;

    Cookies.set('access_token', accessToken, { expires: new Date(expires) });

    /*     Cookies.set('refresh_token', refreshToken, {
            secure: true,
            expires: 1
        }); */
}