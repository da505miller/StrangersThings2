import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react'; 
import { Login, Posts } from './Components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const App = () => {
  
  const [token, setToken] = useState(null);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log("Mounted")
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }
  }, [])
  
  
  return ( <Router>
              <Link to="/login"> Login </Link>
              <Link to="/register"> Register</Link>
              {/* <Link to="/posts"> Posts </Link> */}

              <h1> Welcome </h1>

              <Route path="/login" render={(routeProps) => <Login {...routeProps} setToken={setToken}/>}/>
              <Route path="/register" render={(routeProps) => <Login {...routeProps} setToken={setToken}/>}/>
              {/* <Route path="/posts" render={(routeProps) => <Posts {...routeProps} isLoggedIn={!!token}/>}/> */}
           </Router>)
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
