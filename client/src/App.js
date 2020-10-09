import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from 'react-router-dom';
import { CssBaseline, Link, Button } from '@material-ui/core';
import Login from './Login';
import LoadingPage from './LoadingPage';

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
        <Route path='/'>
          <div>
            {user ? (
              <>
                Logged in as {user.firstName} {user.lastName}<br />
                <Button color='primary' variant='contained' onClick={logOut}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                'Not logged in'
                <Link
                  component={RouterLink}
                  to='login'
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
