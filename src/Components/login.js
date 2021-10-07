import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser, fetchNewUser, logout } from '../API';


// export function loggedIn(props) {
//     const loggedIn = props.loggedIn;
//     const setLoggedIn = props.setLoggedIn;


// }


const Login = ({ setToken, match }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    return(
        <form
            onSubmit={(event) => {
                event.preventDefault();
                
                if (match.url === "/register") {
                    fetchNewUser(setToken, userName, password, confirmedPassword)};
                if (match.url === "/login") {
                    loginUser(userName, password, setToken)};
                console.log(userName, password, confirmedPassword);
            }}>
            <div className="form-group">
                    <label>Username</label>
                    <input 
                        onChange={({target: {value}}) => setUserName(value)} 
                        type="text" 
                        className="form-control" 
                        placeholder="Username" 
                        required 
                    />
            </div>

            <div className="form-group">
                    <label>Password</label>
                    <input 
                        onChange={({target: {value}}) => setPassword(value)} 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password" 
                        required 
                    />
            </div>
            {
                match.url === "/register" ?
            
                (<div className="form-group">
                    <label>Verify Password</label>
                    <input 
                        onChange={({target: {value}}) => setConfirmedPassword(value)} 
                        type="password"
                        value={confirmedPassword} 
                        className="form-control" 
                        placeholder="Verify password" 
                        required 
                    />
                </div>) : null}

                <button 
                    type="submit" 
                    className="btn btn-primary btn-dark btn-lg btn-block">Login
                </button>
            {
                match.url === "/register" ?
                (<Link to="login"> Already have an account?</Link>) : 
                 <Link to="register"> Don't have an account?</Link>
            }
        </form>
    )
}



// My logout component does not seem to be working. Does not clear the current token

const Logout = () => {
    return (
        <button
            onSubmit={(event) => {
                event.preventDefault();
                logout();
            }} 
            type="submit"
            className="btn btn-primary btn-dark btn-lg btn-block">Logout
        </button>
    )
}
export { Login, Logout };