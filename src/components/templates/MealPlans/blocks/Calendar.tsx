import { useCalendar } from '../../../../hooks';
import { IconButton } from '../../../elements';
import { FlexRow, Wrapper, Day, Switcher, Week } from './styled';

type Props = {
    addSelectedDate: (target: Date | Date[]) => void;
    selectedDates: Date[];
}

function isSelected(date: number, range: Date[]) {
    if (range.length === 1) return date === range[0].getDate();
    return range[0].getDate() <= date && date <= range[1].getDate();
}

export default function Calendar(props: Props) {
    const { addSelectedDate, selectedDates } = props;
    const { currentWeek, currentDays, moveToAdjacentWeek } = useCalendar();

    return (
        <Wrapper>
            <FlexRow>
                <h3>April</h3>
                <Switcher>
                    <IconButton
                        name='chevronLeft'
                        variant='ghost'
                        onClick={() => moveToAdjacentWeek(-1)} />
                    <Week
                        onClick={() => addSelectedDate([
                            new Date(currentDays[0].date),
                            new Date(currentDays[currentDays.length - 1].date),
                        ])}>
                        Week{currentWeek}
                    </Week>
                    <IconButton
                        name='chevronRight'
                        variant='ghost'
                        onClick={() => moveToAdjacentWeek(1)} />
                </Switcher>
            </FlexRow>
            <FlexRow>
                {
                    currentDays.map(({ day, dayOfWeek, date }) => (
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