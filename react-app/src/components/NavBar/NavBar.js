
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import quickpicLogo from './quickpicLogo.png'

const NavBar = () => {

  const currentUser = useSelector(state => state.session.user);



  return (
    <div className='navigationbar-Div'>
      {currentUser ?
        <>
          <div className='home'>

            <NavLink to='/' exact={true} className='home' activeClassName='active'>
          <img className='quickPicLogo-picture' alt='logo-quicksPic' src={quickpicLogo} />
            </NavLink>
          </div>




          <div className='users'>

            <NavLink to='/users' exact={true} className='users' activeClassName='active'>
              Users
            </NavLink>
          </div>

          <div className='logout'>
            <LogoutButton />
          </div>

        </>
        :
        <>
          <div className='home'>
            <NavLink to='/' exact={true} className='home' activeClassName='active'>
            <img className='quickPicLogo-picture' alt='logo-quicksPic' src={quickpicLogo} />
            </NavLink>
          </div>
          <div className='sign-up'>

            <div className='login'>

              <NavLink to='/login' exact={true} className='login' activeClassName='active'>
                Login
              </NavLink>
            </div>
            <NavLink to='/sign-up' exact={true} className='sign-up' activeClassName='active'>
              Sign Up
            </NavLink>
          </div >
        </>


      }
    </div >
  );
}

export default NavBar;
