import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react'; 
import { Title, Login, Posts, Register, Newpost, Search, Profile, Logout } from './Components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { isLoggedIn } from './API';

const App = () => {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken);
  isLoggedIn(storedToken);
  
  const [posts, setPosts] = useState([]);
  
  

  
  
  
  return ( 
          <><Title />
          <br></br>
            
            
            <Router>
              {token ? <Link to="/profile">Profile </Link> : <Link to="/login"> Login </Link>}
              {!token ? <Link to="/register"> Register</Link> : null}
              <Link to="/posts"> Posts </Link>
              {token ? <Link to="/newpost">Make new post </Link> : null}
              {token ? <Link to="/logout">Log out </Link> : null}
              

                

              <Route path="/login" render={(routeProps) => <Login {...routeProps} setToken={setToken} />} />
              <Route path="/register" render={(routeProps) => <Register {...routeProps} setToken={setToken} />} />
              <Route path="/posts" render={(routeProps) => <Posts {...routeProps} posts={posts} setPosts={setPosts} isLoggedIn={!!token}/>}/>
              <Route path="/newpost" render={(routeProps) => <Newpost {...routeProps} posts={posts} setPosts={setPosts} token={token}/>}/>
              <Route path="/profile" render={(routeProps) => <Profile {...routeProps} token={token} />} />
              <Route path="/logout" render={(routeProps) => <Logout {...routeProps} token={token} />} /> 
            </Router></>)
}



ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
