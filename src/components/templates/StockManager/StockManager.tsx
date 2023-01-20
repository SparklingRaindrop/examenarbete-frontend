import useStocksContext from '../../../hooks/useStocksContext'
import { Counter } from '../../elements';

type Props = {}
export default function StockManager({ }: Props) {
    const { stocks } = useStocksContext();
    return (
        <div>
            <ul>
                {
                    stocks.map(({ item, amount }, index) => (
                        <li key={item.name + index}>
                            {item.name}<Counter value={amount} />{item.unit.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}