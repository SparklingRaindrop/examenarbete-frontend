import { useContext } from 'react';
import { GroceriesContext } from '../context/GroceriesProvider';

export default function useGroceriesContext() {
    const value = useContext(GroceriesContext);

    if (!value) {
        throw new Error('It\'s outside of the context provider.');
    }
    return value;
}