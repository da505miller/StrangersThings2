import React from 'react';
import { useState, useEffect } from 'react';
import { userData } from '../API';

const Profile = () => {

    // Does my state have to be an empty object? If so how do i map out posts and messages
    const [userPosts, setUserPosts] = useState([]);
    // const [userMessages, setUserMessages] = useState([]);

    
    useEffect(async () => {
        const result = await userData();
        console.log("user data is", result)
        setUserPosts(result);
        // setUserMessages(result);
    }, []);


    return (<div className="container">
                <h1 className="text-center">Your Current Postings</h1>
                <br></br>
                <div>
                    {userPosts.map((element, index) => {
                        console.log(element);
                        return (
                            <div key={index} className="containter">
                                <h2 className="list-group-item-heading text-danger">
                                    { element.posts.title }
                                </h2>
                                <div className="list-group-item-info">
                                    Posted by: { element.posts.author }
                                </div>
                                <div className="bg-success">
                                    Description: {element.posts.description }
                                </div>
                                <div className="bg-success list-group-item-text">
                                    Location: { element.posts.location }
                                </div>
                                <div className="list-group-item-text bg-success text-danger">
                                    Price: {element.posts.price }
                                </div>
                                <div className="bg-success list-group-item-text">
                                    Will Deliver: { element.posts.willDeliver }
                                </div>
                                <div className="list-group-item-text bg-success text-danger">
                                    Messages: {element.messages}
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Delete Post</button>
                                </div>
                            </div>)
                    })}
                </div>
            </div>)
}

export default Profile;