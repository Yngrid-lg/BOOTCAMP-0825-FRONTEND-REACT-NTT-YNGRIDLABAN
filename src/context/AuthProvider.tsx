import type {FC, ReactNode } from "react";
import {useState} from "react";
import { AuthContext } from "./AuthContext";

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<string | null>(() => localStorage.getItem("user"));
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const login = (user: string, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", user);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
