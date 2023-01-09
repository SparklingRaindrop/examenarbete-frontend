import { createContext, ReactNode } from 'react';
import { useGroceries } from '../../hooks';
export interface ContextGroceries {
    groceries: Grocery[];
    getItems: () => Promise<void>;
    addItem: (newData: Omit<Grocery, 'id'>) => Promise<void>;
    removeItem: (id: Pick<Grocery, 'id'>) => Promise<void>,
    editItem: (id: Pick<Grocery, 'id'>, newData: Partial<Pick<Grocery, 'amount' | 'isChecked'>>) => Promise<void>,
}

export const GroceriesContext = createContext<ContextGroceries | null>(null);

type Props = {
    children: ReactNode
}

export function GroceriesProvider(props: Props) {
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