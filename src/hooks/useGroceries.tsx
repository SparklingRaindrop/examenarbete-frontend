import { useEffect, useState } from 'react';
import { ContextGroceries } from '../context/GroceriesProvider/GroceriesProvider';
import { Status } from '../types/statusCode';
import { get, patch, post, remove } from '../util/api';

export default function useGroceries(): ContextGroceries {
    const [groceries, setGroceries] = useState<Grocery[]>([]);

    useEffect(() => {
        async function init() {
            const response = await get<Grocery[]>('/groceries');
            if (response && response.status === Status.Succuss) {
                const { data } = response;
                setGroceries(data);
            }
        }
        init();
    }, []);

    async function getItems(): Promise<void> {
        const response = await get<Grocery[]>('/groceries');
        if (response && response.status === Status.Succuss) {
            const { data } = response;
            setGroceries(data);
        }
    }

    async function removeItem(id: Pick<Grocery, 'id'>): Promise<void> {
        const response = await remove(`/groceries/${id}`);
        if (response && response.status === Status.NoContent) {
            getItems();
        }
    }

    async function addItem(newData: Omit<Grocery, 'id'>): Promise<void> {
        const response = await post<Grocery>('/groceries', newData);
        if (response && response.status === Status.Succuss) {
            getItems();
        }
    }

    async function editItem(id: Pick<Grocery, 'id'>, newData: Partial<Pick<Grocery, 'amount' | 'isChecked'>>): Promise<void> {
        const response = await patch<Grocery>(`/groceries/${id}`, newData);
        if (response && response.status === Status.Succuss) {
            getItems();
        }
    }

    return {
        groceries,
        getItems,
        removeItem,
        addItem,
        editItem,
    };
}