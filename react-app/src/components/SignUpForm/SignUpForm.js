import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'
import { login } from '../../store/session';


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const loginDemoUser = async (e) =>{

    await dispatch(login('demo@aa.io', 'password'));
  }
  return (
    <div className='signUP-div-container'>
      <img className='logo-quicksPic' src='./images/quickpic-title.png'/>

      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <input
            className='inputvalues'
            type='text'
            name='username'
            placeholder="Username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <input
            className='inputvalues'
            type='text'
            name='email'
            placeholder="Email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <input
            className='inputvalues'
            type='password'
            name='password'
            placeholder="Password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <input
            className='inputvalues'
            type='password'
            name='repeat_password'
            placeholder="Repeat Password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button className='sign-up-button' type='submit'>Sign Up</button>
      </form>
      <span className='OR-statement'>OR</span>
      <span className='login-demo-user'>Log in as Demo User</span>
      <button className='demoUserButton' onClick={loginDemoUser}>Demo User</button>
    </div>
  );
};

export default SignUpForm;
