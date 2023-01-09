import { useEffect, useState } from 'react';
import { ContextGroceries } from '../context/GroceriesProvider/GroceriesProvider';
import { Status } from '../types/statusCode';
import { APIResponse, get, isGetResponse, patch, post, remove } from '../util/api';

export default function useGroceries(): ContextGroceries {
    const [groceries, setGroceries] = useState<Grocery[]>([]);

    useEffect(() => {
        async function init() {
            const response = await get<Grocery[]>('/groceries');
            if (response && response.status === Status.Succuss && isGetResponse(response)) {
                const { data } = response;
                setGroceries(data);
            }
        }
        init();
    }, []);

    async function getItems(): Promise<APIResponse> {
        const response = await get<Grocery[]>('/groceries');
        if (response && response.status === Status.Succuss && isGetResponse(response)) {
            const { data } = response;
            setGroceries(data);
        }
        return { status: response.status };
    }

    async function removeItem(id: Pick<Grocery, 'id'>): Promise<APIResponse> {
        const response = await remove(`/groceries/${id}`);
        if (response && response.status === Status.NoContent) {
            getItems();
        }
        return { status: response.status };
    }

    async function addItem(newData: Omit<Grocery, 'id'>): Promise<APIResponse> {
        const response = await post<Grocery>('/groceries', newData);
        if (response && response.status === Status.Created) {
            getItems();
        }
        return { status: response.status };
    }

    async function editItem(id: Pick<Grocery, 'id'>, newData: Partial<Pick<Grocery, 'amount' | 'isChecked'>>): Promise<APIResponse> {
        const response = await patch<Grocery>(`/groceries/${id}`, newData);
        if (response && response.status === Status.Succuss) {
            getItems();
        }
        return { status: response.status };
    }

    return {
        groceries,
        getItems,
        removeItem,
        addItem,
        editItem,
    };
}