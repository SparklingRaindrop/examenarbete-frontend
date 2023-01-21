import { useEffect, useState } from 'react';
import { Status } from '../types/statusCode';
import { APIResponse, get, patch, post } from '../util/api';

export default function useStocksAPI() {
    const [stocks, setStock] = useState<Stock[]>([]);

    useEffect(() => {
        getStocks();
    }, []);

    async function getStocks(): Promise<APIResponse> {
        const response = await get<Stock[]>('/stocks');
        if (response.status === Status.Succuss && response.data) {
            setStock(response.data);
        }
        return response;
    }

    async function updateStock({ id, amount }: Pick<Stock, 'id' | 'amount'>): Promise<APIResponse> {
        const response = await patch(`/stocks/${id}`, { amount });
        await getStocks();
        return response;
    }

    async function addNewItemToStocks(newData: Pick<Stock, 'amount'> & { item_id: string }): Promise<APIResponse> {
        const response = await post('/stocks', newData);
        await getStocks();
        return response;
    }

    return {
        stocks,
        updateStock,
        addNewItemToStocks
    };
}
