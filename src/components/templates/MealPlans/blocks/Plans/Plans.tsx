import DailyPlan from '../DailyPlan/DailyPlan';
import { Wrapper, H3 } from './styled';

type Props = {
    filteredPlans: Plan[][];
    openModal: () => void;
}

export default function Plans(props: Props) {
    const { filteredPlans, openModal } = props;

    return (
        <>
            {
                filteredPlans.map((plans, _, array) => {
                    const { id, date } = plans[0];
                    return (
                        <Wrapper key={id}>
                            {
                                array.length > 1 &&
                                <H3>
                                    {new Date(date).toLocaleDateString('en-us', { month: 'long', day: 'numeric', weekday: 'short' })}
                                </H3>
                            }
                            <DailyPlan plans={plans} openModal={openModal} />
                        </Wrapper>
                    );
                })
            }
        </>
    );
}