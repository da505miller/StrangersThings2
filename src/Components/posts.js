import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllPosts, createPost, deletePost } from '../API';


const Posts = (props) => {
    
    const posts = props.posts;
    const setPosts = props.setPosts;
    
    const token = props.token;
    
    
    // const [posts, setPosts] = useState([]);
    
    
    // When i created a post it created 2 identical posts. Do i have a mistake in my useEffect?
    useEffect(async () => {
        
        const result = await fetchAllPosts();
        console.log("UseEffect Posts", result);
        setPosts(result);
    }, []);

    // My message and delete divs are not showing up with logged in user. are my ternarys wrong?
    return (<div className="container">
                <h1 className="text-center">Current Postings</h1>
                <br></br>
                <div>
                    {posts.map((element, index) => {
                        console.log(element);
                        return (
                            <div key={index} className="containter">
                                <h2 className="list-group-item-heading text-danger">
                                    { element.title }
                                </h2>
                                <div className="list-group-item-info">
                                    Posted by: { element.author.username }
                                </div>
                                <div className="bg-success">
                                    Description: {element.description }
                                </div>
                                <div className="bg-success list-group-item-text">
                                    Location: { element.location }
                                </div>
                                <div className="list-group-item-text bg-success text-danger">
                                    Price: {element.price }
                                </div>
                                <div className="bg-success list-group-item-text">
                                    Will Deliver: { element.willDeliver }
                                </div>
                                
                                <div className="col-lg-6">

                                    {token ? (
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Write message here..." required />
                                        <span class="input-group-btn">
                                            <button className="btn btn-primary" type="submit">Send</button>
                                        </span>
                                    </div>) : null}
                                </div>
                                {token ? (
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Delete Post</button>
                                </div>) : null}

                            </div>)
                    })}
                </div>
            </div>)
}

const Newpost = (props) => {

    const token = props.token;
    const loggedIn = props.loggedIn;
    const posts = props.posts;
    const setPosts = props.setPosts;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [deliver, setDeliver] = useState("");

    return(
        <form onSubmit={async (event) => {
            event.preventDefault();
            try {
                const response = await createPost(token, title, description, price, deliver);
                setPosts(response);
                fetchAllPosts(posts);
                
                

            }
            catch (error) {
                console.error(error)
            }
        }}>
                <h3>Make a new post</h3>

                <div className="form-group">
                    <label>Title</label>
                    <input onChange={(event) => setTitle(event.target.value)} type="text" className="form-control" placeholder="Title" required />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input onChange={(event) => setDescription(event.target.value)} type="text" className="form-control" placeholder="Description" required />
                </div>

                <div className="form-group">
                    <label>Location</label>
                    <input onChange={(event) => setDescription(event.target.value)} type="text" className="form-control" placeholder="Location" required />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input onChange={(event) => setPrice(event.target.value)} type="number" className="form-control" placeholder="Price" required />
                </div>

                <div className="form-group">
                    <label>Will deliver?</label>
                    <input onChange={(event) => setDeliver(event.target.value)} type="text" className="form-control" placeholder="Deliver?" required />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Create Post</button>
                
            </form>
    )
}

const Message = () => {
    return (
        <form className="form-group">
            <div className="col-lg-6">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Write message here..." required />
                        <span class="input-group-btn">
                            <button className="btn btn-primary" type="submit">Send</button>
                        </span>
                </div>
            </div>
        </form>
    )
}

const Delete = (props) => {
    // const [currentPost, setCurrentPost] = useState([]);

    return (
        <form> 
        {/* onSubmit={async (event) => {
            
            try {
                response = await deletePost();
                fetchAllPosts();
            }
            catch (error) {
                console.error(error)
            }
        }}> */}
            <div className="form-group">
                <button type="submit" className="btn btn-primary">Delete</button>
            </div>
        </form>
        
    )
}

// export default Posts;
export { Posts, Newpost, Message, Delete };