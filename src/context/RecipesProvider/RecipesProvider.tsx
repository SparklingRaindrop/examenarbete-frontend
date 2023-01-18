import { createContext } from 'react';
import { useRecipesAPI } from '../../hooks';
import { APIResponse, GetResponse } from '../../util/api';

export interface ContextRecipes {
    getRecipes: () => Promise<GetResponse<Recipe[]> | APIResponse>;
}

export const RecipesContext = createContext<ContextRecipes | null>(null);

export function RecipesProvider(props: GeneralProps) {
    const { children } = props;
    const { getRecipes } = useRecipesAPI();

    const value = {
        getRecipes
    };

    return (
        <RecipesContext.Provider value={value}>
            {children}
        </RecipesContext.Provider>
    );
}