import { useCallback, useEffect, useState } from 'react';
import { useRecipesContext } from '../../../../../../hooks';
import { Autocomplete, IconButton } from '../../../../../elements';

export interface IngredientInput {
    name: Item['name'];
    item_id?: Item['id'];
    amount: string;
}

type Props = {
    addItem: (newItem: IngredientInput & { unit_id?: Unit['id'] }) => void;
}

export default function ItemInputFields(props: Props) {
    const { addItem } = props;
    const [userInput, setUserInput] = useState<IngredientInput>({
        name: '',
        item_id: '',
        amount: '',
    });
    const [suggestions, setSuggestions] = useState<Item[]>([]);
    const { getItems } = useRecipesContext();
    const getSuggestions = useCallback(async () => {
        const response = await getItems(userInput.name);
        if (response.data) {
            setSuggestions(response.data);
        }
    }, [getItems, userInput.name]);

    useEffect(() => {
        if (userInput.name === '') return;
        getSuggestions();
    }, [getSuggestions, userInput.name]);

    return (
        <div>
            <Autocomplete
                suggestions={suggestions.map(item => item.name)}
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
                        ingredient: {
                            ...prev,
                            amount: event.target.value
                        }
                    }));
                }} />
            {suggestions.find(item => item.name === userInput.name)?.unit.name}
            <IconButton
                name='plus'
                onClick={() => {
                    const unit = suggestions.find(item => item.name === userInput.name)?.unit;
                    addItem({
                        ...userInput,
                        unit_id: unit?.id,
                    });
                }} />
        </div>
    );
}

// if it's a new item, show available unit