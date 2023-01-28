import { createContext, useState } from 'react';

export interface ContextUser {
    isLoggedIn: boolean;
    setLoginStatus: (newStates: boolean) => void;
}

export const UserContext = createContext<ContextUser | null>(null);

export function UserProvider(props: GeneralProps) {
    const { children } = props;
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    function setLoginStatus(newStates: boolean) {
        setIsLoggedIn(newStates);
    }

    const value = {
        isLoggedIn,
        setLoginStatus,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}