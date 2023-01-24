import { useState } from 'react';
import { useRecipesContext } from '../../../hooks';
import useStocksContext from '../../../hooks/useStocksContext';
import { InputTogglingButton, ItemInputFields, List } from '../../elements';
import { StockList } from './blocks';
import { Container } from './styled';

type Props = {}
export default function StockManager({ }: Props) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { addNewItemToStocks } = useStocksContext();
    const { items } = useRecipesContext();
    const { stocks } = useStocksContext();

    const suggestions = items.filter(item => !stocks.some(stock => stock.item.id === item.id));
    return (
        <Container>
            <StockList />
            <InputTogglingButton
                isEditing={isEditing}
                inputElement={
                    <ItemInputFields
                        suggestions={suggestions.map(item => item.name)}
                        addItem={(item) => addNewItemToStocks(item)}
                        onClose={() => setIsEditing(false)} />
                }
                onOpen={() => setIsEditing(true)}
            />
        </Container>
    );
}