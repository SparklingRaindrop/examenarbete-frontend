import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { Status } from '../types/statusCode';
import { refreshAccessToken } from './token';
axios.defaults.withCredentials = true;
export interface GetResponse<T> {
    data?: T;
    status: number;
    error?: string;
}

export interface APIResponse {
    status: Status;
    error?: string;
}

export const fetch = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4500',
    timeout: 30000,
    timeoutErrorMessage: 'Time out!',
    withCredentials: true,
});

fetch.interceptors.response.use(
    response => response,
    async (error: any): Promise<any> => {
        if (error.response.status === 403) {
            const response = await fetch.post('/auth/refresh');
            return fetch(error.config);
        } else {
            return Promise.reject(error);
        }

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
        if (axios.isAxiosError(error)) {
            return {
                error: error.response?.data.error,
                status: Status.BadRequest
            };
        }
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
        if (axios.isAxiosError(error)) {
            return {
                error: error.response?.data.error,
                status: Status.BadRequest
            };
        }
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
        if (axios.isAxiosError(error)) {
            return {
                error: error.response?.data.error,
                status: Status.BadRequest
            };
        }
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
        if (axios.isAxiosError(error)) {
            return {
                error: error.response?.data.error,
                status: Status.BadRequest
            };
        }
        return {
            status: Status.BadRequest
        };
    }
}