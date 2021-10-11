// This file features and exports all fetch calls to the API

export const BASE_URL = 'https://strangers-things.herokuapp.com';
export const COHORT = '2107-CSU-RM-WEB-PT';

// This function fetches all current posts from the API
export const fetchAllPosts = async (token) => {
    try {
        const response = await fetch('https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/posts', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        )
        const result = await response.json();
        
        
        if (result.error) throw result.error;
        console.log(result)
        return result.data.posts
    }
    catch (err) {
        console.error ("Trouble fetching posts", err)
    }
}

// This function is used to register new user
export const fetchNewUser = async (setToken, userName, password, verifyPassword) => {
    
    try {
        if (password !== verifyPassword) {
            alert("PASSWORDS DON'T MATCH!");
            return;
        }

        const response = await fetch('https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/users/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: userName,
                    password: password
                }
            })
        })
        const result = await response.json();
        const token = result.data.token
        console.log("fetch new user", result)
        setToken(token);
        localStorage.setItem("token", token);
        if (result.error) throw result.error;
        console.log(result)
    }
    catch (err) {
        console.error ("Trouble registering", err)
    }
   }

// This function will login an existing user
   export const loginUser = async (userName, password, setToken) => {
       try {const response = await fetch('https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/users/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: userName,
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
            if (result.error) throw result.error;
            console.log(result);
    
    }
        catch (err) {
            console.error ("Trouble logging in", err)
        }
   }

// This function will attempt to create a new posting
    export const createPost = async (token, title, description, price, deliver, location) => {
        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/posts', {
                method: "POST",
                headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                body: JSON.stringify({
                    post: {
                        title: title,
                        description: description,
                        location: location,
                        price: price,
                        willDeliver: deliver
                    }
                })
            })
            const result = await response.json();
            if (result.error) throw result.error;
            console.log(result)
            return result.data.post
        }
        catch (err) {
            console.error("Trouble with posting the new post", err)
        }
    } 
    // This function will grab the current loggedin users data
    export const userData = async (token) => {
        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/users/me', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
              },
            })
            const result = await response.json();
            
            const data = result
            console.log("user Data succesfull??", result)
            return data
            
            
            
        }
            
        catch (error) {
            console.error("trouble fetching user data", error)
        }
    }
    // This function will delete a logged in users post using a token and their postID
    export const deletePost = async (token, POST_ID) => {
        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/posts/' + POST_ID, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    
                },
            })
            const result = await response.json();
            
            console.log(result);
            
        }
        catch (err) {
            console.error("Error deleting post", err)
        }
    }
    // This is a function to edit a users post but I did not have time to play with it. I didn't see this was necessary in the grading rubric for this project.
    export const editPost = async (token, title, description, price, location, deliver) => {
        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/posts/POST_ID', {
                method: "PATCH",
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                post: {
                    title: title,
                    description: description,
                    price: price,
                    location: location,
                    willDeliver: deliver
                }
            })
        })
        const result = await response.json();
            if (result.error) throw result.error;
            console.log(result)
            return result.data.post;
        }
        catch (err) {
            console.error("Trouble with posting the new post", err)
        }
    }
    // This function is what creates a new message sent by logged in user to the postID of the post
    export const createMessage = async (token, content, _id) => {
        console.log("ID", _id);
        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/posts/' + _id + '/messages', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    message: {
                        content: content
                    }
                })
            })
            const result = await response.json();
            const id = result.data.message._id;
            
            console.log("message data:", id);
            return result;
        }
        catch (err) {
            console.error("Trouble creating new message", err)
        }
    }
    
    
    // This is a test call
    export const testToken = async (token) => {
        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/test/me', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            const result = await response.json();

            if (result.error) throw result.error;
                
        }
        catch (err) {
            console.error("Trouble checking for valid token", err)
        }
    }
    // test call 
    export const loggedIn = async (token) => {
        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/users/me', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            const result = await response.json();
            console.log("User Logged in?", result)
           
        }
        catch (err) {
            console.error("Trouble fetching info", err)
        }
    } 