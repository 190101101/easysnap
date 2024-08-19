import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/users';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const onLogout = () => {
    localStorage.removeItem('user');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <h2 className="logo__title">easysnap</h2>
        </div>
        <div className="header_menu">
          <Link to="/" aria-current="page">
            snaps
          </Link>
          <>
            {user && <span className="active"> @{user.username}</span>}
            {user && <button onClick={onLogout}>logout</button>}
            {!user && <Link to="/login">login</Link>}
          </>
        </div>
      </div>
      <div className="description">
        <p className="sub_header__desc">write what you think</p>
      </div>
    </>
  );
};

export default Header;
