import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react'; 
import { Title, Login, Posts, Register, Newpost, Search, Profile } from './Components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const App = () => {
  
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    console.log("Mounted")
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }
  }, [])
  
  
  return ( 
          <><Title />
            <Search />
            
            <Router>
              <Link to="/login"> Login </Link>
              <Link to="/register"> Register</Link>
              <Link to="/posts"> Posts </Link>
              <Link to="/newpost">Make new post </Link>
              <Link to="/profile">Profile </Link>

                

              <Route path="/login" render={(routeProps) => <Login {...routeProps} setToken={setToken} />} />
              <Route path="/register" render={(routeProps) => <Register {...routeProps} setToken={setToken} />} />
              <Route path="/posts" render={(routeProps) => <Posts {...routeProps} posts={posts} setPosts={setPosts} loggedIn={!!token}/>}/>
              <Route path="/newpost" render={(routeProps) => <Newpost {...routeProps} posts={posts} setPosts={setPosts} token={token}/>}/>
              <Route path="/profile" render={(routeProps) => <Profile {...routeProps} />} />
            </Router></>)
}



ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
