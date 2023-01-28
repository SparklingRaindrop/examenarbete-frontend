import { useContext } from 'react';
import { StocksContext } from '../context/StocksProvider';

export default function useStocksContext() {
    const value = useContext(StocksContext);

    if (!value) {
        throw new Error('It\'s outside of the context provider.');
    }
    return value;
}