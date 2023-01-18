import { useEffect, useState } from 'react';
import { Status } from '../types/statusCode';
import { APIResponse, get, isGetResponse, post, remove } from '../util/api';

type DateData = {
    year: number,
    month: number;
    day: number;
};

export type Range = {
    start: DateData,
    end: DateData,
}

export default function useMealPlansAPI() {
    const [plans, setPlans] = useState<Plan[]>([]);

    useEffect(() => {
        async function init() {
            getPlans();
        }
        init();
    }, []);

    async function getPlans(range?: Range): Promise<APIResponse> {
        const response = await get<Plan[]>(`/plans${range ? `?bids=start${range.start}&end=${range.end}` : ''}`);
        if (response && response.status === Status.Succuss && isGetResponse(response)) {
            const { data } = response;
            setPlans(prev => ([
                ...prev,
                ...data
            ]));
        }
        return { status: response.status };
    }

    async function removePlan(id: Plan['id']): Promise<APIResponse> {
        const response = await remove(`/plans/${id}`);
        if (response && response.status === Status.NoContent) {
            getPlans();
        }
        return { status: response.status };
    }

    async function addPlan(newData: { date: Date, type: string } & { recipe_id: Recipe['id'] }): Promise<APIResponse> {
        const response = await post<Grocery>('/plans', newData);
        if (response && response.status === Status.Created) {
            getPlans();
        }
        return { status: response.status };
    }

    return {
        plans,
        removePlan,
        addPlan,
        getPlans
    };
}
