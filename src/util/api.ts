import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { Status } from '../types/statusCode';

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

const controller = new AbortController();
export async function get<T>(endpoint: string): Promise<GetResponse<T>> {
    try {
        const { data, status } = await fetch.get<T>(
            endpoint,
            {
                signal: controller.signal,
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