import { useEffect, useMemo, useState } from 'react';
import { useDisclosure } from '../../../hooks';
import { Range } from '../../../hooks/useMealPlansAPI';

import useMealPlansContext from '../../../hooks/useMealPlansContext';

import Calendar from './blocks/Calendar/Calendar';
import { Modal } from './blocks/Modal';
import Plans from './blocks/Plans/Plans';

type Props = {}

export type NewPlan = {
    date: Date | null,
    type: string | null
};

function getOldAndNewData(plans: Plan[]): { latestPlan: number, oldestPlan: number } | undefined {
    if (plans.length === 0) return undefined;
    const firstPlan = new Date(plans[0].date).getTime();
    return plans.reduce((result, curr, index) => {
        if (index === 0) return result;

        const current = new Date(curr.date).getTime();
        if (current < result.oldestPlan) {
            result.oldestPlan = current;
        } else if (result.latestPlan < current) {
            result.latestPlan = current;
        }

        return result;
    }, { latestPlan: firstPlan, oldestPlan: firstPlan }
    );
}

function generateDateObj(date: Date): Range {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const start = {
        year,
        month,
        day: new Date(year, month, 1).getDate()
    };
    const end = {
        year,
        month,
        day: new Date(year, month, 0).getDate(),
    };
    return {
        start,
        end
    };
}

const initialNewPlanData = {
    date: null,
    type: null
};

export default function MealPlans({ }: Props) {
    const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()]);
    const [newPlan, setNewPlan] = useState<NewPlan>(initialNewPlanData);
    const { plans, getPlans } = useMealPlansContext();
    const { isOpen, toggleIsOpen, onClose } = useDisclosure();
    const planRange = useMemo(() => getOldAndNewData(plans), [plans]);

    /*     useEffect(() => {
            if (!references || selectedDates.length === 0) return;
    
            const { oldestPlan, latestPlan } = references;
            if (selectedDates[0].getTime() < oldestPlan) {
                const newRange = generateDateObj(selectedDates[0]);
                getPlans(newRange);
            } else if (1 < selectedDates.length && latestPlan < selectedDates[1].getTime()) {
                const newRange = generateDateObj(selectedDates[1]);
                getPlans(newRange);
            }
        }, [references, getPlans, selectedDates]); */

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
                planRange={planRange}
                addSelectedDate={addSelectedDate} />
            <Plans
                filteredPlans={getTargetPlans()}
                selectedDates={selectedDates}
                openModal={openModal} />
            {isOpen && <Modal {...newPlan} onClose={onClose} />}
        </>
    );
}