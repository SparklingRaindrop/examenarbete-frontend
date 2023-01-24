import { useEffect } from 'react';
import StockManager from '../../../components/templates/StockManager/StockManager';
import { useRecipesContext } from '../../../hooks';
import useStocksContext from '../../../hooks/useStocksContext';

export default function StocksPage() {
    const { getStocks } = useStocksContext();
    const { getItems } = useRecipesContext();

    useEffect(() => {
        getStocks();
        getItems();
        // eslint-disable-next-line
    }, []);
    return (
        <StockManager />
    );
}