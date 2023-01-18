import { useMemo } from 'react';
import { Day } from '../../../../../hooks/useCalendar';
import { NewPlan } from '../../MealPlans';
import DailyPlan from '../DailyPlan/DailyPlan';
import { Wrapper, H3 } from './styled';

type Props = {
    filteredPlans: Plan[][];
    selectedDates: Date[];
    openModal: (newData: NewPlan) => void;
}

export default function Plans(props: Props) {
    const { filteredPlans, selectedDates, openModal } = props;
    const days = useMemo(() => {
        if (selectedDates.length === 1) return selectedDates;

        const startDate = selectedDates[0];
        const endDate = selectedDates[1];
        return Array.from(Array(endDate.getDate() - startDate.getDate() + 1).keys())
            .map(increment => new Date(startDate).setDate(startDate.getDate() + increment));
    }, [selectedDates]);

    return (
        <>
            {
                days.map((date) => (
                    <H3 key={date.toString()}>
                        {
                            days.length !== 1 && // don't display if selected days is only one day
                            new Date(date).toLocaleDateString(
                                'en-us',
                                { month: 'long', day: 'numeric', weekday: 'short' }
                            )
                        }
                        {
                            filteredPlans.filter(plans =>
                                plans[0].date.getDate() === new Date(date).getDate()).map((plans, _) => {
                                    const { id } = plans[0];
                                    return (
                                        <Wrapper key={id}>
                                            <DailyPlan plans={plans} openModal={openModal} />
                                        </Wrapper>
                                    );
                                })
                        }
                    </H3>
                ))

            }
        </>
    );
}
