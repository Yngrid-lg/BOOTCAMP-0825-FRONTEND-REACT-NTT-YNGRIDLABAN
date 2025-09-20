import React from "react";
import { AuthContext } from "../../context/AuthContext"
import type { AuthContextType } from "../../context/AuthContext";

export const loginMock = jest.fn();
export const logoutMock = jest.fn();

export const authContextMockValue: AuthContextType = {
    login: loginMock,
    logout: logoutMock,
    token: null,
    user: null,
};

export const AuthContextMockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <AuthContext.Provider value={authContextMockValue}>
        {children}
    </AuthContext.Provider>
);
