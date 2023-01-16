import { GetServerSideProps } from 'next';
import { ShoppingList } from '../../components/templates';
import { GroceriesProvider } from '../../context';

export default function Grocery() {
    return (
        <GroceriesProvider>
            <ShoppingList />
        </GroceriesProvider>
    );
}
