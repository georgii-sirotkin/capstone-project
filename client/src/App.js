import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Login from './Login';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route path='/login'>
          <Login user={user} onLogIn={setUser} />
        </Route>
        <Route path='/'>
          <div>
            {user ? `Logged in as ${user.firstName} ${user.lastName}` : 'Not logged in'}
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
