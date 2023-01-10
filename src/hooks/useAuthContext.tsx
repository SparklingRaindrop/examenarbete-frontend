import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

export default function useAuthContext() {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('It\'s outside of the context provider.');
    }

    return value;
}