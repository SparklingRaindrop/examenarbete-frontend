import { createContext } from 'react';
import useStocksAPI from '../../hooks/useStocksAPI';

export interface ContextStocks {
    stocks: Stock[];
}

export const StocksContext = createContext<ContextStocks | null>(null);

export function StocksProvider(props: GeneralProps) {
    const { children } = props;
    const {
        stocks,
    } = useStocksAPI();

    const value = {
        stocks
    };

    return (
        <StocksContext.Provider value={value}>
            {children}
        </StocksContext.Provider>
    );
}