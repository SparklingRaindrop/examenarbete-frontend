import { createContext } from 'react';
import useMealPlansAPI from '../../hooks/useMealPlansAPI';

export interface ContextMealPlans {
    plans: Plan[];
}

export const MealPlansContext = createContext<ContextMealPlans | null>(null);

export function MealPlansProvider(props: GeneralProps) {
    const { children } = props;
    const { plans } = useMealPlansAPI();

    const value = {
        plans,
    };

    return (
        <MealPlansContext.Provider value={value}>
            {children}
        </MealPlansContext.Provider>
    );
}