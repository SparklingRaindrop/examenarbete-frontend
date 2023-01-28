import { createContext } from 'react';
import useStocksAPI from '../../hooks/useStocksAPI';
import { APIResponse } from '../../util/api';

export interface ContextStocks {
    stocks: Stock[];
    getStocks: () => Promise<APIResponse>
    updateStock: ({ id, amount }: Pick<Stock, 'id' | 'amount'>) => void;
    addNewItemToStocks: (newData: Pick<Stock, 'amount'> & { item_id: string }) => void;
    removeItemFromStock: (id: Stock['id']) => Promise<APIResponse>;
    updateStocks: (stock: Stock[]) => void;
}

export const StocksContext = createContext<ContextStocks | null>(null);

export function StocksProvider(props: GeneralProps) {
    const { children } = props;
    const value = useStocksAPI();

    return (
        <StocksContext.Provider value={value}>
            {children}
        </StocksContext.Provider>
    );
}