import { useEffect, useState } from 'react';
import { Status } from '../types/statusCode';
import { APIResponse, get, isGetResponse, post, remove } from '../util/api';

type DateData = {
    year: number,
    month: number;
    day: number;
};

export type PlanRange = {
    start: DateData,
    end: DateData,
}

function generateQuery(range: PlanRange): string {
    const parsed: { [key: string]: string } = {};
    Object.keys(range).forEach(type => {
        Object.keys(range[type as keyof PlanRange]).forEach(key => {
            parsed[type + key] = range[type as keyof PlanRange][key as keyof DateData].toString().padStart(2, '0');
        });
    });
    return `/?start=${parsed.startmonth}-${parsed.startday}-${parsed.startyear}` +
        `&end=${parsed.endmonth}-${parsed.endday}-${parsed.endyear}`;
}

export default function useMealPlansAPI() {
    const [plans, setPlans] = useState<Plan[]>([]);

    useEffect(() => {
        async function init() {
            getPlans();
        }
        init();
    }, []);

    async function getPlans(range?: PlanRange): Promise<APIResponse> {
        const response = await get<Plan[]>(`/plans${range ? generateQuery(range) : ''}`);
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
