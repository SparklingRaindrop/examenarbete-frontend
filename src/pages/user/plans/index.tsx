import { MealPlans } from '../../../components/templates';
import { MealPlansProvider } from '../../../context';

export default function MealPlanPage() {
    return (
        <MealPlansProvider>
            <MealPlans />
        </MealPlansProvider>
    );
}