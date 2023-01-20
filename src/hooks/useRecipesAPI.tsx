import { useEffect, useState } from 'react';
import { Status } from '../types/statusCode';
import { APIResponse, get, GetResponse, post, remove } from '../util/api';

export interface RecipeData extends Pick<Recipe, 'title'> {
    ingredients: {
        item: Item,
        amount: number;
    }[];
    instructions: Array<Omit<Instruction, 'id'> & { id?: Instruction['id'] }>;
}

export interface RecipeRequestData extends Pick<Recipe, 'title'> {
    ingredients: Array<{
        amount: number;
        item_id: Item['id'];
    }>,
    instructions: Array<Omit<Instruction, 'id'> & { id?: Instruction['id'] }>;
}

export default function useRecipesAPI() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        async function init() {
            const response = await getItems();
            if (response.status === Status.Succuss && response.data) {
                setItems(response.data);
            }
        }
        init();
    }, []);

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

    async function addRecipe(newData: RecipeRequestData): Promise<APIResponse> {
        const response = await post<RecipeRequestData>('/recipes', newData);
        return response;
    }

    function filterItems(keyword?: string) {
        if (!keyword) return items;

        const key = keyword.toLowerCase();
        return items.filter(item => item.name.includes(key));
    }

    return {
        items,
        getRecipes,
        getRecipe,
        removeRecipe,
        getItems,
        getUnits,
        addRecipe,
        filterItems,
    };
}
