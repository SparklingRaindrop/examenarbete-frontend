import { createContext } from 'react';
import { useRecipesAPI } from '../../hooks';
import { RecipeRequestData } from '../../hooks/useRecipesAPI';
import { APIResponse, GetResponse } from '../../util/api';

export interface ContextRecipes {
    items: Item[];
    filterItems: (keyword?: string) => Item[];
    getRecipes: (keyword?: string) => Promise<GetResponse<Recipe[]>>;
    getItems: (keyword?: string) => Promise<GetResponse<Item[]>>;
    getRecipe: (id: string) => Promise<GetResponse<Recipe>>;
    removeRecipe: (id: Recipe['id']) => Promise<APIResponse>;
    getUnits: () => Promise<GetResponse<Unit[]>>;
    addRecipe: (newData: RecipeRequestData) => Promise<APIResponse>;
}

export const RecipesContext = createContext<ContextRecipes | null>(null);

export function RecipesProvider(props: GeneralProps) {
    const { children } = props;
    const {
        items,
        filterItems,
        getRecipes,
        removeRecipe,
        getRecipe,
        getItems,
        getUnits,
        addRecipe
    } = useRecipesAPI();

    const value = {
        items,
        filterItems,
        getRecipes,
        getRecipe,
        removeRecipe,
        getItems,
        getUnits,
        addRecipe
    };

    return (
        <RecipesContext.Provider value={value}>
            {children}
        </RecipesContext.Provider>
    );
}