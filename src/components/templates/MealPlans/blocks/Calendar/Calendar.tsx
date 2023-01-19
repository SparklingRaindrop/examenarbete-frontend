import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useCalendar } from '../../../../../hooks';
import { IconButton } from '../../../../elements';
import { FlexRow, Wrapper, Day, Switcher, Week, Month } from '../Calendar/styled';

type Props = {
    addSelectedDate: (target: Date | Date[]) => void;
    selectedDates: Date[];
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

export default function Calendar(props: Props) {
    const { selectedDates, addSelectedDate } = props;
    const {
        activeWeek,
        activeSevenDates,
        currentMonthName,
        moveToAdjacentWeek,
        resetActiveWeek
    } = useCalendar();
    const router = useRouter();

    useEffect(() => {
        resetActiveWeek();
    }, [router.pathname]);

    function handleMoveWeek(direction: -1 | 1) {
        moveToAdjacentWeek(direction);
        addSelectedDate([]);
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