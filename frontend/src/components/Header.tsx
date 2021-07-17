import '../styles/header.scss';

import { useHistory, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export function Header() {
  const history = useHistory();
  const location = useLocation();
  const { signed, user } = useAuth();

  function login() {
    history.push('/login');
  }

  return (
    location.pathname !== '/login' ? 
    <div className="main">
      <span className="logo">RetoOverflow</span>
      <span className="user" onClick={login}>{signed ? user?.username : "Login"}</span>
    </div>
    :
    <div />
  );
}