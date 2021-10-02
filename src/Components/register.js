import React from 'react';
import { useState } from 'react';
import { fetchAllPosts, fetchNewUser } from '../API';

function login( userName, password, setToken) {
    fetch('https://strangers-things.herokuapp.com/api/2107/users/login', {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user: {
      username: 'superman27',
      password: 'krypt0n0rbust'
    }
  })
}).then(response => response.json())
  .then(result => {
    console.log(result);
  })
  .catch(console.error);
}
const Register = (props) => {
    
    
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');


    
    
    return(
        <form onSubmit={async (event) => {
            event.preventDefault();
            try {
                const response = await fetchNewUser({userName, password, verifyPassword})
                
            }
            catch (error) {
                console.error(error)

            }
            
        }}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input onChange={(event) => setUserName(event.target.value)} type="text" className="form-control" placeholder="Username" required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={(event) => setPassword(event.target.value)} type="password" className="form-control" placeholder="Enter password" required />
                </div>

                <div className="form-group">
                    <label>Verify Password</label>
                    <input onChange={(event) => setVerifyPassword(event.target.value)} type="password" className="form-control" placeholder="Verify password" required />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered? <a href="#">log in</a>
                </p>
            </form>
    )
}


export default Register;