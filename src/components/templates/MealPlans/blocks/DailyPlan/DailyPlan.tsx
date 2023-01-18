import useMealPlansContext from '../../../../../hooks/useMealPlansContext';
import { IconButton } from '../../../../elements';
import { NewPlan } from '../../MealPlans';
import { Plan, Wrapper } from './styled';

type Props = {
    plans: Plan[];
    date: number | Date;
}

export default function DailyPlan(props: Props) {
    const { plans } = props;
    const { removePlan } = useMealPlansContext();

    return (
        <Wrapper>
            {
                plans.map(({ id, recipe }, index) => (
                    <Plan key={id + index}>
                        {recipe.title}
                        <IconButton
                            name='xMark'
                            variant='ghost'
                            onClick={() => removePlan(id)} />
                    </Plan>
                ))
            }
        </Wrapper>
    );
}