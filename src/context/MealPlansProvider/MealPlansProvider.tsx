import { createContext } from 'react';
import useMealPlansAPI, { PlanRange } from '../../hooks/useMealPlansAPI';
import { APIResponse } from '../../util/api';

export interface ContextMealPlans {
    plans: Plan[];
    fetchedRange: Date[];
    getPlans: (range?: PlanRange) => Promise<APIResponse>;
    removePlan: (id: Plan['id']) => void;
    addPlan: (newData: { date: Date, type: string } & { recipe_id: Recipe['id'] }) => Promise<APIResponse>;
}

export const MealPlansContext = createContext<ContextMealPlans | null>(null);

export function MealPlansProvider(props: GeneralProps) {
    const { children } = props;
    const { plans, fetchedRange, getPlans, removePlan, addPlan } = useMealPlansAPI();

    const value = {
        plans,
        fetchedRange,
        getPlans,
        removePlan,
        addPlan,
    };

    return (
        <MealPlansContext.Provider value={value}>
            {children}
        </MealPlansContext.Provider>
    );
}