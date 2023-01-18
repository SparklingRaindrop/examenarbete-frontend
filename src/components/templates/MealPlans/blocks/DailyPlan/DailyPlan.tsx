import useMealPlansContext from '../../../../../hooks/useMealPlansContext';
import { IconButton } from '../../../../elements';
import { MealName, Plan, Wrapper, Meal } from './styled';

type Props = {
    plans: Plan[];
    openModal: () => void;
}

const MEALS = ['breakfast', 'lunch', 'dinner'];

export default function DailyPlan(props: Props) {
    const { plans, openModal } = props;
    const { removePlan } = useMealPlansContext();

    return (
        <Wrapper>
            {
                MEALS.map(meal => (
                    <Meal key={meal}>
                        <MealName>
                            <h3>{meal}</h3>
                            <IconButton
                                name='plus'
                                onClick={() => openModal()} />
                        </MealName>
                        {
                            plans
                                .filter(({ type }) => type === meal)
                                .map(({ id, recipe }) => (
                                    <Plan key={id}>
                                        {recipe.title}
                                        <IconButton
                                            name='xMark'
                                            variant='ghost'
                                            onClick={() => removePlan(id)} />
                                    </Plan>
                                ))
                        }
                    </Meal>
                ))
            }
        </Wrapper>
    )
}