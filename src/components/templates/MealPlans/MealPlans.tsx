import { useMemo, useState } from 'react';
import { useDisclosure } from '../../../hooks';

import useMealPlansContext from '../../../hooks/useMealPlansContext';

import Calendar from './blocks/Calendar/Calendar';
import { Modal } from './blocks/Modal';
import Plans from './blocks/Plans/Plans';

export type NewPlan = {
    date: Date | null,
    type: string | null
};

const initialNewPlanData = {
    date: null,
    type: null
};

export default function MealPlans() {
    const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()]);
    const [newPlan, setNewPlan] = useState<NewPlan>(initialNewPlanData);
    const { plans } = useMealPlansContext();
    const { isOpen, toggleIsOpen, onClose } = useDisclosure();

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

    function getTargetPlans(): Plan[] {
        if (selectedDates.length === 0) return [];

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
        // Sort in ascending order
        return filtered.sort((a, b) => {
            const aDate = new Date(a.date).getDate();
            const bDate = new Date(b.date).getDate();
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
            {isOpen && <Modal {...newPlan} onClose={onClose} />}
        </>
    );
}