import { useEffect } from 'react';
import { Groceries } from '../../../components/templates';
import { useGroceriesContext } from '../../../hooks';

export default function Grocery() {
    const { getGroceries } = useGroceriesContext();

    useEffect(() => {
        getGroceries();
        // eslint-disable-next-line
    }, []);

    return (
        <Groceries />
    );
}
