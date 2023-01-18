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
    date: Date;
}

function parseDate(date: Date): Day {
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

function getNextSevenDates(weekNo: number, year: number) {
    const simple = new Date(year, 0, 1 + (weekNo - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());

    return [0, 1, 2, 3, 4, 5, 6].map(increment => {
        const date = new Date(ISOweekStart);
        date.setDate(ISOweekStart.getDate() + increment);
        return parseDate(date);
    });
}

export function useCalendar() {
    const [currentWeek, setCurrentWeek] = useState<number>(getWeekNumber());
    const activeSevenDates = useMemo(() => getNextSevenDates(currentWeek, 2023), [currentWeek]);
    const currentMonthName = useMemo(() => (
        activeSevenDates.reduce((result: string[], current) => {
            if (!result.includes(current.month)) {
                result.push(current.month);
            }
            return result;
        }, []).join(' / ')
    ), [activeSevenDates]);

    function moveToAdjacentWeek(direction: -1 | 1): void {
        if ((currentWeek === 1 && direction == -1) ||
            (currentWeek === 52 && direction === 1)) return;
        setCurrentWeek(prev => prev + direction);
    }

    return {
        currentWeek,
        activeSevenDates,
        currentMonthName,
        moveToAdjacentWeek
    };
}