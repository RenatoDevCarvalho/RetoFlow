import '../styles/header.scss';

import { useHistory, useLocation } from 'react-router-dom';

export function Header() {
  const history = useHistory();
  const location = useLocation();

  function login() {
    history.push('/login');
  }

  return (
    location.pathname != '/login' ? 
    <div className="main">
      <span className="logo">RetoOverflow</span>
      <span className="user" onClick={login}>Login</span>
    </div>
    :
    <div />
  );
}