import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser, fetchNewUser } from '../API';


// export function loggedIn(props) {
//     const loggedIn = props.loggedIn;
//     const setLoggedIn = props.setLoggedIn;


// }


const Login = ({ setToken, match, history }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    return(
        <form
            onSubmit={(event) => {
                event.preventDefault();
                
                if (match.url === "/register") {
                    fetchNewUser(setToken, userName, password, confirmedPassword)};
                    history.push("/login")
                if (match.url === "/login") {
                    console.log(userName, password, confirmedPassword);
                    loginUser(userName, password, setToken)};
                    history.push("/posts")
                    
            } 
                }>
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



// Not sure if this component works properly. I am unsure if I wrote the history.push correctly.
// It's supposed to log user out and take them to the login page.

const Logout = ({ token, setToken, history }) => {
    
    
    return (
        <button
            onSubmit={(event) => {
                
                setToken(null);
                localStorage.clear();
                // History.push
                history.push("/login");
                
            }} 
            type="submit"
            className="btn btn-primary btn-dark btn-lg btn-block">Logout
        </button>
    )
}
export { Login, Logout };