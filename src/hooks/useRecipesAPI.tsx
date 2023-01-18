import { useEffect, useState } from 'react';
import { Status } from '../types/statusCode';
import { APIResponse, get, GetResponse, isGetResponse, remove } from '../util/api';

export default function useRecipesAPI() {

    async function getRecipes(): Promise<GetResponse<Recipe[]> | APIResponse> {
        const response = await get<Recipe[]>('/recipes');
        if (response && response.status === Status.Succuss && isGetResponse(response)) {
            const { data } = response;
            return { status: response.status, data };
        }
        return { status: response.status };
    }

    return {
        getRecipes,
    };
}
