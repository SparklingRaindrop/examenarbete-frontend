import useStocksContext from '../../../hooks/useStocksContext';
import { StockItem } from './blocks';

type Props = {}
export default function StockManager({ }: Props) {
    const { stocks } = useStocksContext();
    return (
        <div>
            <ul>
                {
                    stocks.map((stock) => (
                        <StockItem
                            key={stock.id}
                            stock={stock} />
                    ))
                }
            </ul>
        </div>
    );
}