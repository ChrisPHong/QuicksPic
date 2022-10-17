import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/LoginForm/LoginForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import PhotosPage from './components/Photos';
import { authenticate } from './store/session';
import HomePage from './components/homePage';
import UserProfilePage from './components/UserProfilePage';
import ProfileTopPortion from './components/ProfileTopForm';
import PageNotFound from './components/PageNotFound';
import SinglePhotoDisplay from './components/SinglePhoto';
import ProfilePage from './components/ProfilePage';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state?.session?.user);
  const history = useHistory()
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <ProfilePage />
          {/* <ProfileTopPortion />
          <UserProfilePage /> */}
        </ProtectedRoute>
        <ProtectedRoute path='/photos/:photoId' exact={true} >
          <SinglePhotoDisplay />
        </ProtectedRoute>
        {!currentUser ?
          <Route path='/' exact={true}>
            <HomePage />
          </Route>
          :
          <ProtectedRoute path='/' exact={true} >
            <PhotosPage />

          </ProtectedRoute>
        }
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
