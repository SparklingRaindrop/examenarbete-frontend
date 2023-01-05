import { createContext, ReactNode, useEffect, useState } from 'react';
import { Status } from '../../types/statusCode';
import { APIResponse, get, GetResponse, patch, post, remove } from '../../util/api';

interface ContextGroceries {
    groceries: Grocery[];
    getItems: () => Promise<GetResponse<Grocery[]> | undefined>;
    addNewItem: (newData: Grocery) => Promise<GetResponse<Grocery> | undefined>;
    removeItem: (id: string) => Promise<APIResponse | undefined>,
    editItem: (newData: Partial<Grocery>, id: string) => Promise<APIResponse | undefined>,
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
        getItems: () => get<Grocery[]>('/groceries'),
        addNewItem: (newData: Grocery) => post<Grocery>('/groceries', newData),
        removeItem: (id: string) => remove(`/groceries/${id}`),
        editItem: (newData: Partial<Grocery>, id: string) => patch<Grocery>(`/groceries/${id}`, newData),
    };

    return (
        <GroceriesContext.Provider value={value}>
            {children}
        </GroceriesContext.Provider>
    );
}