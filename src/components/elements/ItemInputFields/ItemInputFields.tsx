import { useState } from 'react';
import { useRecipesContext } from '../../../hooks';
import { Autocomplete } from '../Autocomplete';
import { IconButton } from '../Button';
import { Unit, Wrapper } from './styled';

export interface NewItem {
    itemId: Item['id'],
    amount: number;
}

type Props = {
    addItem: (newItem: NewItem) => void;
    onClose: () => void;
}

export default function ItemInputFields(props: Props) {
    const { addItem, onClose } = props;
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<{
        name: string;
        amount: number;
    }>({
        name: '',
        amount: 0,
    });
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
                onClick={() => {
                    addItem({
                        itemId: '123',
                        amount: userInput.amount,
                    });
                    onClose();
                }} />
        </Wrapper>
    );
}