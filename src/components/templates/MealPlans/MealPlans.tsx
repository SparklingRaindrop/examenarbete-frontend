import { IconButton } from '../..';

type Props = {}
export default function MealPlans({ }: Props) {
    return (
        <div>
            <div>
                <h3>April</h3>
                <div>Week2</div>
            </div>
            {
                Array.from({ length: 10 }, (_, i) => i + 1).map((num) => <div key={num}>{num}</div>)
            }
            <h3>Breakfast</h3>
            <IconButton name='plus' />
            <h3>Lunch</h3>
            <IconButton name='plus' />
            <h3>Dinner</h3>
            <IconButton name='plus' />
        </div>
    );
}