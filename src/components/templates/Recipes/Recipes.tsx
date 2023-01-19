import { useEffect, useState } from 'react';

import { useRecipesContext } from '../../../hooks';

import { IconButton } from '../../elements';

import { RecipeList } from './blocks';

export default function Recipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const { getRecipes } = useRecipesContext();

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
            <IconButton name='plus' />
            <RecipeList
                recipes={recipes}
                updateRecipes={updateRecipes} />
        </>
    );
}