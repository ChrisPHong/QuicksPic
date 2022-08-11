import SignUpForm from "../SignUpForm/SignUpForm";
import LoginForm from "../LoginForm/LoginForm";
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './homepage.css'
import iphone from './iphoneSplashPage.png'

import noTitle from './noTitle.png'

const HomePage = () => {

  return (
    <>
      <div className="homepage-all-container">
        <div className="IphonePicture">

          <img className='iphonePictureFront' src={iphone} />

        </div>

        <div className="loginAndSignUpDiv">

          <LoginForm />
          <div className="Sign-up-home-page-container">

            <span className="navlink-no-account">
              Don't have an account? <NavLink className="homePage-signUp" to='/sign-up' exact={true}>Sign Up</NavLink>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
