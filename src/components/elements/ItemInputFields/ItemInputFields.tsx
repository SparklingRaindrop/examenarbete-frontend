import { useMemo, useState } from 'react';
import { useRecipesContext } from '../../../hooks';
import { Autocomplete } from '../Autocomplete';
import { IconButton } from '../Button';
import { Unit, Wrapper } from './styled';

export interface NewItem {
    item_id: Item['id'],
    amount: number;
}

type Props = {
    addItem: (newItem: NewItem) => void;
    onClose: () => void;
}

export default function ItemInputFields(props: Props) {
    const { addItem, onClose } = props;
    const [userInput, setUserInput] = useState<{
        name: string;
        amount: number;
    }>({
        name: '',
        amount: 0,
    });
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const { items } = useRecipesContext();

    const item = items.find(item => item.name === userInput.name);
    return (
        <Wrapper>
            <Autocomplete
                suggestions={items.map(item => item.name)}
                userInput={userInput.name}
                isLocked={isLocked}
                setIsLocked={(value) => setIsLocked(value)}
                updateUserInput={(value) => {
                    setUserInput(prev => ({
                        ...prev,
                        name: value
                    }));
                }} />
            <input
                type='text'
                value={userInput.amount}
                onChange={(event) => {
                    setUserInput(prev => ({
                        ...prev,
                        amount: Number(event.target.value)
                    }));
                }} />
            <Unit>{item?.unit.name}</Unit> {/* Ignore new Item for now */}
            <IconButton
                name='plus'
                disabled={!isLocked || !item}
                onClick={() => {
                    if (!item) return;
                    addItem({
                        item_id: item.id,
                        amount: userInput.amount,
                    });
                    onClose();
                }} />
        </Wrapper>
    );
}