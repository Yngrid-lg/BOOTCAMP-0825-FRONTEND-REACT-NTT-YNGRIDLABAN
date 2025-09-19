import { createContext, useState } from "react";

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (userFullName: string, token: string, callback?: () => void) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => { },
  logout: () => { },
});
