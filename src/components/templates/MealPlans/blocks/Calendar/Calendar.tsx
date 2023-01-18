import { useEffect } from 'react';
import { useCalendar, useMealPlansContext } from '../../../../../hooks';
import { IconButton } from '../../../../elements';
import { FlexRow, Wrapper, Day, Switcher, Week, Month } from '../Calendar/styled';

type Props = {
    addSelectedDate: (target: Date | Date[]) => void;
    selectedDates: Date[];
}

function isSelected(date: number, range: Date[]) {
    if (range.length === 1) return date === range[0].getDate();
    return range[0].getDate() <= date && date <= range[1].getDate();
}

export default function Calendar(props: Props) {
    const { selectedDates, addSelectedDate } = props;
    const { currentWeek, activeSevenDates, currentMonthName, moveToAdjacentWeek } = useCalendar();

    return (
        <Wrapper>
            <FlexRow>
                <Month>{currentMonthName}</Month>
                <Switcher>
                    <IconButton
                        name='chevronLeft'
                        variant='ghost'
                        onClick={() => moveToAdjacentWeek(-1)}
                        disabled={currentWeek === 1} />
                    <Week
                        onClick={() => addSelectedDate([
                            new Date(activeSevenDates[0].date),
                            new Date(activeSevenDates[activeSevenDates.length - 1].date),
                        ])}>
                        Week{currentWeek}
                    </Week>
                    <IconButton
                        name='chevronRight'
                        variant='ghost'
                        onClick={() => moveToAdjacentWeek(1)}
                        disabled={currentWeek === 51} />
                </Switcher>
            </FlexRow>
            <FlexRow>
                {
                    activeSevenDates.map(({ day, dayOfWeek, date }) => (
                        <Day
                            key={day}
                            selected={isSelected(day, selectedDates)}
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