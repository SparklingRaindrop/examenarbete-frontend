import { useCallback, useEffect, useState } from 'react';
import { useRecipesContext } from '../../../../../../hooks';
import { Autocomplete, IconButton } from '../../../../../elements';

export interface IngredientInput {
    item: Omit<Item, 'unit'> & Partial<Pick<Item, 'unit'>>;
    amount: string;
}

type Props = {
    addItem: (newItem: IngredientInput & { unit_id?: Unit['id'] }) => void;
    onClose: () => void;
}

export default function ItemInputFields(props: Props) {
    const { addItem, onClose } = props;
    const [userInput, setUserInput] = useState<IngredientInput>({
        item: {
            name: '',
            id: '',
            unit: {
                name: '',
                id: '',
            }
        },
        amount: '',
    });

    const [suggestions, setSuggestions] = useState<Item[]>([]);
    const { filterItems } = useRecipesContext();
    const getSuggestions = useCallback(async () => {
        const filteredItems = filterItems(userInput.item.name);
        setSuggestions(filteredItems);
    }, [filterItems, userInput.item.name]);

    useEffect(() => {
        if (userInput.item.name === '') return;
        getSuggestions();
    }, [getSuggestions, userInput.item.name]);

    return (
        <div>
            <Autocomplete
                suggestions={suggestions.map(item => item.name)}
                userInput={userInput.item.name}
                updateUserInput={(value) => {
                    setUserInput(prev => ({
                        ...prev,
                        item: {
                            ...prev.item,
                            name: value
                        }
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
                suggestions.find(item => item.name === userInput.item.name)?.unit.name // Ignore new Item for now
            }
            <IconButton
                name='plus'
                onClick={() => {
                    const itemData = suggestions.find(item => item.name === userInput.item.name);
                    addItem({
                        ...userInput,
                        item: {
                            ...userInput.item,
                            unit: itemData?.unit,
                        }
                    });
                    onClose();
                }} />
        </div>
    );
}