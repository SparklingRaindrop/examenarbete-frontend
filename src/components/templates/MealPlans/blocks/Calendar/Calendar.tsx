import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useCalendar, useMealPlansContext } from '../../../../../hooks';
import { PlanRange } from '../../../../../hooks/useMealPlansAPI';
import { IconButton } from '../../../../elements';
import { FlexRow, Wrapper, Day, Switcher, Week, Month } from '../Calendar/styled';

type Props = {
    selectedDates: Date[];
    addSelectedDate: (target: Date | Date[]) => void;
}

function areSameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}

function isSelected(date: Date, range: Date[]) {
    if (range.length === 1) return areSameDay(date, range[0]);
    return range[0] <= date && date <= range[1];
}

function isLastDay(date: Date): boolean {
    const target = new Date(date.getTime());
    const targetMonth = target.getMonth();

    target.setDate(target.getDate() + 1);
    return target.getMonth() !== targetMonth;
}

function generateDateObj(date: Date): PlanRange {
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

export default function Calendar(props: Props) {
    const { selectedDates, addSelectedDate } = props;
    const { updateRange, fetchedPlansRange } = useMealPlansContext();
    const {
        activeWeek,
        activeSevenDates,
        currentMonthName,
        moveToAdjacentWeek
    } = useCalendar();
    function handleMoveWeek(direction: -1 | 1) {
        moveToAdjacentWeek(direction);
        addSelectedDate([]);
    }

    if (activeSevenDates.some(({ day, date }) => day === 1 || isLastDay(date))) {
        const targets = activeSevenDates.filter(({ day, date }) => day === 1 || isLastDay(date));
        const nextRange = targets.find(({ date }) => {
            return date < fetchedPlansRange[0] && date < fetchedPlansRange[1] || // before than fetched range
                fetchedPlansRange[0] < date && fetchedPlansRange[1] < date; // after than fetched range
        });
        if (nextRange) {
            updateRange(generateDateObj(nextRange.date));
        }
    }

    return (
        <Wrapper>
            <FlexRow>
                <Month>{currentMonthName}</Month>
                <Switcher>
                    <IconButton
                        name='chevronLeft'
                        variant='ghost'
                        onClick={() => handleMoveWeek(-1)}
                        disabled={activeWeek === 1} />
                    <Week
                        onClick={() => addSelectedDate([
                            new Date(activeSevenDates[0].date),
                            new Date(activeSevenDates[activeSevenDates.length - 1].date),
                        ])}>
                        Week{activeWeek}
                    </Week>
                    <IconButton
                        name='chevronRight'
                        variant='ghost'
                        onClick={() => handleMoveWeek(1)}
                        disabled={activeWeek === 51} />
                </Switcher>
            </FlexRow>
            <FlexRow>
                {
                    activeSevenDates.map(({ day, dayOfWeek, date }) => (
                        <Day
                            key={day}
                            isSelected={isSelected(date, selectedDates)}
                            isToday={areSameDay(date, new Date())}
                            onClick={() => addSelectedDate(new Date(date))}>
                            <span>{day}</span>
                            <span>{dayOfWeek}</span>
                        </Day>
                    ))
                }
            </FlexRow>
        </Wrapper>
    );
}