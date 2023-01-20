import { useEffect, useState } from 'react';
import { Status } from '../types/statusCode';
import { get } from '../util/api';

export default function useStocksAPI() {
    const [stocks, setStock] = useState<Stock[]>([]);

    useEffect(() => {
        async function init() {
            const response = await get<Stock[]>('/stocks');
            if (response.status === Status.Succuss && response.data) {
                setStock(response.data);
            }
        }
        init();
    }, []);

    return {
        stocks
    };
}