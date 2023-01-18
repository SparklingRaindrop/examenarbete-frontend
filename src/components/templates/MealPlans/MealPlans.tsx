import { useState } from 'react';

import useMealPlansContext from '../../../hooks/useMealPlansContext';

import Calendar from './blocks/Calendar/Calendar';
import Plans from './blocks/Plans/Plans';

type Props = {}

const sample: Plan[] = [
    {
        id: 'plan8',
        date: new Date(2023, 0, 18),
        updated_at: new Date(),
        type: 'breakfast',
        recipe: {
            title: 'test18',
            id: 'recipe11',
        }
    },
    {
        id: 'plan9',
        date: new Date(2023, 0, 16),
        updated_at: new Date(),
        type: 'lunch',
        recipe: {
            title: 'test16',
            id: 'recipe12',
        }
    },
    {
        id: 'plan10',
        date: new Date(2023, 0, 17),
        updated_at: new Date(),
        type: 'dinner',
        recipe: {
            title: 'test17',
            id: 'recipe13',
        }
    },
    {
        id: 'plan11',
        date: new Date(2023, 0, 18),
        updated_at: new Date(),
        type: 'lunch',
        recipe: {
            title: 'test18',
            id: 'recipe14',
        }
    },
    {
        id: 'plan12',
        date: new Date(2023, 0, 19),
        updated_at: new Date(),
        type: 'dinner',
        recipe: {
            title: 'test19',
            id: 'recipe15',
        }
    },
    {
        id: 'plan13',
        date: new Date(2023, 0, 20),
        updated_at: new Date(),
        type: 'dinner',
        recipe: {
            title: 'test20',
            id: 'recipe15',
        }
    },
    {
        id: 'plan14',
        date: new Date(2023, 0, 21),
        updated_at: new Date(),
        type: 'dinner',
        recipe: {
            title: 'test21',
            id: 'recipe15',
        }
    }
];

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

    function getTargetPlans(): Plan[][] {
        // Filtered by selected date
        const filtered = sample.filter(({ date }) => {
            const targetDate = new Date(date).getDate();
            if (selectedDates.length === 1) {
                return selectedDates[0].getDate() === targetDate;
            } else {
                return selectedDates[0].getDate() <= targetDate &&
                    targetDate <= selectedDates[1].getDate();
            }
        });
        // Divide into each date
        const divided = filtered.reduce((result: Plan[][], currentPlan: Plan, index) => {
            const currentDate = currentPlan.date.getDate();
            if (index === 0 || result[result.length - 1][0].date.getDate() !== currentDate) {
                result.push([currentPlan]);
                return result;
            }
            result[result.length - 1].push(currentPlan);
            return result;
        }, []);
        // Sort in ascending order
        return divided.sort((a, b) => {
            const aDate = a[0].date.getDate();
            const bDate = b[0].date.getDate();
            if (aDate < bDate) {
                return -1;
            }
            if (aDate > bDate) {
                return 1;
            }
            return 0;
        });
    }

    return (
        <>
            <Calendar selectedDates={selectedDates} addSelectedDate={addSelectedDate} />
            <Plans filteredPlans={getTargetPlans()} />
        </>
    );
}