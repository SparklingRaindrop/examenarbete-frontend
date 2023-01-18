import { IconButton } from '../..';
import useMealPlansContext from '../../../hooks/useMealPlansContext';
import Calendar from './blocks/Calendar';

type Props = {}
export default function MealPlans({ }: Props) {
    const { plans } = useMealPlansContext();

    return (
        <div>
            <Calendar />
            <h3>Breakfast</h3>
            <IconButton name='plus' />
            {plans.filter(plan => plan.type === 'breakfast').map(plan => <div key={plan.id}>{plan.recipe.title}</div>)}
            <h3>Lunch</h3>
            <IconButton name='plus' />
            {plans.filter(plan => plan.type === 'lunch').map(plan => <div key={plan.id}>{plan.recipe.title}</div>)}
            <h3>Dinner</h3>
            <IconButton name='plus' />
            {plans.filter(plan => plan.type === 'dinner').map(plan => <div key={plan.id}>{plan.recipe?.title}</div>)}
        </div>
    );
}