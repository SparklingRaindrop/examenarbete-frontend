import { useEffect, useReducer } from 'react';
import { useRecipesContext } from '../../../../../hooks';
import { Status } from '../../../../../types/statusCode';
import { Button, Modal } from '../../../../elements';

type Props = {
    id?: string;
}

type RecipeData = {
    title: Recipe['title'];
    ingredients: {
        item: Pick<Item, 'id' | 'name'>,
        unit: Pick<Unit, 'name' | 'id'>
    }[];
}

const initial: RecipeData = {
    title: '',
    ingredients: []
};

type Action = 'initial';
function reducer(state: RecipeData, action: { type: Action, value: any }): RecipeData {
    if (action.type === 'initial') {
        console.log(action.value);
        return { ...state };
    }
    throw Error('Unknown action.');
}

export default function RecipeEditor(props: Props) {
    const { id } = props;
    const [state, dispatch] = useReducer(reducer, initial);

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

    return (
        <Modal>
            <h2>
                DishName
            </h2>
            <h3>
                ingredients
            </h3>
            {/*             {
                ingredients.map(item => (
                    <li>{item.name}{item.amount}{item.unit.name}</li>
                ))
            } */}
            <Button label='add an item' />
            <h3>
                How to cook
            </h3>
            {/*             {
                Array.from({length: setFips.length}, (_, i) => i + 1).map((step) => )
            } */}
        </Modal>
    );
}