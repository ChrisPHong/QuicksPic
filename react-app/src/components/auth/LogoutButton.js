import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import {clearAllPhotos} from '../../store/photo'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(clearAllPhotos());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
