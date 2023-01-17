import { createContext } from 'react';

export interface ContextMealPlans {
    plans: Plan[];
}

export const MealPlansContext = createContext<ContextMealPlans | null>(null);

export function MealPlansProvider(props: GeneralProps) {
    const { children } = props;

    return (
        <MealPlansContext.Provider value={{ plans: [{ id: 'exmaple1' }] }}>
            {children}
        </MealPlansContext.Provider>
    );
}