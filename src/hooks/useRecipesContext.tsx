import { useContext } from 'react';
import { RecipesContext } from '../context/RecipesProvider';

export default function useRecipesContext() {
    const value = useContext(RecipesContext);

    if (!value) {
        throw new Error('It\'s outside of the context provider.');
    }
    return value;
}