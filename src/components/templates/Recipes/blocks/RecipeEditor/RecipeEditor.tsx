import { useEffect, useReducer } from 'react';
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

type Action = 'initial';
function reducer(state: RecipeData, action: { type: Action, value: any }): RecipeData {
    if (action.type === 'initial') {
        const { value } = action;
        return {
            ...state,
            title: value.title,
            ingredients: value.ingredients,
        };
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

    const { title, ingredients } = state;
    return (
        <Modal>
            <h2>
                {title ? title : 'No title'}
            </h2>
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