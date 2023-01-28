import { useContext } from 'react';
import { UserContext } from '../context/UserContext/UserContext';

export default function useUserContext() {
    const value = useContext(UserContext);

    if (!value) {
        throw new Error('It\'s outside of the context provider.');
    }
    return value;
}