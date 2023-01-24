import useStocksContext from '../../../../../hooks/useStocksContext';
import { StockItem } from '../StockItem';
import { Wrapper } from './styled';

type Props = {}
export default function StockList({ }: Props) {
    const { stocks } = useStocksContext();
    return (
        <Wrapper>
            {
                stocks.map(({ id }) => (
                    <StockItem
                        key={id}
                        id={id} />
                ))
            }
        </Wrapper>
    )
}