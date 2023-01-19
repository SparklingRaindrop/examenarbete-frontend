import { createContext } from 'react';
import { useRecipesAPI } from '../../hooks';
import { APIResponse, GetResponse } from '../../util/api';

export interface ContextRecipes {
    getRecipes: (keyword?: string) => Promise<GetResponse<Recipe[]>>;
    getRecipe: (id: string) => Promise<GetResponse<Recipe>>;
    removeRecipe: (id: Recipe['id']) => Promise<APIResponse>;
}

export const RecipesContext = createContext<ContextRecipes | null>(null);

export function RecipesProvider(props: GeneralProps) {
    const { children } = props;
    const { getRecipes, removeRecipe, getRecipe } = useRecipesAPI();

    const value = {
        getRecipes,
        getRecipe,
        removeRecipe
    };

    return (
        <RecipesContext.Provider value={value}>
            {children}
        </RecipesContext.Provider>
    );
}