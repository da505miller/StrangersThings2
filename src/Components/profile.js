import React from 'react';
import { useState, useEffect } from 'react';
import { userData, deletePost, fetchAllPosts } from '../API';
import { useHistory } from 'react-router-dom';

// When i refresh this /profile page for some reason it has a bug in it. Cannot figure it out. Maybe it's somehow not reading the token. but when i refresh
// none of my posts or messages display unless I go to another page and then back to the profile page.

const Profile = (props) => {
    // Profile component will grab the logged in users data and map through users posts and messages and display them. 
    // If a user post is still active the delete button will appear for that post and will have a message inside post saying "POST IS CURRENTLY ACTIVE".
    // If post is not active the active message will not show and no delete button will be present for that post.
    const token = props.token;
    const [userPosts, setUserPosts] = useState([]);
    const [userMessages, setUserMessages] = useState([]);
    const history = useHistory();
    console.log(token)
    
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
                <h1 className="text-center">Your Current Postings</h1>
                <br></br>
                <div>
                    {userPosts.map((posts, index) => {
                        
                        return (
                            <div key={index} className="containter">
                                <h2 className="list-group-item-heading text-danger">
                                    { posts.title }
                                </h2>
                                <div className="list-group-item-info">
                                    User ID: { posts.author }
                                </div>
                                <div className="bg-success">
                                    Description: {posts.description }
                                </div>
                                <div className="bg-success list-group-item-text">
                                    Location: { posts.location }
                                </div>
                                <div className="list-group-item-text bg-success text-danger">
                                    Price: {posts.price }
                                </div>
                                <div className="bg-success list-group-item-text">
                                    Will Deliver: { posts.willDeliver }
                                </div>

                                {posts.active ?
                                <div className="bg-success list-group-item-text">
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
                            
                            </div>)
                    })}
                </div>
                <h1 className="text-center">Your Current Messages</h1>
                <br></br>
                {userMessages.map((messages, index) => {
                        return (
                            <div key={index} className="container">
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
                            </div>)
                })}


            </div>)
}

export default Profile;