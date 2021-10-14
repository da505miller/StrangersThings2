import React from 'react';
import { useState, useEffect } from 'react';
import { userData, deletePost, fetchAllPosts, editPost } from '../API';
import { useHistory } from 'react-router-dom';


// When i refresh this /profile page for some reason it has a bug in it. Cannot figure it out. Maybe it's somehow not reading the token. but when i refresh
// none of my posts or messages display unless I go to another page and then back to the profile page.

const Profile = (props) => {
    // Profile component will grab the logged in users data and map through users posts and messages and display them. 
    // If a user post is still active the delete button will appear for that post and will have a message inside post saying "POST IS CURRENTLY ACTIVE".
    // If post is not active the active message will not show and no delete button will be present for that post.
    // If post is active the edit post form will be below the post and user can edit all fields and update it. Not the prettiest way to do it but it works.
    const token = props.token;
    const [userPosts, setUserPosts] = useState([]);
    const [userMessages, setUserMessages] = useState([]);
    const history = useHistory();

    
    // <Link to="/editPost">Edit Post</Link>
    
    console.log(token);
    
    useEffect(async () => {
        try {
            if (token) {
        const result = await userData(token);
        console.log("user data is", result);
        const posts = result.data.posts;
        const messages = result.data.messages;
        setUserPosts(posts);
        setUserMessages(messages);}
        }
        catch (err) {
            console.error("trouble", err)
        }
        // setUserMessages(result);
    }, []);


    return (<div className="container">
                <h1 className="post-title text-center">Your Current Postings</h1>
                <br></br>
                <div id="post">
                    {userPosts.map((posts, index) => {
                        
                        return (
                            <div key={index} className="containter">
                                <h2 className="form-group list-group-item-heading text-danger">
                                    { posts.title }
                                </h2>
                                <div className="form- group list-group-item-info">
                                    User ID: { posts.author }
                                </div>
                                <div className="form-group bg-success">
                                    Description: {posts.description }
                                </div>
                                <div className="form-group bg-success list-group-item-text">
                                    Location: { posts.location }
                                </div>
                                <div className="form-group list-group-item-text bg-success text-danger">
                                    Price: {posts.price }
                                </div>
                                <div className="form-group bg-success list-group-item-text">
                                    Will Deliver: { posts.willDeliver }
                                </div>

                                {posts.active ?
                                <div className="form-group bg-success list-group-item-text">
                                    POST IS CURRENTLY ACTIVE { posts.active }
                                </div> : null}
                                
                                {posts.active ? 
                                <div className="form-group">
                                    <button 
                                    onClick={async (event) => {
                                        
                                        try {
                                             // calls api function to delete post and then fetches all the posts of user posts.
                                             // When delete button is pressed the post should delete from main postings page and push user to the posts page
                                            
                                            const response = await deletePost(token, posts._id)
                                            console.log(response)
                                            fetchAllPosts(userPosts);
                                            
                                            history.push("/posts")
                                            
                                        }
                                        catch (err) {
                                            console.error("trouble deleting post", err)
                                        }
                                    }} 
                                    
                                    type="submit" className="btn btn-primary">Delete Post</button>
                                </div> : null}
                                
                                {posts.active ?
                                <Editpost token={token} _id={posts._id} /> : null}
                                {/* <div className="form-group">
                                    <button 
                                    onClick={(event) => {
                                        return <Editpost token={token} _id={posts._id} />
                                        // try {
                                        //     const response = await editPost(token, newTitle, newDescription, newPrice, newLocation, newWillDeliver, _id)
                                        // }

                                    }
                                    }
                                    type="submit" className="btn btn-primary">Edit Post</button>
                                </div> : null} */}
                            
                            </div>)
                    })}
                </div>
                <h1 className="post-title text-center">Your Current Messages</h1>
                <br></br>
                {userMessages.map((messages, index) => {
                        return (
                          <div className="message-main">
                            <div key={index} id="message-box" className="container">
                                <h2 className="list-group-item-heading text-danger">
                                    Message
                                </h2>
                                <div className="list-group-item-info">
                                    Message about: { messages.post.title }
                                </div>
                                <div className="list-group-item-info">
                                    From: { messages.fromUser.username }
                                </div>
                                <div className="bg-success list-group-item-text">
                                    Content: { messages.content }
                                </div>
                            </div>
                          </div>)
                })}


            </div>)
}

const Editpost = ({token, posts, setPosts, _id}) => {

    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newWillDeliver, setNewWillDeliver] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const history = useHistory();


    return (
        <form onSubmit={async (event) => {
            event.preventDefault();
            try {
                const response = await editPost(token, newTitle, newDescription, newPrice, newLocation, newWillDeliver, _id);
                const result = response.data;
                
                history.push("/posts");
            }
            catch (error) {
                console.error(error)
            }
        }}>
                <h3>Edit your post</h3>

                <div className="form-group">
                    <label>Title</label>
                    <input onChange={(event) => setNewTitle(event.target.value)} type="text" className="form-control" placeholder="Title" required />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input onChange={(event) => setNewDescription(event.target.value)} type="text" className="form-control" placeholder="Description" required />
                </div>

                <div className="form-group">
                    <label>Location</label>
                    <input onChange={(event) => setNewLocation(event.target.value)} type="text" className="form-control" placeholder="Location" required />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input onChange={(event) => setNewPrice(event.target.value)} type="number" className="form-control" placeholder="Price" required />
                </div>

                <div className="form-group">
                    <label>Will deliver?</label>
                    <input onChange={(event) => setNewWillDeliver(event.target.value)} type="text" className="form-control" placeholder="Deliver?" required />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Update Post</button>
                <br></br>
                <br></br>
                
            </form>)
}

export { Profile, Editpost };