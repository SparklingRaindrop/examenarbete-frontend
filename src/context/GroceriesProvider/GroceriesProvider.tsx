import { createContext, ReactNode } from 'react';
import { useGroceries } from '../../hooks';
import { APIResponse } from '../../util/api';
export interface ContextGroceries {
    groceries: Grocery[];
    getItems: () => Promise<APIResponse>;
    addItem: (newData: Omit<Grocery, 'id'>) => Promise<APIResponse>;
    removeItem: (id: Grocery['id']) => Promise<APIResponse>,
    editItem: (id: Grocery['id'], newData: Partial<Pick<Grocery, 'amount' | 'isChecked' | 'item_name'>>) => Promise<APIResponse>,
}

export const GroceriesContext = createContext<ContextGroceries | null>(null);

type Props = {
    children: ReactNode
}

export function GroceriesProvider(props: GeneralProps) {
    const { children } = props;
    const { groceries, addItem, getItems, removeItem, editItem } = useGroceries();

    const value = {
        groceries,
        getItems,
        addItem,
        removeItem,
        editItem,
    };

    return (
        <GroceriesContext.Provider value={value}>
            {children}
        </GroceriesContext.Provider>
    );
}