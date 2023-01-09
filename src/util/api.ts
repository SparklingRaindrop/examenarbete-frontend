import axios from 'axios';

type Status = number;
export interface GetResponse<T> {
    data: T;
    status: Status;
}

export interface APIResponse {
    status: Status;
}


const fetch = axios.create({
    baseURL: process.env.SERVER_URL || 'http://localhost:4500',
});

export async function get<T>(endpoint: string): Promise<GetResponse<T> | undefined> {
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
        return;
    }
}

export async function patch<T>(endpoint: string, data: Partial<T>): Promise<APIResponse | undefined> {
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
        return;
    }
}

export async function remove(endpoint: string): Promise<APIResponse | undefined> {
    try {
        const { status } = await fetch.patch(endpoint);
        return {
            status
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message);
        } else {
            console.error(error);
        }
        return;
    }
}

export async function post<T>(endpoint: string, data: Omit<T, 'id'>): Promise<APIResponse | undefined> {
    try {
        const { status } = await fetch.post(endpoint, data);
        return {
            status
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message);
        } else {
            console.error(error);
        }
        return;
    }
}