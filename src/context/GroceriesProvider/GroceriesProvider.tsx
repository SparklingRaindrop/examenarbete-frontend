import { createContext } from 'react';
import { useGroceriesAPI } from '../../hooks';
import { APIResponse } from '../../util/api';
export interface ContextGroceries {
    groceries: Grocery[];
    getGroceries: () => Promise<APIResponse>;
    addGrocery: (newData: Omit<Grocery, 'id'>) => Promise<APIResponse>;
    removeGrocery: (id: Grocery['id']) => Promise<APIResponse>;
    removeAllGroceries: (filter?: Pick<Grocery, 'isChecked'>) => Promise<APIResponse>;
    updateGrocery: (id: Grocery['id'], newData: Partial<Pick<Grocery, 'amount' | 'isChecked'>>) => Promise<APIResponse>;
    generateGroceries: (range?: { from: Date, to: Date }) => Promise<APIResponse>;
}

export const GroceriesContext = createContext<ContextGroceries | null>(null);

export function GroceriesProvider(props: GeneralProps) {
    const { children } = props;
    const value = useGroceriesAPI();

    return (
        <GroceriesContext.Provider value={value}>
            {children}
        </GroceriesContext.Provider>
    );
}