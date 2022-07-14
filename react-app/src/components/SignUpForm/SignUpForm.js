import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { logout, signUp } from '../../store/session';
import './SignUpForm.css'
import { login } from '../../store/session';
import quickpicTitle from './quickpicTitle.png'



const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false)

  const onSignUp = async (e) => {
    e.preventDefault();
    if (errors.length > 0){

      setShow(true)
      return
    }
    if (errors.length === 0) {
      const data = await dispatch(signUp(username, email, password));
      setShow(false)
      if (data) {
        setErrors(data)
      }
    }
  };
  useEffect(()=> {
    const error = []
    if (username.length > 40) error.push('Username length must be less than 40 characters')
    if (password.length > 255) error.push('Password length must be less than 255 characters')
    if (email.length > 255) error.push('Email length must be less than 255 characters')
    if (password.length < 1) error.push('You must have at least 1 character in the Password field')
    if (username.length < 1) error.push('You must have at least 1 character in the Username field')
    if (!username.replace(/\s/g, '').length) error.push('Please provide a Username that does not only contain spaces')
    if (password !== repeatPassword) error.push('Password and Repeat Password do not match')
    if (!email.includes('@')) error.push('Please use a valid Email')
    setErrors(error)
  },[password, repeatPassword, email, username])

  const showEditForm = () => {
    if (show === false) {
        return setShow(true)
    }
    if (show === true) {
        return setShow(false)
    }
}


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
      <img className='logo-quicksPic' src={quickpicTitle}/>

      <form className='Signup-Form' onSubmit={onSignUp}>
        <div>
          {show && errors.map((error, ind) => (
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
      <div className='or-div-container'>
      <span className='lines-around-or'>______________________</span>
      <span className='OR-statement'>OR</span>
      <span className='lines-around-or'>______________________</span>
      </div>
      <span className='login-demo-user'>Log in as Demo User</span>
      <button className='demoUserButton' onClick={loginDemoUser}>Demo User</button>
    </div>
  );
};

export default SignUpForm;
