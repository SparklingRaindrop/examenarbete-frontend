import { useEffect, useState } from 'react';
import { Status } from '../types/statusCode';
import { get, patch } from '../util/api';

export default function useStocksAPI() {
    const [stocks, setStock] = useState<Stock[]>([]);

    useEffect(() => {
        getStocks();
    }, []);

    async function getStocks() {
        const response = await get<Stock[]>('/stocks');
        if (response.status === Status.Succuss && response.data) {
            setStock(response.data);
        }
        return response;
    }

    async function updateStock({ id, amount }: Pick<Stock, 'id' | 'amount'>) {
        const response = await patch(`/stocks/${id}`, { amount });
        await getStocks();
        return response;
    }

    return {
        stocks,
        updateStock
    };
}
