import axios from 'axios';
import Cookies from 'js-cookie';
import { Status } from '../types/statusCode';
import { refreshAccessToken } from './token';
axios.defaults.withCredentials = true;
export interface GetResponse<T> {
    data?: T;
    status: number;
}

export interface APIResponse {
    status: Status;
    error?: string;
}

export const fetch = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4500',
    timeout: 30000,
    timeoutErrorMessage: 'Time out!',
});

fetch.interceptors.request.use(async (config) => {
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');
    if (!config.url?.includes('login') && !accessToken && refreshToken && config.url?.includes('user')) {
        console.log('here')
        await refreshAccessToken();
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

fetch.interceptors.response.use(
    response => response,
    async (error) => {
        const { config } = error;

        if (error.response.status === 403) {
            const user = Cookies.get('user');
            if (user) {
                await refreshAccessToken();
                const retryRequest = new Promise<void>((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, config.retryDelay || 1000);
                });
                return retryRequest.then(() => axios(config));
            }
        }
        window.location.href = 'http://localhost:3000/login';
        return;
    }
);

const controller = new AbortController();
export async function get<T>(endpoint: string): Promise<GetResponse<T>> {
    try {
        const response = await fetch.get<T>(
            endpoint,
            {
                signal: controller.signal,
            },
        );

        return response;
    } catch (error) {
        console.error(error);
        return {
            status: Status.BadRequest
        };
    }
}

export async function patch<T>(endpoint: string, data: Partial<T>): Promise<APIResponse> {
    try {
        const response = await fetch.patch(endpoint, data, {
            signal: controller.signal,
            headers: {
                Accept: 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        return {
            status: Status.BadRequest
        };
    }
}

export async function remove(endpoint: string): Promise<APIResponse> {
    try {
        const response = await fetch.delete(endpoint, {
            signal: controller.signal,
        });
        return response;
    } catch (error) {
        console.error(error);
        return {
            status: Status.BadRequest
        };
    }
}

export async function post<T>(endpoint: string, payload: any): Promise<APIResponse & { data?: T }> {
    try {
        const response = await fetch.post<T, any>(endpoint, payload, {
            signal: controller.signal,
            headers: {
                Accept: 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        return {
            status: Status.BadRequest
        };
    }
}