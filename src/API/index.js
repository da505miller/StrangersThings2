// This file features and exports all calls to the API

export const BASE_URL = 'https://strangers-things.herokuapp.com';
export const COHORT = '2107-CSU-RM-WEB-PT';

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

// export const fetchNewUser = async (newUser) => {
//     try {
//         const response = await fetch('https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/users/register', {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 user: {
//                     username: newUser.username,
//                     password: newUser.password
//                 }
//             })
//         })
//         const result = await response.json();
//         if (result.error) throw result.error;
//         console.log(result)
//     }
//     catch (err) {
//         console.error ("Trouble fetching register", err)
//     }
//    }