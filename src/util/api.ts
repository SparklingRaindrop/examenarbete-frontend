import axios, { AxiosError } from 'axios';
import { Status } from '../types/statusCode';

export interface GetResponse<T> {
    data: T;
    status: number;
}

export interface APIResponse {
    status: Status;
    error?: string;
}

export function isGetResponse(response: Partial<GetResponse<any>>): response is GetResponse<any> {
    return typeof response?.data !== 'undefined';
}

export function isPostResponse(response: Partial<PostResponse<any>>): response is PostResponse<any> {
    return typeof response?.data !== 'undefined';
}

const fetch = axios.create({
    baseURL: process.env.SERVER_URL || 'http://localhost:4500',
});

export async function get<T>(endpoint: string): Promise<GetResponse<T> | APIResponse> {
    try {
        const { data, status } = await fetch.get<T>(
            endpoint,
            {
                headers: {
                    Accept: 'application/json',
                },
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
        const { status } = await fetch.patch(endpoint, data);
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
        const { status } = await fetch.delete(endpoint);
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

type PostResponse<U> = {
    data?: U
} & APIResponse;

export async function post<U>(endpoint: string, payload: any): Promise<PostResponse<U> | APIResponse> {
    try {
        const response = await fetch.post<U>(endpoint, payload);
        const { status, data } = response;
        return {
            status,
            data
        } as unknown as PostResponse<U>;
    } catch (error: Error | AxiosError | unknown) {

        const response: { [key: string]: any } = {
            status: Status.BadRequest,
        };

        if (axios.isAxiosError(error)) {
            console.error(error.message);
            response.error = error.response?.data.error;
        } else {
            console.error(error);
        }
        return response as APIResponse;
    }
}