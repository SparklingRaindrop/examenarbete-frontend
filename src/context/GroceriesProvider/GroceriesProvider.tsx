import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Status } from '../../types/statusCode';
import { get, GetResponse } from '../../util/api';

interface ContextGroceries {
    groceries: Grocery[];
    get: () => Promise<GetResponse<Grocery[]> | undefined>;
}

export const GroceriesContext = createContext<ContextGroceries | null>(null);

type Props = {
    children: ReactNode
}

export function GroceriesProvider(props: Props) {
    const { children } = props;
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
    });

    const value = {
        groceries,
        get: () => get<Grocery[]>('/groceries'),
    };

    return (
        <GroceriesContext.Provider value={value}>
            {children}
        </GroceriesContext.Provider>
    );
}