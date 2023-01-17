import nodeTest from 'node:test';
import { useEffect, useState } from 'react';
import { Status } from '../types/statusCode';
import { get, isGetResponse } from '../util/api';

export default function useMealPlansAPI() {
    const [plans, setPlans] = useState<Plan[]>([]);

    useEffect(() => {
        async function init() {
            const response = await get<Plan[]>('/plans');
            if (response && response.status === Status.Succuss && isGetResponse(response)) {
                const { data } = response;
                setPlans(data);
            }
        }
        init();
    }, []);

    return {
        plans
    };
}
