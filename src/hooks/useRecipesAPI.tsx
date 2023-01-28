import { useEffect, useState } from 'react';
import { Status } from '../types/statusCode';
import { APIResponse, get, GetResponse, patch, post, remove } from '../util/api';

export interface RecipeData extends Pick<Recipe, 'title'> {
    ingredients: Array<{
        item: Item;
        amount: number;
    }>;
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
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [units, setUnits] = useState<Unit[]>([]);

    function updateItems(items: Item[]) {
        setItems(items ? items : []);
    }

    function updateRecipes(recipes: Recipe[]) {
        setRecipes(recipes ? recipes : []);
    }

    function updateUnits(units: Unit[]) {
        setUnits(units ? units : []);
    }

    async function getRecipes(keyword?: string): Promise<GetResponse<Recipe[]>> {
        const response = await get<Recipe[]>(`/recipes${keyword ? '?keyword=' + keyword : ''}`);
        if (response.status === Status.Succuss && response.data) {
            setRecipes(response.data);
        }
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
        if (response.status === Status.NoContent) {
            getRecipes();
        }
        return response;
    }

    async function getItems(keyword?: string): Promise<GetResponse<Item[]>> {
        const response = await get<Item[]>(`/items${keyword ? '?keyword=' + keyword : ''}`);
        if (response.status === Status.Succuss && response.data) {
            setItems(response.data);
        }
        return response;
    }

    async function removeItem(id: Item['id']): Promise<APIResponse> {
        const response = await remove(`/items${id}`);
        return response;
    }

    async function getUnits(): Promise<GetResponse<Unit[]>> {
        const response = await get<Unit[]>('/units');
        if (response.status === Status.Succuss && response.data) {
            setUnits(response.data);
        }
        return response;
    }

    async function createRecipe(newData: RecipeRequestData): Promise<APIResponse> {
        const response = await post<RecipeRequestData>('/recipes', newData);
        if (response.status === Status.Created) {
            getRecipes();
        }
        return response;
    }

    async function createItem(newData: { name: Item['name']; unit_id: Unit['id'] }): Promise<APIResponse> {
        const response = await post<{ name: Item['name']; unit_id: Unit['id'] }>('/items', newData);
        if (response.status === Status.Created) {
            getItems();
        }
        return response;
    }

    async function updateRecipe(id: string, newData: RecipeRequestData): Promise<APIResponse> {
        const response = await patch<RecipeRequestData>(`/recipes/${id}`, newData);
        if (response.status === Status.Succuss) {
            getRecipes();
        }
        return response;
    }

    async function updateItem(id: string, newData: { name: Item['name'], unit_id: Unit['id'] }): Promise<APIResponse> {
        const response = await patch<{ name: Item['name'], unit_id: Unit['id'] }>(`/items/${id}`, newData);
        if (response.status === Status.Succuss) {
            getItems();
        }
        return response;
    }

    function getFilteredItems(keyword?: string) {
        if (!keyword) return items;

        const key = keyword.toLowerCase();
        return items.filter(item => item.name.includes(key));
    }

    return {
        items,
        recipes,
        units,
        getRecipes,
        getRecipe,
        removeRecipe,
        removeItem,
        getItems,
        getUnits,
        createRecipe,
        createItem,
        getFilteredItems,
        updateRecipe,
        updateItem,
        updateItems,
        updateRecipes,
        updateUnits
    };
}
