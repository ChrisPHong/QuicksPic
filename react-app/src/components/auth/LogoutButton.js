import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import {clearAllPhotos} from '../../store/photo'
import {clearAllcomments} from '../../store/comment'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(clearAllPhotos());
    await dispatch(clearAllcomments());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
