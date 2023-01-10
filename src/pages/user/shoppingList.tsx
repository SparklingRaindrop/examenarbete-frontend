import { GetServerSideProps } from 'next';
import { ShoppingList } from '../../components/templates';
import { GroceriesProvider } from '../../context';

export default function ShoppingListPage() {
    return (
        <GroceriesProvider>
            <ShoppingList />
        </GroceriesProvider>
    );
}
