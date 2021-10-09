import React from 'react';
import { useState, useEffect } from 'react';
import { userData, deletePost } from '../API';

const Profile = (props) => {
    const token = props.token;
    // Does my state have to be an empty object? If so how do i map out posts and messages
    const [userPosts, setUserPosts] = useState([]);
    const [userMessages, setUserMessages] = useState([]);

    
    useEffect(async () => {
        const result = await userData(token);
        console.log("user data is", result);
        const posts = result.data.posts;
        const messages = result.data.messages;
        setUserPosts(posts);
        setUserMessages(messages);
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
                                    Posted by: { posts.author }
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
                                
                                <div className="form-group">
                                    <button 
                                    onClick={async (event) => {
                                        event.preventDefault();
                                        deletePost(event.target)
                                    }}
                                    type="submit" className="btn btn-primary">Delete Post</button>
                                </div>
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