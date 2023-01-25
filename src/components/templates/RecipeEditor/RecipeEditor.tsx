import { useCallback, useEffect, useReducer, useState } from 'react';
import { useDisclosure, useRecipesContext } from '../../../hooks';
import { RecipeData } from '../../../hooks/useRecipesAPI';
import { Status } from '../../../types/statusCode';
import { Button } from '../../elements';
import { NewItem } from '../../elements/ItemInputFields/ItemInputFields';
import { Ingredients, Instructions, Title } from './blocks';
import { Wrapper } from './styled';

type Props = {
    id?: string;
}

type isEditing = {
    ingredient: boolean, instruction: boolean
}

const initial: RecipeData = {
    title: '',
    ingredients: [],
    instructions: [],
};

type Action = 'initial' | 'edit_title' | 'add_ingredient' | 'add_instruction' | 'remove_ingredient';
function reducer(state: RecipeData, action: { type: Action, value: any }): RecipeData {
    if (action.type === 'initial') {
        const { value } = action;
        return {
            ...state,
            title: value.title,
            ingredients: value.ingredients,
            instructions: value.instructions,
        };
    } else if (action.type === 'edit_title') {
        const { value } = action;
        return {
            ...state,
            title: value,
        };
    } else if (action.type === 'add_instruction') {
        const { value }: { value: Omit<Instruction, 'id'> & { id?: Instruction['id'] } } = action;
        return {
            ...state,
            instructions: [
                ...state.instructions,
                value,
            ],
        };
    } else if (action.type === 'add_ingredient') {
        const { value } = action;
        return {
            ...state,
            ingredients: [
                ...state.ingredients,
                value
            ],
        };
    } else if (action.type === 'remove_ingredient') {
        const { value } = action;
        const newIngredients = state.ingredients.filter(({ item }) => item.id !== value.id);
        return {
            ...state,
            ingredients: newIngredients,
        };
    }
    throw Error('Unknown action.');
}

export default function RecipeEditor(props: Props) {
    const { id } = props;
    const [state, dispatch] = useReducer(reducer, initial);
    const {
        isOpen: isOpenIngredientEditor,
        toggleIsOpen: toggleIngredientEditor,
        onClose: closeIngredientEditor,
    } = useDisclosure();
    const {
        isOpen: isOpenInstructionEditor,
        toggleIsOpen: toggleInstructionEditor,
        onClose: closeInstructionEditor,
    } = useDisclosure();
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
        if (!newItem.item.id) return;
        dispatch({
            type: 'add_ingredient',
            value: newItem,
        });
    }

    function removeItem(target: Pick<Item, 'id'>): void {
        dispatch({
            type: 'remove_ingredient',
            value: target,
        });
    }

    function addInstruction(newInstruction: string): void {
        if (!newInstruction) return;
        dispatch({
            type: 'add_instruction',
            value: {
                step_no: instructions.length + 1,
                instruction: newInstruction,
            },
        });
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
                    type: 'edit_title',
                    value: event.target.value
                })} />
            <Ingredients
                isEditing={isOpenIngredientEditor}
                addItem={addItem}
                removeItem={removeItem}
                ingredients={ingredients}
                openItemEditor={toggleIngredientEditor}
                closeItemEditor={closeIngredientEditor} />
            <Instructions
                isEditing={isOpenInstructionEditor}
                addInstruction={addInstruction}
                instructions={instructions}
                openInstructionEditor={toggleInstructionEditor}
                closeInstructionEditor={closeInstructionEditor} />
            <Button
                label='Save'
                onClick={handleSave} />
        </Wrapper>
    );
}

