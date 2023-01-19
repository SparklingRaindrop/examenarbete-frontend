import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useRecipesContext } from '../../../hooks';

import { IconButton } from '../../elements';

import { RecipeList } from './blocks';

export default function Recipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const { getRecipes } = useRecipesContext();
    const router = useRouter();


    useEffect(() => {
        updateRecipes();
        // eslint-disable-next-line
    }, []);

    async function updateRecipes(): Promise<void> {
        const response = await getRecipes();
        if (response.data) {
            setRecipes(response.data);
        }
    }

    return (
        <>
            <h3>
                Search
            </h3>
            <input />
            <h3>
                My Recipes
            </h3>
            <IconButton
                name='plus'
                onClick={() => router.push('/user/recipes/new')} />
            <RecipeList
                recipes={recipes}
                updateRecipes={updateRecipes} />
        </>
    );
}