// This file features and exports all calls to the API

export const BASE_URL = 'https://strangers-things.herokuapp.com';
export const COHORT = '2107-CSU-RM-WEB-PT';

// This function fetches all current posts from the API
export const fetchAllPosts = async () => {
    try {
        const response = await fetch('https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/posts')
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
    export const createPost = async (token, title, description, price, deliver) => {
        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/posts', {
                method: "POST",
                headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer' + token
                        },
                body: JSON.stringify({
                    post: {
                        title: title,
                        description: description,
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
    
    export const userData = async () => {
        try {const response = await fetch('https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/users/me', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer TOKEN_STRING_HERE'
              },
            })
            const result = await response.json();
            const data = result.posts
            console.log("User data:", data);
            
        }
            
        catch (error) {
            console.error("trouble fetching user data", error)
        }
    }

    export const deletePost = async () => {
        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/posts/POST_ID', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer TOKEN_STRING_HERE'
                },
            })
            const result = await response.json();
            console.log(result);
            
        }
        catch (err) {
            console.error("Error deleting post", err)
        }
    }

    export const editPost = async (title, description, price, location, deliver) => {
        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/posts/POST_ID', {
                method: "PATCH",
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer TOKEN_STRING_HERE'
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

    export const createMessage = async (content) => {
        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/posts/POST_ID/messages', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer TOKEN_STRING_HERE'
                },
                body: JSON.stringify({
                    message: {
                        content: content
                    }
                })
            })
            const result = await response.json();
            const data = result.data.message;
            console.log("message data:", data);
            return data;
        }
        catch (err) {
            console.error("Trouble creating new message", err)
        }
    }