import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useRecipesContext } from '../../../../../hooks';
import { RecipeData } from '../../../../../hooks/useRecipesAPI';
import { Status } from '../../../../../types/statusCode';
import { Button, Modal } from '../../../../elements';
import { InstructionTextarea } from './InstructionTextarea';
import { ItemInputFields } from './ItemInputFields';
import { NewIngredient } from './ItemInputFields/ItemInputFields';

type Props = {
    id?: string;
}

const initial: RecipeData = {
    title: '',
    ingredients: [],
    instructions: [],
};

type Action = 'initial' | 'title_edit' | 'ingredient_add' | 'instruction_add';
function reducer(state: RecipeData, action: { type: Action, value: any }): RecipeData {
    if (action.type === 'initial') {
        const { value } = action;
        return {
            ...state,
            title: value.title,
            ingredients: value.ingredients,
            instructions: value.instructions,
        };
    } else if (action.type === 'title_edit') {
        const { value } = action;
        return {
            ...state,
            title: value,
        };
    } else if (action.type === 'instruction_add') {
        const { value }: { value: Omit<Instruction, 'id'> & { id?: Instruction['id'] } } = action;
        return {
            ...state,
            instructions: [
                ...state.instructions,
                value,
            ],
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

export default function RecipeEditor(props: Props) {
    const { id } = props;
    const [state, dispatch] = useReducer(reducer, initial);
    const [isEditing, setIsEditing] = useState<{ ingredient: boolean, instruction: boolean }>({
        ingredient: false,
        instruction: false
    });
    const { getRecipe, addRecipe } = useRecipesContext();
    const getData = useCallback(async () => {
        if (!id) return;
        const response = await getRecipe(id);
        if (response.status === Status.Succuss && response.data) {
            dispatch({
                type: 'initial',
                value: response.data,
            });
        }
    }, [id, getRecipe]);


    useEffect(() => {
        getData();
    }, [getData]);

    function addItem(newItem: NewIngredient): void {
        if (newItem.id === '') return;
        dispatch({
            type: 'ingredient_add',
            value: newItem,
        });
    }

    function addInstruction(newInstruction: string): void {
        if (!newInstruction) return;
        dispatch({
            type: 'instruction_add',
            value: {
                step_no: instructions.length + 1,
                instruction: newInstruction,
            },
        });
    }

    const { title, ingredients, instructions } = state;

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
                ingredients.length > 0 && ingredients.map((item, index) => (
                    <li key={item.id + index}>
                        {item.name}
                        {item.amount}
                        {item.unit.name}
                    </li>
                ))
            }
            {
                isEditing.ingredient &&
                <ItemInputFields
                    addItem={addItem}
                    onClose={() => setIsEditing(prev => ({
                        ...prev,
                        ingredient: false,
                    }))} />
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
            {
                instructions.map(({ step_no, instruction, id }) => (
                    <div key={id}>
                        <h4>{step_no}</h4>
                        <p>{instruction}</p>
                    </div>
                ))
            }
            {
                isEditing.instruction &&
                <div>
                    <h4>{instructions.length + 1}</h4>
                    <InstructionTextarea
                        addInstruction={addInstruction}
                        onClose={() => setIsEditing(prev => ({
                            ...prev,
                            instruction: false,
                        }))} />
                </div>
            }
            <Button
                label='add a new step'
                onClick={() => setIsEditing(prev => ({
                    ...prev,
                    instruction: true,
                }))} />
            <Button
                label='Save'
                onClick={() => {
                    if (id) {
                        //updateRecipe();
                    } else {
                        const ingredientList = ingredients.map(({ id, amount }) => ({
                            amount,
                            item_id: id
                        }));
                        addRecipe({
                            title,
                            instructions,
                            ingredients: ingredientList,
                        });
                    }
                }} />
        </Modal>
    );
}

