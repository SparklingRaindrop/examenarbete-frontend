import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useCalendar, useMealPlansContext } from '../../../../../hooks';
import { Range } from '../../../../../hooks/useMealPlansAPI';
import { IconButton } from '../../../../elements';
import { FlexRow, Wrapper, Day, Switcher, Week, Month } from '../Calendar/styled';

type Props = {
    selectedDates: Date[];
    planRange: { latestPlan: number, oldestPlan: number } | undefined;
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

export default function Calendar(props: Props) {
    const { selectedDates, planRange, addSelectedDate } = props;
    const { getPlans } = useMealPlansContext();
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

    useEffect(() => {
        if (!planRange) return;

        const { oldestPlan, latestPlan } = planRange;
        // TODO: If there is no plan it will fetch again on page switch
        if (activeSevenDates[0].date.getTime() < oldestPlan) {
            const newRange = generateDateObj(activeSevenDates[0].date);
            getPlans(newRange);
        } else if (latestPlan < activeSevenDates[1].date.getTime()) {
            const newRange = generateDateObj(activeSevenDates[1].date);
            getPlans(newRange);
        }
    }, [planRange, activeSevenDates]);

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