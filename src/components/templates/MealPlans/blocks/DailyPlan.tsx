import { IconButton } from '../../../elements';

type Props = {
    plans: Plan[];
}

export default function DailyPlan(props: Props) {
    const { plans } = props;
    return (
        <div>
            <h3>Breakfast</h3>
            <IconButton name='plus' />
            {
                plans
                    .filter(({ type }) => type === 'breakfast')
                    .map(plan => <div key={plan.id}>{plan.recipe.title}</div>)
            }
            <h3>Lunch</h3>
            <IconButton name='plus' />
            {
                plans
                    .filter(({ type }) => type === 'lunch')
                    .map(plan => <div key={plan.id}>{plan.recipe.title}</div>)
            }
            <h3>Dinner</h3>
            <IconButton name='plus' />
            {
                plans
                    .filter(({ type }) => type === 'dinner')
                    .map(plan => <div key={plan.id}>{plan.recipe.title}</div>)
            }
        </div>
    )
}