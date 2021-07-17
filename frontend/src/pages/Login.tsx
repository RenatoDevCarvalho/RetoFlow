import { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import api from '../services/api';

import '../styles/login.scss'

interface IUser {
  email: string;
  username: string;
  password: string;
}

export function Login() {
  const history = useHistory();
  const { signed, Login } = useAuth();

  const [user, setUser] = useState<IUser>({
    email: '',
    username: '',
    password: '',
  });
  const [isRegister, setIsRegister] = useState<Boolean>(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (isRegister) {
      try {
        const response = await api.post('/user', user);
        Login(user);
        history.goBack();
      }
      catch (error) {
        setError("Email já cadastrado");
      }
    }
    else {
      try {
        console.log(signed);
        Login(user);
        history.goBack();
      }
      catch (error) {
        setError("Email e/ou senha incorretos");
      }
    }
  }

  function updateUser(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <form className="login_container" onSubmit={handleSubmit}>
      <span className="title">RetoOverflow</span>
      <input
        name="email"
        type="text"
        placeholder="E-mail"
        onChange={event => updateUser(event)}
        value={user.email}
      />
      {isRegister &&
        <input
          name="username"
          type="text"
          placeholder="Nome de usuário"
          onChange={event => updateUser(event)}
          value={user.username}
        />
      }
      <input
        name="password"
        type="password"
        placeholder="Senha"
        onChange={event => updateUser(event)}
        value={user.password}
      />
      <button type="submit">{isRegister ? "Registrar" : "Entrar"}</button>
      <span className="message" onClick={event => setIsRegister(!isRegister)}>
        {isRegister ? "Já possui uma conta? faça login" : "Não possui uma conta? Registre-se"}
      </span>
      <span className="error">{error}</span>
    </form>
  );
}