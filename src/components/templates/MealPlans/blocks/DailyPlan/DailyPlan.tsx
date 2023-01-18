import { IconButton } from '../../../../elements';
import { MealName, Plan, Wrapper, Meal } from './styled';

type Props = {
    plans: Plan[];
}

const MEALS = ['breakfast', 'lunch', 'dinner'];

export default function DailyPlan(props: Props) {
    const { plans } = props;
    return (
        <Wrapper>
            {
                MEALS.map(meal => (
                    <Meal key={meal}>
                        <MealName>
                            <h3>{meal}</h3>
                            <IconButton name='plus' />
                        </MealName>
                        {
                            plans
                                .filter(({ type }) => type === meal)
                                .map(plan => <Plan key={plan.id}>{plan.recipe.title}</Plan>)
                        }
                    </Meal>
                ))
            }
        </Wrapper>
    )
}