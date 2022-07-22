import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

import quickpicTitle from './quickpicTitle.png'
import linked from './linked.png'
import github from './github.png'
import home from './home.png'
import PhotoForm from '../Photoform'
import SearchBar from '../SearchBar'

const NavBar = () => {

  const currentUser = useSelector(state => state.session.user);
  const [show, setShow] = useState(false)


  const showPhotoForm = () => {
    if (show === false) {
      return setShow(true)
    }
    if (show === true) {
      return setShow(false)
    }
  }

  return (
    <div className='navigationbar-Div'>
      {currentUser ?
        <>
          <div className='signedIn-user-nav-container'>

            <div className='home'>

              <NavLink to='/' exact={true} className='home' activeClassName='active'>
                <img className='quickPicTitle-picture' alt='logo-quicksPic' src={quickpicTitle} />
              </NavLink>
            </div>
            <div className='SearchBarDiv'>
            <SearchBar />
          </div>
            <div className='home-post-logout-container'>
              <div className='gitHubLink'>
                <a href='https://github.com/ChrisPHong/QuicksPic'>
                  <img className='githubLogoPicture' src={github} />

                </a>
              </div>
              <div className='LinkedInLink'>
                <a href='https://www.linkedin.com/in/christopherpyohong/'>
                  <img className='linkedInPicture' src={linked} />
                </a>

              </div>
              <div className='home'>

                <NavLink to='/' exact={true} className='home' activeClassName='active'>
                  <img className='quickPicLogo-picture' alt='logo-quicksPic' src={home} />
                </NavLink>
              </div>

              <div className='show-PhotoForm-div'>
                <PhotoForm />
              </div>



              <div className='logout'>
                <LogoutButton />
              </div>

            </div>
          </div>
        </>
        :
        <>
          <div className='entire-navBar-Container'>

            <div className='home'>
              <NavLink to='/' exact={true} className='home' activeClassName='active'>
                <img className='quickPicTitle-picture' alt='logo-quicksPic' src={quickpicTitle} />
              </NavLink>
            </div>
            <div className='login-signup-container'>
              <div className='gitHubLinkNoUser'>
                <a href='https://github.com/ChrisPHong/QuicksPic'>
                  <img className='githubLogoPicture' src={github} />

                </a>
              </div>
              <div className='LinkedInLinkNoUser'>
                <a href='https://www.linkedin.com/in/christopherpyohong/'>
                  <img className='linkedInPicture' src={linked} />
                </a>

              </div>
              <div className='login'>
                <NavLink to='/login' exact={true} className='login-navlink' activeClassName='active'>
                  Login
                </NavLink>
              </div>
              <div className='sign-up'>
                <NavLink to='/sign-up' exact={true} className='sign-up-' activeClassName='active'>
                  Sign Up
                </NavLink>
              </div >
            </div>
          </div>
        </>


      }
    </div >
  );
}

export default NavBar;
