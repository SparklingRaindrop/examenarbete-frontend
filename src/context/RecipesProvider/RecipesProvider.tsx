import { createContext } from 'react';
import { useRecipesAPI } from '../../hooks';
import { RecipeRequestData } from '../../hooks/useRecipesAPI';
import { APIResponse, GetResponse } from '../../util/api';

export interface ContextRecipes {
    items: Item[];
    recipes: Recipe[];
    units: Unit[];
    getFilteredItems: (keyword?: string) => Item[];
    getRecipes: (keyword?: string) => Promise<GetResponse<Recipe[]>>;
    getItems: (keyword?: string) => Promise<GetResponse<Item[]>>;
    getRecipe: (id: string) => Promise<GetResponse<Recipe>>;
    removeRecipe: (id: Recipe['id']) => Promise<APIResponse>;
    removeItem: (id: Item['id']) => Promise<APIResponse>
    getUnits: () => Promise<GetResponse<Unit[]>>;
    createRecipe: (newData: RecipeRequestData) => Promise<APIResponse>;
    createItem: (newData: { name: Item['name']; unit_id: Unit['id'] }) => Promise<APIResponse>;
    updateRecipe: (id: string, newData: RecipeRequestData) => Promise<APIResponse>;
    updateItem: (id: string, newData: { name: Item['name'], unit_id: Unit['id'] }) => Promise<APIResponse>;
}

export const RecipesContext = createContext<ContextRecipes | null>(null);

export function RecipesProvider(props: GeneralProps) {
    const { children } = props;
    const value = useRecipesAPI();

    return (
        <RecipesContext.Provider value={value}>
            {children}
        </RecipesContext.Provider>
    );
}