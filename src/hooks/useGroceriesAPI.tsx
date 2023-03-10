import { useEffect, useState } from 'react';
import { ContextGroceries } from '../context/GroceriesProvider/GroceriesProvider';
import { Status } from '../types/statusCode';
import { APIResponse, get, patch, post, remove } from '../util/api';

export default function useGroceriesAPI(): ContextGroceries {
    const [groceries, setGroceries] = useState<Grocery[]>([]);

    function updateGroceries(groceries: Grocery[]) {
        setGroceries(groceries);
    }

    async function getGroceries(): Promise<APIResponse> {
        const response = await get<Grocery[]>('/groceries');
        if (response.data && response.status === Status.Succuss) {
            const { data } = response;
            setGroceries(data);
        }
        return response;
    }

    async function removeGrocery(id: Grocery['id']): Promise<APIResponse> {
        const response = await remove(`/groceries/${id}`);
        if (response && response.status === Status.NoContent) {
            getGroceries();
        }
        return response;
    }

    async function removeAllGroceries(filter?: Pick<Grocery, 'isChecked'>): Promise<APIResponse> {
        let query: string = '';
        if (filter) {
            query = (filter && typeof filter.isChecked === 'undefined') ? '' : `/?isChecked=${filter.isChecked}`;
        }
        const response = await remove(`/groceries${query}`);
        if (response && response.status === Status.NoContent) {
            getGroceries();
        }
        return response;
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
        removeAllGroceries,
        addGrocery,
        updateGrocery,
        generateGroceries,
        updateGroceries,
    };
}