import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import Login from './Login';
import SignUp from './SignUp';
import AdminDashboard from './admin/Dashboard';
import LoadingPage from './LoadingPage';
import Layout from './Layout';
import Hotels from './Hotels';
import Hotel from './Hotel';
import HotelOffers from './hotel-offers/HotelOffers';
import HotelOffer from './hotel-offers/HotelOffer';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function logOut() {
    axios.post('/api/auth/logout', {}, { withCredentials: true });
    setUser(null);
  }

  useEffect(() => {
    axios.get('/api/auth/me', { withCredentials: true })
      .then(response => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route path='/login'>
          <Login user={user} onLogIn={setUser} />
        </Route>
        <Route path='/sign-up'>
          <SignUp user={user} onSignUp={setUser} />
        </Route>
        <Route path='/admin'>
          <AdminDashboard
            user={user}
            onLogOut={logOut}
          />
        </Route>
        <Route path='/'>
          <Layout user={user} onLogOut={logOut}>
            <Switch>
              <Route path='/hotel-offers/:id'>
                <HotelOffer />
              </Route>
              <Route path='/hotel-offers'>
                <HotelOffers />
              </Route>
              <Route path='/hotels/:id'>
                <Hotel />
              </Route>
              <Route path='/'>
                <Hotels />
              </Route>
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
