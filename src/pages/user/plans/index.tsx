import { MealPlans } from '../../../components/templates';
import { MealPlansProvider } from '../../../context';

type Props = {}
export default function MealPlanPage({ }: Props) {
    return (
        <MealPlansProvider>
            <MealPlans />
        </MealPlansProvider>
    );
}