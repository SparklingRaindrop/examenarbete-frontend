import { createContext } from 'react';
import useMealPlansAPI, { PlanRange } from '../../hooks/useMealPlansAPI';
import { APIResponse, GetResponse } from '../../util/api';

export interface ContextMealPlans {
    plans: Plan[];
    fetchedPlansRange: Date[];
    updateRange: (range: PlanRange) => void;
    removePlan: (id: Plan['id']) => Promise<APIResponse>;
    getPlans: () => Promise<GetResponse<Plan[]>>;
    addPlan: (newData: { date: Date, type: string } & { recipe_id: Recipe['id'] }) => Promise<APIResponse>;
}

export const MealPlansContext = createContext<ContextMealPlans | null>(null);

export function MealPlansProvider(props: GeneralProps) {
    const { children } = props;
    const value = useMealPlansAPI();

    return (
        <MealPlansContext.Provider value={value}>
            {children}
        </MealPlansContext.Provider>
    );
}