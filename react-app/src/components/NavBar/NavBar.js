
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import quickpicLogo from './quickpicLogo.png'
import quickpicTitle from './quickpicTitle.png'
import createPost from './createPost.png'
import home from './home.png'
import PhotoForm from '../Photoform'

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

            <div className='home-post-logout-container'>
              <div className='home'>

                <NavLink to='/' exact={true} className='home' activeClassName='active'>
                  <img className='quickPicLogo-picture' alt='logo-quicksPic' src={home} />
                </NavLink>
              </div>

              <div className='show-PhotoForm-div'>
                  <PhotoForm />
              </div>


              {/* <div className='users'>

<NavLink to='/users' exact={true} className='users' activeClassName='active'>
Users
</NavLink>
</div> */}

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
