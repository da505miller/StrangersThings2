import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react'; 
import { Title, Login, Posts, Register, Newpost, Search, Profile, Logout } from './Components';
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
  }, []);

  
  
  
  return ( 
          <><Title />
            <Search />
            
            <Router>
              {token ? <Link to="/profile">Profile </Link> : <Link to="/login"> Login </Link>}
              {!token ? <Link to="/register"> Register</Link> : null}
              <Link to="/posts"> Posts </Link>
              {token ? <Link to="/newpost">Make new post </Link> : null}
              {token ? <Link to="/logout">Log out </Link> : null}
              

                

              <Route path="/login" render={(routeProps) => <Login {...routeProps} setToken={setToken} />} />
              <Route path="/register" render={(routeProps) => <Register {...routeProps} setToken={setToken} />} />
              <Route path="/posts" render={(routeProps) => <Posts {...routeProps} posts={posts} setPosts={setPosts} loggedIn={!!token}/>}/>
              <Route path="/newpost" render={(routeProps) => <Newpost {...routeProps} posts={posts} setPosts={setPosts} token={token}/>}/>
              <Route path="/profile" render={(routeProps) => <Profile {...routeProps} />} />
              <Route path="/logout" render={(routeProps) => <Logout {...routeProps} />} /> 
            </Router></>)
}



ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
