import { useEffect } from 'react';
import StockManager from '../../../components/templates/StockManager/StockManager';
import useStocksContext from '../../../hooks/useStocksContext';

export default function StocksPage() {
    const { getStocks } = useStocksContext();

    useEffect(() => {
        getStocks();
        // eslint-disable-next-line
    }, []);
    return (
        <StockManager />
    );
}