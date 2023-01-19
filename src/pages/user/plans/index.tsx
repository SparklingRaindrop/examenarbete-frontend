import { MealPlans } from '../../../components/templates';
import { MealPlansProvider } from '../../../context';
import { RecipesProvider } from '../../../context/RecipesProvider';

export default function MealPlanPage() {
    return (
        <MealPlansProvider>
            <RecipesProvider>
                <MealPlans />
            </RecipesProvider>
        </MealPlansProvider>
    );
}