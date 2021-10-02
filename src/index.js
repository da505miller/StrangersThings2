import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react'; 
import { Title, Login, Posts, Register } from './Components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const App = () => {
  
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    console.log("Mounted")
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }
  }, [])
  
  
  return ( 
          <><Title />
            
            <Router>
              <Link to="/login"> Login </Link>
              <Link to="/register"> Register</Link>
              <Link to="/posts"> Posts </Link>

                

              <Route path="/login" render={(routeProps) => <Login {...routeProps} setToken={setToken} />} />
              <Route path="/register" render={(routeProps) => <Register {...routeProps} setToken={setToken} />} />
              <Route path="/posts" render={(routeProps) => <Posts {...routeProps} isLoggedIn={!!token}/>}/>
            </Router></>)
}



ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
