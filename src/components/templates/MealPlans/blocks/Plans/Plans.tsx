import { useMemo } from 'react';
import { Container, IconButton } from '../../../../elements';
import { NewPlan } from '../../MealPlans';
import DailyPlan from '../DailyPlan/DailyPlan';
import { Wrapper, H3, MealName, Meal, Text } from './styled';

type Props = {
    filteredPlans: Plan[];
    selectedDates: Date[];
    openModal: (newData: NewPlan) => void;
}

const MEALS = ['breakfast', 'lunch', 'dinner'];

export default function Plans(props: Props) {
    const { filteredPlans, selectedDates, openModal } = props;
    const days = useMemo(() => {
        if (selectedDates.length < 2) return selectedDates;

        const startDate = selectedDates[0];
        const endDate = selectedDates[1];
        return Array.from(Array(endDate.getDate() - startDate.getDate() + 1).keys())
            .map(increment => new Date(startDate).setDate(startDate.getDate() + increment));
    }, [selectedDates]);

    return (
        <Container>
            {
                days.length > 0 ? days.map((date, index) => (
                    <Wrapper key={date.toString() + index}>
                        {
                            days.length !== 1 && // don't display if selected days is only one day
                            <H3>
                                {
                                    new Date(date).toLocaleDateString(
                                        'en-us',
                                        { month: 'long', day: 'numeric', weekday: 'short' }
                                    )
                                }
                            </H3>
                        }

                        {
                            MEALS.map(meal => {
                                const dailyPlans = filteredPlans.filter(plan =>
                                    new Date(plan.date).getDate() === new Date(date).getDate()
                                );
                                const plans = dailyPlans.filter(plan => plan.type === meal);
                                return (
                                    <Meal key={date + meal}>
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
                                            plans.length > 0 && (
                                                <DailyPlan
                                                    plans={plans}
                                                    date={date} />
                                            )
                                        }
                                    </Meal>
                                );
                            })

                        }
                    </Wrapper>
                )) : (
                    <Text>
                        No date is selected
                    </Text>
                )
            }
        </Container>
    );
}


/* 
        )) */