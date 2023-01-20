import { Status } from '../types/statusCode';
import { APIResponse, get, GetResponse, isGetResponse, remove } from '../util/api';

export default function useRecipesAPI() {

    async function getRecipes(keyword?: string): Promise<GetResponse<Recipe[]>> {
        const response = await get<Recipe[]>(`/recipes${keyword ? '?keyword=' + keyword : ''}`);
        return response;
    }

    async function getRecipe(id: string): Promise<GetResponse<Recipe>> {
        if (!id) {
            throw new Error('Provide recipe ID');
        }
        const response = await get<Recipe>(`/recipes/${id}`);
        return response;
    }

    async function removeRecipe(id: Recipe['id']): Promise<APIResponse> {
        const response = await remove(`/recipes/${id}`);
        return response;
    }

    async function getItems(keyword?: string): Promise<GetResponse<Item[]>> {
        const response = await get<Item[]>(`/items${keyword ? '?keyword=' + keyword : ''}`);
        return response;
    }

    async function getUnits(): Promise<GetResponse<Unit[]>> {
        const response = await get<Unit[]>('/units');
        return response;
    }

    return {
        getRecipes,
        getRecipe,
        removeRecipe,
        getItems,
        getUnits,
    };
}
