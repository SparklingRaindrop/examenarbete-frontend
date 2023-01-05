import axios from 'axios';

axios.defaults.baseURL = process.env.SERVER_URL;

interface GetResponse<T> {
    data: T[];
    status: number;
}

export async function get<T>(endpoint: string): Promise<GetResponse<T> | undefined> {
    try {
        const { data, status } = await axios.get<T[]>(
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