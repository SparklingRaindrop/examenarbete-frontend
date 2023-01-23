import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { Status } from '../types/statusCode';

const publicRoutes = ['/login', '/logout'];
export interface GetResponse<T> {
    data?: T;
    status: number;
}

export interface APIResponse {
    status: Status;
    error?: string;
}

const fetch = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4500',
    timeout: 30000,
    timeoutErrorMessage: 'Time out!',
    withCredentials: true,
});

function authHeader(endpoint: string) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = Cookies.get('access_token');
    const isLoggedIn = user;
    const isProtected = !publicRoutes.some(routes => endpoint.includes(routes));
    if (isLoggedIn && isProtected) {
        return { Authorization: `Bearer ${user}` };
    } else {
        return {};
    }
}

const controller = new AbortController();
export async function get<T>(endpoint: string): Promise<GetResponse<T>> {
    try {
        const { data, status } = await fetch.get<T>(
            endpoint,
            {
                signal: controller.signal,
                headers: { ...authHeader(endpoint) },
            },
        );

        return {
            data,
            status
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message);
        } else {
            console.error(error);
        }
        return {
            status: Status.BadRequest
        };
    }
}

export async function patch<T>(endpoint: string, data: Partial<T>): Promise<APIResponse> {
    try {
        const { status } = await fetch.patch(endpoint, data, {
            signal: controller.signal,
            headers: {
                Accept: 'application/json',
                ...authHeader(endpoint),
            },
        });
        return {
            status
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message);
        } else {
            console.error(error);
        }
        return {
            status: Status.BadRequest
        };
    }
}

export async function remove(endpoint: string): Promise<APIResponse> {
    try {
        const { status } = await fetch.delete(endpoint, {
            signal: controller.signal,
            headers: authHeader(endpoint)
        });
        return {
            status
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message);
        } else {
            console.error(error);
        }
        return {
            status: Status.BadRequest
        };
    }
}

export async function post<T>(endpoint: string, payload: any): Promise<APIResponse & { data: T }> {

    const response = await fetch.post<T, any>(endpoint, payload, {
        signal: controller.signal,
        headers: {
            Accept: 'application/json',
            ...authHeader(endpoint),
        },
    })
        .catch((error) => {
            if (axios.isAxiosError(error)) {
                console.error(error.message);
            } else {
                console.error(error);
            }
        });
    return response;
}