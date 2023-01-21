import { createContext } from 'react';
import useStocksAPI from '../../hooks/useStocksAPI';
import { APIResponse } from '../../util/api';

export interface ContextStocks {
    stocks: Stock[];
    updateStock: ({ id, amount }: Pick<Stock, 'id' | 'amount'>) => void;
    addNewItemToStocks: (newData: Pick<Stock, 'amount'> & { item_id: string }) => void;
    removeItemFromStock: (id: Stock['id']) => Promise<APIResponse>;
}

export const StocksContext = createContext<ContextStocks | null>(null);

export function StocksProvider(props: GeneralProps) {
    const { children } = props;
    const {
        stocks,
        updateStock,
        addNewItemToStocks,
        removeItemFromStock,
    } = useStocksAPI();

    const value = {
        stocks,
        updateStock,
        addNewItemToStocks,
        removeItemFromStock,
    };

    return (
        <StocksContext.Provider value={value}>
            {children}
        </StocksContext.Provider>
    );
}