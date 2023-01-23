import { useEffect } from 'react';
import { MealPlans } from '../../../components/templates';
import { useMealPlansContext } from '../../../hooks';

export default function MealPlanPage() {
    const { getPlans } = useMealPlansContext();

    useEffect(() => {
        getPlans();
    }, [getPlans]);

    return (
        <MealPlans />
    );
}