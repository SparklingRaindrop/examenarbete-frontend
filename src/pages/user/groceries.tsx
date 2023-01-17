import { Groceries } from '../../components/templates';
import { GroceriesProvider } from '../../context';

export default function Grocery() {
    return (
        <GroceriesProvider>
            <Groceries />
        </GroceriesProvider>
    );
}
