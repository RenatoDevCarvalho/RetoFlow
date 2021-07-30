import { createContext, useEffect, useState, ReactNode } from "react";

import api from '../services/api';

type User = {
  id: number;
  username: string;
  token: string;
}

type AuthContextData = {
  signed: boolean;
  user: User | null;
  Login(loginInfo: ILoginInfo): Promise<void>;
  Logout(): void;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

interface ILoginInfo {
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthContextProvider(props: AuthContextProviderProps) {
  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user');
    const storagedToken = localStorage.getItem('@App:token');

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, [])

  const [user, setUser] = useState<User | null>(null);

  async function Login(loginInfo: ILoginInfo) {
    const response = await api.post('/auth', loginInfo);
    setUser(response.data.user);

    api.defaults.headers.Authorization = `Bearer ${response.data.token}`

   localStorage.setItem('@App:user', JSON.stringify(response.data.user));
   localStorage.setItem('@App:token', response.data.token);
  }

  async function Logout() {
    setUser(null);

    localStorage.removeItem('@App:user');
    localStorage.removeItem('@App:token');
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, Login, Logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}