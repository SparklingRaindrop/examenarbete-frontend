import { useMemo, useState } from 'react';

function getWeekNumber() {
    const today = new Date();
    const firstOfJan = new Date(today.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((today.getTime() - firstOfJan.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((today.getDay() + 1 + numberOfDays) / 7);
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function parseDate(date: number) {
    const target = new Date(date);
    const dayOfWeek = DAYS[target.getDay()];
    const day = target.getDate();
    const month = MONTHS[target.getMonth()];
    return {
        month,
        day,
        dayOfWeek,
    };
}

function getDateOfWeek(week: number, year: number) {
    const simpleWeekNumber = new Date(year, 0, 1 + (week - 1) * 7);
    const ISOweekStart = simpleWeekNumber;
    if (simpleWeekNumber.getDay() <= 4)
        ISOweekStart.setDate(simpleWeekNumber.getDate() - simpleWeekNumber.getDay() + 1);
    else
        ISOweekStart.setDate(simpleWeekNumber.getDate() + 8 - simpleWeekNumber.getDay());
    return Array.from(Array(7).keys()).map((num) => parseDate(new Date().setDate(ISOweekStart.getDate() + num)));
}

export default function useCalendar() {
    const [currentWeek, setCurrentWeek] = useState<number>(getWeekNumber());
    const currentDays = useMemo(() => getDateOfWeek(currentWeek, 2023), [currentWeek]);

    function moveToAdjacentWeek(direction: -1 | 1) {
        if (currentWeek === 1 || currentWeek === 52) return;
        setCurrentWeek(prev => prev + direction);
    }

    return {
        currentWeek,
        currentDays,
        moveToAdjacentWeek
    };
}