import type { FC, ReactNode } from "react";
import { useState } from "react";
import { AuthContext } from "../AuthContext";
import { StorageKeys } from "../../app/shared/constants/StorageKey";
interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<string | null>(() =>
    localStorage.getItem(StorageKeys.UserFullName),
  );
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(StorageKeys.Token),
  );

  const login = (userFullName: string, token: string, callback?: () => void) => {
    setUser(userFullName);
    setToken(token);
    localStorage.setItem(StorageKeys.UserFullName, userFullName);
    localStorage.setItem(StorageKeys.Token, token);
    localStorage.setItem(StorageKeys.IsLoggedIn, "true");

    if (callback) callback();
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(StorageKeys.UserFullName);
    localStorage.removeItem(StorageKeys.Token);
    localStorage.removeItem(StorageKeys.IsLoggedIn);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
