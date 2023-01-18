import { useEffect, useState } from 'react';
import { Status } from '../types/statusCode';
import { APIResponse, get, isGetResponse, post, remove } from '../util/api';

export default function useMealPlansAPI() {
    const [plans, setPlans] = useState<Plan[]>([]);

    useEffect(() => {
        async function init() {
            getPlans();
        }
        init();
    }, []);

    // TODO: fetch only current month
    async function getPlans(range?: { start: string, end: string }): Promise<APIResponse> {
        const response = await get<Plan[]>(`/plans${range && `?bids=start${range.start}&end=${range.end}`}`);
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
