import { useEffect, useState } from 'react';
import { ContextGroceries } from '../context/GroceriesProvider/GroceriesProvider';
import { Status } from '../types/statusCode';
import { APIResponse, get, isGetResponse, patch, post, remove } from '../util/api';

export default function useGroceriesAPI(): ContextGroceries {
    const [groceries, setGroceries] = useState<Grocery[]>([]);

    useEffect(() => {
        getGroceries();
    }, []);

    async function getGroceries(): Promise<APIResponse> {
        const response = await get<Grocery[]>('/groceries');
        if (response.data && response.status === Status.Succuss && isGetResponse(response)) {
            const { data } = response;
            setGroceries(data);
        }
        return { status: response.status };
    }

    async function removeGrocery(id: Grocery['id']): Promise<APIResponse> {
        const response = await remove(`/groceries/${id}`);
        if (response && response.status === Status.NoContent) {
            getGroceries();
        }
        return { status: response.status };
    }

    async function addGrocery(newData: Omit<Grocery, 'id'>): Promise<APIResponse> {
        const response = await post<Grocery>('/groceries', newData);
        return response;
    }

    async function updateGrocery(
        id: Grocery['id'],
        newData: Partial<Pick<Grocery, 'amount' | 'isChecked'>>
    ): Promise<APIResponse> {
        const response = await patch<Grocery>(`/groceries/${id}`, newData);
        if (response && response.status === Status.Succuss) {
            getGroceries();
        }
        return response;
    }

    async function generateGroceries(range?: { from: Date, to: Date }): Promise<APIResponse> {
        const response = await post<Grocery>('/groceries/generate', range);
        if (response.status === Status.Created) {
            getGroceries();
        }
        return response;
    }

    return {
        groceries,
        getGroceries,
        removeGrocery,
        addGrocery,
        updateGrocery,
        generateGroceries,
    };
}