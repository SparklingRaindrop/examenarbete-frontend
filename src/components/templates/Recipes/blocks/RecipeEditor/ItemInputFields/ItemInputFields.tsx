import { useCallback, useEffect, useState } from 'react';
import { useRecipesContext } from '../../../../../../hooks';
import { Autocomplete, IconButton } from '../../../../../elements';

export interface NewIngredient extends Item {
    amount: number;
}

type Props = {
    addItem: (newItem: NewIngredient) => void;
    onClose: () => void;
}

export default function ItemInputFields(props: Props) {
    const { addItem, onClose } = props;
    const [userInput, setUserInput] = useState<{
        name: string;
        amount: string;
    }>({
        name: '',
        amount: '',
    });
    const { items } = useRecipesContext();
    /*     const [suggestions, setSuggestions] = useState<It em[]>([]);*/
    /*     const { getFilteredItems } = useRecipesContext(); */
    /*     const getSuggestions = useCallback(async () => {
            const filteredItems = getFilteredItems(userInput.item.name);
            setSuggestions(filteredItems);
        }, [getFilteredItems, userInput.item.name]);
    
        useEffect(() => {
            if (userInput.item.name === '') return;
            getSuggestions();
        }, [getSuggestions, userInput.item.name]); */

    return (
        <div>
            <Autocomplete
                suggestions={items.map(item => item.name)}
                userInput={userInput.name}
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
                    if (isNaN(Number(event.target.value))) return;
                    setUserInput(prev => ({
                        ...prev,
                        amount: event.target.value
                    }));
                }} />
            {
                items.find(item => item.name === userInput.name)?.unit.name // Ignore new Item for now
            }
            <IconButton
                name='plus'
                onClick={() => {
                    const itemData = items.find(item => item.name === userInput.name);
                    if (itemData) {
                        addItem({
                            ...itemData,
                            amount: Number(userInput.amount),
                        });
                        onClose();
                    }
                }} />
        </div>
    );
}