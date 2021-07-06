import { useState } from 'react';

import '../styles/login.scss'

export function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {

  }

  return (
    <div className="login_container">
      <span className="title">RetoOverflow</span>
      <input
        type="text"
        className="email"
        placeholder="e-mail"
        onChange={event => setLogin(event.target.value)}
        value={login}
      />
      <input
        type="password"
        placeholder="senha"
        onChange={event => setPassword(event.target.value)}
        value={password}
      />
      <button type="submit" onClick={handleLogin}>Entrar</button>
    </div>
  );
}