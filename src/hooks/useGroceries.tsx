import { useContext } from 'react';
import { GroceriesContext } from '../context/GroceriesProvider';

export default function useGroceries() {
    const value = useContext(GroceriesContext);

    if (!value) {
        console.error('It\'s outside of the context provider.');
        return;
    }
    return value;
}