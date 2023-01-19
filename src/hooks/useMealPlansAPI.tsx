import { useCallback, useEffect, useState } from 'react';
import { Status } from '../types/statusCode';
import { APIResponse, get, GetResponse, isGetResponse, post, remove } from '../util/api';

type DateData = {
    year: number,
    month: number;
    day: number;
};

export type PlanRange = {
    start: DateData,
    end: DateData,
}

function generateQuery(range: [Date, Date]): string {
    const [start, end] = range;
    const startMonth = start.getMonth() + 1;
    const startDay = start.getDate();
    const startYear = start.getFullYear();
    const endMonth = end.getMonth() + 1;
    const endDay = end.getDate();
    const endYear = end.getFullYear();
    return `/?start=${startMonth}-${startDay}-${startYear}` +
        `&end=${endMonth}-${endDay}-${endYear}`;
}

function getInitialFetchedRange(): [Date, Date] {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return [start, end];
}

export default function useMealPlansAPI() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [fetchedPlansRange, setFetchedPlansRange] = useState<[Date, Date]>(getInitialFetchedRange());
    const getPlans = useCallback(async (): Promise<GetResponse<Plan[]>> => {
        const response = await get<Plan[]>(`/plans${generateQuery(fetchedPlansRange)}`);
        if (response.data && response.status === Status.Succuss && isGetResponse(response)) {
            setPlans(response.data);
        }
        return { status: response.status };
    }, [fetchedPlansRange]);

    useEffect(() => {
        async function init() {
            getPlans();
        }
        init();
    }, [getPlans]);

    useEffect(() => {
        getPlans();
    }, [fetchedPlansRange, getPlans]);

    function updateRange(range: PlanRange) {
        const { start, end } = range;
        // PlanRange's month isn't "index month"
        const date1 = new Date(start.year, start.month - 1, start.day);
        const date2 = new Date(end.year, end.month - 1, end.day);
        if (date1 < fetchedPlansRange[0]) {
            setFetchedPlansRange(prev => {
                const newData = [...prev];
                newData[0] = date1;
                return newData as [Date, Date];
            });
        } else if (fetchedPlansRange[1] < date2) {
            setFetchedPlansRange(prev => {
                const newData = [...prev];
                newData[1] = date2;
                return newData as [Date, Date];
            });
        }
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
        fetchedPlansRange,
        removePlan,
        addPlan,
        updateRange
    };
}
