import { createContext } from 'react';
import useMealPlansAPI from '../../hooks/useMealPlansAPI';

export interface ContextMealPlans {
    plans: Plan[];
    removePlan: (id: Plan['id']) => void;
}

export const MealPlansContext = createContext<ContextMealPlans | null>(null);

export function MealPlansProvider(props: GeneralProps) {
    const { children } = props;
    const { plans, removePlan } = useMealPlansAPI();

    const value = {
        plans,
        removePlan,
    };

    return (
        <MealPlansContext.Provider value={value}>
            {children}
        </MealPlansContext.Provider>
    );
}