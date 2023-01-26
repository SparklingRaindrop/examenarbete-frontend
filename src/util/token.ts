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
    try {
        const response = await fetch.post<Token>(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`);
        const { data } = response;
        if (response.status === Status.Created) {
            setToken(data);
        }
        return data.accessToken;
    } catch (_error) {
        if (typeof window !== 'undefined') {
            window.location.href = window.location.origin;
        }
        return Promise.reject(_error);
    }
}

export function setToken(data: Token): void {
    const { accessToken, expires } = data;

    Cookies.set('accessToken', accessToken, { expires: new Date(expires) });
}