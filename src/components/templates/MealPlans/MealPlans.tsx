import { useState } from 'react';

import { IconButton } from '../..';
import useMealPlansContext from '../../../hooks/useMealPlansContext';

import Calendar from './blocks/Calendar';

type Props = {}

export default function MealPlans({ }: Props) {
    const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()]);
    const { plans } = useMealPlansContext();

    function addSelectedDate(newDate: Date | Date[]) {
        if (Array.isArray(newDate)) {
            setSelectedDates(newDate);
            return;
        }

        if (selectedDates.length === 1) {
            setSelectedDates(prev => {
                const newSelected = [...prev];
                newSelected.push(newDate);
                newSelected.sort((a, b) => a.getTime() - b.getTime());
                return newSelected;
            });
        } else {
            setSelectedDates([newDate]);
        }

    }

    return (
        <>
            <Calendar selectedDates={selectedDates} addSelectedDate={addSelectedDate} />
            <div>
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
        </>
    );
}