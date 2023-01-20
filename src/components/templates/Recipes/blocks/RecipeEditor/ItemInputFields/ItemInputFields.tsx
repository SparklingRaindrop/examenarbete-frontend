import { useCallback, useEffect, useState } from 'react';
import { useRecipesContext } from '../../../../../../hooks';
import { Autocomplete, IconButton } from '../../../../../elements';

type IngredientInput = {
    name: Item['name'];
    item_id: Item['id'];
    amount: string;
}

type Props = {}
export default function ItemInputFields({ }: Props) {
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
                /* onClick={addIngredient} */ />
        </div>
    );
}
/* 

function addIngredient() {
    dispatch({
        type: 'ingredient_add',
        value: {
            item: {
                id: '',
                name: userInput.ingredient.name,
            },
            unit: {
                name: '',
                id: ''
            },
            amount: Number(userInput.ingredient.amount),
        }
    });
    setIsEditing(prev => ({
        ...prev,
        ingredient: false,
    }));
} */