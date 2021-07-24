import { useState } from 'react';
import '../styles/header.scss';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { useHistory, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export function Header() {
  const history = useHistory();
  const location = useLocation();
  const { signed, user, Logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function login() {
    history.push('/login');
  };

  function handleClick(event: React.MouseEvent<HTMLSpanElement>) {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  };

  function handleLogout() {
    Logout();
    handleClose();
  }

  function handleHome() {
    history.push('/');
  }

  return (
    location.pathname !== '/login' ?
      <div className="main">
        <span className="logo" onClick={handleHome}>RetoOverflow</span>
        {signed ?
          <>
            <span
              className="user"
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleClick}>
              {user?.username}
            </span>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              keepMounted
              open={!!anchorEl}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Perfil</MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </>
          :
          <span className="user" onClick={login}>Login</span>
        }
      </div>
      :
      <div />
  );
}