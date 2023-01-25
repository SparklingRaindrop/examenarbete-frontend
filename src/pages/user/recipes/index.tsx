import axios from 'axios';
import { useEffect } from 'react';
import { Recipes } from '../../../components/templates';

import { useRecipesContext } from '../../../hooks';

type Props = {
    items: Item[];
    recipes: Recipe[];
    units: Unit[];
}

export default function RecipePage({ items, recipes, units }: Props) {
    const { updateItems, updateRecipes, updateUnits } = useRecipesContext();

    useEffect(() => {
        updateItems(items);
        updateRecipes(recipes);
        updateUnits(units);
        // eslint-disable-next-line
    }, []);
    return (
        <Recipes />
    );
}

export async function getServerSideProps(context: any) {
    const { access_token } = context.req.cookies;
    const { data: items } = await axios.get<Stock[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/items`, {
        headers: { Cookie: `access_token=${access_token};` },
    });
    const { data: recipes } = await axios.get<Recipe[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipes`, {
        headers: { Cookie: `access_token=${access_token};` },
    });
    const { data: units } = await axios.get<Unit[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/units`, {
        headers: { Cookie: `access_token=${access_token};` },
    });
    return { props: { items, units, recipes } };
}