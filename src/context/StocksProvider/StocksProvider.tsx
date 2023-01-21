import { createContext } from 'react';
import useStocksAPI from '../../hooks/useStocksAPI';

export interface ContextStocks {
    stocks: Stock[];
    updateStock: ({ id, amount }: Pick<Stock, 'id' | 'amount'>) => void;
}

export const StocksContext = createContext<ContextStocks | null>(null);

export function StocksProvider(props: GeneralProps) {
    const { children } = props;
    const {
        stocks,
        updateStock,
    } = useStocksAPI();

    const value = {
        stocks,
        updateStock
    };

    return (
        <StocksContext.Provider value={value}>
            {children}
        </StocksContext.Provider>
    );
}