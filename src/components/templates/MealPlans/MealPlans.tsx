import { useState } from 'react';
import { useDisclosure } from '../../../hooks';

import useMealPlansContext from '../../../hooks/useMealPlansContext';

import Calendar from './blocks/Calendar/Calendar';
import { Modal } from './blocks/Modal';
import Plans from './blocks/Plans/Plans';

type Props = {}

export type NewPlan = {
    date: Date | null,
    type: string | null
};

export default function MealPlans({ }: Props) {
    const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()]);
    const [newPlan, setNewPlan] = useState<NewPlan>({
        date: null,
        type: null
    });
    const { plans } = useMealPlansContext();
    const { isOpen, toggleIsOpen } = useDisclosure();

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
        const filtered = plans.filter(({ date }) => {
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
            const currentDate = new Date(currentPlan.date).getDate();
            if (index === 0 || new Date(result[result.length - 1][0].date).getDate() !== currentDate) {
                result.push([currentPlan]);
                return result;
            }
            result[result.length - 1].push(currentPlan);
            return result;
        }, []);
        // Sort in ascending order
        return divided.sort((a, b) => {
            const aDate = new Date(a[0].date).getDate();
            const bDate = new Date(b[0].date).getDate();
            if (aDate < bDate) {
                return -1;
            }
            if (aDate > bDate) {
                return 1;
            }
            return 0;
        });
    }

    function openModal(newData: NewPlan) {
        setNewPlan(newData);
        toggleIsOpen();
    }

    return (
        <>
            <Calendar
                selectedDates={selectedDates}
                addSelectedDate={addSelectedDate} />
            <Plans
                filteredPlans={getTargetPlans()}
                selectedDates={selectedDates}
                openModal={openModal} />
            {isOpen && <Modal {...newPlan} />}
        </>
    );
}