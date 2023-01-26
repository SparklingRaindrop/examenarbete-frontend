import { Text } from '../../elements';
import { Box } from './styled';

type Props = {}
export default function Dashboard({ }: Props) {
    return (
        <div>
            <Box>
                <h2>Meal Plan</h2>
                <ul>
                    <li>
                        Check Meal plans
                    </li>
                    <li>
                        create meal plans
                    </li>
                </ul>
            </Box>
            <div>
                <h2>Stock Manager</h2>
            </div>
            <div>
                <h2>My Recipes</h2>
            </div>
            <div>
                <h2>Groceries</h2>
            </div>
        </div>
    )
}