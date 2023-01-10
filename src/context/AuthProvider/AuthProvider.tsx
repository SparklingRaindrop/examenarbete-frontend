import { createContext } from 'react';
import { LoginData, Token, useAuth } from '../../hooks/useAuth';
import { Status } from '../../types/statusCode';
import { APIResponse } from '../../util/api';

export interface ContextAuth {
    login: (data: LoginData) => Promise<APIResponse>,
    token: Pick<Token, 'token'>;
}

export const AuthContext = createContext<ContextAuth | null>(null);

export function AuthProvider(props: GeneralProps) {
    const { children } = props;
    const { login, token } = useAuth();

    const value = {
        token,
        login
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}