import { createContext, useEffect, useState, ReactNode } from "react";

import api from '../services/api';

type User = {
  id: string;
  username: string;
  token: string;
}

type AuthContextData = {
  signed: boolean;
  user: User | null;
  Login(loginInfo: ILoginInfo): Promise<void>;
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

  return (
    <AuthContext.Provider value={{ signed: !!user, user, Login }}>
      {props.children}
    </AuthContext.Provider>
  );
}