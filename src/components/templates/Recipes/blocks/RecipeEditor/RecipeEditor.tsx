import { useEffect, useReducer, useRef, useState } from 'react';
import { useRecipesContext } from '../../../../../hooks';
import { Status } from '../../../../../types/statusCode';
import { Button, IconButton, Modal } from '../../../../elements';

type Props = {
    id?: string;
}

type RecipeData = {
    title: Recipe['title'];
    ingredients: {
        item: Pick<Item, 'id' | 'name'>,
        unit: Pick<Unit, 'name' | 'id'>,
        amount: number;
    }[];
}

const initial: RecipeData = {
    title: '',
    ingredients: []
};

type Action = 'initial' | 'title_edit' | 'ingredient_add';
function reducer(state: RecipeData, action: { type: Action, value: any }): RecipeData {
    if (action.type === 'initial') {
        const { value } = action;
        return {
            ...state,
            title: value.title,
            ingredients: value.ingredients,
        };
    } else if (action.type === 'title_edit') {
        const { value } = action;
        return {
            ...state,
            title: value,
        };
    } else if (action.type === 'ingredient_add') {
        const { value } = action;
        return {
            ...state,
            ingredients: [
                ...state.ingredients,
                value
            ],
        };
    }
    throw Error('Unknown action.');
}

type IngredientInput = {
    name: string;
    amount: string;
}
export default function RecipeEditor(props: Props) {
    const { id } = props;
    const [state, dispatch] = useReducer(reducer, initial);
    const [isEditing, setIsEditing] = useState<{ ingredient: boolean, step: boolean }>({
        ingredient: false,
        step: false
    });
    const [userInput, setUserInput] = useState<{ ingredient: IngredientInput, step: string }>({
        ingredient: {
            name: '',
            amount: ''
        },
        step: ''
    });
    const newIngredientRef = useRef(null);

    const { getRecipe } = useRecipesContext();
    useEffect(() => {
        async function getData(id: string) {
            const response = await getRecipe(id);
            if (response.status === Status.Succuss && response.data) {
                dispatch({
                    type: 'initial',
                    value: response.data,
                });
            }
        }
        if (id) {
            getData(id);
        }
        // eslint-disable-next-line
    }, []);

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
    }

    const { title, ingredients } = state;
    return (
        <Modal>
            <input
                value={title}
                placeholder='Recipe title'
                onChange={(event) => dispatch({
                    type: 'title_edit',
                    value: event.target.value
                })} />
            <h3>
                ingredients
            </h3>
            {
                ingredients.length > 0 && ingredients.map(({ amount, item, unit }, index) => (
                    <li key={item.id + index}>
                        {item.name}
                        {amount}
                        {unit.name}
                    </li>
                ))
            }
            {
                isEditing.ingredient && (
                    <div ref={newIngredientRef}>
                        <input
                            type='text'
                            value={userInput.ingredient.name}
                            onChange={(event) => setUserInput(prev => ({
                                ...prev,
                                ingredient: {
                                    ...prev.ingredient,
                                    name: event.target.value
                                }
                            }))} />
                        <input
                            type='text'
                            value={userInput.ingredient.amount}
                            onChange={(event) => {
                                if (isNaN(Number(event.target.value))) return;
                                setUserInput(prev => ({
                                    ...prev,
                                    ingredient: {
                                        ...prev.ingredient,
                                        amount: event.target.value
                                    }
                                }));
                            }} />
                        st{/* get from backend */}
                        <IconButton
                            name='plus'
                            onClick={addIngredient} />
                    </div>
                )
            }
            <Button
                label='add an item'
                onClick={() => setIsEditing(prev => ({
                    ...prev,
                    ingredient: true,
                }))} />
            <h3>
                How to cook
            </h3>
            {/*             {
                Array.from({length: setFips.length}, (_, i) => i + 1).map((step) => )
            } */}
            <Button label='Save' />
        </Modal>
    );
}