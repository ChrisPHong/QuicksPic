import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, logout } from '../../store/session';
import './LoginForm.css'
import quickpicTitle from './quickpicTitle.png'


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const loginDemoUser = async (e) => {

    await dispatch(login('demo@aa.io', 'password'));
  }

  return (
    <div className='login-ENTIRE-container-div'>
      <div className='login-container-div'>
        <img className='logo-quicksPic' src={quickpicTitle} />
        <form className='Login-Form' onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='Input-values-and-login'>

            <div>
              <input
                className='inputvalues'
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <input
                name='password'
                type='password'
                className='inputvalues'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
            </div>
            <button className='login-button' type='submit'>Login</button>
          </div>
        </form>
        <div className='or-div-container'>
              <span className='lines-around-or'>______________________</span>
        <span className='OR-statement'>OR</span>
              <span className='lines-around-or'>______________________</span>
        </div>
        <span className='login-demo-user'>Log in as Demo User</span>
        <button className='demoUserButton' onClick={loginDemoUser}>Demo User</button>
      </div>
    </div>
  );
};

export default LoginForm;
