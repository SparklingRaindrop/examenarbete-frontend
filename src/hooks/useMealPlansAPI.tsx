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

function getInitialFetchedRange(): Date[] {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return [start, end];
}

export default function useMealPlansAPI() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [fetchedRange, setFetchedRange] = useState<Date[]>(getInitialFetchedRange());

    useEffect(() => {
        async function init() {
            getPlans();
        }
        init();
        // eslint-disable-next-line
    }, []);

    function addRange(range: PlanRange) {
        const { start, end } = range;
        // PlanRange's month isn't "index month"
        const date1 = new Date(start.year, start.month - 1, start.day);
        const date2 = new Date(end.year, end.month - 1, end.day);
        if (date1 < fetchedRange[0]) {
            setFetchedRange(prev => {
                const newData = [...prev];
                newData[0] = date1;
                return newData;
            });
        } else if (fetchedRange[1] < date2) {
            setFetchedRange(prev => {
                const newData = [...prev];
                newData[1] = date2;
                return newData;
            });
        }
    }

    async function getPlans(range?: PlanRange): Promise<APIResponse> {
        const response = await get<Plan[]>(`/plans${range ? generateQuery(range) : ''}`);
        if (range) {
            addRange(range);
        }
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
        fetchedRange,
        removePlan,
        addPlan,
        getPlans
    };
}
