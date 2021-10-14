import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react'; 
import { Title, Login, Posts, Editpost, Register, Newpost, Search, Profile, Logout, Message } from './Components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { loggedIn, testToken } from './API';

const App = () => {
  
  const [token, setToken] = useState(null);
  const [posts, setPosts] = useState([]);

  // As soon as page hits screen it will take the token from local storage (if there is one) and set it to storedToken.
  // Also it will pass the token to the 2 api calls to test the token and see if user is logged in
  useEffect(() => {
    
    const storedToken = localStorage.getItem("token");
    if (storedToken) {setToken(storedToken);
      loggedIn(storedToken);
      testToken(storedToken);
    }
  }, []);

  
  // Profile, Make New Post, and Logout links should only be visible if the user has a valid token. If not they should render null and not be visible to the user.
  // A logged out user will only see the links for login, register, and posts. logged out user will not be able to delete posts or send messages.
  
  return ( 
          <><Title />
          <br></br>
            <Router>
            <div id="link-container">
              {token ? <Link to="/profile" className="link">Profile </Link> : <Link to="/login" className="link"> Login </Link>}
              {!token ? <Link to="/register" className="link"> Register</Link> : null}
              <Link to="/posts" className="link"> Posts </Link>
              {token ? <Link to="/newpost" className="link">Make new post </Link> : null}
              {token ? <Link to="/logout" className="link">Log out </Link> : null}
            </div>
            
            
            
              

                

              <Route path="/login" render={(routeProps) => <Login {...routeProps} setToken={setToken} />} />
              <Route path="/register" render={(routeProps) => <Register {...routeProps} setToken={setToken} />} />
              <Route path="/posts" render={(routeProps) => <Posts {...routeProps} posts={posts} setPosts={setPosts} isLoggedIn={!!token} token={token} />}/>
              <Route path="/newpost" render={(routeProps) => <Newpost {...routeProps} posts={posts} setPosts={setPosts} token={token}/>}/>
              <Route path="/profile" render={(routeProps) => <Profile {...routeProps} token={token} />} />
              <Route path="/logout" render={(routeProps) => <Logout {...routeProps} setToken={setToken} token={token} />} /> 
              <Route path="/message" render={(routeProps) => <Message {...routeProps} token={token} posts={posts} />} />
              <Route path="/search" render={(routeProps) => <Search {...routeProps} token={token} posts={posts} />} />
              <Route path="/editPost" render={(routeProps) => <Editpost {...routeProps} token={token} posts={posts} setPosts={setPosts} />} />
            </Router>

            {!token ? <h3>Please register or login. You can view current posts without logging in.</h3> : null}
            
          </>
            
            )
}



ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
