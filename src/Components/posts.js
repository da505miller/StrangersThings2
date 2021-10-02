import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { fetchAllPosts } from '../API';

async function fetchAllPosts() {
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
fetchAllPosts();


    


const Posts = (props) => {
    
    
    
    const posts = props.posts;
    const setPosts = props.setPosts;
    // const [posts, setPosts] = useState([])
    // const posts = props.posts;

    useEffect(() => {
        console.log(posts);
        setPosts(posts)
    }, []);

    // console.log(posts);
    return (<div>
                <h1>POSTS</h1>
                <div>
                    {posts.map((element, index) => {
                        console.log(element);
                        return (<div key={index} className="postcard">
                                    { element.title ? <h2>Post Title: { element.title }</h2> : <h2>Post Title: none</h2>}
                                    { element.author.username ? <h3>Posted by: { element.author.username }</h3> : null }
                                    { element.description ? <h4>Description: { element.description }</h4> : <h4>Description: none</h4> }
                                    { element.location ? <h4>Location: { element.location }</h4> : <h4>Location: unknown</h4>}
                                    { element.price ? <h4>Price: { element.price }</h4> : <h4>Price: No price listed</h4> }
                                    { element.willDeliver ? <h4>Delivery Available { element.willDeliver }</h4> : <h4>Will Not Deliver</h4> }
                                </div>)
                    })}
                </div>
            </div>)
}

export default Posts;