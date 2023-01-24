import { useEffect, useMemo, useState } from 'react';
import useStocksContext from '../../../../../hooks/useStocksContext';
import { Counter, IconButton } from '../../../../elements';
import { ItemName, Group } from './styled';

type Props = Stock;

export default function StockItem(props: Props) {
    const { id, item, amount } = props;
    const [userInput, setUserInput] = useState<number>(amount);
    const { updateStock, removeItemFromStock } = useStocksContext();

    return (
        <>
            <IconButton
                name='xMark'
                onClick={() => removeItemFromStock(id)} />
            <ItemName>
                {item.name}
            </ItemName>
            <Group>
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
                    onChange={(event) =>
                        setUserInput(Number(event.target.value))
                    }
                    onBlur={() => updateStock({
                        id,
                        amount: userInput,
                    })} />
                {item.unit.name}
            </Group>
        </>
    );
}