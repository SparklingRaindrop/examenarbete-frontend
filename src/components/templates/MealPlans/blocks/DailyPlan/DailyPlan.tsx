import useMealPlansContext from '../../../../../hooks/useMealPlansContext';
import { Status } from '../../../../../types/statusCode';
import { IconButton } from '../../../../elements';
import { Heading, Plan, Wrapper } from './styled';

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
                        <Heading>
                            {recipe.title}
                        </Heading>
                        <IconButton
                            name='xMark'
                            variant='ghost'
                            onClick={async () => {
                                const response = await removePlan(id);
                                if (response.status === Status.NotFound || response.status === Status.BadRequest) {
                                    alert('Couldn\'t delete');
                                }
                            }} />
                    </Plan>
                ))
            }
        </Wrapper>
    );
}