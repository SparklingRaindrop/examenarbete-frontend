import { useContext } from 'react';
import { MealPlansContext } from '../context';

export default function useMealPlansContext() {
    const value = useContext(MealPlansContext);

    if (!value) {
        throw new Error('It\'s outside of the context provider.');
    }
    return value;
}