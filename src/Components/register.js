import React from 'react';
import { useState } from 'react';
import { fetchNewUser } from '../API';
import { Posts } from '../Components';


const Register = (props) => {
    const setToken = props.setToken
    
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');


    
    
    return(
        <form onSubmit={async (event) => {
            event.preventDefault();
            try {
                const response = await fetchNewUser(setToken, userName, password, verifyPassword)
                
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

                <button type="submit" className="btn btn-primary btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered? <a href="#">log in</a>
                </p>
            </form>
    )
}


export default Register;