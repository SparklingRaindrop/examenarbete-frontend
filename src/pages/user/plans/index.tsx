import { MealPlans } from '../../../components/templates';
import { MealPlansProvider } from '../../../context';
import { RecipesProvider } from '../../../context/RecipesProvider';

type Props = {}
export default function MealPlanPage({ }: Props) {
    return (
        <MealPlansProvider>
            <RecipesProvider>
                <MealPlans />
            </RecipesProvider>
        </MealPlansProvider>
    );
}