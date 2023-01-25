import { useEffect } from 'react';
import { Recipes } from '../../../components/templates';

import { useRecipesContext } from '../../../hooks';

export default function RecipePage() {
    const { getItems, getRecipes, getUnits } = useRecipesContext();

    useEffect(() => {
        getItems();
        getRecipes();
        getUnits();

        // eslint-disable-next-line
    }, []);
    return (
        <Recipes />
    );
}