import axios from 'axios';

export interface GetResponse<T> {
    data: T;
    status: number;
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