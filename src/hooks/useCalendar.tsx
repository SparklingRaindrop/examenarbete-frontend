import { useMemo, useState } from 'react';

function getWeekNumber() {
    const today = new Date();
    const firstOfJan = new Date(today.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((today.getTime() - firstOfJan.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((today.getDay() + 1 + numberOfDays) / 7);
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export type Day = {
    month: string;
    day: number;
    dayOfWeek: string;
    date: number;
}

function parseDate(date: number): Day {
    const target = new Date(date);
    const dayOfWeek = DAYS[target.getDay()];
    const day = target.getDate();
    const month = MONTHS[target.getMonth()];
    return {
        month,
        day,
        dayOfWeek,
        date
    };
}

function getDateOfWeek(week: number, year: number): Day[] {
    const simpleWeekNumber = new Date(year, 0, 1 + (week - 1) * 7);
    const ISOweekStart = simpleWeekNumber;
    if (simpleWeekNumber.getDay() <= 4)
        ISOweekStart.setDate(simpleWeekNumber.getDate() - simpleWeekNumber.getDay() + 1);
    else
        ISOweekStart.setDate(simpleWeekNumber.getDate() + 8 - simpleWeekNumber.getDay());
    return Array.from(Array(7).keys()).map((num) => parseDate(new Date().setDate(ISOweekStart.getDate() + num)));
}

export function useCalendar() {
    const [currentWeek, setCurrentWeek] = useState<number>(getWeekNumber());
    const currentDays = useMemo(() => getDateOfWeek(currentWeek, 2023), [currentWeek]);
    const currentMonth = useMemo(() => currentDays.reduce((result: string[], current) => {
        if (!result.includes(current.month)) {
            result.push(current.month);
        }
        return result;
    }, []).join(' / '), [currentDays]);

    function moveToAdjacentWeek(direction: -1 | 1): void {
        if ((currentWeek === 1 && direction == -1) ||
            (currentWeek === 52 && direction === 1)) return;
        setCurrentWeek(prev => prev + direction);
    }

    return {
        currentWeek,
        currentDays,
        currentMonth,
        moveToAdjacentWeek
    };
}