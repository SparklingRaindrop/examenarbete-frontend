import { useEffect, useMemo, useState } from 'react';
import useStocksContext from '../../../../../hooks/useStocksContext';
import { Counter } from '../../../../elements';
import { ItemName, RightColumn, Wrapper } from './styled';

type Props = {
    id: Stock['id'];
}
export default function StockItem(props: Props) {
    const { id } = props;
    const [userInput, setUserInput] = useState<number>(0);
    const { stocks, updateStock } = useStocksContext();
    const currentItem = useMemo(() => stocks.find(({ id: stockId }) => stockId === id), [id, stocks]);

    useEffect(() => {
        setUserInput(currentItem ? currentItem.amount : 0);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setUserInput(currentItem ? currentItem.amount : 0);
    }, [currentItem]);

    if (!currentItem) return null;
    const { item, amount } = currentItem;
    return (
        <Wrapper key={item.name}>
            <ItemName>
                {item.name}
            </ItemName>
            <RightColumn>
                <Counter
                    value={userInput}
                    onPlus={() => updateStock({
                        id,
                        amount: amount + 1,
                    })}
                    onMinus={() => updateStock({
                        id,
                        amount: amount - 1,
                    })}
                    onChange={() => { }} />{item.unit.name}
            </RightColumn>
        </Wrapper>
    );
}