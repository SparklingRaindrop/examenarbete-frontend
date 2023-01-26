import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';
import { Recipes } from '../../../components/templates';

import { useRecipesContext } from '../../../hooks';
import { fetch } from '../../../util/api';
import { refreshAccessToken } from '../../../util/token';

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const { data: items } = await fetch.get<Stock[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/items`, {
            withCredentials: true,
            headers: {
                Cookie: context.req.headers.cookie
            }
        });
        const { data: recipes } = await fetch.get<Recipe[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipes`, {
            withCredentials: true,
            headers: {
                Cookie: context.req.headers.cookie
            }
        });
        const { data: units } = await fetch.get<Unit[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/units`, {
            withCredentials: true,
            headers: {
                Cookie: context.req.headers.cookie
            }
        });
        return { props: { items, units, recipes } };
    } catch (error) {
        return {
            redirect: {
                destination: '/login'
            }
        };
    }
}