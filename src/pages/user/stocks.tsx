import StockManager from '../../components/templates/StockManager/StockManager';
import { StocksProvider } from '../../context/StocksProvider';

export default function StocksPage() {

    return (
        <StocksProvider>
            <StockManager />
        </StocksProvider>

    )
}