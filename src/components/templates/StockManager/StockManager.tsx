import { useState } from 'react';
import useStocksContext from '../../../hooks/useStocksContext';
import { InputTogglingButton, ItemInputFields, List } from '../../elements';
import { StockList } from './blocks';

type Props = {}
export default function StockManager({ }: Props) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { addNewItemToStocks } = useStocksContext();

    return (
        <div>
            <StockList />
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