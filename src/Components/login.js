import React, { useState } from 'react';
import { Link } from 'react-router-dom';


async function login( username, password, setToken) {
    const response = await fetch('https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/users/login', {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    user: {
                                        username: username,
                                        password: password
        }
    })
  })

  const result = await response.json();
  console.log(result.data.token);
  const token = result.data.token;
  setToken(token);
  localStorage.setItem("token", token);
  localStorage.getItem("token");
}

async function register(setToken, username, password, confirmedPassword) {
    if (password !== confirmedPassword) {
        alert("PASSWORDS DON'T MATCH!");
        return;
    }
    const response = await fetch(
        'https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/users/register', 
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
    },
        body: JSON.stringify({
            user: {
                username,
                password
    },
  }),
 }
)
    const result = await response.json();
    // console.log(result.data.token);
    const token = result.data.token
    setToken(token)
//     .then(({ data }) => {
//       const { token } = data.data
//       console.log(token);
//   })
//   .catch(console.error));

}

const Login = ({ setToken, match }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    return(
        <form
            onSubmit={(event) => {
                event.preventDefault();
                
                if (match.url === "/register") {
                    register(setToken, userName, password, confirmedPassword)};
                if (match.url === "/login") {
                    login(userName, password, setToken)};
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
                    className="btn btn-dark btn-lg btn-block">Register
                </button>
            {
                match.url === "/register" ?
                (<Link to="login"> Already have an account?</Link>) : 
                 <Link to="register"> Don't have an account?</Link>
            }
        </form>
    )
}

// function login
// function register
// login = ({setToken, match})
// 3 pieces of State

// return form

// app  has router links and routes
export default Login;