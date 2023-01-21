import { useState } from 'react';
import { useRecipesContext } from '../../../hooks';
import useStocksContext from '../../../hooks/useStocksContext';
import { InputTogglingButton, ItemInputFields } from '../../elements';
import { StockItem } from './blocks';

type Props = {}
export default function StockManager({ }: Props) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { stocks, addNewItemToStocks } = useStocksContext();

    return (
        <div>
            <ul>
                {
                    stocks.map(({ id }) => (
                        <StockItem
                            key={id}
                            id={id} />
                    ))
                }
            </ul>
            <InputTogglingButton
                isEditing={isEditing}
                inputElement={
                    <ItemInputFields
                        addItem={(item) => addNewItemToStocks(item)}
                        onClose={() => setIsEditing(false)} />
                }
                onOpen={() => setIsEditing(true)}
            />
        </div>
    );
}