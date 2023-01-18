import { useCalendar } from '../../../../hooks';
import { IconButton } from '../../../elements';
import { FlexRow, Wrapper, Day } from './styled';

type Props = {}

export default function Calendar({ }: Props) {
    const { currentWeek, currentDays, moveToAdjacentWeek } = useCalendar();

    return (
        <Wrapper>
            <FlexRow>
                <h3>April</h3>
                <IconButton
                    name='chevronLeft'
                    onClick={() => moveToAdjacentWeek(-1)} />
                <div>Week{currentWeek}</div>
                <IconButton
                    name='chevronRight'
                    onClick={() => moveToAdjacentWeek(1)} />
            </FlexRow>
            <FlexRow>
                {
                    currentDays.map(({ day, dayOfWeek }) => <Day key={day}><span>{day}</span><span>{dayOfWeek}</span></Day>)
                }
            </FlexRow>
        </Wrapper>
    )
}