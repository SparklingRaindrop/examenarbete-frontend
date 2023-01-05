import axios from 'axios';

type Status = number;
export interface GetResponse<T> {
    data: T;
    status: Status;
}

export interface Response {
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

export async function patch<T>(endpoint: string, data: Partial<T>): Promise<Response | undefined> {
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

export async function remove(endpoint: string): Promise<Response | undefined> {
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

export async function post<T>(endpoint: string, data: T): Promise<GetResponse<T> | undefined> {
    try {
        const { status } = await fetch.patch(endpoint);
        return {
            status,
            data
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