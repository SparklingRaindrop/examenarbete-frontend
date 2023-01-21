import { Counter } from '../../../../elements';
import { ItemName, RightColumn, Wrapper } from './styled';

type Props = {
    stock: Stock;
}
export default function StockItem(props: Props) {
    const { stock } = props;
    const { item, amount } = stock;


    return (
        <Wrapper key={item.name}>
            <ItemName>
                {item.name}
            </ItemName>
            <RightColumn>
                <Counter value={amount} setCounterValue={(num) => { }} />{item.unit.name}
            </RightColumn>
        </Wrapper>
    );
}