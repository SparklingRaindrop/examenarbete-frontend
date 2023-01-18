import { useMemo } from 'react';
import { IconButton } from '../../../../elements';
import { NewPlan } from '../../MealPlans';
import DailyPlan from '../DailyPlan/DailyPlan';
import { Wrapper, H3, MealName, Meal } from './styled';

type Props = {
    filteredPlans: Plan[][];
    selectedDates: Date[];
    openModal: (newData: NewPlan) => void;
}

const MEALS = ['breakfast', 'lunch', 'dinner'];

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
                    <>
                        <H3 key={date.toString()}>
                            {
                                days.length !== 1 && // don't display if selected days is only one day
                                new Date(date).toLocaleDateString(
                                    'en-us',
                                    { month: 'long', day: 'numeric', weekday: 'short' }
                                )
                            }
                        </H3>
                        {
                            MEALS.map(meal => (
                                <Meal key={meal}>
                                    <MealName>
                                        <h3>{meal}</h3>
                                        <IconButton
                                            name='plus'
                                            onClick={() => openModal({
                                                type: meal,
                                                date: new Date(date),
                                            })} />
                                    </MealName>
                                    {
                                        filteredPlans.filter(plans =>
                                            new Date(plans[0].date).getDate() === new Date(date).getDate() &&
                                            plans[0].type === meal
                                        ).map((plans) => {
                                            const { id } = plans[0];
                                            return (
                                                <Wrapper key={id}>
                                                    <DailyPlan
                                                        plans={plans}
                                                        date={date} />
                                                </Wrapper>
                                            );
                                        })
                                    }
                                </Meal>
                            ))
                        }
                    </>
                ))

            }
        </>
    );
}
