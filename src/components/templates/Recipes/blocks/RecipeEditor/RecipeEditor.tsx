import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useRecipesContext } from '../../../../../hooks';
import { RecipeData } from '../../../../../hooks/useRecipesAPI';
import { Status } from '../../../../../types/statusCode';
import { Button, Input } from '../../../../elements';
import Ingredients from './Ingredients/Ingredients';
import { InstructionTextarea } from './Instructions/InstructionTextarea';
import { ItemInputFields } from './Ingredients/ItemInputFields';
import { NewIngredient } from './Ingredients/ItemInputFields/ItemInputFields';
import { Heading, Wrapper } from './styled';
import { NewItem } from '../../../../elements/ItemInputFields/ItemInputFields';
import Instructions from './Instructions';
import Title from './Title';

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
    const { getRecipe, createRecipe, updateRecipe } = useRecipesContext();
    const getData = useCallback(async (): Promise<void> => {
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


    function addItem(newItem: NewItem): void {
        if (newItem.item_id/* newItem.item.id === '' */) return;
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

    function updateIsEditing(target: string, value: boolean) {
        setIsEditing(prev => ({
            ...prev,
            [target]: value,
        }));
    }

    function handleSave() {
        const ingredientList = ingredients.map(({ item, amount }) => ({
            amount,
            item_id: item.id
        }));
        if (id) {
            updateRecipe(id, {
                title,
                instructions,
                ingredients: ingredientList,
            });
        } else {
            createRecipe({
                title,
                instructions,
                ingredients: ingredientList,
            });
        }
    }

    const { title, ingredients, instructions } = state;
    return (
        <Wrapper>
            <Title
                value={title}
                onChange={(event) => dispatch({
                    type: 'title_edit',
                    value: event.target.value
                })} />
            <Ingredients
                isEditing={isEditing.ingredient}
                addItem={addItem}
                ingredients={ingredients}
                openItemEditor={() => updateIsEditing('ingredient', true)}
                closeItemEditor={() => updateIsEditing('ingredient', false)} />
            <Instructions
                isEditing={isEditing.instruction}
                addInstruction={addInstruction}
                instructions={instructions}
                openInstructionEditor={() => updateIsEditing('instructions', true)}
                closeInstructionEditor={() => updateIsEditing('instructions', false)} />
            <Button
                label='Save'
                onClick={handleSave} />
        </Wrapper>
    );
}

